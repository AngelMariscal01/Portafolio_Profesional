import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const experiences = [
  {
    title: 'Ingeniero en Inteligencia Artificial Generativa',
    company: 'Irakani',
    period: 'Jun 2025 - Actualidad',
    type: 'Profesional independiente',
    description: 'Diseño e implementación de un agente de IA (Amazon Bedrock Agentcore) con Claude 4.5 para permitir consultas en lenguaje natural a bases de datos de clientes, utilizando APIs (AWS Lambda) para la integración. Adicionalmente, desarrollé una aplicación integrada con IA Generativa para automatizar la creación de componentes, además la modificación y creación de aplicaciones.',
    tech: 'AWS Bedrock, AWS Bedrock AgentCore, Claude Sonnet 4.5, AWS Lambda, React JS, Node.js',
    details: {
      intro: 'Desarrollo de soluciones avanzadas de IA Generativa para automatización empresarial.',
      features: [
        'Agente de IA con Claude Sonnet 4.5: Implementación de Amazon Bedrock Agentcore para consultas en lenguaje natural a bases de datos, permitiendo a los usuarios interactuar con información compleja de manera intuitiva.',
        'Integración con AWS Lambda: Desarrollo de APIs serverless para conectar el agente de IA con sistemas de clientes, garantizando escalabilidad y rendimiento.',
        'Automatización de Desarrollo: Creación de una aplicación que utiliza IA Generativa para automatizar la generación, modificación y creación de componentes de software, acelerando el ciclo de desarrollo.',
        'Optimización de Procesos: Reducción significativa del tiempo de desarrollo mediante la automatización inteligente de tareas repetitivas.'
      ]
    }
  },
  {
    title: 'Desarrollador de aplicaciones',
    company: 'Irakani',
    period: 'Sep 2024 - Jun 2025',
    type: 'Profesional independiente',
    description: 'Diseño e implementación de una interfaz en C# para la integración de datos con Contpaqi Comercial. Desarrollo y mantenimiento de aplicaciones de negocio internas utilizando Java y SQL Server.',
    tech: 'C#, Java, SQL Server',
    details: {
      intro: 'Desarrollo de aplicaciones empresariales y sistemas de integración para optimización de procesos de negocio.',
      features: [
        'Integración con Contpaqi Comercial: Diseño e implementación de una interfaz robusta en C# para sincronización bidireccional de datos comerciales, mejorando la eficiencia operativa.',
        'Aplicaciones de Negocio: Desarrollo y mantenimiento de sistemas utilizando JavaScript, garantizando la continuidad y mejora de procesos críticos.',
        'Gestión de Bases de Datos: Implementación de soluciones con SQL Server para almacenamiento, consulta y análisis de datos empresariales.'
      ]
    }
  },
  {
    title: 'Desarrollador de Software',
    company: 'SightWise Tech',
    period: 'Jun 2023 - Mar 2024',
    type: 'Profesional independiente',
    description: 'Desarrollo de aplicación de escritorio integrada en una raspberry pi, automatizar el proceso de filtrado sobre el estado de productos tecnológicos, implementación de seguridad de la aplicación.',
    tech: 'Linux | Raspberry Pi | Python | JSON | PyQt | Git',
    details: {
      intro: 'El proyecto consiste en desarrollar una aplicación de escritorio integrada en una Raspberry Pi, diseñada para automatizar el proceso de filtrado y gestión del estado de productos tecnológicos. La aplicación estará construida utilizando tecnologías avanzadas para asegurar su rendimiento y seguridad.',
      features: [
        'Automatización del Filtrado de Productos: Implementación de algoritmos y procesos automatizados para filtrar y gestionar el estado de los productos tecnológicos. La aplicación realizará análisis en tiempo real y actualizará automáticamente el estado de los productos basándose en criterios predefinidos.',
        'Interfaz Gráfica de Usuario (GUI): Desarrollo de una GUI interactiva utilizando PyQt, que permitirá a los usuarios realizar operaciones de filtrado, visualizar datos y administrar productos de manera eficiente.',
        'Seguridad de la Aplicación: Implementación de medidas de seguridad para proteger la aplicación y los datos del usuario. Esto incluye la autenticación de usuarios, la encriptación de datos sensibles y la protección contra accesos no autorizados. Se utilizarán prácticas de desarrollo seguro y se revisarán periódicamente las vulnerabilidades de seguridad.',
        'Integración y Manejo de Datos: Utilización de JSON para el almacenamiento y la transferencia de datos. La aplicación manejará datos de productos tecnológicos, realizando operaciones de lectura, escritura y filtrado de manera efectiva.'
      ]
    }
  }
];

export default function Experience() {
  const [selectedExp, setSelectedExp] = useState<number | null>(null);
  return (
    <section id="experiencia" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          Experiencia Laboral
        </motion.h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              onClick={() => setSelectedExp(index)}
              className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                  <p className="text-blue-400 font-semibold">{exp.company}</p>
                </div>
                <span className="text-slate-400 text-sm mt-2 md:mt-0">{exp.period}</span>
              </div>
              <p className="text-slate-300 mb-4">{exp.description}</p>
              <p className="text-sm text-purple-400">
                <span className="font-semibold">Tecnologías:</span> {exp.tech}
              </p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedExp !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 border border-slate-700 rounded-xl p-8 max-w-3xl max-h-[80vh] overflow-y-auto"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{experiences[selectedExp].title}</h3>
                    <p className="text-blue-400 font-semibold">{experiences[selectedExp].company} · {experiences[selectedExp].type}</p>
                    <p className="text-slate-400 text-sm">{experiences[selectedExp].period}</p>
                  </div>
                  <button
                    onClick={() => setSelectedExp(null)}
                    className="text-slate-400 hover:text-white text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-purple-400 font-semibold mb-4">{experiences[selectedExp].tech}</p>
                
                <p className="text-slate-300 mb-6">{experiences[selectedExp].details.intro}</p>

                <h4 className="text-xl font-bold text-white mb-4">Características Principales:</h4>
                <ul className="space-y-4">
                  {experiences[selectedExp].details.features.map((feature, i) => (
                    <li key={i} className="text-slate-300 pl-4 border-l-2 border-blue-500">
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
