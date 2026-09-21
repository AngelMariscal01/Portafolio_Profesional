import type { L10n, L10nList } from './types';

export type ProjectCategory = 'professional' | 'product' | 'data';

export interface Project {
  id: string;
  title: L10n;
  /** One line under the title in the card grid. */
  kicker: L10n;
  category: ProjectCategory;
  year: string;
  featured?: boolean;
  /** Private client work: shows a note instead of a repo link. */
  confidential?: boolean;
  image?: string;
  repo?: string;
  demo?: string;
  summary: L10n;
  /** The problem in one or two sentences. Recruiters read this first. */
  problem: L10n;
  /** What was built, as bullets. */
  contributions: L10nList;
  stack: string[];
  /** Optional closing line about outcome. Leave undefined rather than inventing one. */
  outcome?: L10n;
}

export const categoryLabels: Record<ProjectCategory, L10n> = {
  professional: { es: 'Trabajo profesional', en: 'Professional work' },
  product: { es: 'Producto', en: 'Product' },
  data: { es: 'Ciencia de datos', en: 'Data science' },
};

export const projects: Project[] = [
  {
    id: 'irakani-builder',
    featured: true,
    category: 'professional',
    year: '2025',
    confidential: true,
    image: '/images/irakani-builder.png',
    title: {
      es: 'Plataforma low-code con IA generativa',
      en: 'Low-code platform with generative AI',
    },
    kicker: {
      es: 'Constructor visual de aplicaciones empresariales asistido por agentes',
      en: 'Agent-assisted visual builder for enterprise applications',
    },
    summary: {
      es: 'Plataforma web donde equipos de negocio diseñan, modifican y publican aplicaciones sin escribir código, con un asistente de IA generativa integrado en el flujo de trabajo.',
      en: 'Web platform where business teams design, modify and publish applications without writing code, with a generative AI assistant embedded in the workflow.',
    },
    problem: {
      es: 'Cada cambio pequeño en una aplicación de negocio pasaba por la cola de ingeniería. El objetivo fue mover ese trabajo al equipo que realmente conoce el proceso, sin renunciar al control técnico.',
      en: 'Every small change to a business application went through the engineering queue. The goal was to move that work to the team that actually understands the process, without giving up technical control.',
    },
    contributions: {
      es: [
        'Editor visual: implementé funcionalidades núcleo para componer aplicaciones a partir de componentes reutilizables, con vista previa en tiempo real de cada cambio.',
        'Asistente de IA en el flujo de trabajo: un chat integrado que interpreta peticiones en lenguaje natural y las traduce en cambios concretos sobre la aplicación, en lugar de devolver código que alguien tiene que pegar a mano.',
        'Generación y modificación de código: conecté el editor con la capa de agentes para que crear, modificar o corregir componentes se pueda pedir en español y aterrice como código funcional.',
        'Panel de administración de datos: creación y modificación de esquemas y entidades desde la interfaz, con asistencia de IA para el modelado.',
        'Cliente de orquestación multi-agente sobre WebSockets, con streaming token a token de la respuesta hacia la interfaz y manejo de reconexión.',
        'Monaco Editor como escape hatch para quien sí quiere escribir código, con sistema de temas y resaltado por lenguaje.',
        'Arquitectura modular en React y TypeScript, organizada por servicios de dominio, para poder agregar tipos de recurso sin tocar el núcleo.',
        'Pruebas unitarias con Vitest sobre los servicios críticos de autenticación, sesión, tokens y acceso a recursos.',
      ],
      en: [
        'Visual editor: implemented core features for composing applications from reusable components, with real-time preview of every change.',
        'AI assistant inside the workflow: an embedded chat that interprets natural-language requests and turns them into concrete application changes, instead of returning code someone has to paste by hand.',
        'Code generation and modification: wired the editor to the agent layer so creating, changing or fixing a component can be asked for in plain language and land as working code.',
        'Data administration panel: creating and modifying schemas and entities from the interface, with AI assistance for the modelling.',
        'Multi-agent orchestration client over WebSockets, streaming the response token by token into the interface and handling reconnection.',
        'Monaco Editor as the escape hatch for people who do want to write code, with a theming system and per-language highlighting.',
        'Modular React and TypeScript architecture organized by domain services, so new resource types can be added without touching the core.',
        'Unit tests with Vitest across the critical authentication, session, token and resource-access services.',
      ],
    },
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Monaco Editor',
      'Amazon Bedrock',
      'Bedrock AgentCore',
      'Python',
      'Node.js',
      'WebSockets',
      'Docker',
      'Vitest',
    ],
  },
  {
    id: 'agentcore-orchestrator',
    featured: true,
    category: 'professional',
    year: '2025',
    confidential: true,
    title: {
      es: 'Sistema multi-agente sobre Bedrock AgentCore',
      en: 'Multi-agent system on Bedrock AgentCore',
    },
    kicker: {
      es: 'Orquestador que delega en agentes especializados por dominio',
      en: 'Orchestrator delegating to domain-specialized agents',
    },
    summary: {
      es: 'Arquitectura de agentes en Python donde un orquestador clasifica la intención del usuario, delega en el agente de dominio adecuado y consolida el resultado en una sola respuesta.',
      en: 'Python agent architecture where an orchestrator classifies user intent, delegates to the right domain agent and consolidates the result into a single answer.',
    },
    problem: {
      es: 'Un solo agente con todas las herramientas se vuelve impredecible y casi imposible de depurar. Separar por dominio acota el contexto, hace el comportamiento reproducible y permite evolucionar cada agente por separado.',
      en: 'A single agent holding every tool becomes unpredictable and nearly impossible to debug. Splitting by domain narrows the context, makes behaviour reproducible, and lets each agent evolve on its own.',
    },
    contributions: {
      es: [
        'Diseñé el agente orquestador: clasifica la intención de la petición, decide si puede responderla directamente o si corresponde a un dominio, y delega en el agente especializado adecuado.',
        'Construí agentes por dominio, cada uno con su propio catálogo de herramientas y su contexto acotado, en vez de un agente único con todo cargado.',
        'Desarrollé la capa de herramientas que conecta los agentes con las APIs de negocio, incluyendo un validador que revisa el plan de ejecución antes de que se ejecute nada.',
        'Implementé memoria conversacional persistente en dos niveles: lo que el agente recuerda de un usuario y lo que recuerda de un espacio de trabajo.',
        'Añadí manejo estructurado de errores y filtrado del streaming, para que los pasos intermedios del agente no se filtren a la interfaz.',
        'Instrumenté observabilidad y un monitor de latencia del bucle, que es lo que permite diagnosticar por qué una respuesta tardó o falló en producción.',
        'Automaticé el despliegue de todos los agentes a entornos de desarrollo y producción con contenedores.',
        'Escribí la suite de pruebas de los resolvers, validadores y transformadores de propiedades.',
      ],
      en: [
        'Designed the orchestrator agent: it classifies the intent of a request, decides whether it can answer directly or whether the request belongs to a domain, and delegates to the right specialized agent.',
        'Built per-domain agents, each with its own tool catalogue and a narrow context, instead of a single agent carrying everything.',
        'Developed the tool layer connecting agents to business APIs, including a validator that reviews the execution plan before anything runs.',
        'Implemented persistent conversational memory at two levels: what the agent remembers about a user, and what it remembers about a workspace.',
        'Added structured error handling and stream filtering, so the agent\u2019s intermediate steps never leak into the interface.',
        'Instrumented observability and a loop-latency monitor \u2014 the thing that actually lets you diagnose why a response was slow or failed in production.',
        'Automated container deployment of every agent to development and production environments.',
        'Wrote the test suite covering resolvers, validators and property transformers.',
      ],
    },
    stack: [
      'Python',
      'Amazon Bedrock',
      'Bedrock AgentCore',
      'Claude Sonnet 4.5',
      'Strands Agents',
      'AWS Lambda',
      'Amazon DynamoDB',
      'Amazon S3',
      'Docker',
      'Pytest',
    ],
  },
  {
    id: 'irakani-mobile',
    featured: true,
    category: 'professional',
    year: '2025',
    confidential: true,
    title: {
      es: 'Aplicación móvil empresarial offline-first',
      en: 'Offline-first enterprise mobile application',
    },
    kicker: {
      es: 'Captura de datos en campo que funciona sin señal',
      en: 'Field data capture that works without signal',
    },
    summary: {
      es: 'Aplicación React Native para equipos en campo: captura de datos, evidencia fotográfica y geolocalización que siguen funcionando sin conexión y se sincronizan solas al recuperar red.',
      en: 'React Native application for field teams: data capture, photo evidence and geolocation that keep working offline and sync themselves once the network returns.',
    },
    problem: {
      es: 'El trabajo en campo ocurre donde no hay cobertura. Una app que exige conexión no es una app que se pueda usar, así que el modo offline tenía que ser el camino normal, no la excepción.',
      en: 'Field work happens where there is no coverage. An app that demands connectivity is an app nobody can use, so offline had to be the normal path, not the exception.',
    },
    contributions: {
      es: [
        'Arquitectura offline-first sobre SQLite local, con una cola de eventos que preserva el orden de las operaciones: si una visita tiene inicio, pasos intermedios y cierre, se envían en ese orden o no se envían.',
        'Sincronización en segundo plano: detecta la reconexión y reenvía los eventos pendientes sin que el usuario haga nada, incluso con la aplicación cerrada.',
        'Recuperación de eventos y autoguardado, para que una captura a medias sobreviva a que se cierre la app o se acabe la batería.',
        'Integré las capacidades del dispositivo que el trabajo en campo realmente necesita: cámara y evidencia fotográfica, escaneo de códigos QR y de barras, NFC, GPS, impresión térmica de tickets y notificaciones push.',
        'Estructuré el proyecto como monorepo con paquetes compartidos de dominio, persistencia y estado, para poder reutilizarlos entre aplicaciones.',
        'Sistema de marca blanca: una sola base de código genera aplicaciones con nombre, identificador, colores y credenciales distintos por cliente.',
        'Configuré los pipelines de compilación y publicación para Android e iOS, incluyendo la firma y el envío a las tiendas.',
        'Trabajé sobre la nueva arquitectura de React Native y afiné el rendimiento de listas largas y paginación de entidades.',
      ],
      en: [
        'Offline-first architecture on local SQLite, with an event queue that preserves operation ordering: if a visit has a start, intermediate steps and a close, they are sent in that order or not at all.',
        'Background synchronization: it detects reconnection and resends pending events with no user action, even with the app closed.',
        'Event recovery and autosave, so a half-finished capture survives the app being killed or the battery running out.',
        'Integrated the device capabilities field work actually needs: camera and photo evidence, QR and barcode scanning, NFC, GPS, thermal receipt printing and push notifications.',
        'Structured the project as a monorepo with shared domain, persistence and state packages, reusable across applications.',
        'White-label system: one codebase produces applications with a different name, identifier, colour scheme and credentials per client.',
        'Set up the Android and iOS build and release pipelines, including signing and store submission.',
        'Worked on React Native\u2019s new architecture and tuned performance for long lists and entity pagination.',
      ],
    },
    stack: [
      'React Native',
      'Expo',
      'TypeScript',
      'SQLite',
      'Firebase Cloud Messaging',
      'EAS Build',
      'Fastlane',
      'Android',
      'iOS',
      'Jest',
    ],
  },
  {
    id: 'mda',
    category: 'product',
    year: '2025',
    image: '/images/pMiniDonas.png',
    repo: 'https://github.com/AngelMariscal01/MDA.git',
    title: {
      es: 'Mini Donas Arenita — sistema de pedidos',
      en: 'Mini Donas Arenita — ordering system',
    },
    kicker: {
      es: 'Digitalización completa de un negocio local de repostería',
      en: 'End-to-end digitalization of a local bakery business',
    },
    summary: {
      es: 'Sistema web con portal de clientes y panel administrativo para un negocio que gestionaba sus pedidos a mano por redes sociales.',
      en: 'Web system with a customer portal and admin panel for a business that was handling orders by hand over social media.',
    },
    problem: {
      es: 'Los pedidos llegaban por mensajes sueltos. Se perdían órdenes, se confundían direcciones y no existía historial. El sistema debía ser lo bastante simple para que lo adoptara un negocio familiar.',
      en: 'Orders arrived as scattered messages. Orders got lost, addresses got mixed up, and there was no history. The system had to be simple enough for a family business to actually adopt.',
    },
    contributions: {
      es: [
        'Construí el portal de clientes: catálogo, carrito, seguimiento de pedido e historial en el perfil.',
        'Desarrollé el panel administrativo con métricas, gestión del ciclo de vida del pedido y control de inventario de productos e insumos.',
        'Diseñé la API REST modular en Node.js y Express sobre PostgreSQL.',
        'Desplegué el frontend en Vercel y la base de datos gestionada en Aiven.',
      ],
      en: [
        'Built the customer portal: catalog, cart, order tracking and profile order history.',
        'Developed the admin panel with metrics, order lifecycle management and inventory control for products and supplies.',
        'Designed the modular REST API in Node.js and Express on PostgreSQL.',
        'Deployed the frontend to Vercel and the managed database to Aiven.',
      ],
    },
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Vercel', 'Aiven'],
  },
  {
    id: 'steam-api',
    category: 'data',
    year: '2024',
    image: '/images/pUno.png',
    repo: 'https://github.com/AngelMariscal01/P1.git',
    title: {
      es: 'API de análisis y recomendación de videojuegos',
      en: 'Game analytics and recommendation API',
    },
    kicker: {
      es: 'ETL, análisis de sentimiento y endpoints desplegados con FastAPI',
      en: 'ETL, sentiment analysis and deployed FastAPI endpoints',
    },
    summary: {
      es: 'API pública sobre datos de Steam con cinco endpoints analíticos, incluyendo análisis de sentimiento sobre reseñas de usuarios.',
      en: 'Public API over Steam data with five analytical endpoints, including sentiment analysis over user reviews.',
    },
    problem: {
      es: 'Los datos crudos de Steam llegaban anidados y sin limpiar. El reto real no eran los modelos, sino un ETL que cupiera en los límites de memoria del entorno gratuito de despliegue.',
      en: 'Raw Steam data arrived nested and dirty. The real challenge was not the models but an ETL that fit within the memory limits of the free deployment tier.',
    },
    contributions: {
      es: [
        'Construí el pipeline de ETL y la ingeniería de features con Pandas.',
        'Implementé análisis de sentimiento sobre reseñas de usuarios con NLTK.',
        'Desarrollé un sistema de recomendación basado en similitud con Scikit-learn.',
        'Expuse y desplegué cinco endpoints analíticos con FastAPI.',
      ],
      en: [
        'Built the ETL pipeline and feature engineering with Pandas.',
        'Implemented sentiment analysis over user reviews with NLTK.',
        'Developed a similarity-based recommendation system with Scikit-learn.',
        'Exposed and deployed five analytical endpoints with FastAPI.',
      ],
    },
    stack: ['Python', 'FastAPI', 'Pandas', 'Scikit-learn', 'NLTK', 'Jupyter'],
  },
  {
    id: 'caba-dashboard',
    category: 'data',
    year: '2024',
    image: '/images/pDos.png',
    repo: 'https://github.com/AngelMariscal01/PI.2.git',
    title: {
      es: 'Dashboard de siniestros viales en Buenos Aires',
      en: 'Road-accident dashboard for Buenos Aires',
    },
    kicker: {
      es: 'Análisis exploratorio y KPIs de seguridad vial en Streamlit',
      en: 'Exploratory analysis and road-safety KPIs in Streamlit',
    },
    summary: {
      es: 'Dashboard interactivo que cruza siniestros viales de CABA con filtros por año, comuna, tipo de vía y perfil de víctima.',
      en: 'Interactive dashboard cross-cutting CABA road accidents with filters by year, district, road type and victim profile.',
    },
    problem: {
      es: 'Los datos abiertos de siniestros existían pero nadie podía interrogarlos sin saber programar. El dashboard convierte una tabla en una herramienta de decisión.',
      en: 'Open accident data existed, but nobody could interrogate it without knowing how to code. The dashboard turns a table into a decision tool.',
    },
    contributions: {
      es: [
        'Limpié y normalicé el conjunto de datos de siniestros viales.',
        'Definí y calculé los KPIs de tasa de homicidios por cada 100 000 habitantes y reducción de accidentes mortales de motociclistas.',
        'Construí las visualizaciones y el mapa interactivo de localización de siniestros.',
        'Desarrollé la interfaz con filtros encadenados en Streamlit.',
      ],
      en: [
        'Cleaned and normalized the road-accident dataset.',
        'Defined and computed the homicide-rate-per-100,000-inhabitants and motorcyclist-fatality-reduction KPIs.',
        'Built the visualizations and the interactive accident-location map.',
        'Developed the chained-filter interface in Streamlit.',
      ],
    },
    stack: ['Python', 'Streamlit', 'Pandas', 'Seaborn', 'Matplotlib'],
  },
  {
    id: 'yelp-google',
    category: 'data',
    year: '2024',
    image: '/images/pTres.png',
    repo: 'https://github.com/Risango/Henry-PF',
    title: {
      es: 'Plataforma de análisis de reseñas Yelp y Google Maps',
      en: 'Yelp and Google Maps review analytics platform',
    },
    kicker: {
      es: 'Rol de Data Engineer en un proyecto grupal de extremo a extremo',
      en: 'Data Engineer role on an end-to-end team project',
    },
    summary: {
      es: 'Solución de análisis y recomendación sobre reseñas de usuarios, con ingesta en la nube, almacenamiento analítico y despliegue de un modelo de machine learning.',
      en: 'Analytics and recommendation solution over user reviews, with cloud ingestion, analytical storage and a deployed machine-learning model.',
    },
    problem: {
      es: 'Millones de reseñas heterogéneas de dos plataformas distintas, que había que unificar antes de poder responder una sola pregunta de negocio.',
      en: 'Millions of heterogeneous reviews from two different platforms, which had to be unified before a single business question could be answered.',
    },
    contributions: {
      es: [
        'Asumí el rol de Data Engineer: conexiones, infraestructura en la nube y despliegue del modelo.',
        'Desplegué contenedores en Google Cloud Run y funciones serverless en Cloud Functions.',
        'Configuré Cloud SQL, Cloud Storage y BigQuery para almacenamiento y consulta analítica.',
        'Coordiné el trabajo del equipo con Git y revisión de código.',
      ],
      en: [
        'Took the Data Engineer role: connections, cloud infrastructure and model deployment.',
        'Deployed containers on Google Cloud Run and serverless functions on Cloud Functions.',
        'Configured Cloud SQL, Cloud Storage and BigQuery for analytical storage and querying.',
        'Coordinated team work through Git and code review.',
      ],
    },
    stack: ['Python', 'BigQuery', 'Google Cloud Run', 'Cloud Functions', 'MySQL', 'XGBoost', 'Power BI'],
  },
  {
    id: 'eventos-app',
    category: 'product',
    year: '2024',
    image: '/images/pCuatro.png',
    repo: 'https://github.com/AngelMariscal01/EventosApp',
    title: {
      es: 'Control de acceso a eventos',
      en: 'Event access control',
    },
    kicker: {
      es: 'Aplicación de escritorio con lectura de códigos QR y de barras',
      en: 'Desktop application with QR and barcode scanning',
    },
    summary: {
      es: 'Aplicación de escritorio en Python para registrar invitados y controlar su acceso mediante códigos de identificación.',
      en: 'Python desktop application to register guests and control their entry through identification codes.',
    },
    problem: {
      es: 'El control de acceso en papel es lento y se presta a errores. La aplicación tenía que funcionar en una laptop cualquiera, sin instalación de servidor.',
      en: 'Paper-based access control is slow and error-prone. The application had to run on any laptop, with no server installation.',
    },
    contributions: {
      es: [
        'Desarrollé la interfaz gráfica en Tkinter con búsqueda y filtrado en tiempo real.',
        'Implementé el registro de asistencia por lectura de código, compatible con lectores QR y de barras.',
        'Diseñé la persistencia en JSON para operar sin base de datos.',
      ],
      en: [
        'Developed the Tkinter graphical interface with real-time search and filtering.',
        'Implemented code-scan attendance registration, compatible with QR and barcode readers.',
        'Designed JSON persistence so it runs without a database.',
      ],
    },
    stack: ['Python', 'Tkinter', 'JSON', 'Git'],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
