#!/usr/bin/env bash
# Compiles both CVs and copies the PDFs into the site's public/cv directory,
# under the filenames the portfolio's download buttons expect.
set -euo pipefail

cd "$(dirname "$0")"
OUT="../public/cv"
mkdir -p "$OUT"

for lang in en es; do
  # Twice: the first pass writes the .aux, the second resolves it.
  pdflatex -interaction=nonstopmode -halt-on-error "cv-$lang.tex" >/dev/null
  pdflatex -interaction=nonstopmode -halt-on-error "cv-$lang.tex" >/dev/null
  echo "built cv-$lang.pdf"
done

cp cv-en.pdf "$OUT/Angel-Mariscal-CV-EN.pdf"
cp cv-es.pdf "$OUT/Angel-Mariscal-CV-ES.pdf"
echo "copied to $OUT"

# Build artefacts; the PDFs themselves are kept.
rm -f ./*.aux ./*.log ./*.out
