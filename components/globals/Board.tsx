import { DndContext } from '@dnd-kit/core'
import React from 'react'

const Board = () => {
  return (
    <DndContext>
        <main className='flex-1 w-full h-full py-4   bg-red-600 grid grid-cols-3 space-x-4'>Board</main>
    </DndContext>
  )
}

export default Board