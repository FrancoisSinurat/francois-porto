"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Wobble from "@/components/ui/Wobble";

const experiences = [
  {
    title: "Back End Developer",
    company: "Neekosa Pakar Service",
    client: "PT Pegadaian",
    period: "2026 — Present",
    type: "Full-time · Client placement · On-site",
    highlights: [
      "Develop Golang microservices for Pegadaian’s Rahn (Islamic gold pawn) product — loan submission, approval workflow, and facilities calculation.",
      "Build TEFS (physical gold deposit) ↔ Rahn conversion flows across services, including status sync and final convert that closes Titipan when Rahn activates.",
      "Implement multi-stage workflow orchestration: submission, verification/approval, confirmation, disbursement, and collateral check-in.",
      "Integrate service-to-service APIs (TEFS, workflow-rahn, loan-rahn, facilities-rahn) with clear OpenAPI/Swagger contracts.",
      "Ship and harden production features on Pegadaian’s SPRINT platform with API testing and UAT support.",
    ],
  },
  {
    title: "Back End Developer",
    company: "PT Teknologi Operator Prima",
    period: "Aug 2025 — 2026",
    type: "Full-time · On-site · Tangerang Regency",
    highlights: [
      "Developed Mobile Banking backend services using Golang, handling core business logic and high-performance APIs.",
      "Built Gateway Service in Golang for payment gateway, third-party, and internal microservice integrations.",
      "Optimized MySQL queries (stored procedures, functions) and improved performance via indexing & query tuning.",
      "Integrated external systems via SFTP and managed transactional data with PostgreSQL.",
      "Implemented Redis caching and RabbitMQ messaging to improve performance and scalability.",
      "Maintained Digital Banking applications using Delphi and developed ERP modules with PHP (Slim) + MongoDB.",
    ],
  },
  {
    title: "Full Stack Development Internship",
    company: "Dinas Cipta Karya, Tata Ruang dan Pertanahan Provinsi DKI Jakarta",
    period: "June 2024 — Aug 2024",
    type: "Internship · On-site · Jakarta",
    highlights: [
      "Implemented Asset Group features with Laravel for efficient asset categorization and management.",
      "Integrated AssetGroup Model with Eloquent ORM for structured data storage.",
      "Applied Laravel MVC architecture to improve modularity and maintainability.",
    ],
  },
  {
    title: "Cloud Computing — Bangkit Academy",
    company: "Bangkit Academy led by Google, Tokopedia, Gojek, and Traveloka",
    period: "Feb 2024 — Jul 2024",
    type: "Technical Program · Remote",
    highlights: [
      "Learned and applied Google Cloud Platform for cloud-based project development.",
      "Collaborated on a capstone using Next.js, Node.js, and Cloud SQL.",
      "Deployed the application on Google Cloud Run for scalable delivery.",
    ],
  },
];

export default function WorkExp() {
  return (
    <div className="section-padding section-container">
      <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start">
        <SectionHeader
          label="Experience"
          title="Where I've worked"
          description="Hands-on experience from industry programs to production fintech systems."
        />

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Wobble key={`${exp.company}-${exp.period}`} intensity="medium">
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="card-surface overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-5 sm:p-6 border-b border-[hsl(var(--surface-border)/0.6)] bg-[hsl(var(--page-bg-alt)/0.5)]">
                  <div>
                    <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">{exp.title}</h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1 leading-relaxed">
                      {exp.company}
                      {"client" in exp && exp.client ? (
                        <>
                          {" · "}
                          <span className="text-[hsl(var(--foreground))] font-medium">
                            Client: {exp.client}
                          </span>
                        </>
                      ) : null}
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1 shrink-0">
                    <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{exp.period}</span>
                    <span className="text-xs font-medium text-[hsl(var(--accent))]">{exp.type}</span>
                  </div>
                </div>

                <ul className="p-5 sm:p-6 space-y-3">
                  {exp.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--accent))]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            </Wobble>
          ))}
        </div>
      </div>
    </div>
  );
}
