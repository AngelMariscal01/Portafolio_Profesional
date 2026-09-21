# Perfil de GitHub — plan y texto listo para pegar

Posicionamiento: **Generative AI / Agentic Systems Engineer**.

El README va en inglés. GitHub es una plataforma internacional cuya interfaz y
audiencia por defecto son en inglés, y es donde miran los reclutadores de
nearshore. Tu español ya está cubierto por el portafolio, que abre en español.
Si prefieres español, dímelo y lo traduzco.

---

## 1. Bio (Settings → Public profile)

Máximo 160 caracteres. La actual es una lista de etiquetas que no dice qué
haces:

> Computer Systems Engineer | Data Science | Data Engineer | Data Analyst | Python | Java | SQL

Cámbiala por:

```
Generative AI Engineer · Production agents on AWS Bedrock AgentCore · Python, TypeScript, AWS · AWS Certified AI Practitioner · Remote LATAM
```

Y en los demás campos de esa misma pantalla:

| Campo | Valor |
| --- | --- |
| Name | `Angel David Mariscal Soto` |
| Company | `Irakani (Iteradapta)` |
| Location | `Zamora, Michoacán, Mexico` |
| Website | tu URL del portafolio |
| Social accounts | LinkedIn, y el portafolio otra vez |

Marca también **«Include private contributions on my profile»** en
*Settings → Profile*. Tu trabajo fuerte vive en Bitbucket privado, pero cualquier
actividad privada de GitHub que tengas hoy aparece como cuadros vacíos.

---

## 2. Repositorios fijados (Pinned)

Se pueden fijar seis. Elige estos, en este orden:

1. `Portafolio_Profesional`
2. `MDA`
3. `P1`
4. `PI.2`
5. `Documentacion_Residencias_Profesionales`
6. `EventosApp`

---

## 3. Descripciones de repositorio

Trece de tus veinte repos no tienen descripción. En la lista de repos y en los
resultados de búsqueda, un repo sin descripción se ve abandonado. Estas son las
que faltan o conviene reescribir:

| Repo | Descripción |
| --- | --- |
| `Portafolio_Profesional` | Bilingual portfolio built with Astro, React islands and Tailwind, plus ATS-ready LaTeX CV sources |
| `MDA` | Ordering system for a local bakery: customer portal and admin panel. React, Node.js, Express, PostgreSQL |
| `P1` | Steam game analytics and recommendation API. ETL with Pandas, sentiment analysis with NLTK, served with FastAPI |
| `PI.2` | Interactive Streamlit dashboard analysing road accidents in Buenos Aires, with road-safety KPIs |
| `EventosApp` | Desktop event access control with QR and barcode scanning. Python, Tkinter, JSON persistence |
| `Documentacion_Residencias_Profesionales` | LaTeX documentation of my professional residency: a generative-AI-assisted low-code platform |
| `RutasProlog` | Pathfinding over a World of Warcraft fact base, written in Prolog |
| `StreamlitIA` | Streamlit experiments with AI models |
| `irakani-builder-dashboard` | Dashboard experiments for a low-code application builder |
| `proyectoaws` | AWS service experiments |
| `CursoNODE` | Node.js course exercises |
| `Practica2_2` | Coursework |
| `Python-Prep` | Python fundamentals, Soy Henry prep course |

Los que quedan sin terminar (`BlogWeb`, `BarberiaWeb`, `WebDemo`,
`webFerreteria`, `Portafolio`) conviene **archivarlos**. Archivar no borra nada:
los marca como solo lectura y los saca del ruido. Un repo con «(sin terminar)»
en la descripción resta.

---

## 4. README del perfil

Va en `AngelMariscal01/README.md`. Reemplaza el contenido completo por lo que
sigue.

Tres cosas que quito del actual y por qué:

- **El número de teléfono.** Un perfil público de GitHub lo rastrean bots. Tu
  correo ya es suficiente, y tu teléfono está en el CV, que se descarga.
- **Las insignias de shields.io.** Los badges `for-the-badge` de LinkedIn y
  Gmail leen como plantilla; enlaces de texto leen como alguien que escribió su
  propio perfil.
- **El volcado de CV.** Educación, experiencia completa y stack exhaustivo son
  para el CV. El README debe hacer que alguien quiera abrirlo.

Lo que sí recupero: **tus posiciones en los concursos**, que estaban enterradas
al final y son de lo más fuerte que tienes.

````markdown
# Angel David Mariscal Soto

**Generative AI & Agentic Systems Engineer** — I build AI agents that reach production, not just a demo.

I design multi-agent systems on Amazon Bedrock and Bedrock AgentCore with Claude, the serverless AWS
APIs that connect them to real business systems, and the React and TypeScript products that put them
in front of users who don't need to know there is a model behind it.

Most of what I build day to day is client work in private repositories. What lives here is the
open part: data engineering, full-stack products, and the tooling around them.

🌐 [Portfolio](https://portafolio-angeldavidmariscalsoto-delta.vercel.app) ·
💼 [LinkedIn](https://www.linkedin.com/in/angel-david-mariscal-soto-b5235925a/) ·
📄 [CV (EN)](https://portafolio-angeldavidmariscalsoto-delta.vercel.app/cv/Angel-Mariscal-CV-EN.pdf) ·
✉️ angel.mariscal.soto@gmail.com

---

### What I'm working on

Production agents on **Bedrock AgentCore**: an orchestrator that classifies intent and delegates to
domain-specialized agents, a tool layer that validates execution plans before anything runs, and
persistent conversational memory. A single agent holding every tool is unpredictable and nearly
impossible to debug — splitting by domain is what makes the behaviour reproducible.

Alongside it, the low-code platform that exposes those agents to business teams, and an offline-first
React Native application for field work where connectivity is not a given.

### Stack

**Generative AI** Amazon Bedrock · Bedrock AgentCore · Claude · Strands Agents · LangChain ·
multi-agent orchestration · tool use · RAG · MCP · guardrails · LLM observability

**Cloud** AWS (Lambda, CDK, Cognito, S3, DynamoDB, ECR, API Gateway, IAM, VPC, Copilot) ·
Google Cloud (Run, Functions, BigQuery) · Huawei Cloud · Docker · CI/CD · Linux

**Languages** Python · TypeScript · JavaScript · Java · C# · C++ · SQL

**Backend** Node.js · Express · Spring Boot · FastAPI · Flask · REST · serverless · WebSockets

**Frontend & Mobile** React · React Native · Expo · Astro · Tailwind CSS · offline-first architecture

**Data** PostgreSQL · SQL Server · MySQL · SQLite · Pandas · Scikit-learn · XGBoost · ETL · Power BI

### Selected repositories

| | |
| --- | --- |
| [**Portafolio_Profesional**](https://github.com/AngelMariscal01/Portafolio_Profesional) | Bilingual portfolio on Astro with React islands, plus ATS-ready LaTeX CV sources |
| [**MDA**](https://github.com/AngelMariscal01/MDA) | Ordering system that replaced manual social-media orders for a local business |
| [**P1**](https://github.com/AngelMariscal01/P1) | Steam analytics and recommendation API — ETL, sentiment analysis, FastAPI |
| [**PI.2**](https://github.com/AngelMariscal01/PI.2) | Streamlit dashboard for road-safety KPIs over Buenos Aires accident data |
| [**Documentacion_Residencias_Profesionales**](https://github.com/AngelMariscal01/Documentacion_Residencias_Profesionales) | LaTeX documentation of my professional residency on the low-code platform |

### Credentials

**AWS Certified AI Practitioner** (2025) · **Huawei Cloud Developer Associate — HCCDA Tech Essentials** (2025) ·
**Data Science Bootcamp**, Soy Henry (2024)

B.Eng. Computer Systems Engineering, Tecnológico Nacional de México — specialization in Cloud
Computing and Cybersecurity.

**Programming contests** — 1st place, XI Local Programming Contest (advanced category, 2023) ·
2nd place, XII Local Programming Contest (open category, 2024) · 2nd place, Hackathon ITESZ (2024) ·
Coding Cup Michoacán (2024)

---

📍 Zamora, Michoacán, Mexico (GMT-6) · open to remote roles across LATAM · Spanish & English
````

---

## 5. Lo único que de verdad mueve la aguja

Tu mejor trabajo (cientos de commits en el builder y en la app móvil) está en
Bitbucket privado, así que tu GitHub público no lo refleja. Ningún texto
arregla eso.

Lo que sí lo arregla es **un repo público pequeño con un agente**. No hace falta
que sea grande. Algo como:

> Un agente con dos o tres herramientas sobre Bedrock, con validación del plan
> antes de ejecutar, manejo de errores y unas pruebas. README que explique por
> qué el plan se valida antes. Doscientas líneas bien escritas.

Eso es exactamente lo que un reclutador técnico quiere ver y lo que casi nadie
publica, porque casi todos suben notebooks de tutorial. Con ese repo fijado en
primer lugar, tu perfil de GitHub deja de ser el eslabón débil de tu
candidatura.
