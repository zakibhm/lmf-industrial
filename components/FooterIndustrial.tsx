import React from "react";

function Footer() {
  return (
    <footer className="py-12 pb-18 section-padding border-t border-border/30 bg-background/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center md:flex-row md:items-center md:text-left md:justify-between gap-10 md:gap-6">
        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <a
            className="inline-block hover:opacity-80 transition-opacity"
            href="/"
          >
            <img
              src="/assets/logo_lmf_is_industrial.png"
              alt="LMF Consulting Logo"
              className="h-16 md:h-20 object-contain opacity-90 mx-auto md:mx-0"
            />
          </a>

          <p className="text-sm text-muted-foreground max-w-xs">
            Maximising value for money for our customers.
          </p>

          <p className="text-xs text-muted-foreground/60 mt-2">
            © 2026 LMF Industrial Supply LLC. All rights reserved.
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col items-center md:items-start gap-4">
          {/* Head of Maintenance */}
          <div className="flex flex-col gap-2">
            {/* Email */}
            <a
              href="mailto:Management@lmfis.com"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 shrink-0"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Management@lmfis.com
            </a>

            {/* Phone */}
            <a
              href="tel:+13467132552"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 shrink-0"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +1 (346) 713-2552
            </a>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-map-pin w-4 h-4 mt-0.5 shrink-0"
            >
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
              <circle cx="12" cy="10" r="3" />
            </svg>

            <span>
              6546 Market Ave, North Ste 100
              <br />
              Canton, OH 44721, USA
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
