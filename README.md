# 📌 Task Management Board (Kanban Style)

A modern Kanban-style task board built using **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **dnd-kit**.  
The board supports drag-and-drop workflow management with persistent storage via IndexedDB.

[https://task-kanban-henna.vercel.app/](https://task-kanban-henna.vercel.app/)

---

## 🚀 Features

### ✅ Core Features Implemented
- **Multiple Columns** (To Do, In Progress, Done — scalable to any number)
- **Add Tasks** with title and description
- **Edit Tasks** via modal/popover
- **Delete Tasks**
- **Drag & Drop** tasks between columns using **dnd-kit**
- **Persistent Storage** using `IndexedDB` (tasks remain after refresh)
- **Responsive UI** (mobile + desktop)
- **Dark Mode Support**
- **Task Count per Column**

---

## 🎨 UI/UX Features
- Clean, modern interface with Tailwind + shadcn/ui components  
- Smooth drag-and-drop animations  
- Task skeleton loaders for better UX  
- Empty-state messages for columns without tasks  
- Automatic theme switching (light/dark mode)

---

## 🧠 How AI Was Used (Transparency)
I wrote the application's logic, drag-and-drop behavior, and IndexedDB integration myself.

I used ChatGPT **only** to:
- Generate color palettes and theming suggestions  
- Help structure TypeScript interfaces and types  
- Explain and guide the usage of IndexedDB  
- Provide example snippets for cleaner component organization

❌ Limitation
Drag-and-drop may not work on the first attempt.
Sometimes the item doesn’t move initially, which might be related to how unique IDs are assigned to tasks within each column. I still need to debug and verify the ID generation and mapping logic to ensure consistent draggable behavior.

All final implementations, logic decisions, and integrations were done manually with full understanding.

---

## 🛠️ Tech Stack

| Category | Technology |
|---------|------------|
| Framework | **Next.js 15 (App Router)** |
| Language | **TypeScript** |
| Styling | **Tailwind CSS**, **shadcn/ui** |
| Drag & Drop | **dnd-kit** |
| Storage | **IndexedDB** |
| UI Components | Custom + shadcn/ui |

---

## 📁 Project Structure

app/
│── layout.tsx
│── page.tsx
│── globals.css
│
├── components/
│ ├── globals/
│ │ ├── Board.tsx
│ │ ├── Column.tsx
│ │ ├── Task.tsx
│ │ ├── TaskPopover.tsx
│ │ ├── TaskSkeleton.tsx
│ │ └── TaskUpdatePopover.tsx
│ │
│ ├── provider/
│ │ └── theme-provider.tsx
│
├── ui/ (shadcn components)
|
├── db/
│ ├── db.ts ← IndexedDB utilities
└── lib/
  ├── utils.ts 

## 🧩 Bonus Features Implemented
- ✔ **Dark Mode Toggle**
- ✔ **Task Count Display in Columns**

---

## ▶️ Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

### 3. Open in browser
```bash
http://localhost:3000
```

💡 Future Improvements (Optional)

Task priority levels (High / Medium / Low)

Search & filter tasks

Subtasks

User authentication

Cloud sync using an API backend

🏁 Conclusion

This project demonstrates:

Client-side state management

IndexedDB persistence

Drag-and-drop interaction with dnd-kit

Modern UI development using Next.js 15 + Tailwind

Clean and scalable component architecture

Perfect for showcasing frontend engineering, state management, and UI/UX skills.
