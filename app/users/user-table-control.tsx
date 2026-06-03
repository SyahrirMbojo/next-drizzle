"use client";
import SearchView from "@/components/search-view";
import { useParamsCustom } from "@/lib/global-client";

export default function UserTableControl() {
  const { setParams, getParams, deleteParams } = useParamsCustom();

  const valSearch = getParams("qr") || "";

  const onSearch = (val: string) => {
    deleteParams("pg");
    setParams("search", val);
  };

  const onClearSearch = () => {
    deleteParams("search");
  };

  return (
    <div className="flex items-center gap-4">
      <SearchView
        value={valSearch}
        onEnterValue={onSearch}
        onClearValue={onClearSearch}
      />
    </div>
  );
}
