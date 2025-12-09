'use client'
import Board from "@/components/globals/Board";
import { ModeToggle } from "@/components/globals/MoodToggle";
import TaskPopover from "@/components/globals/TaskPopover";
import { Button } from "@/components/ui/button";
import { taskEvent } from "@/db/db";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen p-8 space-y-3">
      <div className="flex items-center w-full justify-between ">
        <h1 className="text-4xl font-medium">
          All Taks
        </h1>

        <div className="flex space-x-3 items-center">
          <ModeToggle/>
          <Button onClick={() => {
            taskEvent.dispatchEvent(new Event("refresh"));
          }} className="cursor-pointer!" variant={"outline"}>
            Refresh
          </Button>
          <TaskPopover />
        </div>
      </div>
      <Board />
    </main>
  );
}
