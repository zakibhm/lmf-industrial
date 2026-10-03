"use client";

import { useEffect, useState } from "react";
import logo from "../public/assets/logo_lmf_is_industrial.png";
import Link from "next/link";
import { motion } from "framer-motion";

function NavbarIndustrial() {
  const [scrolled, setScrolled] = useState(false);
  const [toggleNavbar, setToggleNavbar] = useState(false);

  const navItems = [
    {
      label: "About us",
      href: "#about-us",
    },
    {
      label: "What We Do",
      href: "#expertise",
    },
    {
      label: "Capabilities",
      href: "#capabilities",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu
  const handleNavClick = () => {
    setToggleNavbar(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      {/* Navbar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex justify-between items-center section-padding"
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={handleNavClick}
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <img
            src={logo.src}
            alt="LMF Consulting"
            className={`h-18 ${scrolled ? "md:h-22 md:pl-8 md:py-1.5" : "md:h-28 drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] md:py-0"} py-2 object-contain duration-600`}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="#contact"
            className="text-sm px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={toggleNavbar}
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setToggleNavbar(!toggleNavbar)}
        >
          <span
            className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
              toggleNavbar ? "rotate-45 translate-y-2" : ""
            }`}
          />

          <span
            className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
              toggleNavbar ? "opacity-0" : ""
            }`}
          />

          <span
            className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
              toggleNavbar ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </motion.div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-background/95 backdrop-blur-xl overflow-hidden transition-all duration-300 ${
          toggleNavbar ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="section-padding py-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={handleNavClick}
              className="text-lg text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}

          {/* Get a Quote */}
          <Link
            href="#contact"
            onClick={handleNavClick}
            className="text-sm px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-center mt-2 hover:bg-primary/90 transition-colors duration-300"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavbarIndustrial;
