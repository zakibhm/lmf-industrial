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
    <motion.p variants={itemVariants} className={className}>
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

function AboutLMFIndustrial() {
  return (
    <section
      id="about-us"
      className="relative section-spacing section-padding overflow-hidden"
    >
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="space-y-16">
          {/* ABOUT LMF IS */}
          <Section id="about">
            <SectionHeader
              eyebrow="About LMF IS"
              title="Industrial Supply. Global Sourcing. Reliable Support."
            />

            <ProseGroup>
              <P className="text-lg leading-relaxed text-white/70">
                LMF IS LLC is a U.S.-based industrial supply company
                specializing in the sourcing and supply of spare parts,
                components and equipment for a wide range of industrial
                applications.
              </P>

              <P className="text-lg leading-relaxed text-white/70">
                We help customers identify and source the right products for
                their equipment and operations, working from manufacturer
                references, part numbers, technical specifications and
                operational requirements to identify suitable supply
                solutions.
              </P>

              <P className="text-lg leading-relaxed text-white/70">
                Our sourcing capabilities cover individual replacement parts,
                maintenance components, specialized equipment and complete
                equipment requirements. By working with manufacturers,
                distributors and suppliers across international markets, we
                help connect customers with the products required for their
                industrial operations.
              </P>

              <P className="text-lg leading-relaxed text-white/70">
                Whether a customer needs a specific spare part or support
                sourcing a larger equipment requirement, our role is to
                simplify the procurement process, coordinate sourcing and
                provide a responsive point of contact throughout the supply
                process.
              </P>

              <P className="text-lg leading-relaxed text-primary font-medium">
                Our approach combines global sourcing capabilities with
                practical technical understanding, helping customers move from
                an equipment requirement or part reference to a reliable
                procurement solution.
              </P>
            </ProseGroup>
          </Section>
        </div>
      </div>
    </section>
  );
}

export default AboutLMFIndustrial;