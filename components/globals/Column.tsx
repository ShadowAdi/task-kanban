import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

export const Column = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children?: ReactNode;
}) => {
  const {setNodeRef,isOver}=useDroppable({id})
  return (
    <div ref={setNodeRef}   className={`flex flex-col p-4 rounded-xl min-h-[80vh] border 
        ${isOver ?id==="todo"? "bg-blue-100":id==="done"?"bg-yellow-100":"bg-green-100" : "bg-white"}
      `}>
         <h2 className="font-semibold mb-3">{title}</h2>
      {children}
    </div>
  )
}