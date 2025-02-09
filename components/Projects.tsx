"use client";

import Image from "next/image";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { motion } from "framer-motion";

// Project Type Definition
type Project = {
  id: number;
  title: string;
  description: string;
  images: string[];
  date: string;
  skill: string;
  overview: string;
  details: string[];
  projectLink?: string; // Tambahkan properti untuk link GitHub
};


// Project Data
const projects: Project[] = [
  {
    id: 1,
    title: "Sinity Course",
    description: "Final Project at Institut Teknologi Sumatera",
    images: [
      "/images/project-1/sinity.png",
      "/images/project-1/sinity-2.png"
    ],
    date: "Desember 2024 - Present",
    skill: "Next.js, Tailwind CSS, ShadCN UI",
    overview: "A web-based course recommendation system with hybrid filtering.",
    details: ["Provides personalized course recommendations.", "Built with Next.js and Tailwind CSS.", "Deployed on cloud server."],
    projectLink: "", // Tambahkan link GitHub
  },
  {
    id: 2,
    title: "My Profile",
    description: "Portfolio",
    images: [
      "/images/porto/porto.png",
    ],
    date: "February 2025 - Present",
    skill: "Next.js, React.js, Tailwind CSS, ShadCN UI",
    overview: "A personal portfolio built using Next.js and Tailwind CSS.",
    details: ["Showcases my projects and skills.", "Built with modern web technologies.", "Optimized for performance."],
    projectLink: "https://github.com/FrancoisSinurat/francois-porto",
  },
  {
    id: 3,
    title: "Asset Manajemen System",
    description: "Internship at DCKTRP Provinsi DKI Jakarta",
    images: ["/images/project-5/dcktrp.png"],
    date: "June - August 2024",
    skill: "Laravel, MySQL, Bootstrap",
    overview: "A web application for managing company assets efficiently.",
    details: ["Implemented the Asset Group feature with CRUD functionality using Laravel's MVC architecture.", "Integrated role-based access control to manage user permissions securely.", "Utilized Laravel, MySQL, and Bootstrap for a structured and responsive asset management system."],
    projectLink: "",
  },
  {
    id: 4,
    title: "Rekomenin",
    description: "Capstone Project at Bangkit Academy",
    images: [
      "/images/project-3/rekomenin.png",
      "/images/project-3/rekomenin-2.png",
      "/images/project-3/rekomenin-3.png",
    ],
    date: "April - June 2024",
    skill: "Next.js, HTML, CSS, JavaScript, Node.js, Google Cloud Run, Cloud SQL",
    overview: "A recommendation system leveraging Machine Learning and cloud deployment.",
    details: ["Developed a responsive front-end web interface.", "Implemented scalable backend system.", "Deployed using Google Cloud Run."],
    projectLink: "https://github.com/FrancoisSinurat/rekomenin-fe",
  },
  {
    id: 5,
    title: "Laporan Kependudukan Desa Giri Mulyo",
    description: "KKN Tematik at ITERA",
    images: ["/images/project-2/ss2-a.png"],
    date: "Desember 2023 - January 2024",
    skill: "PHP, Bootstrap, SQL",
    overview: "A web-based system for managing village population circulation.",
    details: ["Implemented secure login system.", "Designed responsive UI with Bootstrap.", "Managed structured data storage with SQL."],
    projectLink: "https://github.com/FrancoisSinurat/Lapduk-KKN",
  },
  
];


export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-16 text-center">
      <h2 className="text-4xl font-bold text-gray-900">My Projects</h2>
      <p className="text-gray-600 mt-2">A collection of my latest projects showcasing my expertise.</p>

      {/* Project Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {projects.map((project) => (
          <Dialog key={project.id} onOpenChange={(isOpen) => setSelectedProject(isOpen ? project : null)}>
            <DialogTrigger asChild>
              {/* Card dengan efek hover */}
              <motion.div
                whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative group p-6 bg-white rounded-xl shadow-lg cursor-pointer"
              >
                <h3 className="text-2xl font-semibold text-gray-800">{project.title}</h3>
                <p className="mt-2 text-gray-500">{project.description}</p>
                <p className="mt-1 text-gray-600 font-medium">{project.overview}</p>
                <p className="mt-2 text-gray-800 font-bold">📅 {project.date}</p>
                <div className="relative w-full mt-4 rounded-lg overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt="Project Preview"
                    width={600}
                    height={400}
                    layout="intrinsic"
                    className="rounded-lg transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            </DialogTrigger>

            {/* Modal Project Details */}
            {selectedProject && (
              <DialogContent className="max-w-3xl ">
                <DialogTitle className="text-2xl font-bold text-gray-900">{selectedProject.title}</DialogTitle>
                <p className=" text-gray-800 font-bold">📅 {project.date}</p>
                <p className="text-lg font-medium text-gray-800">🔹 Skills: {selectedProject.skill}</p>
                {/* Link GitHub */}
                {selectedProject.projectLink && (
                  <a
                    href={selectedProject.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-2 py-2 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
                  >
                    🔗 View on GitHub
                  </a>
                )}

                {/* Job Responsibilities */}
                <div>
                  <p className="text-lg font-bold text-gray-900">📌 Responsibilities:</p>
                  <ul className="mt-2 list-disc list-inside text-gray-700">
                    {selectedProject.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>

                {/* Image Carousel */}
                <div className="mt-6 flex overflow-x-auto space-x-4 scrollbar-hide">
                  {selectedProject.images.map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      alt={`Project ${selectedProject.id} Image ${i + 1}`}
                      width={400}
                      height={300}
                      className="rounded-lg shadow-md cursor-pointer transition hover:scale-105"
                    />
                  ))}
                </div>
              </DialogContent>
            )}
          </Dialog>
        ))}
      </div>
    </section>
  );
}
