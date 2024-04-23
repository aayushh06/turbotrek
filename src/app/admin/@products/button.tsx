"use client";
import { Button } from "@/components/ui/button";
import { CircleArrowOutUpRightIcon, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Product, handleDeleteProduct } from "@/actions/forms";
import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const DeleteBtn = ({ product }: { product: Product }) => {
  const [state, formAction] = useFormState(handleDeleteProduct, {
    status: "idle",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state.status === "success") {
      toast(state.message);
      setLoading(false);
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } else if (state.status === "error") {
      toast(state.message);
      setLoading(false);
    }
  }, [state]);

  const deleteAction = async () => {
    setLoading(true);
    const formData = new FormData(formRef?.current!);
    formAction(formData);
  };

  return (
    <form ref={formRef} className="inline">
      <input
        type="text"
        name="productId"
        defaultValue={product.$id}
        className="hidden"
      />
      <AlertDialog>
        <AlertDialogTrigger>
          <Button type="button" variant={"destructive"}>
            {loading ? (
              <CircleArrowOutUpRightIcon className="h-3 w-3 mr-2 animate-spin" />
            ) : (
              <Trash className="h-3 w-3 mr-2" />
            )}
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product and all of its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteAction}
              disabled={loading}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};
