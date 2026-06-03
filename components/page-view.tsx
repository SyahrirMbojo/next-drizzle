import React from "react";

export default function PageView({
  children,
  title,
  desc,
  rightView,
}: {
  children: React.ReactNode;
  title: string;
  desc?: string;
  rightView?: React.ReactNode[];
}) {
  return (
    <div className="flex flex-1 flex-col gap-10 p-6 pt-0">
      <div className="flex flex-row flex-wrap items-center gap-2">
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="text-2xl font-semibold leading-none tracking-tight">
            {title}
          </div>
          {desc && <div className="text-xs">{desc}</div>}
        </div>
        {rightView && (
          <div className="flex flex-row gap-2 items-center justify-end">
            {rightView}
          </div>
        )}
      </div>

      {children}
    </div>
  );
}
