# CV — ATS-ready LaTeX sources

Two one-page resumes built from a shared class, `atscv.cls`.

| File | Language | Output |
| --- | --- | --- |
| `cv-en.tex` | English | `../public/cv/Angel-Mariscal-CV-EN.pdf` |
| `cv-es.tex` | Español | `../public/cv/Angel-Mariscal-CV-ES.pdf` |

## Build

```bash
./build.sh
```

Compiles both with `pdflatex` and copies the PDFs into `public/cv/`, which is
where the portfolio's **Download CV** buttons point.

To build one by hand:

```bash
pdflatex -interaction=nonstopmode cv-en.tex
```

Works on Overleaf too: upload `atscv.cls` plus the `.tex` file and set the
compiler to pdfLaTeX.

## Why it is built this way

Most applicant tracking systems do not read a PDF the way a person does. They
run a text extractor over it and match keywords against the job posting. Every
decision in `atscv.cls` protects that extraction:

- **One column.** Multi-column layouts scramble the reading order of
  `pdftotext`, the extractor most ATS pipelines are built on.
- **`\pdfgentounicode=1`** with the `glyphtounicode` map. Without it, T1-encoded
  accents come out as mojibake and `Michoacán` stops matching `Michoacan`.
  This is the single most important line in the class.
- **No images, no icons, no TikZ.** Anything that is not a glyph is invisible to
  a parser, and icon fonts often garble the text around them.
- **No hyphenation.** A keyword split as `multi-agent sys-tems` across a line
  break can miss an exact-phrase match. Ragged-right text does not need the
  hyphens anyway.
- **Separators live in the upright font.** A space that straddles a bold-to-
  regular font change is emitted as positioning, not as a character, so strict
  extractors report `Skills:Python`. Keeping `: ` in the same run as the value
  fixes it.
- **A 2 em column gap** before right-aligned dates, so a long job title never
  abuts its date and extracts as `Engineer2025`.
- **PDF metadata** — title, author, subject and a keyword list — because some
  parsers read those fields before touching the page body.
- **Ordinary fonts only.** The class picks the best available of Source Sans
  Pro, TeX Gyre Heros, Helvetica or Latin Modern Sans, so it compiles on a bare
  TeX Live and looks its best on a full one.

## Verifying a change

After editing, confirm the text still extracts cleanly:

```bash
pdftotext -layout cv-en.pdf - | less
```

Read it as a machine would. If two words are glued together, or an accent came
out wrong, a keyword screen will see the same thing.

## House rules

- **Keep each file to one page.** Recruiters skim; a second page for three
  years of experience reads as padding. If you add a role, cut a bullet
  somewhere else.
- **Lead each bullet with a verb** and close it with the consequence.
- **Never invent a metric.** A number you cannot defend in an interview is worse
  than no number. When you do have a real one, put it in.
- **Mirror the job posting's vocabulary** in the skills section — that is what
  the keyword screen compares against — but only for things you have actually
  done.
