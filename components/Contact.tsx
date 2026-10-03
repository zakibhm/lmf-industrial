"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

// Keep this in sync with public/api/contact.php.
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
  "image/webp",
];

type FieldName = "name" | "company" | "email" | "message" | "file";

interface FormState {
  name: string;
  company: string;
  email: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  company: "",
  email: "",
  message: "",
};

function validateField(name: FieldName, value: string): string {
  switch (name) {
    case "name":
      return value.trim().length < 2 ? "Enter your name." : "";

    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "Enter a valid email address.";

    case "message":
      return value.trim().length < 10
        ? "Say a little more (10 characters minimum)."
        : "";

    default:
      return "";
  }
}

function validateFile(file: File | null): string {
  if (!file) return "";

  if (file.size > MAX_FILE_SIZE) {
    return "File is too large. Maximum file size is 20 MB.";
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return "Invalid file type. Please upload a PDF, Word, Excel, JPG, PNG, or WebP file.";
  }

  return "";
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function ErrorIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v3.75m0 3.75h.008M10.29 3.86l-8.18 14.18A1.5 1.5 0 003.5 20.25h17a1.5 1.5 0 001.39-2.21L13.71 3.86a1.5 1.5 0 00-2.42 0z"
      />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg
      className="w-4 h-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3.375 3.375 0 0119.5 6.53L9.309 16.72a1.125 1.125 0 01-1.591-1.591l7.44-7.44"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

interface OfficeType {
  region: string;
  location: string;
}

interface ContactDetails {
  label: string;
  value: string;
  href: string;
}

function Contact({
  offices,
  contactDetails,
}: {
  offices: OfficeType[];
  contactDetails: ContactDetails[];
}) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [file, setFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<
    Partial<Record<FieldName, string>>
  >({});

  const [touched, setTouched] = useState<
    Partial<Record<FieldName, boolean>>
  >({});

  const [status, setStatus] = useState<
    "idle" | "submitting" | "sent" | "error"
  >("idle");

  const [serverError, setServerError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target as {
      name: FieldName;
      value: string;
    };

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target as {
      name: FieldName;
      value: string;
    };

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selected = e.target.files?.[0] ?? null;

    const fileError = validateFile(selected);

    setTouched((prev) => ({
      ...prev,
      file: true,
    }));

    setErrors((prev) => ({
      ...prev,
      file: fileError,
    }));

    if (fileError) {
      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setFile(selected);
  };

  const removeFile = () => {
    setFile(null);

    setErrors((prev) => ({
      ...prev,
      file: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const runFullValidation = () => {
    const fields: Array<Exclude<FieldName, "file">> = [
      "name",
      "email",
      "message",
    ];

    const nextErrors: Partial<Record<FieldName, string>> = {};

    fields.forEach((field) => {
      nextErrors[field] = validateField(field, form[field]);
    });

    nextErrors.file = validateFile(file);

    setErrors(nextErrors);

    setTouched({
      name: true,
      email: true,
      message: true,
      company: true,
      file: true,
    });

    return Object.values(nextErrors).every((err) => !err);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setServerError("");

    if (!runFullValidation()) {
      return;
    }

    setStatus("submitting");

    try {
      const payload = new FormData();

      payload.append("name", form.name);
      payload.append("company", form.company);
      payload.append("email", form.email);
      payload.append("message", form.message);

      if (file) {
        payload.append("file", file);
      }

      /*
       * Handled by public/api/contact.php (PHP on the OVH hosting),
       * served at /api/contact on the same domain through public/.htaccess.
       *
       * To use an API on another domain instead, set:
       *
       *   NEXT_PUBLIC_API_URL=https://api.example.com
       */
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "";

      const endpoint = `${API_URL}/api/contact`;

      const res = await fetch(endpoint, {
        method: "POST",
        body: payload,
      });

      let data: {
        success?: boolean;
        error?: string;
        fields?: Partial<Record<FieldName, string>>;
      } = {};

      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        if (data.fields) {
          setErrors((prev) => ({
            ...prev,
            ...data.fields,
          }));
        }

        setServerError(
          data.error ||
            "Something went wrong. Please try again.",
        );

        setStatus("error");
        return;
      }

      setStatus("sent");

      setForm(initialForm);
      setFile(null);
      setTouched({});
      setErrors({});

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Contact form request failed:", error);

      setServerError(
        "Couldn't reach the server. Check your connection and try again.",
      );

      setStatus("error");
    }
  };

  const fieldClass = (field: FieldName) =>
    `w-full rounded-lg bg-background/60 border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-colors duration-200 ${
      touched[field] && errors[field]
        ? "border-[#ef4343]/70 focus:border-[#ef4343]"
        : "border-border/60 focus:border-primary/60"
    }`;

  return (
    <section
      id="contact"
      className="relative section-spacing section-padding overflow-hidden mt-10"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50%, rgba(13, 102, 165, 0.08), transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(43, 157, 238) 1px, transparent 1px), linear-gradient(90deg, rgb(43, 157, 238) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium mb-4">
            Contact us
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5 leading-[1.1]">
            Tell us about your{" "}
            <span className="gradient-text-blue">
              request
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Whether you need engineering support, spare parts, site
            services or remote monitoring — get in touch and our team
            will get back to you with the right people for the job.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="relative rounded-2xl bg-secondary/20 p-[1px] overflow-hidden">
              <div className="relative rounded-[15px] glass-card p-8 md:p-10 bg-[#060010]/80">
                {status === "sent" ? (
                  <div className="py-10 text-center">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Message sent
                    </h3>

                    <p className="text-sm text-muted-foreground mb-6">
                      Thanks for reaching out. A member of our team
                      will reply shortly.
                    </p>

                    <button
                      onClick={() => setStatus("idle")}
                      className="text-sm px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                        >
                          Name
                        </label>

                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Your full name"
                          aria-invalid={Boolean(
                            touched.name && errors.name,
                          )}
                          aria-describedby={
                            touched.name && errors.name
                              ? "name-error"
                              : undefined
                          }
                          className={fieldClass("name")}
                        />

                        {touched.name && errors.name && (
                          <p
                            id="name-error"
                            className="mt-1.5 flex items-center gap-1.5 text-xs text-[#ef4343]"
                          >
                            <ErrorIcon />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="company"
                          className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                        >
                          Company
                        </label>

                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Company name"
                          className={fieldClass("company")}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                      >
                        Email
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="you@company.com"
                        aria-invalid={Boolean(
                          touched.email && errors.email,
                        )}
                        aria-describedby={
                          touched.email && errors.email
                            ? "email-error"
                            : undefined
                        }
                        className={fieldClass("email")}
                      />

                      {touched.email && errors.email && (
                        <p
                          id="email-error"
                          className="mt-1.5 flex items-center gap-1.5 text-xs text-[#ef4343]"
                        >
                          <ErrorIcon />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="message"
                          className="block text-xs tracking-widest uppercase text-muted-foreground"
                        >
                          Message
                        </label>

                        <span className="text-[11px] text-muted-foreground/60">
                          {form.message.length}/500
                        </span>
                      </div>

                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        maxLength={500}
                        value={form.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Tell us what you need help with"
                        aria-invalid={Boolean(
                          touched.message && errors.message,
                        )}
                        aria-describedby={
                          touched.message && errors.message
                            ? "message-error"
                            : undefined
                        }
                        className={`${fieldClass(
                          "message",
                        )} resize-none`}
                      />

                      {touched.message && errors.message && (
                        <p
                          id="message-error"
                          className="mt-1.5 flex items-center gap-1.5 text-xs text-[#ef4343]"
                        >
                          <ErrorIcon />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* File attachment */}
                    <div>
                      <label
                        htmlFor="file"
                        className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                      >
                        Attachment{" "}
                        <span className="text-muted-foreground/50 normal-case tracking-normal">
                          (optional)
                        </span>
                      </label>

                      {file ? (
                        <div
                          className={`flex items-center justify-between gap-3 rounded-lg bg-background/60 border px-4 py-3 text-sm ${
                            touched.file && errors.file
                              ? "border-[#ef4343]/70"
                              : "border-border/60"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0 text-foreground">
                            <PaperclipIcon />

                            <span className="truncate">
                              {file.name}
                            </span>

                            <span className="text-muted-foreground/60 text-xs whitespace-nowrap">
                              {formatFileSize(file.size)}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={removeFile}
                            aria-label="Remove attachment"
                            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                          >
                            <XIcon />
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="file"
                          className={`flex items-center gap-2 w-full rounded-lg bg-background/60 border px-4 py-3 text-sm text-muted-foreground/70 cursor-pointer hover:text-muted-foreground transition-colors duration-200 ${
                            touched.file && errors.file
                              ? "border-[#ef4343]/70"
                              : "border-border/60"
                          }`}
                        >
                          <PaperclipIcon />

                          Attach a file (PDF, Word, Excel, JPG, PNG,
                          WebP — max 20 MB)
                        </label>
                      )}

                      <input
                        ref={fileInputRef}
                        id="file"
                        name="file"
                        type="file"
                        onChange={handleFileChange}
                        accept={ALLOWED_FILE_TYPES.join(",")}
                        aria-invalid={Boolean(
                          touched.file && errors.file,
                        )}
                        aria-describedby={
                          touched.file && errors.file
                            ? "file-error"
                            : undefined
                        }
                        className="sr-only"
                      />

                      {touched.file && errors.file && (
                        <p
                          id="file-error"
                          className="mt-1.5 flex items-center gap-1.5 text-xs text-[#ef4343]"
                        >
                          <ErrorIcon />
                          {errors.file}
                        </p>
                      )}
                    </div>

                    {status === "error" && serverError && (
                      <div className="flex items-center gap-2 rounded-lg border border-[#ef4343]/40 bg-[#ef4343]/10 px-4 py-3 text-sm text-[#ef4343]">
                        <ErrorIcon />
                        {serverError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full sm:w-auto text-sm px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "submitting"
                        ? "Sending..."
                        : "Send message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact info + offices */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-10"
          >
            <div>
              <span className="text-xs tracking-widest uppercase text-muted-foreground font-medium">
                Direct contact
              </span>

              <div className="mt-4 space-y-3">
                {contactDetails.map((detail) => (
                  <a
                    key={detail.value}
                    href={detail.href}
                    className="block text-base text-foreground hover:text-primary transition-colors duration-300"
                  >
                    {detail.value}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-border/40 pt-8">
              <span className="text-xs tracking-widest uppercase text-muted-foreground font-medium">
                Our office
              </span>

              <div className="mt-4 grid grid-cols-2 gap-y-6 gap-x-4">
                {offices.map((office) => (
                  <div key={office.region}>
                    <p className="text-sm font-semibold text-foreground">
                      {office.region}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {office.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
