"use client";

import { Button } from "@/components/ui/button";
import { PencilIcon, SpinnerIcon } from "@phosphor-icons/react";
import { Fragment } from "react/jsx-runtime";
import { UpdateUserFormData, updateUserSchema, UserModel } from "./user-model";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateuser } from "./user-server";

export default function EditUser({ userModel }: { userModel: UserModel }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: userModel.name ?? "",
      email: userModel.email,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: userModel.name ?? "",
        email: userModel.email,
      });
    }
  }, [open, userModel, reset]);

  const handleEdit = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: UpdateUserFormData) => {
    const { success, message } = await updateuser(userModel.id, data);
    if (success) {
      handleClose();
      router.refresh();
    } else {
      setError(message);
    }
  };

  return (
    <Fragment>
      <Button variant="outline" size="icon" onClick={handleEdit}>
        <PencilIcon />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Fill in the information below to edit user.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...register("name")}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message as string}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                    {"Saving..."}
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
