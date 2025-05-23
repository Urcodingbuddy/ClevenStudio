import { Card, CardContent } from "@repo/components/ui/card"
import { Github, Calendar, User, Clock } from "lucide-react"
import Link from "next/link"

interface ProjectProps {
  name: string
  id: string
  status: string
  githubLink: string
  uploadedBy: string
  uploadDate: string
  deadline: string
}

export function ProjectHeader({ project }: { project: ProjectProps }) {
  return (
    <Card className="bg-[#09090b] backdrop-blur-3xl relative  shadow-lg">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">{project.name}</h2>
            <p className="text-sm text-muted-foreground">ID: {project.id}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex border items-center gap-2 px-3 py-1.5 transition-colors rounded-md bg-[#0c0c0c] hover:bg-[#1a1a1a] hover:text-white/"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </Link>

            <div className="flex border *:items-center gap-2 px-3 py-1.5 rounded-md bg-[#0c0c0c]">
              <User className="w-4 h-4  text-green-400" />
              <span>{project.uploadedBy}</span>
            </div>

            <div className="flex border items-center gap-2 px-3 py-1.5 rounded-md bg-[#0c0c0c]">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{project.uploadDate}</span>
            </div>

            <div className="flex border items-center gap-2 px-3 py-1.5 rounded-md bg-[#0c0c0c]">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>{project.deadline}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
