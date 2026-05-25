import { Suspense } from "react";
import { UsersTable } from "@/app/users/users-table";
import AddUser from "./add-user";
import { UserModel } from "./user-model";
import { getListUser } from "./user-server";

export type SearchParamsUser = {
  pg?: number;
  lm?: number;
  search?: string;
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParamsUser>;
}) {
  const { pg, lm, search = "" } = await searchParams!;
  const data = await getListUser(pg, lm, search);
  const users: UserModel[] = data.data;

  return (
    <div className="flex flex-1 flex-col gap-10 p-6 pt-0">
      <div className="flex flex-row flex-wrap items-center gap-2">
        <div className="text-2xl font-semibold leading-none tracking-tight flex-1">
          Users
        </div>
        <AddUser />
      </div>

      <Suspense
        fallback={
          <div className="flex h-24 items-center justify-center">
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        }
      >
        <UsersTable data={users} />
      </Suspense>
    </div>
  );
}
