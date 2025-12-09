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

  useEffect(() => {
    if (!openDialog) return;
    db.tasks.get(id).then((t) => setTask(t ?? null));
  }, [openDialog, id]);

  const deleteTask = async () => {
    await db.tasks.delete(id);
    taskEvent.dispatchEvent(new Event("refresh"));
    setOpenDialog(false);
  };

  return (
    <>
      <div
        style={style}
        className="p-3 rounded-lg bg-gray-200 shadow-sm mb-2 flex items-center justify-between"
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

          {task ? (
            <div className="space-y-3">
              <h3 className="font-semibold text-2xl">{task.name}</h3>

              <p className="text-base text-stone-900">
                {task.description || "No description"}
              </p>

              <p className="text-lg text-gray-800 ">
                Status: <span className='uppercase'>{task.status.replace("_", " ")}
                  </span> 
              </p>

              <div className="flex space-x-4 items-end justify-end pt-2">
                <Button size="sm" className='text-base cursor-pointer! px-4 py-3 rounded-sm'  onClick={() => setOpenEdit(true)}>
                  Edit
                </Button>

                <Button size="sm"  className='text-base cursor-pointer! px-4 py-3 rounded-sm' variant="destructive" onClick={deleteTask}>
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            "Loading..."
          )}
        </DialogContent>
      </Dialog>

      <EditTaskDialog taskId={id} open={openEdit} setOpen={setOpenEdit} />
    </>
  );
};

export default Task;
