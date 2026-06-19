"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const experiences = [
  {
    title: "Back End Developer",
    company: "PT Teknologi Operator Prima",
    period: "Aug 2025 — Present",
    type: "Full-time · On-site · Tangerang Regency",
    highlights: [
      "Developed Mobile Banking backend services using Golang, handling core business logic and high-performance APIs.",
      "Developed Gateway Service using Golang for integration with payment gateway, third-party APIs, and internal microservices.",
      "Optimized MySQL queries (stored procedures, functions) and improved performance through indexing & query tuning.",
      "Integrated external systems via SFTP and managed transactional data using PostgreSQL with optimized indexing.",
      "Implemented Redis for caching and RabbitMQ for asynchronous messaging to improve system performance and scalability.",
      "Maintained Digital Banking applications using Delphi for system stability and legacy support.",
      "Developed ERP modules using PHP (Slim Framework) with MongoDB.",
      "Performed API testing and UAT using Postman.",
    ],
  },
  {
    title: "Full Stack Development Internship",
    company: "Dinas Cipta Karya, Tata Ruang dan Pertanahan Provinsi DKI Jakarta",
    period: "June 2024 — Aug 2024",
    type: "Internship · On-site · Jakarta",
    highlights: [
      "Implemented essential features like Asset Groups using Laravel Framework, enabling efficient asset categorization and management.",
      "Developed and integrated the AssetGroup Model with Laravel's Eloquent ORM for effective data storage and management.",
      "Adopted the MVC architecture in Laravel to enhance system modularity, maintainability, and performance.",
    ],
  },
  {
    title: "Cloud Computing — Bangkit Academy",
    company: "Bangkit Academy led by Google, Tokopedia, Gojek, and Traveloka",
    period: "Feb 2024 — Jul 2024",
    type: "Technical Program · Remote ",
    highlights: [
      "Utilized Google Cloud Platform (GCP) for cloud-based learning and project development.",
      "Collaborated with a team to complete a capstone project using Next.js, Node.js, and Cloud SQL that involved designing and implementing a cloud-based solution.",
      "Deployed the application on Google Cloud Run, leveraging GCP for efficient scaling and performance.",
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
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="card-surface overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-5 sm:p-6 border-b border-[hsl(var(--surface-border)/0.6)] bg-[hsl(var(--page-bg-alt)/0.5)]">
                <div>
                  <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">{exp.title}</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1 leading-relaxed">{exp.company}</p>
                </div>
                <div className="flex flex-col sm:items-end gap-1 shrink-0">
                  <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{exp.period}</span>
                  <span className="text-xs font-medium text-[hsl(var(--accent))]">{exp.type}</span>
                </div>
              </div>

              <ul className="p-5 sm:p-6 space-y-3">
                {exp.highlights.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--accent))]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
