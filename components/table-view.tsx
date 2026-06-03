import React from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import { MetaModel } from "@/app/users/user-model";
import PaginationDynamic from "./pagination-dynamic";

export type TableColumnModel = {
  title: string | React.ReactNode;
  align?: "text-left" | "text-center" | "text-right";
};

export default function TableView({
  children,
  columns,
  meta,
}: {
  children: React.ReactNode;
  columns?: TableColumnModel[];
  meta?: MetaModel;
}) {
  return (
    <div className="rounded-xl border bg-card">
      <Table className="w-full caption-bottom text-sm">
        <TableHeader className="[&_tr]:border-b">
          <TableRow>
            {columns?.map((col, index) => (
              <TableHead
                key={index}
                className={`font-semibold h-12 px-4 ${col.align}`}
              >
                {col.title !== "Action" ? col.title : ""}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
      {meta !== null && <PaginationDynamic meta={meta!} />}
    </div>
  );
}
