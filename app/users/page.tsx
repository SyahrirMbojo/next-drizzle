import { Suspense } from "react";
import AddUser from "./add-user";
import UserTable from "./user-table";
import LoadingTable from "@/components/loading-table";
import UserTableControl from "./user-table-control";
import PageView from "@/components/page-view";

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
  return (
    <PageView title="User" rightView={[<AddUser key="add-user" />]}>
      <Suspense fallback={<LoadingTable />}>
        <div className="flex flex-col gap-3">
          <UserTableControl />
          <UserTable searchParams={searchParams} />
        </div>
      </Suspense>
    </PageView>
  );
}
