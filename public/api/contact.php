<?php
/**
 * Contact form endpoint, served at /api/contact (see public/.htaccess).
 *
 * The site is a static export (output: 'export') hosted on OVH shared hosting,
 * which runs PHP but not Node.js, so a Next.js route handler can't be used.
 * Everything in public/ is copied as-is into the build output.
 *
 * Receives the contact form (multipart/form-data: name, company, email,
 * message, optional file) and emails it through OVH's mail server with mail().
 *
 * JSON responses expected by components/Contact.tsx:
 *   200     { "success": true }
 *   4xx/5xx { "error": "...", "fields": { "name": "...", ... } }
 */

// ---- Configuration ---------------------------------------------------------

// Address that receives every form submission.
const RECIPIENT = 'sitedev@lmfconsulting.tn';

// Sender: must be an address on a domain attached to this OVH hosting,
// otherwise OVH may refuse to send it or it ends up in spam.
const MAIL_FROM      = 'no-reply@lmfis.com';
const MAIL_FROM_NAME = 'LMF Industrial Supply';

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB, keep in sync with Contact.tsx

// Allowed extension => MIME type (same types as Contact.tsx)
const ALLOWED_FILES = [
    'pdf'  => 'application/pdf',
    'doc'  => 'application/msword',
    'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls'  => 'application/vnd.ms-excel',
    'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'jpg'  => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'png'  => 'image/png',
    'webp' => 'image/webp',
];

// ---------------------------------------------------------------------------

function respond($status, array $data)
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data);
    exit;
}

function clean_line($value)
{
    // Prevents header injection in the email
    return trim(str_replace(["\r", "\n"], ' ', (string) $value));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['error' => 'Method not allowed.']);
}

// When the request exceeds post_max_size, PHP empties $_POST and $_FILES
if (empty($_POST) && empty($_FILES) && (int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 0) {
    respond(413, [
        'error'  => 'File is too large. Maximum file size is 20 MB.',
        'fields' => ['file' => 'File is too large. Maximum file size is 20 MB.'],
    ]);
}

$name    = clean_line($_POST['name'] ?? '');
$company = clean_line($_POST['company'] ?? '');
$email   = clean_line($_POST['email'] ?? '');
$message = trim((string) ($_POST['message'] ?? ''));

$fields = [];
if (mb_strlen($name) < 2 || mb_strlen($name) > 200) {
    $fields['name'] = 'Enter your name.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $fields['email'] = 'Enter a valid email address.';
}
if (mb_strlen($message) < 10) {
    $fields['message'] = 'Say a little more (10 characters minimum).';
} elseif (mb_strlen($message) > 10000) {
    $fields['message'] = 'Message is too long (10,000 characters maximum).';
}
if (mb_strlen($company) > 200) {
    $fields['company'] = 'Company name is too long.';
}

$attachment = null;
if (isset($_FILES['file']) && $_FILES['file']['error'] !== UPLOAD_ERR_NO_FILE) {
    $file = $_FILES['file'];
    $ext  = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

    if (in_array($file['error'], [UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE], true) || $file['size'] > MAX_FILE_SIZE) {
        $fields['file'] = 'File is too large. Maximum file size is 20 MB.';
    } elseif ($file['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($file['tmp_name'])) {
        $fields['file'] = 'The file could not be uploaded. Please try again.';
    } elseif (!array_key_exists($ext, ALLOWED_FILES)) {
        $fields['file'] = 'Invalid file type. Please upload a PDF, Word, Excel, JPG, PNG, or WebP file.';
    } else {
        // The file is only attached to the email, never stored on the server
        $attachment = [
            'name'    => preg_replace('/[^A-Za-z0-9._-]/', '_', basename($file['name'])),
            'type'    => ALLOWED_FILES[$ext],
            'content' => file_get_contents($file['tmp_name']),
        ];
    }
}

if ($fields) {
    respond(400, ['error' => 'Please fix the highlighted fields.', 'fields' => $fields]);
}

// ---- Build and send the email ----------------------------------------------

$referer = (string) ($_SERVER['HTTP_REFERER'] ?? '');

$subject = 'New contact request from ' . $name . ($company !== '' ? ' (' . $company . ')' : '');

$text = "Name: {$name}\n"
      . "Company: " . ($company !== '' ? $company : '-') . "\n"
      . "Email: {$email}\n"
      . "Page: " . ($referer !== '' ? $referer : '-') . "\n"
      . "\nMessage:\n{$message}\n";

$boundary = '=_' . bin2hex(random_bytes(16));

$headers = implode("\r\n", [
    'From: ' . MAIL_FROM_NAME . ' <' . MAIL_FROM . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
]);

$body = "--{$boundary}\r\n"
      . "Content-Type: text/plain; charset=UTF-8\r\n"
      . "Content-Transfer-Encoding: base64\r\n\r\n"
      . chunk_split(base64_encode($text));

if ($attachment) {
    $body .= "--{$boundary}\r\n"
           . "Content-Type: {$attachment['type']}; name=\"{$attachment['name']}\"\r\n"
           . "Content-Transfer-Encoding: base64\r\n"
           . "Content-Disposition: attachment; filename=\"{$attachment['name']}\"\r\n\r\n"
           . chunk_split(base64_encode($attachment['content']));
}

$body .= "--{$boundary}--\r\n";

$sent = mail(
    RECIPIENT,
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    $body,
    $headers,
    '-f' . MAIL_FROM
);

if (!$sent) {
    respond(500, ['error' => "Your message couldn't be sent. Please email us directly."]);
}

respond(200, ['success' => true]);
