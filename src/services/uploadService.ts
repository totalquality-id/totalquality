// src/services/uploadService.cloudinary.ts
//
// Versi Cloudinary dari uploadService.
// Untuk menggunakannya, rename file ini menjadi uploadService.ts
// dan install dependency: npm install cloudinary
//
// Tambahkan ke .env:
//   CLOUDINARY_CLOUD_NAME=your_cloud_name
//   CLOUDINARY_API_KEY=your_api_key
//   CLOUDINARY_API_SECRET=your_api_secret

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload gambar ke Cloudinary.
 *
 * @param file   - File object dari FormData
 * @param folder - Subfolder Cloudinary (e.g. "events", "articles", "services")
 * @returns      URL publik gambar dari Cloudinary (https://res.cloudinary.com/...)
 */
export async function uploadImage(file: File, folder: string): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `company-profile/${folder}`,
        resource_type: "image",
        // Otomatis optimasi format & kualitas
        fetch_format: "auto",
        quality: "auto",
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Cloudinary upload failed"));
        }
        resolve(result.secure_url);
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Hapus gambar dari Cloudinary berdasarkan URL-nya.
 *
 * @param url - URL publik gambar dari Cloudinary
 */
export async function deleteImage(url: string): Promise<void> {
  // Jika bukan URL Cloudinary, skip
  if (!url.includes("res.cloudinary.com")) {
    return;
  }

  // Ekstrak public_id dari URL
  // URL format: https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<folder>/<filename>.<ext>
  const matches = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/);
  if (!matches) {
    throw new Error("Could not parse Cloudinary public_id from URL");
  }

  const publicId = matches[1]; // e.g. "company-profile/events/uuid"
  await cloudinary.uploader.destroy(publicId);
}