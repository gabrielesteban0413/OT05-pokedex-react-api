#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Corrige:
  1. Los imports relativos en mi-app/src/pages/*.jsx (de ../../ a ../)
  2. Elimina imports duplicados
  3. Aplica la misma correccion al generador 'ejecute.py'
"""

import glob
import os
import re

ROOT    = os.path.dirname(os.path.abspath(__file__))
PAGES   = os.path.join(ROOT, "mi-app", "src", "pages")
SCRIPT  = os.path.join(ROOT, "ejecute.py")


def fix_page_file(path):
    with open(path, "r", encoding="utf-8") as fh:
        content = fh.read()

    # 1) Rutas relativas: ../../ -> ../
    content = content.replace("../../", "../")

    # 2) Eliminar imports duplicados exactos
    lines = content.split("\n")
    seen = set()
    out = []
    for line in lines:
        stripped = line.strip()
        if stripped.startswith("import ") and stripped.endswith(";"):
            if stripped in seen:
                continue
            seen.add(stripped)
        out.append(line)

    with open(path, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(out))


def main():
    print("Arreglando paginas en: " + PAGES)
    files = sorted(glob.glob(os.path.join(PAGES, "*.jsx")))
    if not files:
        print("No se encontraron paginas.")
        return
    for path in files:
        fix_page_file(path)
        print("  [fix] " + os.path.basename(path))

    if os.path.isfile(SCRIPT):
        with open(SCRIPT, "r", encoding="utf-8") as fh:
            script = fh.read()

        def fix_block(match):
            return match.group(0).replace("../../", "../")

        # Solo dentro de bloques  f["src/pages/..."] = """..."""
        script = re.sub(
            r'f\["src/pages/[^"]+"\] = """.*?"""',
            fix_block,
            script,
            flags=re.DOTALL,
        )

        with open(SCRIPT, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(script)
        print("  [fix] ejecute.py actualizado")
    else:
        print("  [skip] no se encontro ejecute.py")


if __name__ == "__main__":
    main()