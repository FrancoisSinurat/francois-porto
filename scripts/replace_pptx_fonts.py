"""Replace missing custom fonts in portfolio PPTX with Calibri."""

from pathlib import Path
import shutil
import zipfile
import tempfile
import re

from pptx import Presentation
from pptx.enum.shapes import MSO_SHAPE_TYPE

SRC = Path(r"c:\Users\noval\Documents\BERKAS PENTING NOVAL\Francois Porto Updated.pptx")
OUT = Path(r"c:\Users\noval\Documents\BERKAS PENTING NOVAL\Francois Porto Updated.pptx")

# Map run font names -> (Calibri name, force_bold)
FONT_MAP = {
    "Poppins": ("Calibri", None),
    "Poppins ": ("Calibri", None),
    "Poppins Bold": ("Calibri", True),
    "Open Sans": ("Calibri", None),
    "Open Sans Bold": ("Calibri", True),
    "Extenda 40 Hecto": ("Calibri", True),
}

XML_REPLACEMENTS = [
    (re.compile(r'typeface="Poppins ?"'), 'typeface="Calibri"'),
    (re.compile(r'typeface="Poppins Bold"'), 'typeface="Calibri"'),
    (re.compile(r'typeface="Open Sans"'), 'typeface="Calibri"'),
    (re.compile(r'typeface="Open Sans Bold"'), 'typeface="Calibri"'),
    (re.compile(r'typeface="Extenda 40 Hecto"'), 'typeface="Calibri"'),
]


def walk_shapes(slide):
    def _walk(shape):
        if shape.shape_type == MSO_SHAPE_TYPE.GROUP:
            for s in shape.shapes:
                yield from _walk(s)
            return
        yield shape

    for shape in slide.shapes:
        yield from _walk(shape)


def replace_run_fonts(prs: Presentation) -> int:
    changed = 0
    for slide in prs.slides:
        for shape in walk_shapes(slide):
            if not shape.has_text_frame:
                continue
            for para in shape.text_frame.paragraphs:
                for run in para.runs:
                    name = run.font.name
                    if name not in FONT_MAP:
                        continue
                    new_name, force_bold = FONT_MAP[name]
                    run.font.name = new_name
                    if force_bold is True:
                        run.font.bold = True
                    changed += 1
    return changed


def rewrite_xml_fonts(pptx_path: Path) -> int:
    """Rewrite typeface attributes inside the pptx zip."""
    tmp_dir = Path(tempfile.mkdtemp(prefix="pptx_font_"))
    out_tmp = tmp_dir / "out.pptx"
    hits = 0
    with zipfile.ZipFile(pptx_path, "r") as zin, zipfile.ZipFile(
        out_tmp, "w", compression=zipfile.ZIP_DEFLATED
    ) as zout:
        for info in zin.infolist():
            data = zin.read(info.filename)
            if info.filename.endswith((".xml", ".rels")):
                text = data.decode("utf-8")
                new_text = text
                for pattern, repl in XML_REPLACEMENTS:
                    new_text, n = pattern.subn(repl, new_text)
                    hits += n
                data = new_text.encode("utf-8")
            zout.writestr(info, data)
    shutil.move(str(out_tmp), str(pptx_path))
    shutil.rmtree(tmp_dir, ignore_errors=True)
    return hits


def count_fonts(path: Path) -> dict[str, int]:
    from collections import Counter

    prs = Presentation(str(path))
    fonts: Counter[str] = Counter()
    for slide in prs.slides:
        for shape in walk_shapes(slide):
            if not shape.has_text_frame:
                continue
            for para in shape.text_frame.paragraphs:
                for run in para.runs:
                    fonts[run.font.name] += 1
    return dict(fonts)


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing: {SRC}")

    prs = Presentation(str(SRC))
    run_changes = replace_run_fonts(prs)
    prs.save(str(OUT))
    xml_hits = rewrite_xml_fonts(OUT)

    fonts = count_fonts(OUT)
    print(f"Run font replacements: {run_changes}")
    print(f"XML typeface replacements: {xml_hits}")
    print("Fonts after:")
    for k, v in sorted(fonts.items(), key=lambda x: (-x[1], str(x[0]))):
        print(f"  {k!r}: {v}")


if __name__ == "__main__":
    main()
