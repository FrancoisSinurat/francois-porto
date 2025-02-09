"use client";

import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 bg-gray-900 text-white text-center flex flex-col items-center justify-center min-h-screen"
    >
      <h2 className="text-4xl font-bold mb-6 animate-fadeIn">Let&apos;s Connect</h2>
      <p className="text-lg text-gray-400 mb-8 animate-slideIn">
        Feel free to reach out! I&apos;m always open to collaboration.
      </p>

      {/* Social Icons */}
      <div className="flex space-x-6">
        <a
          href="https://www.linkedin.com/in/francoisnovalentinosinurat"
          target="_blank"
          rel="noopener noreferrer"
          className="group transition-transform duration-300 transform hover:scale-110"
        >
          <FaLinkedin className="w-12 h-12 text-blue-500 group-hover:text-blue-400 transition-all duration-200" />
        </a>
        <a
          href="https://github.com/FrancoisSinurat"
          target="_blank"
          rel="noopener noreferrer"
          className="group transition-transform duration-300 transform hover:scale-110"
        >
          <FaGithub className="w-12 h-12 text-gray-300 group-hover:text-white transition-all duration-200" />
        </a>
        <a
          href="https://www.instagram.com/francoisnoval"
          target="_blank"
          rel="noopener noreferrer"
          className="group transition-transform duration-300 transform hover:scale-110"
        >
          <FaInstagram className="w-12 h-12 text-pink-500 group-hover:text-pink-400 transition-all duration-200" />
        </a>
      </div>

      {/* Email */}
      <div className="mt-8 flex items-center space-x-3 animate-fadeIn">
        <FaEnvelope className="w-6 h-6 text-gray-400" />
        <a
          href="mailto:novalsinurat28@gmail.com"
          className="text-lg text-gray-400 hover:text-white transition-all duration-200"
        >
          novalsinurat28@gmail.com
        </a>
      </div>

      {/* Floating Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }
        .animate-slideIn {
          animation: slideIn 1s ease-in-out;
        }
      `}</style>
    </section>
  );
}
