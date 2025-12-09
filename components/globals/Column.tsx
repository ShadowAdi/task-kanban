"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";

export const Column = ({
  id,
  title,
  children,
  count,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  count: number;
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-lg border bg-gray-50 min-h-[300px] ${
        isOver ? "bg-blue-100" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-sm bg-gray-300 px-2 py-1 rounded">
          {count}
        </span>
      </div>

      {count === 0 ? (
        <div className="text-gray-500 italic py-8 text-center">
          No tasks in this column
        </div>
      ) : (
        children
      )}
    </div>
  );
};
