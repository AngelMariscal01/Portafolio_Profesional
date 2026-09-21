import type { L10n } from './types';

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: L10n;
  isoDate: string;
  description: L10n;
  image?: string;
  link?: string;
}

export interface EducationItem {
  id: string;
  degree: L10n;
  institution: string;
  period: string;
  location: L10n;
  detail?: L10n;
}

export interface Award {
  id: string;
  title: L10n;
  issuer: L10n;
  year: string;
}

export const certifications: Certification[] = [
  {
    id: 'aws-aip',
    title: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    date: { es: '2025', en: '2025' },
    isoDate: '2025',
    description: {
      es: 'Valida el dominio de conceptos de IA, machine learning e IA generativa en AWS: selección de la tecnología adecuada para cada caso de uso y aplicación responsable de estas herramientas.',
      en: 'Validates command of AI, machine learning and generative AI concepts on AWS: selecting the right technology per use case and applying these tools responsibly.',
    },
    image: '/images/aws.webp',
    link: 'https://www.credly.com/badges/bd60b9f1-8ebe-4f06-9bdd-00fcbb84cd3c/linked_in_profile',
  },
  {
    id: 'huawei-hccda',
    title: 'Huawei Cloud Developer Associate (HCCDA — Tech Essentials)',
    issuer: 'Huawei Cloud',
    date: { es: '2025', en: '2025' },
    isoDate: '2025',
    description: {
      es: 'Certificación que acredita conocimientos fundamentales de desarrollo y servicios sobre Huawei Cloud.',
      en: 'Certification accrediting foundational development and services knowledge on Huawei Cloud.',
    },
    image: '/images/huaweicloud.jpg',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7372288452152918016/',
  },
  {
    id: 'henry-ds',
    title: 'Data Science Bootcamp',
    issuer: 'Soy Henry',
    date: { es: '2024', en: '2024' },
    isoDate: '2024',
    description: {
      es: 'Programa intensivo de ciencia e ingeniería de datos: Python, SQL, estadística, machine learning y despliegue de soluciones en la nube.',
      en: 'Intensive data science and data engineering program: Python, SQL, statistics, machine learning and cloud deployment.',
    },
    image: '/images/henry.png',
    link: 'https://www.soyhenry.com/data-scientist',
  },
];

export const education: EducationItem[] = [
  {
    id: 'itszamora',
    degree: {
      es: 'Ingeniería en Sistemas Computacionales',
      en: 'B.Eng. in Computer Systems Engineering',
    },
    institution: 'Tecnológico Nacional de México',
    period: '2021 — 2025',
    location: { es: 'Zamora, Michoacán, México', en: 'Zamora, Michoacán, Mexico' },
    detail: {
      es: 'Especialidad en Cómputo en la Nube y Ciberseguridad. Residencias profesionales en desarrollo de una plataforma low-code asistida por IA generativa.',
      en: 'Specialization in Cloud Computing and Cybersecurity. Professional residency developing a generative-AI-assisted low-code platform.',
    },
  },
];

export const awards: Award[] = [
  {
    id: 'coding-cup-2024',
    title: { es: 'Coding Cup, edición Michoacán', en: 'Coding Cup, Michoacán edition' },
    issuer: { es: 'Tecnológico Nacional de México', en: 'Tecnológico Nacional de México' },
    year: '2024',
  },
  {
    id: 'concurso-2024',
    title: { es: 'XII Concurso Local de Programación', en: 'XII Local Programming Contest' },
    issuer: { es: 'Tecnológico Nacional de México', en: 'Tecnológico Nacional de México' },
    year: '2024',
  },
  {
    id: 'concurso-2023',
    title: { es: 'XI Concurso Local de Programación', en: 'XI Local Programming Contest' },
    issuer: { es: 'Tecnológico Nacional de México', en: 'Tecnológico Nacional de México' },
    year: '2023',
  },
];
