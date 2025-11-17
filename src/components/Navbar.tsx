import { motion } from 'framer-motion';

export default function Navbar() {
  const links = [
    { name: 'Acerca de mi', href: '#acerca' },
    { name: 'Experiencia Laboral', href: '#experiencia' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Logros', href: '#logros' },
    { name: 'Contacto', href: '#contacto' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md z-50 border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <ul className="flex justify-center gap-8 flex-wrap">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-slate-300 hover:text-white transition-colors font-medium"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
