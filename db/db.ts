import Dexie, { Table } from "dexie";

export interface TaskInterface {
  id?: number;
  name: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  createdAt: Date;
}


class MyDatebase extends Dexie{
    tasks!:Table<TaskInterface>;
    constructor(){
        super("kanbanDB");
        this.version(1).stores({
            tasks:"++id,name,status"
        })
    }
}

export const db=new MyDatebase()