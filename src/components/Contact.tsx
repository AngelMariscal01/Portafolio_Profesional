import { motion } from 'framer-motion';

const contacts = [
  {
    icon: '📧',
    label: 'Correo',
    value: 'angel.mariscal.soto@gmail.com',
    link: 'mailto:angel.mariscal.soto@gmail.com'
  },
  {
    icon: '📱',
    label: 'Teléfono',
    value: '+52 351 193 2430',
    link: 'tel:+523511932430'
  },
  {
    icon: '📍',
    label: 'Localización',
    value: 'Zamora, Michoacán. México',
    link: 'https://www.google.com/maps/search/Zamora+de+Hidalgo+Centro,+59653+ZAMORA,+M%C3%A9xico/?hl=es'
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'Angel David Mariscal Soto',
    link: 'https://www.linkedin.com/in/angel-david-mariscal-soto-b5235925a/'
  },
  {
    icon: '💻',
    label: 'GitHub',
    value: 'AngelMariscal01',
    link: 'https://github.com/AngelMariscal01'
  }
];

export default function Contact() {
  return (
    <section id="contacto" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          Contacto
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {contacts.map((contact, index) => (
            <motion.a
              key={index}
              href={contact.link}
              target={contact.link.startsWith('http') ? '_blank' : '_self'}
              rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{contact.icon}</span>
                <div>
                  <p className="text-slate-400 text-sm">{contact.label}</p>
                  <p className="text-white font-semibold">{contact.value}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
