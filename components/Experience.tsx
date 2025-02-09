"use client";

import { motion } from "framer-motion";

// Data pengalaman kerja dengan tanggal mulai dan selesai
const experiences = [
  {
    title: "Full Stack Developer",
    company: "PT Winnicode Garuda Teknologi",
    startDate: "Feb 2025",
    endDate: "Present",
    description:[

    ]
  },
  {
    title: "Full Stack Developer Internship",
    company: "Dinas Cipta Karya Tata Ruang dan Pertanahan Provinsi DKI Jakarta",
    startDate: "June",
    endDate: "Aug 2024",
    description:[
      "Adopted the MVC architecture in Laravel to enhance system modularity, maintainability, and performance.",
      "Developed and integrated the AssetGroup Model with Laravel’s Eloquent ORM for effective data storage and management.",
      "Implemented essential features like Asset Groups using Laravel Framework, enabling efficient asset categorization and management",
    ]
  },
  {
    title: "Cloud Computing Alumni",
    company: "Bangkit Academy led by Google, GoTo, and Traveloka",
    startDate: "Feb ",
    endDate: "Jul 2024",
    description:[
      "Utilize Google Cloud Platform (GCP).",
      "I collaborated with a team to complete a capstone project using Next.js, Node.js, and Cloud SQL that involved designing and implementing a cloud-based solution.",
      "Deployed the application on Google Cloud Run. leveraging Google Cloud Platform (GCP) for efficient scaling and performance.",
    ],
  },
];


export default function WorkExp() {
  return (
    <div className="py-16 max-w-5xl mx-auto ">
      <motion.h2
        className="text-3xl font-bold text-center  text-slate-800 dark:text-white mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Work Experience
      </motion.h2>

      <div className="relative flex flex-col space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
            className="flex items-start gap-6"
          >
            {/* Bullet & Date Group */}
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-indigo-500 dark:bg-blue-400 rounded-full"></div>
              {index !== experiences.length - 1 && (
                <div className="w-1 bg-indigo-500 dark:bg-blue-400 h-full"></div>
              )}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="mt-2 text-sm font-medium text-slate-600 dark:text-gray-300 text-center"
              >
                {exp.startDate} - {exp.endDate}
              </motion.div>
            </div>

            {/* Card Experience */}
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl w-full cursor-pointer">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {exp.title}
              </h3>
              <p className="text-slate-600 dark:text-gray-300">{exp.company}</p>

              {/* List Descriptions */}
              <ul className="mt-2 list-disc list-inside text-slate-500 dark:text-gray-400">
                {exp.description.map((desc, i) => (
                  <li key={i} className="leading-relaxed">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
