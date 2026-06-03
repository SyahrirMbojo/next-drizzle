"use client";

import { Button } from "@/components/ui/button";
import { SpinnerIcon, TrashIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { UserModel } from "./user-model";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteUser } from "./user-server";

export default function DeleteUser({ userModel }: { userModel: UserModel }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleClose = () => {
    setDeleteDialogOpen(false);
  };

  const confirmDelete = async () => {
    if (!userModel) return;

    setLoading(true);
    const { success, message } = await deleteUser(userModel.id);
    if (success) {
      setDeleteDialogOpen(false);
      router.refresh();
    } else {
      console.error(message);
    }
    setLoading(false);
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

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{userModel?.name}</span>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground text-white hover:bg-destructive/90"
            >
              {loading ? (
                <>
                  <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                  {"Deleting..."}
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
