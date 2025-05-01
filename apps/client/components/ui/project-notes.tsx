"use client"

import { useState } from "react"
import { Send, PaperclipIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/components/ui/card"
import { Button } from "@repo/components/ui/button"
import { Textarea } from "@repo/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/components/ui/avatar"
import { Separator } from "@repo/components/ui/separator"

interface Note {
  id: string
  author: string
  avatar: string
  content: string
  date: string
  isClient?: boolean
}

export function ProjectNotes() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      author: "Sarah Johnson",
      avatar: "SJ",
      content: "Updated the bug report with additional details. Please check the attached files.",
      date: "Nov 10, 2023 • 10:23 AM",
    },
    {
      id: "2",
      author: "Client",
      avatar: "CL",
      content:
        "Thanks for the update. I've reviewed the changes and they look good. Looking forward to the next phase.",
      date: "Nov 10, 2023 • 2:45 PM",
      isClient: true,
    },
    {
      id: "3",
      author: "Michael Chen",
      avatar: "MC",
      content:
        "I've completed the first round of bug fixes. The main navigation issue has been resolved. Will continue working on the remaining items tomorrow.",
      date: "Nov 11, 2023 • 9:15 AM",
    },
    {
      id: "4",
      author: "Client",
      avatar: "CL",
      content:
        "Great progress! I noticed the navigation is much smoother now. Could we also address the loading time on the product pages?",
      date: "Nov 11, 2023 • 11:30 AM",
      isClient: true,
    },
  ])

  return (
    <Card className="shadow-md border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Project Notes</CardTitle>
            <CardDescription>Share updates and feedback with the client</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2 rounded-full">
            <PaperclipIcon className="h-4 w-4" />
            <span>Attach Files</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 pb-4">
          {notes.map((note) => (
            <div key={note.id} className={`flex gap-3 ${note.isClient ? "flex-row-reverse text-right" : ""}`}>
              <Avatar className={`h-9 w-9 ${note.isClient ? "ring-2 ring-primary/20 ring-offset-2" : ""}`}>
                <AvatarImage src="/placeholder.svg" alt={note.author} />
                <AvatarFallback className={note.isClient ? "bg-primary/20 text-primary" : ""}>
                  {note.avatar}
                </AvatarFallback>
              </Avatar>
              <div className={`space-y-1 ${note.isClient ? "items-end" : ""}`}>
                <div className={`flex items-center gap-2 ${note.isClient ? "flex-row-reverse" : ""}`}>
                  <span className="text-sm font-medium">{note.author}</span>
                  <span className="text-xs text-muted-foreground">{note.date}</span>
                </div>
                <div
                  className={`text-sm p-3 rounded-lg max-w-[85%] ${
                    note.isClient
                      ? "bg-primary/10 text-primary-foreground ml-auto"
                      : "bg-muted/50 border border-border/50"
                  }`}
                >
                  {note.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter>
        <div className="flex w-full gap-2">
          <Textarea placeholder="Add a note..." className="min-h-[80px] resize-none focus-visible:ring-primary/50" />
          <Button size="icon" className="h-10 w-10 shrink-0 self-end rounded-full">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
