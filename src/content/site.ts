import type { L10n, Lang } from './types';
import { profile } from './profile';

export const SITE_URL = 'https://portafolio-angeldavidmariscalsoto-delta.vercel.app';

export interface NavItem {
  id: string;
  label: L10n;
}

export const navItems: NavItem[] = [
  { id: 'sobre-mi', label: { es: 'Perfil', en: 'Profile' } },
  { id: 'experiencia', label: { es: 'Experiencia', en: 'Experience' } },
  { id: 'proyectos', label: { es: 'Proyectos', en: 'Projects' } },
  { id: 'skills', label: { es: 'Stack', en: 'Stack' } },
  { id: 'credenciales', label: { es: 'Credenciales', en: 'Credentials' } },
  { id: 'contacto', label: { es: 'Contacto', en: 'Contact' } },
];

export const meta: Record<Lang, { title: string; description: string }> = {
  es: {
    title: `${profile.shortName} — Ingeniero de IA Generativa`,
    description:
      'Ingeniero de IA Generativa y Sistemas Agénticos. Agentes en producción sobre AWS Bedrock AgentCore, plataformas low-code y aplicaciones móviles empresariales. AWS Certified AI Practitioner.',
  },
  en: {
    title: `${profile.shortName} — Generative AI Engineer`,
    description:
      'Generative AI & Agentic Systems Engineer. Production agents on AWS Bedrock AgentCore, low-code platforms and enterprise mobile applications. AWS Certified AI Practitioner.',
  },
};

/** Every visible string that is not project or role content. */
export const ui = {
  skipToContent: { es: 'Saltar al contenido', en: 'Skip to content' },
  menu: { es: 'Menú', en: 'Menu' },
  close: { es: 'Cerrar', en: 'Close' },
  switchLang: { es: 'English', en: 'Español' },
  switchLangAria: { es: 'View this page in English', en: 'Ver esta página en español' },
  themeToggle: { es: 'Cambiar tema', en: 'Toggle theme' },

  heroCtaProjects: { es: 'Ver proyectos', en: 'View projects' },
  heroCtaCv: { es: 'Descargar CV', en: 'Download CV' },
  heroCtaContact: { es: 'Hablemos', en: 'Get in touch' },
  scrollHint: { es: 'Desplázate', en: 'Scroll' },

  sectionProfile: { es: 'Perfil', en: 'Profile' },
  sectionProfileLead: {
    es: 'Quién soy y cómo trabajo',
    en: 'Who I am and how I work',
  },

  sectionExperience: { es: 'Experiencia', en: 'Experience' },
  sectionExperienceLead: {
    es: 'Dónde he construido y qué me tocó resolver',
    en: 'Where I have built and what I had to solve',
  },

  sectionProjects: { es: 'Proyectos', en: 'Projects' },
  sectionProjectsLead: {
    es: 'Selección de trabajo profesional y personal',
    en: 'A selection of professional and personal work',
  },

  sectionSkills: { es: 'Stack técnico', en: 'Technical stack' },
  sectionSkillsLead: {
    es: 'Herramientas con las que trabajo a diario',
    en: 'The tools I work with day to day',
  },

  sectionCredentials: { es: 'Credenciales', en: 'Credentials' },
  sectionCredentialsLead: {
    es: 'Certificaciones, formación y reconocimientos',
    en: 'Certifications, education and recognition',
  },

  sectionContact: { es: 'Contacto', en: 'Contact' },
  sectionContactLead: {
    es: 'La forma más rápida de llegar a mí',
    en: 'The fastest way to reach me',
  },

  readMore: { es: 'Ver detalle', en: 'View details' },
  viewRepo: { es: 'Código', en: 'Source' },
  viewDemo: { es: 'Demo', en: 'Live demo' },
  viewCredential: { es: 'Verificar credencial', en: 'Verify credential' },
  confidentialNote: {
    es: 'Trabajo de cliente. El repositorio es privado; puedo comentar la arquitectura en una entrevista.',
    en: 'Client work. The repository is private; happy to walk through the architecture in an interview.',
  },
  confidentialBadge: { es: 'Privado', en: 'Private' },
  currentBadge: { es: 'Actual', en: 'Current' },

  labelProblem: { es: 'El problema', en: 'The problem' },
  labelContribution: { es: 'Mi contribución', en: 'What I built' },
  labelOutcome: { es: 'Resultado', en: 'Outcome' },
  labelStack: { es: 'Stack', en: 'Stack' },
  labelHighlights: { es: 'Lo que hice', en: 'What I did' },
  labelAll: { es: 'Todos', en: 'All' },

  contactEmail: { es: 'Correo', en: 'Email' },
  contactPhone: { es: 'Teléfono', en: 'Phone' },
  contactLocation: { es: 'Ubicación', en: 'Location' },
  contactCopy: { es: 'Copiar', en: 'Copy' },
  contactCopied: { es: 'Copiado', en: 'Copied' },

  education: { es: 'Formación', en: 'Education' },
  awardsTitle: { es: 'Concursos y reconocimientos', en: 'Contests and recognition' },
  languagesTitle: { es: 'Idiomas', en: 'Languages' },

  footerBuilt: {
    es: 'Construido con Astro, React y Tailwind CSS.',
    en: 'Built with Astro, React and Tailwind CSS.',
  },
  footerRights: { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },

  notFoundTitle: { es: 'Página no encontrada', en: 'Page not found' },
  notFoundBody: {
    es: 'El enlace que seguiste no existe o cambió de sitio.',
    en: 'The link you followed does not exist or has moved.',
  },
  notFoundCta: { es: 'Volver al inicio', en: 'Back home' },
} satisfies Record<string, L10n>;

export type UiKey = keyof typeof ui;
