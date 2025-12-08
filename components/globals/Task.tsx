import { useDraggable } from "@dnd-kit/core";

export function Task({ id, title }:{id:string,title:string}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="p-3 rounded-lg bg-gray-200 shadow-sm cursor-grab mb-2"
    >
      {title}
    </div>
  );
}
