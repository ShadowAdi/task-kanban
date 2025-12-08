import { useDroppable } from '@dnd-kit/core';
import React, { ReactNode } from 'react'

const Column = ({ id, title, children }: { id: string, title: string; children?: ReactNode }) => {
    const { setNodeRef, isOver } = useDroppable({ id })
    return (
        <div
            ref={setNodeRef}
            className={`flex flex-col p-4 rounded-xl min-h-[80vh] border 
        ${isOver ? "bg-blue-100" : "bg-white"}
      `}
        >
            <h2 className="font-semibold mb-3">{title}</h2>
            {children}
        </div>
    )
}

export default Column