import BtnAddNew from "@/components/btn-addnew";

export default function ArticlePage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
      <div className="flex flex-row flex-wrap items-center gap-2">
        <div className="text-2xl font-semibold leading-none tracking-tight flex-1">
          Article
        </div>
        <BtnAddNew />
      </div>
    </div>
  );
}
