import { useDraggable } from '@dnd-kit/core'
import React from 'react'

const Task = ({ id, title }: { id: number|undefined, title: string }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: id! })

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style} className="p-3 rounded-lg bg-gray-200 shadow-sm cursor-grab mb-2"
    >
      {title}
    </div>
  )
}

export default Task