"use client";

import { DndContext } from "@dnd-kit/core";
import React, { useState } from "react";
import Column from "./Column";
import { Task } from "./Task";

const Board = () => {
  const [columns, setColumns] = useState({
    todo: ["task-1", "task-2"],
    "in-progress": [],
    done: [],
  });

  const tasks = {
    "task-1": { id: "task-1", title: "Dummy Task One" },
    "task-2": { id: "task-2", title: "Dummy Task Two" },
  };

  const handleDragEnd = (event: any) => {
    const { over, active } = event;

    if (!over) return;

    console.log("Task", active.id, "dropped in column", over.id);

    // Update state: remove from old column & add to new column
    setColumns((prev) => {
      const newState:any = { ...prev };

      // Remove from any column where task exists
      for (const col in newState) {
        newState[col] = newState[col].filter((tid) => tid !== active.id);
      }

      // Add to the new column
      newState[over.id].push(active.id);

      return newState;
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <main className="flex-1 w-full h-full py-4 grid grid-cols-3 gap-4">
        <Column id="todo" title="To Do">
          {columns.todo.map((taskId) => (
            <Task key={taskId} id={taskId} title={tasks[taskId].title} />
          ))}
        </Column>

        <Column id="in-progress" title="In Progress">
          {columns["in-progress"].map((taskId) => (
            <Task key={taskId} id={taskId} title={tasks[taskId].title} />
          ))}
        </Column>

        <Column id="done" title="Done">
          {columns.done.map((taskId) => (
            <Task key={taskId} id={taskId} title={tasks[taskId].title} />
          ))}
        </Column>
      </main>
    </DndContext>
  );
};

export default Board;
