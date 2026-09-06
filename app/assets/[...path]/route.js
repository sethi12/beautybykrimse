import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MIME_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
};

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const pathSegments = resolvedParams.path || [];
    
    // Sanitize path segments to prevent directory traversal
    const safeSegments = pathSegments.map((segment) =>
      segment.replace(/(\.\.[\/\\])+/g, "").replace(/[\/\\]/g, "")
    );

    const relativePath = safeSegments.join(path.sep);
    const rootAssetsDir = path.join(process.cwd(), "assets");
    const filePath = path.join(rootAssetsDir, relativePath);

    // Verify file stays within the assets directory
    if (!filePath.startsWith(rootAssetsDir)) {
      return new NextResponse("Access Denied", { status: 403 });
    }

    if (!fs.existsSync(filePath)) {
      return new NextResponse("Image Not Found", { status: 404 });
    }

    const stat = fs.statSync(filePath);
    if (!stat.isFile()) {
      return new NextResponse("Invalid Resource", { status: 400 });
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": stat.size.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Error serving asset:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
