#!/usr/bin/env bash
set -euo pipefail
BASE="https://baarnsmannenkoor.nl"
PAGES=(
  "index.htm"
  "geschiedenis.htm"
  "dirigent.htm"
  "in%20de%20media.htm"
  "lid%20worden.htm"
  "vriend%20worden.htm"
  "contact.htm"
)
# Temporary file for URLs
TMPFILE="$(mktemp)"
for p in "${PAGES[@]}"; do
  echo "Fetching $p"
  curl -s "$BASE/$p" >> "$TMPFILE"
done
# Extract all src/background URLs that contain index_htm_files/
grep -Eo "index_htm_files/[^'\"\)]+" "$TMPFILE" | sort -u > urls.txt
mkdir -p public/images
while read -r file; do
  url="$BASE/$file"
  fname="${file##*/}"
  echo "Downloading $url -> public/images/$fname"
  curl -L -s "$url" -o "public/images/$fname"
  # Replace references in Astro source files
  # Escape slashes for sed
  escaped_file=$(printf '%s\n' "$file" | sed -e 's/[\\/&]/\\\\&/g')
  escaped_path=$(printf '%s\n' "public/images/$fname" | sed -e 's/[\\/&]/\\\\&/g')
  find src/pages src/components -type f -name "*.astro" -exec sed -i "s|$escaped_file|$escaped_path|g" {} +
  find . -type f -name "*.html" -exec sed -i "s|$escaped_file|$escaped_path|g" {} +
  done < urls.txt
  echo "All done."
