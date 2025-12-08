import { DndContext } from '@dnd-kit/core'
import React from 'react'
import Column from './Column'

const Board = () => {
  return (
    <DndContext>
        <main className='flex-1 w-full h-full py-4   grid grid-cols-3 space-x-4'>
 <Column id="todo" title="To Do" />

        <Column id="in-progress" title="In Progress" />

        <Column id="done" title="Done" />
        </main>
    </DndContext>
  )
}

export default Board