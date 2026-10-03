"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <div className="flex items-center gap-4 mb-5">
        <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium whitespace-nowrap">
          {eyebrow}
        </span>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.1,
          }}
          style={{ transformOrigin: "left" }}
          className="flex-1 h-px bg-gradient-to-r from-border to-transparent"
        />
      </div>

      <motion.h2
        initial={{ y: 12, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: 0.45,
          delay: 0.1,
        }}
        className="text-3xl md:text-4xl font-bold text-foreground"
      >
        {title}
      </motion.h2>
    </motion.div>
  );
}

function Section({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="scroll-mt-28 border-t border-border/40 pt-16 first:border-t-0 first:pt-0"
    >
      {children}
    </motion.div>
  );
}

function ProseGroup({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.3,
      }}
      className="space-y-4"
    >
      {children}
    </motion.div>
  );
}

function P({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.p
      variants={itemVariants}
      className={className}
    >
      {children}
    </motion.p>
  );
}

function AnimatedList({
  items,
}: {
  items: ReactNode[];
}) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.3,
      }}
      className="list-disc pl-5 space-y-2 text-white/70 marker:text-white/70"
    >
      {items.map((item, i) => (
        <motion.li
          key={i}
          variants={{
            hidden: {
              opacity: 0,
              x: -12,
            },
            show: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.4,
                ease: "easeOut",
              },
            },
          }}
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}

function CapabilityCards({
  items,
}: {
  items: {
    title: string;
    description: string;
  }[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.4,
            delay: index * 0.08,
          }}
        >
          <div className="relative w-full h-full rounded-2xl bg-secondary/20 p-[1px] overflow-hidden group transition-transform duration-300 hover:-translate-y-1">
            <div className="relative h-full w-full rounded-[15px] glass-card p-8 z-10 bg-[#060010]/80">
              <div className="absolute inset-0 rounded-[15px] bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative section-spacing section-padding overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50%, rgba(13, 102, 165, 0.06), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="space-y-16">

          {/* SOURCING CAPABILITY */}
          <Section id="sourcing">
            <SectionHeader
              eyebrow="Our Sourcing Capability"
              title="More Than a Parts Supplier"
            />

            <ProseGroup>
              <P className="text-lg leading-relaxed text-muted-foreground">
                Whether the requirement is for a known part number or a
                component that needs to be identified, LMF IS approaches each
                request around the customer's equipment, technical
                requirements and operational needs.
              </P>

              <P className="text-lg leading-relaxed text-muted-foreground">
                Our sourcing process is designed to help customers move from
                an initial requirement to a clear commercial offer and an
                organized supply process.
              </P>

              <P className="text-lg leading-relaxed text-primary font-medium">
                Provide us with the available technical information, and we
                work to identify suitable sourcing options.
              </P>
            </ProseGroup>
          </Section>

          {/* PART IDENTIFICATION */}
          <Section id="part-identification">
            <SectionHeader
              eyebrow="Step 01"
              title="Part Identification"
            />

            <ProseGroup>
              <P className="text-lg leading-relaxed text-muted-foreground">
                The sourcing process can start with a known part number,
                equipment model or serial number, or with whatever technical
                information is available.
              </P>

              <P className="text-lg leading-relaxed text-muted-foreground">
                This allows the requirement to be understood in relation to
                the actual equipment and application.
              </P>
            </ProseGroup>

            <div className="mt-8">
              <AnimatedList
                items={[
                  "Part numbers",
                  "Equipment models",
                  "Equipment serial numbers",
                  "Technical specifications",
                  "Available drawings or documentation",
                  "Component descriptions and application details",
                ]}
              />
            </div>
          </Section>

          {/* CROSS REFERENCE */}
          <Section id="cross-reference">
            <SectionHeader
              eyebrow="Step 02"
              title="Cross-Reference & Sourcing"
            />

            <ProseGroup>
              <P className="text-lg leading-relaxed text-muted-foreground">
                When the exact part is known, the requirement can be sourced
                according to the requested specifications and availability.
              </P>

              <P className="text-lg leading-relaxed text-muted-foreground">
                When identification or cross-reference is required, the
                available technical information is used to identify suitable
                sourcing options for the customer's application.
              </P>
            </ProseGroup>

            <div className="mt-8">
              <AnimatedList
                items={[
                  "Part identification and verification",
                  "Technical specification review",
                  "Cross-reference of available components",
                  "Multi-brand sourcing",
                  "Availability assessment",
                  "Sourcing options based on requirements",
                ]}
              />
            </div>
          </Section>

          {/* QUOTATION */}
          <Section id="quotation">
            <SectionHeader
              eyebrow="Step 03"
              title="Quotation & Procurement"
            />

            <ProseGroup>
              <P className="text-lg leading-relaxed text-muted-foreground">
                Once the requirement and sourcing options are established,
                LMF IS provides a clear commercial offer based on the required
                quantities, specifications and available supply options.
              </P>

              <P className="text-lg leading-relaxed text-muted-foreground">
                The procurement process is coordinated according to the
                agreed requirements and commercial conditions.
              </P>
            </ProseGroup>

            <div className="mt-8">
              <AnimatedList
                items={[
                  "Required quantities",
                  "Part and equipment specifications",
                  "Availability",
                  "Commercial quotation",
                  "Procurement coordination",
                ]}
              />
            </div>
          </Section>

          {/* SUPPLY & DELIVERY */}
          <Section id="supply-delivery">
            <SectionHeader
              eyebrow="Step 04"
              title="Supply & Delivery"
            />

            <ProseGroup>
              <P className="text-lg leading-relaxed text-muted-foreground">
                Once the supply requirements are confirmed, parts, equipment
                and components are prepared for delivery according to the
                agreed commercial and logistical requirements.
              </P>

              <P className="text-lg leading-relaxed text-muted-foreground">
                This approach allows routine requirements as well as more
                specific or time-sensitive industrial supply needs to be
                handled through a structured process.
              </P>

              <P className="text-lg leading-relaxed text-primary font-medium">
                From identification to delivery, each requirement is handled
                according to the equipment and customer's specifications.
              </P>
            </ProseGroup>
          </Section>

          {/* INDUSTRIES */}
          <Section id="industries">
            <SectionHeader
              eyebrow="Industries We Serve"
              title="Supporting Industrial Operations"
            />

            <ProseGroup>
              <P className="text-lg leading-relaxed text-muted-foreground">
                LMF IS supports spare-parts, components, equipment and
                accessory requirements across a range of industrial
                environments.
              </P>

              <P className="text-lg leading-relaxed text-muted-foreground">
                Our sourcing capability can be applied to both routine
                operational requirements and specific equipment-related
                demands.
              </P>
            </ProseGroup>

            <div className="mt-8">
              <AnimatedList
                items={[
                  "Oil & Gas",
                  "Energy",
                  "Power Generation",
                  "Petrochemical",
                  "Industrial Facilities",
                  "Heavy Equipment",
                ]}
              />
            </div>
          </Section>

          {/* SUPPLY CAPABILITIES */}
          <Section id="supply-capabilities">
            <SectionHeader
              eyebrow="Supply Capability"
              title="Supporting Different Industrial Requirements"
            />

            <ProseGroup>
              <P className="text-lg leading-relaxed text-muted-foreground">
                Industrial supply requirements can vary from a standard
                replacement component to a combination of parts, equipment,
                tools and accessories required for a larger operation.
              </P>

              <P className="text-lg leading-relaxed text-muted-foreground">
                LMF IS works across multiple equipment and component
                categories, allowing requirements to be coordinated according
                to the customer's application.
              </P>
            </ProseGroup>

            <div className="mt-8">
              <CapabilityCards
                items={[
                  {
                    title: "Routine Spare Parts",
                    description:
                      "Supply of commonly required replacement parts and components for ongoing industrial maintenance and operations.",
                  },
                  {
                    title: "Critical Requirements",
                    description:
                      "Sourcing support for specific equipment requirements where part identification, availability and technical specifications need to be coordinated.",
                  },
                  {
                    title: "Multi-Brand Sourcing",
                    description:
                      "Access to sourcing options across different manufacturers and brands according to the requested equipment and specifications.",
                  },
                  {
                    title: "Equipment & Accessories",
                    description:
                      "Supply of industrial equipment, tools, consumables and accessories required to support operational and maintenance activities.",
                  },
                ]}
              />
            </div>
          </Section>

          {/* WHY LMF IS */}
          <Section id="why-lmf">
            <SectionHeader
              eyebrow="Why LMF IS"
              title="A Reliable Industrial Supply Partner"
            />

            <ProseGroup>
              <P className="text-lg leading-relaxed text-muted-foreground">
                LMF IS combines industrial parts knowledge with sourcing
                capability to help customers identify and obtain the
                components required for their equipment and operations.
              </P>

              <P className="text-lg leading-relaxed text-muted-foreground">
                Our approach is centered on understanding the requirement
                first, then identifying practical sourcing options based on
                specifications, quantities and availability.
              </P>
            </ProseGroup>

            <div className="mt-8">
              <AnimatedList
                items={[
                  "Wide range of industrial parts and equipment",
                  "Multi-brand sourcing capability",
                  "Support for part identification and cross-reference",
                  "Worldwide sourcing network",
                  "Responsive quotation process",
                  "Supply for both routine and critical requirements",
                ]}
              />
            </div>
          </Section>

          {/* OUR APPROACH */}
          <Section id="approach">
            <SectionHeader
              eyebrow="Our Approach"
              title="Understand. Source. Supply."
            />

            <ProseGroup>
              <P className="text-lg leading-relaxed text-muted-foreground">
                Every supply requirement starts with understanding the
                equipment, component and technical specifications involved.
              </P>

              <P className="text-lg leading-relaxed text-muted-foreground">
                From a simple part number to a more complex component
                identification requirement, LMF IS works through the
                available information to establish suitable sourcing options,
                prepare the quotation and coordinate supply.
              </P>

              <P className="text-lg leading-relaxed text-primary font-medium">
                The objective is simple: provide the right supply solution
                based on the customer's actual equipment and requirements.
              </P>
            </ProseGroup>
          </Section>

        </div>
      </div>
    </section>
  );
}

export default Capabilities;