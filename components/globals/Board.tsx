"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import { Column } from "./Column";
import Task from "./Task";
import { db, taskEvent, TaskInterface } from "@/db/db";
import TaskSkeleton from "./TaskSkeleton";

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



  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as number;
    const newStatus = over.id as "todo" | "in_progress" | "done";

    setColumns((prev) => {
      const withoutTask = {
        todo: prev.todo.filter((t) => t.id !== taskId),
        in_progress: prev.in_progress.filter((t) => t.id !== taskId),
        done: prev.done.filter((t) => t.id !== taskId)
      };

      const moved = prev.todo.find((t) => t.id === taskId)
        || prev.in_progress.find((t) => t.id === taskId)
        || prev.done.find((t) => t.id === taskId);

      if (!moved) return prev;

      const updated = { ...moved, status: newStatus };

      return {
        ...withoutTask,
        [newStatus]: [updated, ...withoutTask[newStatus]]
      };
    });

    await db.tasks.update(taskId, { status: newStatus });
  };


  return (
    <DndContext onDragEnd={handleDragEnd}>
      <main className="flex-1 w-full h-full py-4 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4">
        <Column id="todo" title="To Do" count={columns.todo.length}>
          {loading ? (
            <TaskSkeleton count={3} />
          ) : (
            columns.todo.map((task, idx) => (
              <Task key={idx} id={task.id!} title={task.name} />
            ))
          )}
        </Column>

        <Column id="in_progress" title="In Progress" count={columns.in_progress.length}>
          {loading ? (
            <TaskSkeleton count={3} />
          ) : (
            columns.in_progress.map((task, idx) => (
              <Task key={idx} id={task.id!} title={task.name} />
            ))
          )}
        </Column>

        <Column id="done" title="Done" count={columns.done.length}>
          {loading ? (
            <TaskSkeleton count={3} />
          ) : (
            columns.done.map((task, idx) => (
              <Task key={idx} id={task.id!} title={task.name} />
            ))
          )}
        </Column>

      </main>
    </DndContext>
  );
};

export default Board;
