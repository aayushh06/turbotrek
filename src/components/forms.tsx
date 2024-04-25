"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import {
  handleAddCategory,
  handleAddProduct,
  scheduleTestDrive,
} from "@/actions/forms";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import CatgeoryDropDown from "@/components/category-dropdown";
import { AlertCircleIcon, Check, CircleArrowOutUpRightIcon, Plus } from "lucide-react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function AddCategory() {
  const [state, formAction] = useFormState(handleAddCategory, {
    status: "idle",
    message: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast(state.message);
      formRef.current?.reset();
    } else if (state.status === "error") {
      toast(state.message);
    }
  }, [state]);

  return (
    <Card className="w-full">
      <CardHeader className="py-2">
        <h2 className="text-lg font-bold">Add Category</h2>
      </CardHeader>
      <CardContent className="px-2">
        <form ref={formRef} action={formAction} className="flex space-x-2">
          <Input
            required
            type="text"
            placeholder="Category name"
            name="title"
          />
          <Button type="submit" variant={"secondary"}>
            Add Category
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function AddProduct() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [state, formAction] = useFormState(handleAddProduct, {
    status: "idle",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast(state.message);
      formRef.current?.reset();
      setLoading(false);
    } else if (state.status === "error") {
      toast(state.message);
      setLoading(false);
    }
  }, [state]);

  const handleProductUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append(`image-${i}`, files[i]);
      }
    }
    formAction(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader className="py-2">
        <h2 className="text-lg font-bold">Add Product</h2>
      </CardHeader>
      <CardContent>
        <form
          ref={formRef}
          onSubmit={handleProductUpload}
          className="space-y-2"
        >
          <Input
            required
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              setFiles(e.currentTarget.files);
            }}
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
          <CatgeoryDropDown />
          <Input
            required
            type="text"
            min={"2009"}
            max={"2024"}
            placeholder="Year of Model"
            name="model"
          />
          <Button
            type="submit"
            variant={"secondary"}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <CircleArrowOutUpRightIcon className="h-3 w-3 mr-2 animate-spin" />
            ) : (
              <Plus className="h-3 w-3 mr-2" />
            )}
            Add Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function ScheduleTestDrive() {
  const [state, formAction] = useFormState(scheduleTestDrive, {
    status: "idle",
    message: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast(state.message, {
        icon: <Check className="w-4 h-4 mr-2"/>
      });
      formRef.current?.reset();
    } else if (state.status === "error") {
      toast(state.message, {
        icon: <AlertCircleIcon className="w-4 h-4 mr-2"/>
      });
    }
  }, [state]);

  const scheduleDrive = async (e: any) => {
    if (!formRef.current) return;
    const formData = new FormData(formRef?.current);
    formAction(formData);
  };

  const showError = (e: any) => {
    e.preventDefault();
    toast("Please fill all the fields correctly", {
      icon: <AlertCircleIcon className="w-4 h-4 mr-2"/>
    });
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Schedule a test drive Today</AlertDialogTitle>
        <AlertDialogDescription>
          Find your next car with confidence. Browse our wide selection of
          vehicles and connect with our team for personalized assistance.
        </AlertDialogDescription>
        <form ref={formRef}>
          <div className="grid gap-4">
            <Input
              required
              placeholder="Enter your name"
              type="text"
              name="name"
            />
            <Input
              required
              placeholder="Enter your email"
              type="email"
              name="email"
            />
            <Input
              required
              placeholder="Enter your phone number"
              type="tel"
              name="phone"
            />
            <Input
              required
              placeholder="How many cars are you interested in?"
              type="number"
              name="no_of_cars"
            />
            <Input
              required
              min={new Date().toISOString().slice(0, 16)}
              placeholder="Enter your preferred date"
              type="datetime-local"
              name="date"
            />
          </div>
        </form>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={(e) => formRef.current?.checkValidity() ? scheduleDrive(e) : showError(e)}
        >
          Confirm
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
