import type { L10n, L10nList } from './types';

export const profile = {
  name: 'Angel David Mariscal Soto',
  shortName: 'Angel Mariscal',
  initials: 'AM',

  role: {
    es: 'Ingeniero de IA Generativa y Sistemas Agénticos',
    en: 'Generative AI & Agentic Systems Engineer',
  } satisfies L10n,

  /** One line. This is the single most-read sentence on the site. */
  tagline: {
    es: 'Construyo agentes de IA que llegan a producción: de la arquitectura en AWS Bedrock al despliegue, la observabilidad y el producto que los usa.',
    en: 'I build AI agents that actually reach production — from AWS Bedrock architecture through deployment, observability, and the product that consumes them.',
  } satisfies L10n,

  /** Shown as a pill in the hero. Set `available` to false to hide it. */
  availability: {
    available: true,
    label: {
      es: 'Disponible para roles remotos · LATAM y México',
      en: 'Open to remote roles · LATAM & Mexico',
    } satisfies L10n,
  },

  location: {
    es: 'Zamora, Michoacán, México · GMT-6',
    en: 'Zamora, Michoacán, Mexico · GMT-6',
  } satisfies L10n,

  /** Short form used by the CV and structured data. */
  locationShort: 'Zamora, Michoacán, México',

  /** Long-form bio. Keep each entry to 2–3 tight paragraphs. */
  bio: {
    es: [
      'Soy Ingeniero en Sistemas Computacionales con especialidad en Cómputo en la Nube y Ciberseguridad. Los últimos años los he dedicado a llevar IA generativa del prototipo a producción: agentes sobre Amazon Bedrock y Bedrock AgentCore, orquestación multi-agente, y las APIs serverless que los conectan con sistemas de negocio reales.',
      'Trabajo de punta a punta. El mismo año puedo estar diseñando el árbol de herramientas de un agente en Python, escribiendo el editor visual en React y TypeScript que lo expone al usuario, y afinando el pipeline de despliegue que lo publica. Esa amplitud es deliberada: los sistemas agénticos fallan en las costuras entre capas, y esas costuras son las que sé coser.',
      'Antes de la IA generativa construí aplicaciones de escritorio en Linux y Raspberry Pi, integraciones en C# con sistemas ERP y pipelines de datos en la nube. Sigo apoyándome en eso todos los días: la intuición para depurar, para cuidar el costo y para dudar de una salida que se ve bien pero no lo está.',
    ],
    en: [
      'I am a Computer Systems Engineer specialized in Cloud Computing and Cybersecurity. For the past few years my focus has been taking generative AI from prototype to production: agents on Amazon Bedrock and Bedrock AgentCore, multi-agent orchestration, and the serverless APIs that connect them to real business systems.',
      'I work end to end. In the same year I might design an agent’s tool tree in Python, write the React and TypeScript visual editor that exposes it to users, and tune the deployment pipeline that ships it. That breadth is deliberate: agentic systems fail at the seams between layers, and those seams are what I know how to sew.',
      'Before generative AI I built Linux and Raspberry Pi desktop applications, C# integrations with ERP systems, and cloud data pipelines. I lean on that every day — the instinct for debugging, for watching cost, and for distrusting an output that looks right but isn’t.',
    ],
  } satisfies L10nList,

  /** 30-second version, used in the hero and as the meta description seed. */
  summary: {
    es: 'Ingeniero de IA Generativa. Agentes en producción sobre AWS Bedrock AgentCore, plataformas low-code y aplicaciones móviles empresariales. AWS Certified AI Practitioner.',
    en: 'Generative AI Engineer. Production agents on AWS Bedrock AgentCore, low-code platforms, and enterprise mobile applications. AWS Certified AI Practitioner.',
  } satisfies L10n,

  contact: {
    email: 'angel.mariscal.soto@gmail.com',
    phone: '+52 351 193 2430',
    phoneHref: 'tel:+523511932430',
    linkedin: 'https://www.linkedin.com/in/angel-david-mariscal-soto-b5235925a/',
    linkedinLabel: 'angel-david-mariscal-soto',
    github: 'https://github.com/AngelMariscal01',
    githubLabel: 'AngelMariscal01',
    website: 'https://portafolio-angeldavidmariscalsoto-delta.vercel.app',
  },

  cv: {
    es: '/cv/Angel-Mariscal-CV-ES.pdf',
    en: '/cv/Angel-Mariscal-CV-EN.pdf',
  } satisfies L10n,

  /** Headline numbers for the hero strip. Keep to four; keep them true. */
  stats: [
    {
      value: '3+',
      label: { es: 'años construyendo software', en: 'years building software' } satisfies L10n,
    },
    {
      value: '2',
      label: { es: 'certificaciones cloud', en: 'cloud certifications' } satisfies L10n,
    },
    {
      value: '3',
      label: { es: 'concursos de programación', en: 'programming contests' } satisfies L10n,
    },
    {
      value: 'ES/EN',
      label: { es: 'idiomas de trabajo', en: 'working languages' } satisfies L10n,
    },
  ],

  languages: [
    {
      name: { es: 'Español', en: 'Spanish' } satisfies L10n,
      level: { es: 'Nativo', en: 'Native' } satisfies L10n,
    },
    {
      name: { es: 'Inglés', en: 'English' } satisfies L10n,
      level: { es: 'Profesional (lectura técnica y comunicación escrita)', en: 'Professional working proficiency' } satisfies L10n,
    },
  ],
};
