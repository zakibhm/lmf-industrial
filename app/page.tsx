"use client";
import Contact from "@/components/Contact";
import NavbarIndustrial from "@/components/NavbarIndustrial";
import BrandsIndustrial from "@/components/BrandsIndustrial";
import FooterIndustrial from "@/components/FooterIndustrial";
import AboutLMFIndustrial from "@/components/AboutLMFIndustrial";
import WhatIndustrialDo from "@/components/WhatIndustrialDo";
import CapabilitiesIndustrial from "@/components/CapabilitiesIndustrial";

export default function Home() {
  const offices = [{
    region: "USA",
    location: "Ohio, Canton",
  }]

  const contactDetails = [
    {
      label: "Management",
      value: "Management@lmfis.com",
      href: "mailto:Management@lmfis.com",
    },
    {
      label: "Management",
      value: "+1 (346) 713-2552",
      href: "tel:+13467132552",
    },
  ];
  return (
    <main className="bg-background">
      <div className="grain-overlay" />
      <NavbarIndustrial />
      <BrandsIndustrial />
      <AboutLMFIndustrial />
      <WhatIndustrialDo />
      <CapabilitiesIndustrial />
      <Contact offices = { offices } contactDetails = { contactDetails }/>
      <FooterIndustrial />
    </main>
  );
}
