import { motion } from 'framer-motion';

const certifications = [
  {
    title: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    description: 'Earners of this badge understand AI, ML, and generative AI concepts, methods, and strategies in general and on AWS. They can determine the correct types of AI/ML technologies to apply to specific use cases and know how to use AI, ML, and generative AI technologies responsibly.',
    image: '/images/aws.webp',
    link: 'https://www.credly.com/badges/bd60b9f1-8ebe-4f06-9bdd-00fcbb84cd3c/linked_in_profile'
  },
  {
    title: 'HUAWEI CLOUD DEVELOPER CERTIFICATION',
    issuer: 'Huawei Cloud',
    description: 'HCCDA - TECH Essentials. Certificación que valida conocimientos fundamentales en desarrollo y servicios de Huawei Cloud.',
    image: '/images/huaweicloud.jpg',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7372288452152918016/'
  }
];

const contests = [
  {
    title: 'Coding Cup Edición Michoacán 2024',
    issuer: 'Mtra. Teresa López Hernández'
  },
  {
    title: 'XI CONCURSO LOCAL DE PROGRAMACION 2023',
    issuer: 'Karlo Martin Samaguey Zamora'
  },
  {
    title: 'XII CONCURSO LOCAL DE PROGRAMACION 2024',
    issuer: 'Karlo Martin Samaguey Zamora'
  }
];

export default function Achievements() {
  return (
    <section id="logros" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          Logros
        </motion.h2>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-8">Certificaciones</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.a
                key={index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden hover:border-blue-500 transition-colors"
              >
                <img src={cert.image} alt={cert.title} className="w-full h-48 object-contain bg-white" />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-2">{cert.title}</h4>
                  <p className="text-blue-400 font-semibold mb-3">{cert.issuer}</p>
                  <p className="text-slate-300 text-sm">{cert.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-white mb-8">Concursos de Programación</h3>
          <div className="space-y-4">
            {contests.map((contest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-purple-500 transition-colors"
              >
                <h4 className="text-xl font-bold text-white mb-2">{contest.title}</h4>
                <p className="text-slate-400">Expedida por: {contest.issuer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
