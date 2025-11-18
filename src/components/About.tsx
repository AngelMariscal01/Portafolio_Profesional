import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="acerca" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl shadow-blue-500/50">
              <img
                src="/images/profile.png"
                alt="Angel David Mariscal Soto"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Angel David Mariscal Soto
            </h2>
            
            <p className="text-sm text-blue-400 font-semibold">
              COMPUTER SYSTEMS ENGINEER | GENIA ENGINEER | AWS IA PRACTITIONER |
              DATA SCIENCE | HUAWEI CLOUD DEVELOPER ASSOCIATE
            </p>

            <p className="text-slate-300 leading-relaxed">
              Soy Ingeniero en Sistemas Computacionales, con especialidad en Cómputo en la Nube y Ciberseguridad, y
              experiencia en desarrollo de aplicaciones de escritorio, proyectos de ciencia de datos y desarrollo Fullstack.
              Durante mi último año de estudios, me he desempeñado como Ingeniero de Inteligencia Artificial Generativa,
              aplicando conocimientos en LangChain y Strands para crear soluciones con AWS Bedrock y AWS Bedrock Agentcore. He
              completado un bootcamp en Data Science (ingeniería de datos) y poseo las certificaciones AWS IA Practitioner y
              Huawei Cloud Developer Associate. Tengo habilidades sólidas en Linux, Python, SQL, Docker y plataformas cloud.
              Soy proactivo y responsable, buscando aplicar mis conocimientos en un entorno desafiante para crecer
              profesionalmente.
            </p>

            <div className="space-y-2">
              <p className="text-slate-400">
                <span className="text-blue-400">Email:</span> angel.mariscal.soto@gmail.com
              </p>
              <p className="text-slate-400 italic text-sm">
                "Nuestros sentidos nos permiten percibir sólo una pequeña porción del mundo exterior." - Nikola Tesla
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
