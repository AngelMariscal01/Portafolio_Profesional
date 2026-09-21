import type { L10n, L10nList } from './types';

export interface Role {
  id: string;
  title: L10n;
  company: string;
  /** Freelance, full-time, internship… */
  kind: L10n;
  start: string;
  end: L10n;
  /** ISO dates, for structured data and the CV. */
  isoStart: string;
  isoEnd: string | null;
  location: L10n;
  /** Two sentences, maximum. Shown on the card. */
  summary: L10n;
  /** Achievement bullets. Lead with the verb, end with the consequence. */
  highlights: L10nList;
  stack: string[];
  current?: boolean;
}

export const experience: Role[] = [
  {
    id: 'irakani-genai',
    current: true,
    title: {
      es: 'Ingeniero de IA Generativa',
      en: 'Generative AI Engineer',
    },
    company: 'Irakani (Iteradapta)',
    kind: { es: 'Tiempo completo', en: 'Full-time' },
    start: 'Jun 2025',
    end: { es: 'Actualidad', en: 'Present' },
    isoStart: '2025-06',
    isoEnd: null,
    location: { es: 'Remoto · México', en: 'Remote · Mexico' },
    summary: {
      es: 'Diseño y llevo a producción agentes de IA sobre Amazon Bedrock AgentCore, junto con las APIs serverless y el producto web que los expone a usuarios de negocio.',
      en: 'I design and ship production AI agents on Amazon Bedrock AgentCore, along with the serverless APIs and the web product that puts them in front of business users.',
    },
    highlights: {
      es: [
        'Diseñé e implementé agentes de IA sobre Amazon Bedrock AgentCore con Claude Sonnet 4.5, permitiendo a usuarios no técnicos consultar en lenguaje natural información que antes requería SQL o soporte de ingeniería.',
        'Construí una arquitectura multi-agente con un orquestador que clasifica la intención, delega en agentes especializados por dominio y consolida la respuesta, en lugar de un único prompt monolítico difícil de depurar.',
        'Desarrollé el conjunto de herramientas (tool use) que conecta los agentes con las APIs de negocio, con un validador que revisa el plan de ejecución antes de ejecutarlo y manejo estructurado de errores.',
        'Implementé memoria conversacional persistente en dos niveles, por usuario y por espacio de trabajo, junto con el filtrado del streaming hacia la interfaz.',
        'Integré la IA generativa dentro de una plataforma low-code: chat asistente en el editor, generación y modificación de componentes, y administración de esquemas de datos en lenguaje natural.',
        'Instrumenté observabilidad y monitoreo de latencia del bucle de agentes, para poder diagnosticar en producción por qué una respuesta tardó o falló.',
        'Trabajé el ciclo completo: agentes en Python, APIs serverless en AWS Lambda, interfaz en React y TypeScript sobre WebSockets, y despliegue con contenedores en AWS.',
      ],
      en: [
        'Designed and implemented AI agents on Amazon Bedrock AgentCore with Claude Sonnet 4.5, letting non-technical users query in natural language information that previously required SQL or engineering support.',
        'Built a multi-agent architecture where an orchestrator classifies intent, delegates to domain-specialized agents and consolidates the answer, instead of a single monolithic prompt that is hard to debug.',
        'Developed the tool-use layer connecting agents to business APIs, with a validator that reviews the execution plan before it runs and structured error handling.',
        'Implemented persistent conversational memory at two levels, per user and per workspace, along with stream filtering toward the interface.',
        'Embedded generative AI into a low-code platform: an assistant chat in the editor, component generation and modification, and data-schema administration in natural language.',
        'Instrumented observability and agent-loop latency monitoring, so a slow or failed response can be diagnosed in production.',
        'Owned the full cycle: Python agents, serverless AWS Lambda APIs, React and TypeScript interface over WebSockets, and containerized deployment on AWS.',
      ],
    },
    stack: [
      'Amazon Bedrock',
      'Bedrock AgentCore',
      'Claude Sonnet 4.5',
      'Python',
      'Strands Agents',
      'AWS Lambda',
      'Amazon DynamoDB',
      'React',
      'TypeScript',
      'Node.js',
      'WebSockets',
      'Docker',
    ],
  },
  {
    id: 'irakani-apps',
    title: {
      es: 'Desarrollador de Aplicaciones',
      en: 'Application Developer',
    },
    company: 'Irakani (Iteradapta)',
    kind: { es: 'Tiempo completo', en: 'Full-time' },
    start: 'Sep 2024',
    end: { es: 'Jun 2025', en: 'Jun 2025' },
    isoStart: '2024-09',
    isoEnd: '2025-06',
    location: { es: 'Remoto · México', en: 'Remote · Mexico' },
    summary: {
      es: 'Desarrollo de aplicaciones de negocio internas e integraciones entre sistemas empresariales, con foco en que los datos fluyan sin captura manual.',
      en: 'Built internal business applications and integrations between enterprise systems, focused on removing manual data entry from the loop.',
    },
    highlights: {
      es: [
        'Diseñé e implementé una interfaz en C# para integrar datos con un sistema ERP comercial, eliminando la recaptura manual entre plataformas.',
        'Desarrollé y mantuve aplicaciones de negocio internas en Java y SQL Server, dando continuidad a procesos operativos críticos.',
        'Modelé y optimicé consultas y esquemas de base de datos para reportes y operaciones de alto volumen.',
        'Colaboré en revisión de código y documentación técnica dentro de un equipo distribuido.',
      ],
      en: [
        'Designed and implemented a C# interface integrating data with a commercial ERP system, removing manual re-entry between platforms.',
        'Developed and maintained internal business applications in Java and SQL Server, keeping critical operational processes running.',
        'Modelled and optimized database queries and schemas for reporting and high-volume operations.',
        'Contributed to code review and technical documentation within a distributed team.',
      ],
    },
    stack: ['C#', 'Java', 'SQL Server', '.NET', 'Git'],
  },
  {
    id: 'sightwise',
    title: {
      es: 'Desarrollador de Software',
      en: 'Software Developer',
    },
    company: 'SightWise Tech',
    kind: { es: 'Profesional independiente', en: 'Independent contractor' },
    start: 'Jun 2023',
    end: { es: 'Mar 2024', en: 'Mar 2024' },
    isoStart: '2023-06',
    isoEnd: '2024-03',
    location: { es: 'México', en: 'Mexico' },
    summary: {
      es: 'Aplicación de escritorio embebida en Raspberry Pi para automatizar el diagnóstico y clasificación del estado de productos tecnológicos.',
      en: 'Raspberry Pi embedded desktop application automating the diagnosis and classification of technology product condition.',
    },
    highlights: {
      es: [
        'Desarrollé una aplicación de escritorio en Python y PyQt sobre Linux embebido, sustituyendo un proceso de evaluación manual por uno automatizado.',
        'Implementé el filtrado y la clasificación automática del estado de productos a partir de criterios configurables, con actualización en tiempo real.',
        'Añadí autenticación de usuarios y cifrado de datos sensibles, aplicando prácticas de desarrollo seguro y revisión periódica de vulnerabilidades.',
        'Diseñé la capa de persistencia en JSON para operar sin dependencia de un servidor de base de datos en el dispositivo.',
      ],
      en: [
        'Built a Python and PyQt desktop application on embedded Linux, replacing a manual evaluation process with an automated one.',
        'Implemented automatic filtering and condition classification driven by configurable criteria, with real-time updates.',
        'Added user authentication and sensitive-data encryption, applying secure development practices and periodic vulnerability review.',
        'Designed a JSON persistence layer so the device could operate without a database server.',
      ],
    },
    stack: ['Python', 'PyQt', 'Linux', 'Raspberry Pi', 'JSON', 'Git'],
  },
];
