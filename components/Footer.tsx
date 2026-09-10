import Link from 'next/link';
import { Github, Linkedin, Twitter, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surfaceBorder bg-background py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="font-bold text-xl tracking-tight mb-4 inline-block">
            Nexa Labs<span className="text-accent">.</span>
          </Link>
          <p className="text-gray-400 text-sm max-w-xs mb-6">
            Small software. Big impact. We build focused software products that solve real-world problems.
          </p>
          <div className="flex gap-4 text-gray-400">
            <Link href="#" className="hover:text-white transition"><Github size={20} /></Link>
            <Link href="#" className="hover:text-white transition"><Twitter size={20} /></Link>
            <Link href="#" className="hover:text-white transition"><Linkedin size={20} /></Link>
            <Link href="#" className="hover:text-white transition"><Youtube size={20} /></Link>
            <Link href="#" className="hover:text-white transition"><Instagram size={20} /></Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="flex flex-col gap-3 text-sm text-gray-400">
            <li><Link href="/about" className="hover:text-white transition">About</Link></li>
            <li><Link href="/products" className="hover:text-white transition">Products</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="flex flex-col gap-3 text-sm text-gray-400">
            <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-surfaceBorder text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
        <p>© {currentYear} Nexa Labs. All rights reserved.</p>
      </div>
    </footer>
  );
}