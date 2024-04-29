import { Product } from "@/actions/forms";
import { Client, Account, Databases, ID, Storage, Query } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string); // Replace with your project ID

export const account = new Account(client);
export { ID } from "appwrite";
const databases = new Databases(client);

const create = async (COLLECTION_ID: string, data: any) => {
  return databases.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
    COLLECTION_ID,
    ID.unique(),
    data
  );
};

export const addCategory = async (title: string) => {
  try {
    const response = await create("categories", {
      title,
    });
    return response.$id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCategories = async () => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "categories"
    );
    return response.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addProduct = async (data: Partial<Product>) => {
  try {
    const response = await create(
      "products",
      data
    );
    return response.$id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getProduct = async (productId: string) => {
  try {
    const response = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "products",
      productId
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getProducts = async (queries?: string[]) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "products",
      queries
    );
    return response.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPaginatedProducts = async (
  page: number,
  filters?: string[]
) => {
  // bind a query with page and filters
  const queries = [];
  if (page > 1) queries.push(Query.offset(25 * (page - 1)));
  if (filters) queries.push(...filters);

  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "products",
      queries
    );
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProductById = async (productId: string) => {
  try {
    const response = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "products",
      productId
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "products",
      productId
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// create a new cart for the user if it doesn't exist
export const addItemToCart = async (productId: string, userId: string) => {
  if (!userId) return null;

  // check if cart exists for the user
  const cart = await getCart(userId);
  if (cart.length === 0) {
    // create a new cart
    const response = await create("carts", {
      userId,
      products: [productId],
    });
    return response;
  } else {
    // check if the product is already in the cart
    if (cart[0].products.includes(productId)) return null;

    // add product to the cart
    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.APPWRITE_COLLECTION_CART_ID || "carts",
      cart[0].$id,
      {
        products: [...cart[0].products, productId],
      }
    );
    return response;
  }
};

// get the cart for the user
export const getCartItems = async (userId: string) => {
  if (!userId) return null;
  const cart = await getCart(userId);
  if (cart.length === 0) return [];
  return cart[0].products;
};

// remove an item from the cart
export const removeItemFromCart = async (productId: string, userId: string) => {
  if (!userId) return null;
  const cart = await getCart(userId);
  if (cart.length === 0) return null;
  const response = await databases.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
    process.env.APPWRITE_COLLECTION_CART_ID || "carts",
    cart[0].$id,
    {
      products: cart[0].products.filter((id: string) => id !== productId),
    }
  );
  return response;
};

export const clearCart = async (userId: string) => {
  if (!userId) return null;
  const cart = await getCart(userId);
  console.log(cart);
  if (cart.length === 0) return null;
  const response = await databases.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
    process.env.APPWRITE_COLLECTION_CART_ID || "carts",
    cart[0].$id,
    {
      products: [],
    }
  );
  return response;
};

export const getCart = async (userId: string) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.APPWRITE_COLLECTION_CART_ID || "carts",
      [Query.equal("userId", userId)]
    );
    return response.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const checkout = async (userId: string, totalPrice: number) => {
  if (!userId) return null;

  const cart = await getCart(userId);
  if (cart.length === 0) return null;

  const response = await create("orders", {
    userId,
    products: cart[0].products,
    totalPrice,
  });

  // clear the cart
  await clearCart(userId);

  return response;
};

export const getOrders = async (userId: string) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "orders",
      [Query.equal("userId", userId)]
    );
    return response.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getAllOrders = async () => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "orders"
    );
    return response.documents;
  } catch (error) {
    console.error(error);
    return [];
  }

}

export const addScheduledDrive = async (data: any) => {
  try {
    const response = await create("scheduled-drives", data);
    return response.$id;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getAllScheduledDrives = async () => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "scheduled-drives"
    );
    return response.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// export const uploadImage = async (file: File) => {
//   try {
//     const fileId = ID.unique();
//     console.log(`FILE`, file)
//     const response = await storage.createFile(
//       process.env.APPWRITE_BUCKET_ID as string,
//       fileId,
//       file
//     );
//     return response.$id;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// export const uploadImages = async (files: File[]) => {
//   const ids = [];
//   for (const file of files) {
//     const id = await uploadImage(file);
//     if (id) ids.push(id);
//   }
//   return ids;
// }
