import type { L10n, L10nList } from './types';

/** The layer of the stack a concept belongs to. Drives the accumulated-stack rows. */
export type JourneyLayer = 'software' | 'data' | 'cloud' | 'models' | 'agents';

/** Which bespoke diagram the island draws next to the chapter. */
export type JourneyVisual =
  | 'vision'
  | 'pipeline'
  | 'sampling'
  | 'cloud'
  | 'cert'
  | 'builder-v1'
  | 'insight'
  | 'multi-agent'
  | 'mobile'
  | 'ecosystem'
  | 'mayordomia'
  | 'closing';

/** The AI tool he leaned on to build during each stretch. */
export type JourneyTool = 'chatgpt' | 'ai-studio' | 'amazon-q' | 'kiro' | 'claude-code';

export interface JourneyToolInfo {
  name: string;
  /** Fits under a couple of rail columns on a phone. */
  short: string;
  kind: L10n;
}

export interface JourneyConcept {
  label: L10n;
  layer: JourneyLayer;
}

export interface JourneyChapter {
  id: string;
  /** 0 Foundations, 1 Generative AI, 2 Agents. */
  act: 0 | 1 | 2;
  period: L10n;
  place: L10n;
  title: L10n;
  /** One or two short paragraphs, first person. */
  story: L10nList;
  /** Bullets shown instead of `learned` on the closing chapter. */
  points?: L10nList;
  learned: JourneyConcept[];
  /** The one sentence a reader should keep. */
  lesson: L10n;
  visual: JourneyVisual;
  tool: JourneyTool;
}

export const toolLabels: Record<JourneyTool, JourneyToolInfo> = {
  chatgpt: { name: 'ChatGPT', short: 'ChatGPT', kind: { es: 'chat', en: 'chat' } },
  'ai-studio': { name: 'Google AI Studio', short: 'AI Studio', kind: { es: 'chat', en: 'chat' } },
  'amazon-q': { name: 'Amazon Q', short: 'Amazon Q', kind: { es: 'asistente', en: 'assistant' } },
  kiro: { name: 'Kiro', short: 'Kiro', kind: { es: 'IDE agéntico', en: 'agentic IDE' } },
  'claude-code': { name: 'Claude Code', short: 'Claude Code', kind: { es: 'agente de código', en: 'coding agent' } },
};

export const journeyActs: L10n[] = [
  { es: 'Fundamentos', en: 'Foundations' },
  { es: 'IA generativa', en: 'Generative AI' },
  { es: 'IA agéntica', en: 'Agentic AI' },
];

export const layerLabels: Record<JourneyLayer, L10n> = {
  software: { es: 'Software', en: 'Software' },
  data: { es: 'Datos', en: 'Data' },
  cloud: { es: 'Nube y seguridad', en: 'Cloud & security' },
  models: { es: 'Modelos', en: 'Models' },
  agents: { es: 'Agentes', en: 'Agents' },
};

const c = (es: string, en: string, layer: JourneyLayer): JourneyConcept => ({
  label: { es, en },
  layer,
});

export const journey: JourneyChapter[] = [
  {
    id: 'sightwise',
    act: 0,
    period: { es: '2023', en: '2023' },
    place: { es: 'SightWise Tech · Guadalajara', en: 'SightWise Tech · Guadalajara' },
    title: { es: 'Visión por computadora en el borde', en: 'Computer vision at the edge' },
    story: {
      es: [
        'Todavía en la universidad, una startup de Guadalajara me buscó para un proyecto en Raspberry Pi: evaluar la calidad de productos tecnológicos, como procesadores, comparándolos contra una imagen ideal tomada en las mismas condiciones y devolviendo un porcentaje de parecido.',
        'Probamos varios modelos de visión por computadora, pero sostener uno en una Raspberry Pi de esa época era demasiado pesado. Nos quedamos con una comparación por diferencias en escalas de color: más ligera y suficiente para el problema. Era la época del primer ChatGPT gratuito; lo usaba para corregir código y casi siempre terminaba corrigiéndolo yo a él. Ahí entendí qué es una alucinación y cuánto pesa el contexto.',
      ],
      en: [
        'While still at university, a Guadalajara startup brought me in for a Raspberry Pi project: grading the quality of technology products, such as processors, by comparing them against an ideal image taken under the same conditions and returning a similarity percentage.',
        'We tried several computer vision models, but running one on a Raspberry Pi of that era was too heavy. We settled on comparing colour-scale differences: lighter, and enough for the problem. It was the time of the first free ChatGPT; I used it to fix code and usually ended up fixing it instead. That is where I learned what a hallucination is and how much context matters.',
      ],
    },
    learned: [
      c('Visión por computadora', 'Computer vision', 'models'),
      c('Alucinaciones', 'Hallucinations', 'models'),
      c('Contexto', 'Context', 'models'),
      c('Revisión de código', 'Code review', 'software'),
      c('Git y versionamiento', 'Git & versioning', 'software'),
    ],
    lesson: {
      es: 'La mejor solución no siempre es el modelo más grande. Primero el problema, luego la herramienta.',
      en: 'The best solution is not always the biggest model. Problem first, tool second.',
    },
    visual: 'vision',
    tool: 'chatgpt',
  },
  {
    id: 'bootcamp',
    act: 0,
    period: { es: '2024', en: '2024' },
    place: { es: 'Bootcamp de Ciencia de Datos · Soy Henry', en: 'Data Science Bootcamp · Soy Henry' },
    title: { es: 'Los datos antes que el modelo', en: 'Data before the model' },
    story: {
      es: [
        'Al cerrar el proyecto me quedé con la curiosidad por el machine learning y entré a un bootcamp de ciencia de datos de medio tiempo, en paralelo a la carrera.',
        'Ahí entendí qué es un modelo de machine learning y cómo funciona una red neuronal, y armé las bases que hoy sostienen a cualquier agente: de dónde viene el dato, cómo se limpia, dónde vive y cómo se expone a otros sistemas.',
      ],
      en: [
        'After the project wrapped I was left curious about machine learning, so I joined a part-time data science bootcamp alongside my degree.',
        'That is where I learned what a machine learning model is and how a neural network works, and built the foundations every agent still stands on: where data comes from, how it gets cleaned, where it lives and how it is exposed to other systems.',
      ],
    },
    learned: [
      c('Machine learning', 'Machine learning', 'models'),
      c('Redes neuronales', 'Neural networks', 'models'),
      c('ETL', 'ETL', 'data'),
      c('EDA', 'EDA', 'data'),
      c('Ciclo de vida del dato', 'Data lifecycle', 'data'),
      c('Pipelines', 'Pipelines', 'data'),
      c('Data warehouse', 'Data warehouse', 'data'),
      c('Data lake', 'Data lake', 'data'),
      c('Contenedores', 'Containers', 'cloud'),
      c('APIs', 'APIs', 'software'),
    ],
    lesson: {
      es: 'Un agente es tan bueno como los datos a los que tiene acceso.',
      en: 'An agent is only as good as the data it can reach.',
    },
    visual: 'pipeline',
    tool: 'chatgpt',
  },
  {
    id: 'irakani-dev',
    act: 0,
    period: { es: '2024', en: '2024' },
    place: { es: 'Irakani · Desarrollador de aplicaciones', en: 'Irakani · Application developer' },
    title: { es: 'De consumir IA a entenderla', en: 'From using AI to understanding it' },
    story: {
      es: [
        'Entré a Irakani a desarrollar aplicaciones para clientes sobre App, la plataforma low-code de la empresa: un framework para crear formularios de captura rápidamente, donde un proyecto mediano tomaba alrededor de dos meses. JavaScript, SQL Server, MySQL, interfaces con ERP e indicadores.',
        'Programaba con Google AI Studio al lado y, entre prueba, error e investigación por fuera, entendí qué hacen la temperatura, top-k y top-p. En cursos de Udemy conocí LangChain como framework para consumir distintos modelos y descubrí el peso del system prompt.',
      ],
      en: [
        'I joined Irakani building client applications on App, the company’s low-code platform: a framework for quickly creating data-capture forms, where a medium project took around two months. JavaScript, SQL Server, MySQL, ERP interfaces and dashboards.',
        'I coded with Google AI Studio open beside me and, through trial, error and reading on my own, learned what temperature, top-k and top-p actually do. Udemy courses introduced me to LangChain as a framework for consuming different models, and to the weight of the system prompt.',
      ],
    },
    learned: [
      c('JavaScript', 'JavaScript', 'software'),
      c('SQL Server', 'SQL Server', 'software'),
      c('MySQL', 'MySQL', 'software'),
      c('Interfaces con ERP', 'ERP interfaces', 'software'),
      c('Dashboards', 'Dashboards', 'data'),
      c('Temperatura', 'Temperature', 'models'),
      c('Top-k / Top-p', 'Top-k / Top-p', 'models'),
      c('System prompt', 'System prompt', 'models'),
      c('LangChain', 'LangChain', 'models'),
    ],
    lesson: {
      es: 'Un modelo no es una caja negra: cada parámetro cambia la respuesta, y hay que saber cuál mover.',
      en: 'A model is not a black box: every parameter changes the answer, and you need to know which one to move.',
    },
    visual: 'sampling',
    tool: 'ai-studio',
  },
  {
    id: 'cloud-security',
    act: 0,
    period: { es: '2024 — 2025', en: '2024 — 2025' },
    place: { es: 'TecNM · Hack The Box', en: 'TecNM · Hack The Box' },
    title: { es: 'Nube y seguridad', en: 'Cloud and security' },
    story: {
      es: [
        'La carrera me ofrecía dos especialidades: full stack, o cómputo en la nube y ciberseguridad. Como la IA ya me ahorraba buena parte de la programación —siempre que le diera buen contexto—, elegí la nube: AWS desde la consola, instancias, VPCs, redes e IAM.',
        'Entre trabajo y escuela me sobraba tiempo, así que estudié Red Team en Hack The Box durante unos tres meses, con la idea de un proyecto que combinara seguridad e IA generativa.',
      ],
      en: [
        'My degree offered two specializations: full stack, or cloud computing and cybersecurity. Since AI was already saving me much of the coding —as long as I gave it good context— I chose cloud: AWS from the console, instances, VPCs, networking and IAM.',
        'Between work and school I had time to spare, so I studied Red Team on Hack The Box for about three months, aiming for a project that would combine security and generative AI.',
      ],
    },
    learned: [
      c('Instancias', 'Instances', 'cloud'),
      c('VPC y redes', 'VPC & networking', 'cloud'),
      c('IAM', 'IAM', 'cloud'),
      c('Red Team', 'Red Team', 'cloud'),
    ],
    lesson: {
      es: 'Entender cómo se ataca un sistema cambia cómo diseñas sus permisos.',
      en: 'Understanding how a system is attacked changes how you design its permissions.',
    },
    visual: 'cloud',
    tool: 'ai-studio',
  },
  {
    id: 'aws-aip',
    act: 1,
    period: { es: '2025', en: '2025' },
    place: { es: 'Irakani · AWS', en: 'Irakani · AWS' },
    title: { es: 'Estrenar el puesto', en: 'Opening the role' },
    story: {
      es: [
        'Con el auge de la IA, en Irakani me propusieron hacer mis residencias profesionales en IA y estrenar un puesto que no existía: Ingeniero de IA Generativa. La condición era certificarme primero.',
        'Saqué el AWS Certified AI Practitioner en menos de seis meses, presentándolo en inglés. Hice las residencias ya como parte del equipo, con sueldo y responsabilidades de cualquier ingeniero.',
      ],
      en: [
        'With AI taking off, Irakani proposed that I do my professional residency in AI and open a role that did not exist yet: Generative AI Engineer. The condition was getting certified first.',
        'I earned AWS Certified AI Practitioner in under six months, taking the exam in English. I did the residency as a full member of the team, paid and with the same responsibilities as any engineer.',
      ],
    },
    learned: [
      c('AWS AI Practitioner', 'AWS AI Practitioner', 'cloud'),
      c('Amazon Bedrock', 'Amazon Bedrock', 'models'),
      c('IA responsable', 'Responsible AI', 'models'),
    ],
    lesson: {
      es: 'Cuando la empresa apostó por la IA, me preparé para ser quien la llevara a producción.',
      en: 'When the company bet on AI, I prepared to be the one who would take it to production.',
    },
    visual: 'cert',
    tool: 'amazon-q',
  },
  {
    id: 'builder-v1',
    act: 1,
    period: { es: '2025', en: '2025' },
    place: { es: 'Irakani · Builder v1', en: 'Irakani · Builder v1' },
    title: { es: 'IA dentro de la plataforma', en: 'AI inside the platform' },
    story: {
      es: [
        'Builder nació para acelerar App. La primera versión, cuando MCP apenas estaba naciendo, agregó a cada componente —listas, formularios, entidades, perfiles— la opción de crearlo con IA.',
        'Comunicación directa con el modelo vía Amazon Bedrock: el modelo generaba el JSON completo del componente, con todos sus parámetros, a partir de un system prompt que documentaba el framework entero.',
      ],
      en: [
        'Builder was born to speed up App. Its first version, while MCP was barely emerging, gave every component —lists, forms, entities, profiles— the option to create it with AI.',
        'Direct communication with the model through Amazon Bedrock: the model generated the component’s full JSON, every parameter included, from a system prompt that documented the entire framework.',
      ],
    },
    learned: [
      c('Salida estructurada (JSON)', 'Structured output (JSON)', 'models'),
      c('Ingeniería de prompts', 'Prompt engineering', 'models'),
    ],
    lesson: {
      es: 'El system prompt es documentación ejecutable: si el framework no está bien explicado, el modelo tampoco lo entiende.',
      en: 'A system prompt is executable documentation: if the framework is not explained well, the model will not get it either.',
    },
    visual: 'builder-v1',
    tool: 'amazon-q',
  },
  {
    id: 'insight',
    act: 2,
    period: { es: '2025', en: '2025' },
    place: { es: 'Irakani · Bedrock AgentCore', en: 'Irakani · Bedrock AgentCore' },
    title: { es: 'Insight, el primer agente para clientes', en: 'Insight, the first client-facing agent' },
    story: {
      es: [
        'Cuando AWS anunció Bedrock AgentCore cambió mi perspectiva. Leí completo el repositorio de ejemplos de Strands y AgentCore, que explica cada pieza que puede tener un agente: memoria, tools, gateway, system prompt, observabilidad y guardrails.',
        'Con eso construimos Insight: consulta de forma segura los datos de cada cliente. Todos comparten infraestructura y el mismo runtime; solo el servidor de datos es propio. El agente se redirige al espacio correcto sin confundirlos, y partes como la documentación se configuran por API: en un espacio consulta tanques de peces, en otro ventas en ruta.',
      ],
      en: [
        'When AWS announced Bedrock AgentCore, my perspective changed. I read the whole Strands and AgentCore samples repository, which explains every piece an agent can have: memory, tools, gateway, system prompt, observability and guardrails.',
        'With that we built Insight: it safely queries each client’s data. Everyone shares the infrastructure and the same runtime; only the data server is their own. The agent routes to the right workspace without mixing them up, and parts such as its documentation are configured through an API: in one workspace it queries fish tanks, in another route sales.',
      ],
    },
    learned: [
      c('Strands Agents', 'Strands Agents', 'agents'),
      c('AgentCore Runtime', 'AgentCore Runtime', 'agents'),
      c('Memoria', 'Memory', 'agents'),
      c('Tools', 'Tools', 'agents'),
      c('Gateway', 'Gateway', 'agents'),
      c('Guardrails', 'Guardrails', 'agents'),
      c('Observabilidad', 'Observability', 'agents'),
      c('Multi-tenant', 'Multi-tenant', 'agents'),
    ],
    lesson: {
      es: 'Un solo runtime, muchos clientes, cero cruces de datos: el aislamiento se diseña, no se espera.',
      en: 'One runtime, many clients, zero data crossover: isolation is designed, not hoped for.',
    },
    visual: 'insight',
    tool: 'kiro',
  },
  {
    id: 'builder-multi',
    act: 2,
    period: { es: '2025', en: '2025' },
    place: { es: 'Irakani · Builder multiagente', en: 'Irakani · Multi-agent Builder' },
    title: { es: 'De un prompt a un equipo de agentes', en: 'From one prompt to a team of agents' },
    story: {
      es: [
        'Con lo aprendido en Insight rediseñé Builder como sistema multiagente: un orquestador que se comunica con un subagente especializado por componente. Arrancó con seis: orquestador, aplicaciones, listas, entidades, perfiles y flujos de trabajo.',
        'Los agentes viven dentro de la misma plataforma low-code y se replican en cada espacio de trabajo. También mejoré el licenciamiento que ya existía en la empresa para que cubriera a los agentes.',
      ],
      en: [
        'With what Insight taught me, I redesigned Builder as a multi-agent system: an orchestrator talking to a specialized sub-agent per component. It started with six: orchestrator, applications, lists, entities, profiles and workflows.',
        'The agents live inside the same low-code platform and are replicated in every workspace. I also improved the company’s existing licensing so it covered the agents.',
      ],
    },
    learned: [
      c('Orquestación', 'Orchestration', 'agents'),
      c('Subagentes por dominio', 'Domain sub-agents', 'agents'),
      c('Licenciamiento', 'Licensing', 'cloud'),
    ],
    lesson: {
      es: 'Un agente por dominio se puede depurar; un prompt gigante, no.',
      en: 'One agent per domain can be debugged; one giant prompt cannot.',
    },
    visual: 'multi-agent',
    tool: 'kiro',
  },
  {
    id: 'mobile',
    act: 2,
    period: { es: '2025 — 2026', en: '2025 — 2026' },
    place: { es: 'Irakani · App móvil', en: 'Irakani · Mobile app' },
    title: { es: 'Insight en App Móvil', en: 'Insight in the Mobile App' },
    story: {
      es: [
        'La aplicación móvil estaba en Java y solo existía para Android. Quería llegar también a iOS, así que la rehíce en React Native.',
        'En la nueva versión integré a Insight, el mismo agente que ya consultaba los datos de cada cliente, sin construir otro. Fue un reto grande: en menos de un año ya es una aplicación estable y funcional en ambas plataformas.',
      ],
      en: [
        'The mobile app was written in Java and only existed on Android. I wanted to reach iOS as well, so I rebuilt it in React Native.',
        'In the new version I integrated Insight, the same agent that already queried each client’s data, instead of building another one. It was a big challenge: in under a year it became a stable, working application on both platforms.',
      ],
    },
    learned: [c('React Native', 'React Native', 'software'), c('Multiplataforma', 'Cross-platform', 'software')],
    lesson: {
      es: 'Un agente bien construido se reutiliza: Insight llegó al celular sin escribir un agente nuevo.',
      en: 'A well-built agent gets reused: Insight reached the phone without writing a new agent.',
    },
    visual: 'mobile',
    tool: 'kiro',
  },
  {
    id: 'now',
    act: 2,
    period: { es: '2026', en: '2026' },
    place: { es: 'Irakani · Builder, Insight y MCP', en: 'Irakani · Builder, Insight and MCP' },
    title: { es: 'Agentes que hablan con otros agentes', en: 'Agents talking to other agents' },
    story: {
      es: [
        'Hoy me concentro en la IA de Builder e Insight, y las mejoras al Builder multiagente ya las hago con Claude Code: caché y más agentes —usuarios, roles, base de datos y uno que configura al propio agente de Insight—, siguiendo keynotes, cursos y documentación para no quedarme atrás.',
        'Construí dos servidores MCP. El de Builder deja que Hermes —el agente que creó el líder de plataforma para dar trazabilidad a proyectos, tareas y jornadas desde Microsoft Teams— consulte varios espacios a la vez a través del orquestador. El de Insight abre sus tools a cualquier agente externo, como Claude o Copilot.',
      ],
      en: [
        'Today I focus on the AI in Builder and Insight, and I now build the multi-agent Builder improvements with Claude Code: caching and more agents —users, roles, database, and one that configures the Insight agent itself— keeping up through keynotes, courses and documentation.',
        'I built two MCP servers. Builder’s lets Hermes —the agent our platform lead created to track projects, tasks and work shifts from Microsoft Teams— query several workspaces at once through the orchestrator. Insight’s opens its tools to any external agent, such as Claude or Copilot.',
      ],
    },
    learned: [
      c('Model Context Protocol', 'Model Context Protocol', 'agents'),
      c('Interoperabilidad', 'Interoperability', 'agents'),
      c('Caché', 'Caching', 'models'),
    ],
    lesson: {
      es: 'El siguiente paso no es un agente más listo, sino agentes que colaboran a través de protocolos abiertos.',
      en: 'The next step is not a smarter agent, but agents that collaborate through open protocols.',
    },
    visual: 'ecosystem',
    tool: 'claude-code',
  },
  {
    id: 'mayordomia',
    act: 2,
    period: { es: 'Hoy', en: 'Today' },
    place: { es: 'MayordomIA · Proyecto personal', en: 'MayordomIA · Personal project' },
    title: { es: 'Un agente con cuerpo', en: 'An agent with a body' },
    story: {
      es: [
        'Hace unos meses empecé MayordomIA, un proyecto sin fines de lucro: un asistente doméstico estilo mayordomo que gestiona la casa, la agenda y la economía del hogar, pensado como plantilla para que cada hogar despliegue su propia instancia. Corre en una Raspberry Pi 4B: tres años después, otra vez una Pi.',
        'Lo construyo exclusivamente con Claude Code, bajo AI-DLC: elaborar antes de construir, una unidad de trabajo por PR y cada decisión registrada como ADR. Ya tiene voz, Telegram y app web, reconoce quién le habla, y en simulación el robot navega la casa con ROS2 y Nav2 mientras un brazo de seis grados de libertad se prueba en MuJoCo.',
      ],
      en: [
        'A few months ago I started MayordomIA, a non-profit project: a butler-style home assistant that runs the house, the calendar and the household budget, designed as a template so every home deploys its own instance. It runs on a Raspberry Pi 4B: three years later, a Pi again.',
        'I build it exclusively with Claude Code, following AI-DLC: elaborate before building, one unit of work per PR and every decision recorded as an ADR. It already has voice, Telegram and a web app, recognizes who is speaking, and in simulation the robot navigates the house with ROS2 and Nav2 while a six-degree-of-freedom arm is tested in MuJoCo.',
      ],
    },
    learned: [
      c('Claude Code', 'Claude Code', 'agents'),
      c('Confirmación humana', 'Human in the loop', 'agents'),
      c('Voz: STT y TTS', 'Voice: STT & TTS', 'models'),
      c('AI-DLC', 'AI-DLC', 'software'),
      c('ADRs', 'ADRs', 'software'),
      c('ROS2', 'ROS2', 'software'),
      c('Simulación robótica', 'Robotics simulation', 'software'),
    ],
    lesson: {
      es: 'Con un agente de código, el cuello de botella deja de ser escribir y pasa a ser decidir: elaborar, acotar y dejar registro de cada decisión.',
      en: 'With a coding agent, the bottleneck stops being writing and becomes deciding: elaborate, scope and record every decision.',
    },
    visual: 'mayordomia',
    tool: 'claude-code',
  },
  {
    id: 'next',
    act: 2,
    period: { es: 'Siguiente', en: 'Next' },
    place: { es: 'Lo que llevo a un equipo', en: 'What I bring to a team' },
    title: {
      es: 'Liderar IA agéntica',
      en: 'Leading agentic AI',
    },
    story: {
      es: [
        'Llegué a la IA agéntica construyéndola, una capa a la vez. Ahora quiero que un equipo entero construya así.',
      ],
      en: [
        'I got to agentic AI by building it, one layer at a time. Now I want a whole team building that way.',
      ],
    },
    points: {
      es: [
        'Agentes en producción, no prototipos: multi-tenant, con memoria, guardrails y observabilidad.',
        'Arquitectura multiagente: orquestador y subagentes por dominio, replicable por cliente.',
        'Interoperabilidad con MCP, para que agentes propios y externos compartan capacidades.',
        'Criterio de costo y seguridad: del modelo que descarté en una Raspberry Pi a la caché, el licenciamiento y el aislamiento de datos.',
        'Desarrollo con agentes y con método: de ChatGPT a Claude Code, con decisiones registradas y una unidad de trabajo por PR.',
      ],
      en: [
        'Agents in production, not prototypes: multi-tenant, with memory, guardrails and observability.',
        'Multi-agent architecture: an orchestrator and domain sub-agents, replicable per client.',
        'Interoperability through MCP, so in-house and external agents share capabilities.',
        'Judgment on cost and security: from the model I dropped on a Raspberry Pi to caching, licensing and data isolation.',
        'Building with agents, with method: from ChatGPT to Claude Code, with recorded decisions and one unit of work per PR.',
      ],
    },
    learned: [],
    lesson: {
      es: 'De preguntarle cosas a ChatGPT a diseñar sistemas multiagente en producción, en unos tres años.',
      en: 'From asking ChatGPT questions to designing production multi-agent systems, in about three years.',
    },
    visual: 'closing',
    tool: 'claude-code',
  },
];
