"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { UserModel } from "./user-model";
import { useRouter } from "next/navigation";

export default function DeleteUser({ userModel }: { userModel: UserModel }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!userModel) return;

    try {
      const res = await fetch(`/api/users/${userModel.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Fragment>
      <Button
        variant="outline"
        size="icon"
        className="text-destructive focus:text-destructive"
        onClick={handleOpen}
      >
        <TrashIcon />
      </Button>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{userModel?.name}</span>? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
}
