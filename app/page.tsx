import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Projects  from '@/components/Projects'

export default function Home() {
  return (
    <div>
      <Navbar />
      <section
        id="hero"
        className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white"
      >
        <h1 className="text-5xl font-extrabold">Francois Novalentino Sinurat</h1>
        <p className="mt-4 text-xl">Software Developer | Full Stack Developer </p>
       
        <a
          href="#about"
          className="mt-6 px-6 py-3 bg-white text-blue-500 rounded-lg shadow hover:bg-gray-200"
        >
          Learn More
        </a>
      </section>

      <section id="about" className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold">About Me</h2>
        <p className="mt-4 text-lg max-w-xl mx-auto">
         A final-year Informatics Engineering student at Institut Teknologi Sumatera with a strong foundation in software development. I specialize in Next.js, Node.js, and Google Cloud Services, building scalable and efficient web applications. Proficient in PHP, HTML, CSS, and JavaScript, I adapt quickly to new technologies and strive for continuous improvement. Passionate about innovation, I aim to deliver impactful and effective solutions in software development.
        </p>
      </section>

    {/* <section id="projects" className="py-20 bg-white text-center  border-4"> */}
      <Projects/>  

      <section id="contact" className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold">Contact</h2>
        <p className="mt-4 text-lg max-w-xl mx-auto">
          Reach out to me at{' '}
          <a href="mailto:noval@example.com" className="text-blue-500 hover:underline">
            noval@example.com
          </a>
          .
        </p>
      </section>

      <Footer />
    </div>
  );
}
