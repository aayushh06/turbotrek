"use client";
import React, { use, useEffect } from "react";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { removeItemFromCart } from "@/lib/appwrite";
import { User } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

const DeleteFromCart = ({
  productId,
}: {
  productId: string;
}) => {
  const {user} = useUser();
  const handleRemoveFromCart = async () => {
    await removeItemFromCart(
      productId,
      `${user?.id}_@_${user?.emailAddresses[0].emailAddress}_@_${
        user?.firstName + " " + user?.lastName
      }`
      
    );
    window.location.reload();
  };
  

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => handleRemoveFromCart()}
    >
      <TrashIcon className="h-4 w-4" />
      <span className="sr-only">Delete</span>
    </Button>
  );
};

export default DeleteFromCart;
