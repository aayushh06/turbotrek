import { Product } from "@/actions/forms";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const EditProductModal = ({
  children,
  product
}: {
  children: React.ReactNode;
  product: Product;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <form
          className="space-y-2"
        >
          <Input
            required
            type="file"
            multiple
            accept="image/*"
          />
          <Input required type="text" placeholder="Product name" name="title" />
          <Textarea required placeholder="Description" name="description" />
          <Input required type="number" placeholder="Price" name="price" />
          <Input
            required
            type="number"
            placeholder="Discounted Price"
            name="discountedPrice"
          />
          
          <Input
            required
            type="text"
            min={"2009"}
            max={"2024"}
            placeholder="Year of Model"
            name="model"
          />
          <Button type="submit" variant={"secondary"} className="w-full">
            Add Product
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
