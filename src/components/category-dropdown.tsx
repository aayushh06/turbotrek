import { getCategories } from "@/lib/appwrite";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function CatgeoryDropDown() {
  const [categories, setCategories] = useState<{
    $id: string;
    title: string;
  }[]>([]);

  const populateCategories = useCallback(async () => {
    const categories = await getCategories();
    setCategories(categories.map((category) => ({
      $id: category.$id,
      title: category.title,
    })));
  }, [])

  useEffect(() => {
    populateCategories();
  }, []);

  if (!categories.length) return (
    <Skeleton className="w-full h-10" />
  )

  return (
    <Select name="categoryId">
      <SelectTrigger>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {categories?.map((category) => (
          <SelectItem key={category.$id} value={category.$id}>
            {category.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
