import { useDraggable } from '@dnd-kit/core'
import React, { useState } from 'react'
import EditTaskDialog from './TaskUpdatePopover';

const Task = ({ id, title }: { id: number | undefined, title: string }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: id! })
  const [open, setOpen] = useState(false);

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      style={style}
      className="p-3 rounded-lg bg-gray-200 shadow-sm mb-2 flex items-center justify-between"
      ref={setNodeRef}
    >
      <div onClick={() => setOpen(true)} className="cursor-pointer w-full">
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

      <EditTaskDialog taskId={id!} open={open} setOpen={setOpen} />
    </div>
  )
}

export default Task