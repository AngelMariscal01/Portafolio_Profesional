# Portafolio — Angel David Mariscal Soto

Sitio personal bilingüe (ES/EN) construido con Astro, islas de React y
Tailwind CSS, más las fuentes LaTeX del CV.

Producción: <https://portafolio-angeldavidmariscalsoto-delta.vercel.app>

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor local en `localhost:4321` |
| `npm run build` | Compila el sitio estático a `./dist/` |
| `npm run preview` | Previsualiza el build antes de desplegar |
| `./cv/build.sh` | Compila los dos CV y los copia a `public/cv/` |

## Estructura

```text
src/
├── content/          # Todo el contenido, bilingüe. Es la única fuente de verdad.
│   ├── profile.ts    #   Datos personales, bio, contacto, métricas del hero
│   ├── experience.ts #   Puestos y logros
│   ├── projects.ts   #   Proyectos, con problema / contribución / stack
│   ├── skills.ts     #   Stack agrupado (también alimenta el JSON-LD)
│   ├── credentials.ts#   Certificaciones, formación, concursos
│   ├── site.ts       #   Navegación, metadatos y cadenas de interfaz
│   └── types.ts      #   Lang, L10n y los helpers de traducción
├── lib/              # i18n e iconos inline
├── components/       # Secciones en .astro (cero JS) + islas de React
│   └── react/        #   ProjectsGrid: filtro y modal accesible
├── layouts/          # Layout.astro: SEO, hreflang, JSON-LD, tema
└── pages/
    ├── index.astro   # Español (raíz)
    ├── en/index.astro# Inglés
    └── 404.astro
cv/                   # Fuentes LaTeX del CV (ver cv/README.md)
```

## Cómo editar el contenido

Todo el texto vive en `src/content/`. Cada cadena es un objeto
`{ es: '…', en: '…' }`, así que ambos idiomas se editan juntos y no se pueden
desincronizar sin que TypeScript se queje.

Para agregar un proyecto, añade una entrada a `src/content/projects.ts`. Los
campos `problem` y `contributions` son los que lee un reclutador: describe el
problema real y qué construiste tú, no la lista de funcionalidades.

Los proyectos marcados con `confidential: true` muestran una nota en lugar de un
enlace al repositorio.

## Decisiones de arquitectura

- **Rutas por idioma, no toggle en cliente.** `/` es español y `/en` inglés, con
  `hreflang` y `canonical` correctos, para que Google indexe ambas versiones.
  Un toggle en JavaScript deja una sola URL indexable.
- **Cero JavaScript salvo donde hace falta.** Las secciones son `.astro` puro.
  La única isla de React es la retícula de proyectos, hidratada con
  `client:visible`, porque ahí sí hay estado (filtro y modal).
- **El modal usa `<dialog>` nativo**, que trae gratis trampa de foco, cierre con
  Escape y `aria-modal`.
- **El tema se resuelve antes del primer pintado** con un script inline en
  `Layout.astro`, para que no haya destello de tema claro.
- **JSON-LD `Person`** con `knowsAbout` generado desde `skills.ts`, para que el
  stack sea legible por máquinas además de por personas.
