"use server";

import { addCategory, addProduct, addScheduledDrive, deleteProduct, getProduct } from "@/lib/appwrite";
import { deleteImages, uploadImages } from "@/lib/cloudinary";

export async function handleAddCategory(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const id = await addCategory(title);
  return {
    status: id ? "success" : "error",
    message: id ? "Category added successfully" : "Failed to add category",
  };
}

export interface Product {
  $id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  categoryId: string;
  images: string[];
  model: string;
  isSold: boolean;
}

export async function handleAddProduct(prevState: any, formData: FormData) {
  try {
    const imageFiles = Array.from(formData.entries())
      .filter(([key]) => key.startsWith("image-"))
      .map(([_, file]) => file as File);
    const images = await uploadImages(imageFiles);
    if (!images || !images.length)
      return { status: "error", message: "Failed to upload images" };
    console.log("[IMAGES]", images);
    const data: Partial<Product> = Object.fromEntries(
      formData.entries()
    ) as unknown as Partial<Product>;
    const { title, description, price, discountedPrice, categoryId, model } =
      data;
    const id = await addProduct({
      title,
      description,
      price: parseFloat(`${price}`),
      discountedPrice: parseFloat(`${discountedPrice}`),
      categoryId,
      model,
      images,
    });
    return {
      status: id ? "success" : "error",
      message: id ? "Product added successfully" : "Failed to add product",
    };
  } catch (error) {
    console.error("[ERROR]", error);
    return {
      status: "error",
      message: "Failed to add product",
    };
  }
}

export async function handleDeleteProduct(prevState: any, formData: FormData) {
  try {
    const productId = formData.get("productId") as string;
    const product = await getProduct(productId);
    if (!product) return { status: "error", message: "Product not found" };
    const images = product.images;
    await deleteImages(images);
    const response = await deleteProduct(productId);
    return {
      status: response ? "success" : "error",
      message: response ? "Product deleted successfully" : "Failed to delete product",
    };
  } catch (error) {
    console.error("[ERROR]", error);
    return {
      status: "error",
      message: "Failed to delete product",
    };
  }
}

export async function scheduleTestDrive(prevState: any, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const id = await addScheduledDrive(data);
    return {
      status: id ? "success" : "error",
      message: id ? "Test drive scheduled successfully" : "Failed to schedule test drive",
    };
  } catch (error) {
    console.error("[ERROR]", error);
    return {
      status: "error",
      message: "Failed to schedule test drive",
    };
  }
}