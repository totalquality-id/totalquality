import { NextRequest } from "next/server";
import { uploadImage } from "@/services/uploadService";

export async function handleFileUpload(
  request: NextRequest,
  folder: string = "uploads"
): Promise<string> {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
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

  // Vercel's deployed filesystem is read-only; persist uploads in Cloudinary.
  return uploadImage(file, folder);
}
