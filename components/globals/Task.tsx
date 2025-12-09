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
      onClick={() => setOpen(true)}

      ref={setNodeRef} {...listeners} {...attributes} style={style} className="p-3 rounded-lg bg-gray-200 shadow-sm cursor-grab mb-2"
    >
      {title}
      <EditTaskDialog taskId={id!} open={open} setOpen={setOpen} />
    </div>
  )
}

export default Task