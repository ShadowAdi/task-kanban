import { DndContext } from '@dnd-kit/core'
import React from 'react'
import Column from './Column'

const Board = () => {
    const handleDragEnd = (event) => {
  const { over, active } = event;

  if (over) {
    console.log("Task", active.id, "dropped in column", over.id);
    // Move task to new column here
  }
};
  return (
    <DndContext onDragEnd={handleDragEnd}>
        <main className='flex-1 w-full h-full py-4   grid grid-cols-3 space-x-4'>
 <Column id="todo" title="To Do" />

        <Column id="in-progress" title="In Progress" />

        <Column id="done" title="Done" />
        </main>
    </DndContext>
  )
}

export default Board