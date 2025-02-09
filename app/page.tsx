import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Projects  from '@/components/Projects'
import About from '@/components/About';
import Hero from '@/components/Hero';
import WorkExp from '@/components/Experience';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <div>
      <Navbar />
      <section id="#">
        <Hero/>
      </section> 
      <section id="about" className='bg-[#F3F4F6] text-gray-800'>
        <About/>
      </section> 
      <section id="experience" className='bg-gradient-to-r from-[#e0eafc] to-[#cfdef3] text-[#1b263b]' >    
        <WorkExp/>
      </section>
      <section id="projects" className='bg-gradient-to-r from-[#e0eafc] to-[#cfdef3] text-[#1b263b]'>
      <Projects/>  
      </section>
   
        <Contact/>
      {/* <section id="contact" className="py-20 bg-gray-100 text-center h-screen">
      </section> */}
      <Footer />
    </div>
  );
}
