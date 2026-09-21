import type { L10n } from './types';

export interface SkillGroup {
  id: string;
  title: L10n;
  /** Plain keywords. These double as the ATS keyword surface for the CV. */
  items: string[];
  /** Marks the group that leads the section and the CV. */
  primary?: boolean;
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'genai',
    primary: true,
    title: { es: 'IA Generativa y Sistemas Agénticos', en: 'Generative AI & Agentic Systems' },
    items: [
      'Amazon Bedrock',
      'Bedrock AgentCore',
      'Claude (Sonnet / Opus)',
      'Strands Agents',
      'LangChain',
      'Multi-agent orchestration',
      'Tool use / function calling',
      'RAG',
      'Prompt engineering',
      'Guardrails',
      'MCP (Model Context Protocol)',
      'LLM observability',
    ],
  },
  {
    id: 'cloud',
    title: { es: 'Cloud e Infraestructura', en: 'Cloud & Infrastructure' },
    items: [
      'AWS Lambda',
      'AWS CDK',
      'Amazon Cognito',
      'Amazon S3',
      'Amazon DynamoDB',
      'Amazon ECR',
      'API Gateway',
      'AWS Copilot',
      'VPC & IAM',
      'Google Cloud (Run, Functions, BigQuery)',
      'Huawei Cloud',
      'Docker',
      'CI/CD',
      'Linux',
    ],
  },
  {
    id: 'backend',
    title: { es: 'Backend y Datos', en: 'Backend & Data' },
    items: [
      'Python',
      'Node.js',
      'Express',
      'Java',
      'Spring Boot',
      'C#',
      'REST APIs',
      'Serverless',
      'SQL Server',
      'PostgreSQL',
      'MySQL',
      'SQLite',
      'Redis / Valkey',
      'WebSockets',
    ],
  },
  {
    id: 'frontend',
    title: { es: 'Frontend y Móvil', en: 'Frontend & Mobile' },
    items: [
      'TypeScript',
      'React',
      'React Native',
      'Expo',
      'Astro',
      'Tailwind CSS',
      'Monaco Editor',
      'Offline-first architecture',
      'Vite',
      'Vitest',
      'Jest',
    ],
  },
  {
    id: 'data',
    title: { es: 'Ciencia de Datos', en: 'Data Science' },
    items: [
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'XGBoost',
      'FastAPI',
      'Streamlit',
      'Matplotlib / Seaborn',
      'NLTK',
      'Power BI',
      'ETL',
    ],
  },
  {
    id: 'practices',
    title: { es: 'Prácticas y Herramientas', en: 'Practices & Tooling' },
    items: [
      'Git',
      'Bitbucket Pipelines',
      'GitHub Actions',
      'Code review',
      'Technical documentation',
      'Agile / Scrum',
      'Secure development',
      'Kiro',
      'Claude Code',
    ],
  },
];

/** Flat list used for JSON-LD `knowsAbout` and CV keyword coverage. */
export const allSkills: string[] = skillGroups.flatMap((g) => g.items);
