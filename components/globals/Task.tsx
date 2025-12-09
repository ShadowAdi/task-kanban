'use client'
import { useDraggable } from '@dnd-kit/core'
import React, { useEffect, useState } from 'react'
import EditTaskDialog from './TaskUpdatePopover';
import { db, taskEvent, TaskInterface } from '@/db/db';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "../ui/dialog";

const Task = ({ id, title }: { id: number, title: string }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id!,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const [openDialog, setOpenDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [task, setTask] = useState<TaskInterface | null>(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);

  useEffect(() => {
    if (!openDialog) {
      return;
    }

    const loadTask = async () => {
      setLoadingOpen(true);
      setTask(null);
      const t = await db.tasks.get(id);
      setTask(t ?? null);
      setLoadingOpen(false);
    };

    loadTask();
  }, [openDialog, id]);


  const deleteTask = async () => {
    setLoadingDelete(true);
    await db.tasks.delete(id);
    taskEvent.dispatchEvent(new Event("refresh"));
    setLoadingDelete(false);
    setOpenDialog(false);
  };

  return (
    <>
      <div
        style={style}
        className="
    p-3 rounded-lg 
    bg-gray-200 dark:bg-gray-800 
    text-gray-900 dark:text-gray-100
    shadow-sm mb-2 flex items-center justify-between
  "
        ref={setNodeRef}
      >
        <div
          className="cursor-pointer w-full"
          onClick={() => setOpenDialog(true)}
        >
          {title}
        </div>

        <div
          {...listeners}
          {...attributes}
          className="cursor-grab p-2"
          onClick={(e) => e.stopPropagation()}
        >
          ☰
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
          </DialogHeader>
          {loadingOpen ? (
            <div className="py-4 text-center">Loading...</div>
          ) : task ? (
            <div className="space-y-3">
              <h3 className="font-semibold text-2xl">{task.name}</h3>

              <p className="text-base text-stone-900">
                {task.description || "No description"}
              </p>

              <p className="text-lg text-gray-800">
                Status: <span className='uppercase'>{task.status.replace("_", " ")}</span>
              </p>

              <div className="flex space-x-4 items-end justify-end pt-2">
                <Button
                  size="sm"
                  variant="destructive"
                  className='text-base px-4 py-3 rounded-sm'
                  onClick={deleteTask}
                  disabled={loadingDelete}
                >
                  {loadingDelete ? "Deleting..." : "Delete"}
                </Button>
                <Button
                  size="sm"
                  className='text-base px-4 py-3 rounded-sm'
                  onClick={() => setOpenEdit(true)}
                >
                  Edit
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-4 text-center">No task found</div>
          )}
        </DialogContent>
      </Dialog>

      <EditTaskDialog taskId={id} open={openEdit} setOpen={setOpenEdit} />
    </>
  );
};

export default Task;
