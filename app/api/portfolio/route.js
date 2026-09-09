import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { portfolioByCategory } from "@/lib/data";

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
]);

// Helper to expand wildcard patterns (e.g. "/assets/southasianbrides/*") into array of image paths
function resolveImagesForCategory(imagesPattern, fallbackFolder) {
  const list = Array.isArray(imagesPattern)
    ? imagesPattern
    : typeof imagesPattern === "string"
    ? [imagesPattern]
    : [];

  const resolved = [];

  for (const item of list) {
    if (typeof item === "string" && item.includes("*")) {
      const cleanPath = item.replace(/\/\*$/, "").replace(/^\//, "");
      const fullDir = path.join(process.cwd(), cleanPath);

      if (fs.existsSync(fullDir) && fs.statSync(fullDir).isDirectory()) {
        const files = fs.readdirSync(fullDir);
        for (const file of files) {
          if (file.startsWith(".")) continue;
          const ext = path.extname(file).toLowerCase();
          if (IMAGE_EXTENSIONS.has(ext)) {
            resolved.push(`/${cleanPath}/${file}`);
          }
        }
      }
    } else {
      resolved.push(item);
    }
  }

  // If no wildcard was given but a matching assets folder exists, and array is empty, load from folder
  if (resolved.length === 0 && fallbackFolder) {
    const fullDir = path.join(process.cwd(), "assets", fallbackFolder);
    if (fs.existsSync(fullDir) && fs.statSync(fullDir).isDirectory()) {
      const files = fs.readdirSync(fullDir);
      for (const file of files) {
        if (file.startsWith(".")) continue;
        const ext = path.extname(file).toLowerCase();
        if (IMAGE_EXTENSIONS.has(ext)) {
          resolved.push(`/assets/${fallbackFolder}/${file}`);
        }
      }
    }
  }

  // Deduplicate while preserving exact priority order
  const seen = new Set();
  const uniqueResolved = [];
  for (const item of resolved) {
    const key = (typeof item === "string" ? item : item.image)?.toLowerCase();
    if (key && !seen.has(key)) {
      seen.add(key);
      uniqueResolved.push(item);
    }
  }

  return uniqueResolved;
}

// Interleave items across categories in round-robin fashion for balanced mix (e.g. 1 South Asian, 1 Western, 1 Reception...)
function interleaveCategoryItems(itemsByCategory) {
  const queues = Object.values(itemsByCategory).map((items) => [...items]);
  const interleaved = [];
  let hasMore = true;

  while (hasMore) {
    hasMore = false;
    for (const queue of queues) {
      if (queue.length > 0) {
        interleaved.push(queue.shift());
        if (queue.length > 0) {
          hasMore = true;
        }
      }
    }
  }

  return interleaved;
}

const CATEGORY_TO_FOLDER_MAP = {
  "south-asian-brides": "southasianbrides",
  "western-brides": "westernbrides",
  "reception-glam": "receptionglam",
  "engagement-glam": "engagementglam",
  "bridal-party": "bridalparty",
};

export async function GET() {
  try {
    const categoryItemLists = {};

    for (const [categoryId, categoryData] of Object.entries(portfolioByCategory)) {
      const fallbackFolder = CATEGORY_TO_FOLDER_MAP[categoryId];
      const expandedImages = resolveImagesForCategory(categoryData.images, fallbackFolder);
      const imagesList = expandedImages.length > 0 ? expandedImages : (Array.isArray(categoryData.images) ? categoryData.images : []);

      categoryItemLists[categoryId] = imagesList.map((img, idx) => {
        const isString = typeof img === "string";
        const imageSrc = isString ? img : img.image;
        const aspect = isString ? "portrait" : img.aspect || "portrait";
        return {
          id: `port-${categoryId}-${idx + 1}`,
          category: categoryId,
          categoryName: categoryData.name,
          image: imageSrc,
          aspect,
        };
      });
    }

    // Interleave across categories so "All Works" shows mixed varied styles
    const interleavedItems = interleaveCategoryItems(categoryItemLists);

    return NextResponse.json(interleavedItems, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error generating dynamic portfolio list:", error);
    return new NextResponse("Failed to load portfolio items", { status: 500 });
  }
}
