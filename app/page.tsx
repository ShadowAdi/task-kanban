import Board from "@/components/globals/Board";
import TaskPopover from "@/components/globals/TaskPopover";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen p-8 space-y-3">
      <div className="flex items-center w-full justify-between ">
        <h1 className="text-4xl font-medium">
          All Taks
        </h1>
       <TaskPopover/>
      </div>
      <Board />
    </main>
  );
}
