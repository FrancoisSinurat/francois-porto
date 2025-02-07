"use client";

import Image from "next/image";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";

// Ganti image dengan link Google Drive yang sudah dikonversi
const projects = [
  {
    id: 1,
    title: "Rekomenin",
    description: "Capstone Project Bangkit Academy",
    image: "/images/project-2/ss2-a.png",
    date: "Mei 2024 - Juni 2024",
    details: "Detail lengkap tentang Project 1. Ini adalah penjelasan lebih dalam mengenai proyek yang sedang dikerjakan.",
  },
  {
    id: 2,
    title: "Laporan Kependudukan Desa Giri Mulyo",
    description: "KKN Tematik ITERA",
    image: "/images/project-2/ss2-a.png",
    date: "Januari 2024",
    details: "Detail lengkap tentang Project 2.",
  },
  {
    id: 3,
    title: "Project 3",
    description: "Description of the project.",
    image: "/images/project-2/ss2-a.png",
    date: "Desember 2023",
    details: "Detail lengkap tentang Project 3.",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-slate-200 text-center border-4">
      <h2 className="text-3xl font-bold">My Projects</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {projects.map((project) => (
          <Dialog key={project.id}>
            <DialogTrigger asChild>
              <div className="relative group p-6 border rounded-lg shadow overflow-hidden bg-cyan-200 bg-opacity-30 hover:bg-cyan-100 cursor-pointer">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <span className="mt-2 text-gray-600 text-xl">{project.description}</span>
                <p className="mt-2 text-gray-600 font-bold text-xl">Release Date: {project.date}</p>
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt="Project Preview"
                    width={600} // Lebar otomatis menyesuaikan
                    height={400} // Menjaga aspek rasio gambar
                    layout="intrinsic" // Supaya ukuran tetap proporsional
                    className="rounded-lg transition duration-200 group-hover:scale-105"
                  />
                </div>
              </div>
            </DialogTrigger>

            {/* Modal hanya muncul ketika dialog dibuka */}
            <DialogContent>
              <DialogTitle>{project.title}</DialogTitle>
              <DialogDescription asChild>
                <div className="mt-2 text-gray-600">{project.details}</div>
              </DialogDescription>
              <Image
                src={project.image}
                alt="Project Preview"
                width={800}
                height={600}
                className="rounded-lg mt-4"
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
