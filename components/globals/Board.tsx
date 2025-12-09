"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import { Column } from "./Column";
import Task from "./Task";
import { db, taskEvent, TaskInterface } from "@/db/db";

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

    const listener = () => fetch()
    taskEvent.addEventListener("refresh", listener)
    return () => taskEvent.removeEventListener("refresh", listener)
  }, []);



  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) return;

    const taskId = active.id;

    const map: Record<string, "todo" | "in_progress" | "done"> = {
      "todo": "todo",
      "in_progress": "in_progress",
      "in-progress": "in_progress",
      "done": "done",
    };

    const newStatus = map[over.id];
    if (!newStatus) return;

    setColumns((prev) => {
      let movedTask: TaskInterface | null = null;

      const newState = {
        todo: [],
        in_progress: [],
        done: [],
      } as typeof prev;

      for (const col of Object.keys(prev) as (keyof typeof prev)[]) {
        prev[col].forEach((t) => {
          if (t.id === taskId) movedTask = t;
          else newState[col].push(t);
        });
      }

      // Insert task in new column
      if (movedTask) {
        movedTask.status = newStatus;
        newState[newStatus].push(movedTask);
        db.tasks.update(taskId, { status: newStatus })
      }

      return newState;
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <main className="flex-1 w-full h-full py-4 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4">
        <Column id="todo" title="To Do">
          {columns.todo.map((task, idx) => (
            <Task key={idx} id={task.id!} title={task.name} />
          ))}
        </Column>

        <Column id="in_progress" title="In Progress">
          {columns.in_progress.map((task, idx) => (
            <Task key={idx} id={task.id!} title={task.name} />
          ))}
        </Column>

        <Column id="done" title="Done">
          {columns.done.map((task, idx) => (
            <Task key={idx} id={task.id!} title={task.name} />
          ))}
        </Column>
      </main>
    </DndContext>
  );
};

export default Board;
