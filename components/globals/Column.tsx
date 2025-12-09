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
  const colors: Record<string, string> = {
    todo: `
      bg-yellow-50 dark:bg-yellow-900/20
      border-yellow-200 dark:border-yellow-700
    `,
    in_progress: `
      bg-blue-50 dark:bg-blue-900/20
      border-blue-200 dark:border-blue-700
    `,
    done: `
      bg-green-50 dark:bg-green-900/20
      border-green-200 dark:border-green-700
    `,
  };

  const columnColor = colors[id] ?? `
    bg-gray-50 dark:bg-gray-900
    border-gray-300 dark:border-gray-700
  `;


  const dragHighlight = `
    ${isOver ? "bg-opacity-60 dark:bg-opacity-40" : ""}
  `;
  return (
    <div
      ref={setNodeRef}
      className={`
        p-4 rounded-lg border min-h-[300px] transition-colors
        ${columnColor}
        ${dragHighlight}
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h2>

        <span
          className="
            text-sm px-2 py-1 rounded 
            bg-gray-300 dark:bg-gray-700
            text-gray-900 dark:text-gray-100
          "
        >
          {count}
        </span>
      </div>

      {count === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 italic py-8 text-center">
          No tasks in this column
        </div>
      ) : (
        children
      )}
    </div>
  );
};
