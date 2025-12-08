import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen px-6 py-8">
      <div className="flex items-center w-full justify-between ">
        <h1 className="text-3xl font-medium">
          All Taks
        </h1>
        <Button className="text-base ">
          <Plus />
          Create New
        </Button>

      </div>
    </main>
  );
}
