"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { Field, FieldLabel } from "./ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useParamsCustom } from "@/lib/global-client";
import { MetaModel } from "@/app/users/user-model";
import { listRowPagination } from "@/lib/utils";

type PropsPagination = {
  meta: MetaModel;
};

export default function PaginationDynamic({ meta }: PropsPagination) {
  const [noItem, setNoItem] = React.useState(1);
  const { setParams, deleteParams } = useParamsCustom();

  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (meta.total > 0) {
      // selalu tampilkan page pertama
      pages.push(1);

      // ellipsis kiri
      if (meta.page > 3) {
        pages.push("left-ellipsis");
      }

      // page sekitar active
      for (
        let i = Math.max(2, meta.page - 1);
        i <= Math.min(meta.totalPages - 1, meta.page + 1);
        i++
      ) {
        pages.push(i);
      }

      // ellipsis kanan
      if (meta.page < meta.totalPages - 2) {
        pages.push("right-ellipsis");
      }

      // selalu tampilkan page terakhir
      if (meta.totalPages > 1) {
        pages.push(meta.totalPages);
      }
    }

    return pages;
  };

  const pages = generatePages();

  const onChangeRowsPerPage = (value: string) => {
    deleteParams("pg");
    setParams("lm", value);
  };

  const onChangePage = (value: number) => {
    const indexpage = value - 1;
    const noPage = indexpage * meta!.limit;
    setNoItem(noPage + 1);
    setParams("pg", value.toString());
  };

  if (meta.total <= 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-end space-x-2 p-3 border-t border-dashed">
      <div className="flex-1 text-sm text-muted-foreground">
        row(s) selected
      </div>
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
        <Select defaultValue="10" onValueChange={onChangeRowsPerPage}>
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              {listRowPagination.map((item, index) => (
                <SelectItem key={index} value={`${item}`}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <div className="text-sm text-muted-foreground px-3">
        {noItem}–{meta!.limit > meta!.total ? meta?.total : meta!.limit} of{" "}
        {meta?.total}
      </div>
      <div className="space-x-2">
        <Pagination>
          <PaginationContent>
            {/* PREVIOUS */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                text=""
                onClick={(e) => {
                  e.preventDefault();

                  if (meta.page > 1) {
                    onChangePage(meta.page - 1);
                  }
                }}
                className={
                  meta.page === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {/* PAGE NUMBERS */}
            {pages.map((item, index) => {
              // ELLIPSIS
              if (typeof item === "string") {
                return (
                  <PaginationItem key={item + index}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              // PAGE
              return (
                <PaginationItem key={item}>
                  <PaginationLink
                    href="#"
                    isActive={meta.page === item}
                    onClick={(e) => {
                      e.preventDefault();
                      onChangePage(item);
                    }}
                    className="cursor-pointer"
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* NEXT */}
            <PaginationItem>
              <PaginationNext
                href="#"
                text=""
                onClick={(e) => {
                  e.preventDefault();

                  if (meta.page < meta.totalPages) {
                    onChangePage(meta.page + 1);
                  }
                }}
                className={
                  meta.page === meta.totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
