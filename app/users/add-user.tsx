"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon, SpinnerIcon } from "@phosphor-icons/react";
import { Fragment } from "react/jsx-runtime";
import { CreateUserFormData, createUserSchema } from "./user-model";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "./user-server";

export default function AddUser() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const handleCreate = () => {
    setOpen(true);
    reset();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: CreateUserFormData) => {
    const { success, message } = await createUser(data);
    if (success) {
      handleClose();
      router.refresh();
    } else {
      setError(message);
    }
  };

  return (
    <Fragment>
      <Button onClick={handleCreate}>
        <PlusIcon className="mr-2 h-4 w-4" />
        Add User
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

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.password)}
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message as string}
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
                    {"Creating..."}
                  </>
                ) : (
                  "Create User"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
