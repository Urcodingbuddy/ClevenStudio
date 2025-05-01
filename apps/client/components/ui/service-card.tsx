import type React from "react"
import { CheckCircle2, Circle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/components/ui/card"
import { Progress } from "@repo/components/ui/progress"
import { Badge } from "@repo/components/ui/badge"

interface ServiceStep {
  name: string
  completed: boolean
}

interface ServiceCardProps {
  service: {
    id: string
    name: string
    icon: React.ComponentType<{ className?: string }>
    steps: ServiceStep[]
    percentage: number
    lastUpdated: string
    status: string
  }
}

export function ServiceCard({ service }: ServiceCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "In Progress":
        return "bg-blue-500"
      default:
        return "bg-orange-500"
    }
  }

  return (
    <Card className="shadow-md border-border/50 overflow-hidden">
      <div className={`h-1 ${getStatusColor(service.status)}`}></div>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/10">
              <service.icon className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>{service.name}</CardTitle>
          </div>
          <Badge
            variant={
              service.status === "Completed" ? "default" : service.status === "In Progress" ? "secondary" : "outline"
            }
            className="w-fit"
          >
            {service.status}
          </Badge>
        </div>
        <CardDescription className="mt-1">Last updated: {service.lastUpdated}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{service.percentage}%</span>
          </div>
          <Progress value={service.percentage} className="h-2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
            {service.steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-200 ${
                  step.completed ? "bg-primary/5 border-primary/20" : "bg-card border-border/50 hover:border-border"
                }`}
              >
                {step.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <span className={`text-sm ${step.completed ? "font-medium" : "text-muted-foreground"}`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="text-xs text-muted-foreground">
          {service.steps.filter((step) => step.completed).length} of {service.steps.length} steps completed
        </div>
      </CardFooter>
    </Card>
  )
}
