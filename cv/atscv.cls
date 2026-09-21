%% atscv.cls — a single-column resume class built for applicant tracking systems.
%%
%% Design rules, all of them deliberate:
%%   * One column. Multi-column layouts scramble the reading order of pdftotext,
%%     which is the extractor most ATS pipelines are built on.
%%   * No images, no icons, no text boxes, no tikz. Anything that is not a glyph
%%     is invisible to a parser — or worse, garbles the text around it.
%%   * \pdfgentounicode=1 plus the ToUnicode map, so copy-paste and extraction
%%     return real characters instead of mojibake. This is the single most
%%     important line in the file.
%%   * Standard, plainly-named sections in uppercase text.
%%   * Dates share a text line with the role they belong to, so they never
%%     orphan into a line of their own during extraction.
%%   * Dependencies limited to what ships with a basic TeX Live install
%%     (no enumitem, no titlesec, no font packages beyond psnfss), so this
%%     compiles unchanged on Overleaf, in CI, and on a fresh machine.

\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{atscv}[2026/09/21 ATS-friendly single-column resume]

\LoadClass[letterpaper,10pt]{article}

% ------------------------------------------------------------------ encoding
\RequirePackage[T1]{fontenc}
\RequirePackage[utf8]{inputenc}
\RequirePackage[english,spanish]{babel}

% Spanish babel makes " < > and ~ active, which breaks URLs and stray quotes.
\AtBeginDocument{\shorthandoff{<>"~}}

% ATS extraction: map T1 glyphs back to Unicode so accents survive pdftotext.
\input{glyphtounicode}
\pdfgentounicode=1

% ------------------------------------------------------------------ geometry
\RequirePackage[
  letterpaper,
  top=0.4in,
  bottom=0.3in,
  left=0.55in,
  right=0.55in,
  footskip=0.25in
]{geometry}

\RequirePackage{xcolor}
\RequirePackage{array}
\RequirePackage{tabularx}

% A ragged-right X column. Justified text inside tabularx produces underfull
% boxes and, worse, stretched inter-word gaps that confuse word segmentation
% in PDF text extractors.
\newcolumntype{L}{>{\RaggedRight\arraybackslash}X}
\RequirePackage{ragged2e}
\RequirePackage{microtype}
\RequirePackage[hidelinks]{hyperref}

\hypersetup{colorlinks=false, pdfborder={0 0 0}, pdfstartview=FitH}

% ------------------------------------------------------------------ fonts
% Best available humanist sans, degrading to what a basic TeX Live ships.
% Every option here is an ordinary text face with full T1 coverage — exactly
% what a parser wants — so the fallback changes the look, never the extraction.
%   1. Source Sans Pro  (full TeX Live, Overleaf)
%   2. TeX Gyre Heros   (Helvetica clone)
%   3. Helvetica        (psnfss, when its T1 metrics are installed)
%   4. Latin Modern Sans (always present)
\IfFileExists{sourcesanspro.sty}{%
  \RequirePackage[default]{sourcesanspro}%
}{\IfFileExists{tgheros.sty}{%
  \RequirePackage{tgheros}%
}{\IfFileExists{phvr8t.tfm}{%
  \RequirePackage{helvet}%
}{%
  \RequirePackage{lmodern}%
}}}
\renewcommand{\familydefault}{\sfdefault}

\definecolor{ruleink}{gray}{0.60}
\definecolor{softink}{gray}{0.34}

% ------------------------------------------------------------------ layout
\pagestyle{empty}
\setlength{\parindent}{0pt}
\setlength{\parskip}{0pt}
\setlength{\tabcolsep}{0pt}
\raggedbottom
\setlength{\hfuzz}{1.5pt}

% No hyphenation. A keyword split as "multi-agent sys-tems" across a line break
% can miss an exact-phrase match in a keyword screen, and ragged-right text does
% not need the hyphens to look right anyway.
\hyphenpenalty=10000
\exhyphenpenalty=10000
\tolerance=9999
\emergencystretch=3em
\linespread{0.93}\selectfont
\RaggedRight

% ------------------------------------------------------------------ sections
% Defined by hand rather than via titlesec, to keep the dependency list short.
\newcommand{\cvsection}[1]{%
  \par\vspace{0.46em}%
  {\fontsize{10.5}{12}\selectfont\bfseries\MakeUppercase{#1}}%
  \par\vspace{0.14em}%
  {\color{ruleink}\hrule height 0.6pt}%
  \par\vspace{0.34em}%
}

\renewcommand{\section}{\cvsection}

% ------------------------------------------------------------------ header
\newcommand{\cvname}[1]{%
  \begin{center}{\fontsize{19}{22}\selectfont\bfseries #1}\end{center}%
  \vspace{-0.6em}%
}

\newcommand{\cvtitle}[1]{%
  \begin{center}{\fontsize{11}{13}\selectfont #1}\end{center}%
  \vspace{-0.6em}%
}

\newcommand{\cvsep}{\;\textcolor{ruleink}{\textbar}\;}

\newcommand{\cvcontact}[1]{%
  \begin{center}{\fontsize{8.6}{10.5}\selectfont #1}\end{center}%
  \vspace{-0.7em}%
}

% ------------------------------------------------------------------ entries
% \cventry{Role}{Organization}{Location}{Dates}
\newcommand{\cventry}[4]{%
  \par\vspace{0.36em}%
  \begin{tabularx}{\linewidth}{@{}L @{\hspace{2em}} r@{}}
    \textbf{#1} & \textbf{#4}
  \end{tabularx}%
  \par\vspace{0.05em}%
  {\small #2\ifx\relax#3\relax\else\textcolor{softink}{, #3}\fi}%
  \par%
}

% \cvline{Left}{Right} — one-line entry for education and certifications.
\newcommand{\cvline}[2]{%
  \par\vspace{0.22em}%
  \begin{tabularx}{\linewidth}{@{}L @{\hspace{2em}} r@{}}
    #1 & #2
  \end{tabularx}%
  \par%
}

% \cvproject{Name}{Stack}{Dates}
\newcommand{\cvproject}[3]{%
  \par\vspace{0.38em}%
  \begin{tabularx}{\linewidth}{@{}L @{\hspace{2em}} r@{}}
    \textbf{#1} & #3
  \end{tabularx}%
  \ifx\relax#2\relax\else\par\vspace{0.05em}{\small\textcolor{softink}{#2}}\fi
  \par%
}

% ------------------------------------------------------------------ bullets
% A hand-rolled list, since enumitem is not guaranteed to be installed.
\newenvironment{cvbullets}{%
  \begin{list}{\textbullet}{%
    \setlength{\leftmargin}{1.05em}%
    \setlength{\labelwidth}{0.6em}%
    \setlength{\labelsep}{0.45em}%
    \setlength{\itemindent}{0pt}%
    \setlength{\listparindent}{0pt}%
    \setlength{\topsep}{0.24em}%
    \setlength{\parsep}{0pt}%
    \setlength{\itemsep}{0.08em}%
    \setlength{\partopsep}{0pt}%
  }\small
}{%
  \end{list}\vspace{0.05em}%
}

% \cvskill{Category}{comma, separated, keywords}
\newcommand{\cvskill}[2]{%
  % The colon and the space after it stay in the upright font, so they belong
  % to the same PDF text run as the value. A space that straddles a font change
  % is emitted as positioning, not as a character, and strict extractors then
  % report "Skills:Python".
  \par{\small\textbf{#1}: #2}\par\vspace{0.2em}%
}

\newcommand{\cvsummary}[1]{\par{\small #1}\par}
