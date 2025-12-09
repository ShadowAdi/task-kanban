"use client";

import { DndContext } from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import { Column } from "./Column";
import Task from "./Task";
import { db, TaskInterface } from "@/db/db";

const Board = () => {
  const [columns, setColumns] = useState<{
    todo: TaskInterface[];
    in_progress: TaskInterface[];
    done: TaskInterface[];
  }>({
    todo: [],
    in_progress: [],
    done: []
  })
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    const fetch = async () => {
      const tasks = await db.tasks.toArray();

      setColumns({
        todo: tasks.filter((t) => t.status === "todo"),
        in_progress: tasks.filter((t) => t.status === "in_progress"),
        done: tasks.filter((t) => t.status === "done"),
      });

      setLoading(false);
    };

    fetch();
  }, []);




  const handleDragEnd = (event: any) => {
    const { over, active } = event;

    if (!over) return;

    console.log("Task", active.id, "dropped in column", over.id);

    // Update state: remove from old column & add to new column
    setColumns((prev) => {
      const newState: any = { ...prev };

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
      <main className="flex-1 w-[80%] h-full py-4 grid grid-cols-3 gap-4">
        <Column id="todo" title="To Do">
          {columns.todo.map((task,idx) => (
            <Task key={idx} id={task?.id} title={task.name} />
          ))}
        </Column>

        <Column id="in-progress" title="In Progress">
         {columns.in_progress.map((task,idx) => (
            <Task key={idx} id={task?.id} title={task.name} />
          ))}
        </Column>

        <Column id="done" title="Done">
          {columns.done.map((task,idx) => (
            <Task key={idx} id={task?.id} title={task.name} />
          ))}
        </Column>
      </main>
    </DndContext>
  );
};

export default Board;
