import { writeFile } from "fs/promises";
import { join } from "path";
import { NextRequest } from "next/server";

export async function handleFileUpload(
  request: NextRequest,
  folder: string = "uploads"
): Promise<string> {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file uploaded");
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    throw new Error("File must be an image");
  }

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File size must be less than 5MB");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create unique filename
  const timestamp = Date.now();
  const originalName = file.name.replace(/\s/g, "-");
  const filename = `${timestamp}-${originalName}`;

  // Save to public folder
  const uploadDir = join(process.cwd(), "public", folder);
  const filepath = join(uploadDir, filename);

  await writeFile(filepath, buffer);

  // Return public URL
  return `/${folder}/${filename}`;
}
