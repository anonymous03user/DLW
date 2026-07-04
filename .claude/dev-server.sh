#!/bin/zsh
# Local static preview for the DLW site (no build step).
cd "/Users/felix_diez/Desktop/Claude Websites/Dr. Leslie Wells/dlw-site" || exit 1
exec python3 -m http.server 8080
