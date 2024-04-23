import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string, 
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  secure: true
});

export const uploadImages = async (files: File[]) => {
  const ids: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const arrayBuffer = await files[i].arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const uploadId = await new Promise<string>((resolve, reject) => {
      cloudinary.uploader.upload_stream({}, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result?.public_id as string);
      }).end(buffer);
    })
    if (uploadId) {
      ids.push(uploadId as string);
    }
  }
  return ids;
}

export const deleteImages = async (publicIds: string[]) => {
  try {
    for (let i = 0; i < publicIds.length; i++) {
      await cloudinary.uploader.destroy(publicIds[i]);
    }
  } catch (error) {
    console.error(error);
  }
}

export const getImageUrls = (publicIds: string[], width?: number, height?: number) => {
  return publicIds.map((publicId) => {
    return cloudinary.url(publicId, {
      secure: true,
      width: width ?? 100,
      height: height ?? 100,
      crop: 'fill'
    });
  });
}

export const getImageUrl = (publicId: string, width?: number, height?: number) => {
  return cloudinary.url(publicId, {
    secure: true,
    width: width ?? 400,
    height: height ?? 400,
    crop: 'fill'
  });
}