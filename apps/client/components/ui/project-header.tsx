import { ExternalLink, Calendar, GitBranch, User, Clock } from "lucide-react"
import { Card, CardContent } from "@repo/components/ui/card"
import { Badge } from "@repo/components/ui/badge"
import { Button } from "@repo/components/ui/button"

interface ProjectHeaderProps {
  project: {
    name: string
    id: string
    status: string
    githubLink: string
    uploadedBy: string
    uploadDate: string
    deadline: string
  }
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <Card className="border-none overflow-hidden bg-gradient-to-r from-background to-background/80 shadow-lg">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
              <Badge
                variant={
                  project.status === "Running" ? "default" : project.status === "Paused" ? "secondary" : "outline"
                }
                className="w-fit sm:ml-2"
              >
                {project.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Project ID: {project.id}</p>
            <div className="flex items-center gap-2 mt-4">
              <Button variant="outline" size="sm" className="gap-2 rounded-full shadow-sm hover:shadow transition-all">
                <GitBranch className="h-4 w-4" />
                <span>View Source</span>
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 bg-muted/40 p-3 rounded-lg border border-border/50">
              <p className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Uploaded by
              </p>
              <div>
                <p className="text-sm font-semibold">{project.uploadedBy}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{project.uploadDate}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 bg-muted/40 p-3 rounded-lg border border-border/50">
              <p className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Deadline
              </p>
              <div>
                <p className="text-sm font-semibold">{project.deadline}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></div>
                  <p className="text-xs text-muted-foreground">{getDaysRemaining(project.deadline)} days remaining</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function getDaysRemaining(deadlineStr: string): number {
  const deadline = new Date(deadlineStr)
  const today = new Date()
  const diffTime = deadline.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
}
