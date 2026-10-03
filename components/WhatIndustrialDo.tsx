"use client";

import { motion } from "framer-motion";

const capabilities = [
  {
    title: "Engines & Power Generation",
    description:
      "Engine parts, generator components, filters, electrical components and related accessories for industrial power and generation equipment.",
    icon: (
      <svg
        className="w-7 h-7 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4 10h3l2-3h6l2 3h3v8H4v-8zm4 0h8M8 18v2m8-2v2M7 13h.01M17 13h.01"
        />
      </svg>
    ),
  },
  {
    title: "Compressors & Rotating Equipment",
    description:
      "Parts and components for reciprocating compressors, pumps and other rotating equipment used across industrial operations.",
    icon: (
      <svg
        className="w-7 h-7 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 3v3m0 12v3M3 12h3m12 0h3M5.64 5.64l2.12 2.12m8.48 8.48l2.12 2.12m0-12.72l-2.12 2.12M7.76 16.24l-2.12 2.12M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    title: "Mechanical Components",
    description:
      "Bearings, seals, gaskets, valves, fittings, couplings, belts, fasteners and other mechanical components.",
    icon: (
      <svg
        className="w-7 h-7 text-foreground"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 005.4-5.4l-3 3-2.4-2.4 2.4-2.4z"
        />
      </svg>
    ),
  },
  {
    title: "Electrical & Instrumentation",
    description:
      "Electrical components, sensors, switches, transmitters, control components and instrumentation products.",
    icon: (
      <svg
        className="w-7 h-7 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
        />
      </svg>
    ),
  },
  {
    title: "Hydraulic & Pneumatic Components",
    description:
      "Hoses, fittings, valves, cylinders, pumps and other hydraulic and pneumatic components for industrial systems.",
    icon: (
      <svg
        className="w-7 h-7 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M6 4v7a6 6 0 0012 0V4M6 8h12M9 4v4m6-4v4M12 17v3"
        />
      </svg>
    ),
  },
  {
    title: "Industrial Equipment & Accessories",
    description:
      "Equipment, tools, consumables and accessories required to support industrial operations, maintenance activities and technical requirements.",
    icon: (
      <svg
        className="w-7 h-7 text-foreground"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M14 6l4 4m-8 8l8-8m-7-7l4 4-9 9H3v-3l8-9zM14 3l2-2 7 7-2 2-7-7z"
        />
      </svg>
    ),
  },
];

function OurExpertise() {
  return (
    <section
      id="expertise"
      className="section-spacing section-padding"
    >
      <div className="text-center section-heading-spacing">
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4 }}
          className="text-sm text-muted-foreground tracking-widest uppercase mb-4"
        >
          What we supply
        </motion.p>

        <motion.h2
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold text-foreground"
        >
          Parts & Components for Industrial Equipment
        </motion.h2>
      </div>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center text-muted-foreground leading-relaxed mb-12"
      >
        LMF IS supplies spare parts, components, equipment and accessories
        for a broad range of industrial systems. From individual components
        to more specialized requirements, we work from the equipment,
        specifications and operational needs provided by the customer.
      </motion.p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {capabilities.map((capability, index) => (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.4,
              delay: 0.1 * index,
            }}
            key={capability.title}
          >
            <div className="relative w-full h-full rounded-2xl bg-secondary/20 p-[1px] overflow-hidden group transition-transform duration-300 hover:-translate-y-1">
              <div className="relative h-full w-full rounded-[15px] glass-card p-8 z-10 bg-[#060010]/80">
                <div className="absolute inset-0 rounded-[15px] bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10">
                  <div className="mb-6">
                    {capability.icon}
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {capability.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default OurExpertise;