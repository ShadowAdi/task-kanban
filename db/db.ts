import Dexie, { Table } from "dexie";

export interface Task {
  id?: number;
  name: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  createdAt: number;
}


class MyDatebase extends Dexie{
    tasks!:Table<Task>;
    constructor(){
        super("kanbanDB");
        this.version(1).stores({
            tasks:"++id,name,status"
        })
    }
}

export const db=new MyDatebase()