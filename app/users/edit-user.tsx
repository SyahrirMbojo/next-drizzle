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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
      name: userModel.name!,
      email: userModel.email,
    },
  });

  const handleCreate = () => {
    setOpen(true);
    reset();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: UpdateUserFormData) => {
    try {
      const url = `/api/users/${userModel?.id}`;
      const method = "PATCH";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "An error occurred");
        return;
      }

      router.refresh();
      handleClose();
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Fragment>
      <Button variant="outline" size="icon" onClick={handleCreate}>
        <PencilIcon />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Fill in the information below to create a new user.
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
