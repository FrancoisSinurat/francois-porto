import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold">Francois Noval</div>
        <ul className="flex space-x-6 text-lg">
          <li>
            <Link href="#hero" scroll={true}>
              Home
            </Link>
          </li>
          <li>
            <Link href="#about" scroll={true}>
              About
            </Link>
          </li>
          <li>
            <Link href="#projects" scroll={true}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="#contact" scroll={true}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
