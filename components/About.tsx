"use client"; // Pastikan ini ada di baris pertama

import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaPhp, FaDatabase, FaNodeJs, FaReact, FaCloud, FaLaravel } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { useState, useEffect } from "react";

const skills = [
  { name: "HTML", experience: "<1 year", icon: <FaHtml5 className="text-orange-500 text-4xl" /> },
  { name: "CSS", experience: "<1 year", icon: <FaCss3Alt className="text-sky-400 text-4xl" /> },
  { name: "JavaScript", experience: "<1 year", icon: <FaJs className="text-yellow-500 text-4xl" /> },
  { name: "MySQL", experience: "6 months", icon: <FaDatabase className="text-gray-500 text-4xl" /> },
  { name: "PHP", experience: "4 months", icon: <FaPhp className="text-blue-600 text-4xl" /> },
  { name: "Laravel", experience: "3 months", icon: <FaLaravel className="text-red-600 text-4xl" /> },
  { name: "Google Cloud", experience: "3 months", icon: <FaCloud className="text-blue-400 text-4xl" /> },
  { name: "Next.js", experience: "3 months", icon: <SiNextdotjs className="text-black text-4xl" /> },
  { name: "React.js", experience: "3 months", icon: <FaReact className="text-blue-500 text-4xl" /> },
  { name: "Node.js", experience: "3 months", icon: <FaNodeJs className="text-green-500 text-4xl" /> },
];

export default function About() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Mencegah error SSR

  return (
    <motion.div
      className="py-16 px-6 flex flex-col bg-gradient-to-r from-[#e0eafc] to-[#cfdef3] text-[#1b263b] items-center text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-bold mb-4 tracking-wide">About Me</h2>
      <p className="text-lg max-w-2xl leading-relaxed">
        A final-year Informatics Engineering student at Institut Teknologi Sumatera with a strong foundation in software development. I specialize in Next.js, Node.js, and Google Cloud Services, building scalable and efficient web applications. Proficient in PHP, HTML, CSS, and JavaScript, I adapt quickly to new technologies and strive for continuous improvement. Passionate about innovation, I aim to deliver impactful and effective solutions in software development.
      </p>

      <div className="mt-10 w-full max-w-3xl">
        <h3 className="text-2xl font-semibold mb-6">Skills & Experience</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center cursor-pointer bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-all duration-300"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {skill.icon}
              <span className="text-lg font-medium mt-2">{skill.name}</span>
              <span className="text-sm italic text-gray-600">{skill.experience}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
