"""Step 1: Filter BetterMetObjects.csv → met-artworks-filtered.json
Run with: python3 scripts/extract-met-artworks.py
"""

import csv
import json

# downloaded from https://github.com/graslowsnail/metmuseum-api-dump-enhanced
CSV_PATH = "/Users/lisaballard/projects/metmuseum-api-dump-enhanced/BetterMetObjects.csv"
OUTPUT_PATH = "/Users/lisaballard/projects/morning-scrolly-page/scripts/met-artworks-filtered.json"

rows = []
with open(CSV_PATH, newline="", encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row["description"] and (
            row["classification"].startswith("Painting")
            or row["classification"].startswith("Sculpture")
            or row["classification"].startswith("Ceramic")
        ):
            rows.append({
                "object_id": int(row["object_id"]) if row["object_id"] else None,
                "title": row["title"] or "Untitled",
                "artist": row["artist"] or None,
                "artist_bio": row["artist_display_bio"] or None,
                "date": row["date"] or None,
                "medium": row["medium"] or None,
                "classification": row["classification"] or None,
                "department": row["department"] or None,
                "description": row["description"],
                "image_url": row["primary_image"] or None,
                "image_url_small": row["primary_image_small"] or None,
                "artwork_url": row["object_url"] or None,
            })

print(f"Filtered {len(rows)} rows")

with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    json.dump(rows, f)

print(f"Written to {OUTPUT_PATH}")
