import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const projects = [
  {
    title: 'Primer Proyecto Individual de Data Science - "SoyHenry"',
    tech: 'Python | Jupyter Notebook | FastAPI | Scikit-Learn | Pandas | Git | Seaborn | Matplotlib | NLTK',
    summary: 'Desarrollo de una API utilizando para implementar funciones de análisis de datos y recomendaciones en base a datos de juegos de Steam.',
    image: '/images/pUno.png',
    github: 'https://github.com/AngelMariscal01/P1.git',
    details: {
      subtitle: 'Proyecto de Implementación y Despliegue de Funciones de Análisis de Juegos de Steam con FastAPI',
      intro: 'En este proyecto, he desarrollado y desplegado cinco funciones utilizando FastAPI, enfocadas en el análisis y recomendación de juegos. Cada función ofrece una perspectiva única sobre el comportamiento de los jugadores, el éxito de los géneros, y las recomendaciones de la comunidad.',
      features: [
        'PlayTimeGenre (genero : str): Esta función devuelve el año con más horas jugadas para un género específico, proporcionando una visión sobre la popularidad de los géneros a lo largo del tiempo.',
        'UserForGenre (genero : str): Identifica al usuario que acumula más horas jugadas en un género dado y ofrece una lista detallada de la acumulación de horas por año.',
        'UsersRecommend (año : int): Proporciona el top 3 de juegos más recomendados por los usuarios para un año específico, basándose en reseñas positivas o neutrales.',
        'UsersNotRecommend (año : int): Devuelve el top 3 de juegos menos recomendados por los usuarios para un año dado, utilizando reseñas con comentarios negativos.',
        'Sentiment Analysis (año : int): Realiza un análisis de sentimiento sobre las reseñas de los usuarios para un año de lanzamiento específico.'
      ]
    }
  },
  {
    title: 'Segundo Proyecto Individual de Data Science - "SoyHenry"',
    tech: 'Python | Pandas | Seaborn | Matplotlib | Streamlit | Git',
    summary: 'Desarrollo de un dashboard interactivo utilizando Streamlit para analizar datos sobre siniestros viales en la Ciudad de Buenos Aires.',
    image: '/images/pDos.png',
    github: 'https://github.com/AngelMariscal01/PI.2.git',
    details: {
      subtitle: 'Streamlit Dashboard de Accidentes Viales en CABA',
      intro: 'Este proyecto consiste en el desarrollo de un dashboard interactivo utilizando Streamlit para analizar accidentes viales en la Ciudad Autónoma de Buenos Aires (CABA). El dashboard permite a los usuarios visualizar datos, aplicar filtros interactivos, y obtener insights clave sobre la seguridad vial en la ciudad.',
      features: [
        'Carga y Procesamiento de Datos: Se carga un conjunto de datos de accidentes viales, que incluye detalles como tipo de calle, comuna, rol de las víctimas, y más.',
        'Filtros Interactivos: Los usuarios pueden filtrar los datos por año, tipo de calle, comuna, rol de las víctimas y género.',
        'Cálculo de KPIs: Calcula la tasa de homicidios en siniestros viales por cada 100,000 habitantes en CABA. Mide la reducción de accidentes mortales de motociclistas.',
        'Visualizaciones de Datos: Proporcionan una visión clara sobre la cantidad de accidentes por tipo de calle y vehículo. Un mapa interactivo muestra la localización de los accidentes.',
        'Interfaz de Usuario: Permite la navegación sencilla a través de los diferentes componentes del dashboard.'
      ]
    }
  },
  {
    title: 'Proyecto Grupal - "SoyHenry"',
    tech: 'Python | BigQuery | Storage | Pandas | Matplotlib | MySQL | SQL | Power BI | Seaborn | Scikit-learn | XGBoost',
    summary: 'Desarrollar una solución integral de análisis y recomendación basada en datos de reseñas de usuarios en plataformas como Yelp y Google Maps.',
    image: '/images/pTres.png',
    github: 'https://github.com/Risango/Henry-PF',
    details: {
      subtitle: 'Insightful Data Solutions',
      intro: 'Este proyecto es una plataforma de gestión de datos desarrollada como parte del programa de estudio en Henry, que permite la integración y análisis de grandes volúmenes de datos para facilitar la toma de decisiones en tiempo real.',
      role: 'Data Engineer - conexiones, infraestructura en la nube, deploy ML',
      features: [
        'Google Cloud Run: Implementé contenedores para el despliegue de aplicaciones escalables.',
        'Google Cloud Functions: Diseñé funciones serverless para procesar eventos y ejecutar lógica de negocio.',
        'Cloud SQL & MySQL Workbench: Configuré y administré bases de datos para almacenar y gestionar los datos de manera eficiente.',
        'Cloud Storage & BigQuery: Utilicé Google Cloud Storage para el almacenamiento de datos no estructurados y BigQuery para consultas analíticas.',
        'Colaboración: Trabajo en equipo con herramientas como Slack y GitHub.'
      ]
    }
  },
  {
    title: 'Aplicación para el Acceso a Eventos',
    tech: 'Python | Tkinter | JSON | Git',
    summary: 'Aplicación de escritorio desarrollada en Python utilizando Tkinter para gestionar el acceso a eventos mediante códigos de identificación.',
    image: '/images/pCuatro.png',
    github: 'https://github.com/AngelMariscal01/EventosApp',
    details: {
      subtitle: 'Sistema de Gestión de Acceso a Eventos',
      intro: 'La aplicación de gestión de acceso a eventos es una herramienta intuitiva y eficiente que permite a los organizadores de eventos registrar, modificar y eliminar invitados, así como gestionar su estado de asistencia.',
      features: [
        'Interfaz Gráfica de Usuario (GUI) Amigable: Utiliza Tkinter para crear una interfaz gráfica interactiva que es fácil de navegar y usar.',
        'Gestión de Invitados: Permite ingresar nuevos invitados mediante un formulario. Posibilidad de eliminar invitados seleccionados de la lista y del archivo JSON.',
        'Registro de Asistencia: Funcionalidad para marcar la asistencia de un invitado ingresando su código directamente.',
        'Búsqueda y Filtrado: Permite buscar invitados por código o nombre, mostrando resultados en tiempo real.',
        'Persistencia de Datos: Los datos de los invitados se almacenan en un archivo JSON.',
        'Feedback al Usuario: Mensajes de error y éxito proporcionan retroalimentación clara al usuario.'
      ]
    }
  },
  {
    title: 'Mini Donas Arenita (MDA) - Proyecto Escolar',
    tech: 'React | Node.js | Express.js | PostgreSQL | Vercel | Aiven',
    summary: 'Sistema web completo para digitalizar un negocio local de repostería, con portal de clientes y panel administrativo.',
    image: '/images/pMiniDonas.png',
    github: 'https://github.com/AngelMariscal01/MDA.git',
    details: {
      subtitle: 'Sistema de Gestión para Repostería - Equipo AthenaLogic',
      intro: 'Mini Donas Arenita (MDA) nació como respuesta a la necesidad de digitalizar un negocio local que gestionaba pedidos manualmente vía redes sociales. Este sistema web resuelve problemas de errores en órdenes, pérdida de datos y lentitud en la gestión, ofreciendo un portal de clientes y panel administrativo completo.',
      features: [
        'Portal de Clientes: Catálogo interactivo de productos, carrito de compras con experiencia fluida, seguimiento en tiempo real de pedidos y historial de órdenes en el perfil.',
        'Panel Administrativo: Dashboard centralizado con métricas clave, gestión completa de pedidos (aceptar, modificar, entregar), control de inventario de productos e insumos.',
        'Frontend: React con UI moderna y responsiva, diseñada para una experiencia de usuario óptima.',
        'Backend: Node.js + Express.js + CORS + Nodemon, API REST modular y escalable.',
        'Base de Datos: PostgreSQL con pg para persistencia relacional robusta.',
        'Infraestructura: Vercel para frontend y Aiven para base de datos y assets en la nube.',
        'Objetivo: Optimizar, automatizar y escalar el modelo de ventas de la repostería.'
      ]
    }
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section id="proyectos" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          Proyectos
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(index)}
              className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden hover:border-blue-500 transition-colors cursor-pointer"
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-sm text-purple-400 mb-3">{project.tech}</p>
                <p className="text-slate-300 text-sm">{project.summary}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
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
                    <h3 className="text-3xl font-bold text-white mb-2">{projects[selectedProject].title}</h3>
                    <p className="text-sm text-purple-400 mb-2">{projects[selectedProject].tech}</p>
                    {projects[selectedProject].details.role && (
                      <p className="text-blue-400 font-semibold">Mi Rol: {projects[selectedProject].details.role}</p>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-slate-400 hover:text-white text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <h4 className="text-xl font-bold text-white mb-3">{projects[selectedProject].details.subtitle}</h4>
                <p className="text-slate-300 mb-6">{projects[selectedProject].details.intro}</p>

                <h4 className="text-lg font-bold text-white mb-4">Características Principales:</h4>
                <ul className="space-y-3 mb-6">
                  {projects[selectedProject].details.features.map((feature, i) => (
                    <li key={i} className="text-slate-300 pl-4 border-l-2 border-blue-500 text-sm">
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={projects[selectedProject].github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
                >
                  Ver en GitHub
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
