import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "cars" }, (err, result) => {
          if (err || !result) {
            console.error("CLOUDINARY ERROR:", err);
            return reject(err || new Error("Upload gagal"));
          }
          resolve(result);
        })
        .end(buffer);
    });

    console.log("UPLOAD RESULT:", upload);

    return NextResponse.json({
      secure_url: upload.secure_url,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json({ error: "Upload gagal" }, { status: 500 });
  }
}
