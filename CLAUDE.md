# Claude Code — estebanrv.art Website V3

## Assets

- Before implementing any image or PDF, optimize it for web first:
  - Images: compress and convert to WebP (or AVIF where supported). Target ≤ 200 KB for most images, ≤ 500 KB for hero/full-bleed assets.
  - PDFs: reduce file size (ghostscript, pdf2ps, or equivalent) before embedding or linking.
  - Do not commit unoptimized originals to the repo unless kept in a clearly labeled `assets/originals/` folder.

## Scores

When importing a musical score (PDF) to display on a page:

1. **Trim the file** — exclude the title page, then keep:
   - Files ≥ 20 pages: at most 10% of the remaining pages (round down).
   - Files ≤ 5 pages: at most 1 page of the remaining pages.
   - Files between 5 and 20 pages: ask where to trim before proceeding.
   - If the trim point is ambiguous for any file length, ask before cutting.
2. **Watermark every kept page** with the text: `Propiedad de Esteban Ruiz-Velasco` (diagonal, centered, semi-transparent).
3. **Discard the rest** — do not include the full score anywhere in the build or repo. Only the trimmed, watermarked excerpt is committed.
4. Apply web optimization (see Assets section) after trimming and watermarking.

## General

- Inherit all rules from the global CLAUDE.md and the GitHub-level CLAUDE.md.
