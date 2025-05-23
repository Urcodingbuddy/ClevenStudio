"use client"

import { useState } from "react"
import { Button } from "@repo/packages/ui/button"
import { Textarea } from "@repo/packages/ui/textarea"
import { User, Clock, Send } from "lucide-react"

const initialNotes = [
  {
    id: 1,
    author: "Sarah Johnson",
    date: "Nov 10, 2023",
    content: "Fixed the checkout page bug. The issue was related to the payment gateway integration.",
  },
  {
    id: 2,
    author: "Mike Chen",
    date: "Nov 9, 2023",
    content: "Updated product catalog with new items. Please review the images and descriptions.",
  },
]

export function ProjectNotes() {
  const [notes, setNotes] = useState(initialNotes)
  const [newNote, setNewNote] = useState("")

  const handleAddNote = () => {
    if (!newNote.trim()) return

    const note = {
      id: Date.now(),
      author: "You",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      content: newNote,
    }

    setNotes([note, ...notes])
    setNewNote("")
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Textarea
          placeholder="Add a note about this project..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="min-h-[80px] bg-[#0c0c0c] border-1  text-sm resize-none focus-visible:gray-500"
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={handleAddNote} className="flex items-center gap-2 bg-[#161616] text-white hover:bg-[#1a1a1a] cursor-pointer ">
          <Send className="w-4 h-4" />
          <span>Add Note</span>
        </Button>
      </div>

      <div className="space-y-2 mt-4">
        {notes.map((note) => (
          <div key={note.id} className="p-3 rounded-md bg-[#0c0c0c] border-l-2 border-gray-500">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#0c0c0c] text-blue-400">
                  <User className="w-3 h-3 text-white " />
                </div>
                <span className="text-xs font-medium">{note.author}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                <span>{note.date}</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 pl-7">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
