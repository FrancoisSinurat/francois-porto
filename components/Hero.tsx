import Link from "next/link";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4">
      <h1 className="text-5xl font-extrabold">Hi, I&apos;m Noval Sinurat</h1>
      <p className="mt-4 text-xl">Cloud Engineer | Full-stack Developer | Innovator</p>
      <Link 
        href="#projects" 
        className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-lg shadow hover:bg-gray-200 transition duration-200"
      >
        View My Work
      </Link>
    </section>
  );
}
