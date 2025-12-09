import Dexie, { Table } from "dexie";

export interface TaskInterface {
    id?: number;
    name: string;
    description?: string;
    status: "todo" | "in_progress" | "done";
    createdAt: Date;
}


class MyDatebase extends Dexie {
    tasks!: Table<TaskInterface>;
    constructor() {
        super("kanbanDB");
        this.version(1).stores({
            tasks: "++id,name,description,status,createdAt"
        });
        this.version(2).stores({
            tasks: "++id,name,description,status,createdAt"
        });
    }
}

export const db = new MyDatebase()

export const taskEvent = new EventTarget()

db.tasks.hook("creating", () => {
    taskEvent.dispatchEvent(new Event("refresh"))
})

db.tasks.hook('updating', () => {
    taskEvent.dispatchEvent(new Event("refresh"));
});