import type React from "react"
import { Progress } from "@repo/components/ui/progress"
import { CheckCircle2, Circle } from "lucide-react"

interface ServiceStep {
  name: string
  completed: boolean
}

interface ServiceProps {
  id: string
  name: string
  icon: React.ElementType
  color: string
  bgColor: string
  textColor: string
  borderColor: string
  progressColor: string
  steps: ServiceStep[]
  percentage: number
  lastUpdated: string
  status: string
}

export function ServiceCard({ service }: { service: ServiceProps | undefined }) {
  if (!service) {
    return (
      <div className="p-4 text-center text-slate-500">
        No service data available
      </div>
    );
  }

  const steps = service.steps || [];
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${service.bgColor || ''} ${service.textColor || ''}`}
          >
            {service.icon && <service.icon className="w-4 h-4" />}
          </div>
          <h3 className="text-lg font-medium">{service.name || 'Untitled'}</h3>
        </div>
        <div className={`px-2 py-1 text-xs font-medium rounded-full ${service.bgColor || ''} ${service.textColor || ''}`}>
          {service.status || 'Unknown'}
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className={service.textColor || ''}>{service.percentage ?? 0}%</span>
        </div>
        <Progress
          value={service.percentage ?? 0}
          className="h-2 bg-[#0c0c0c]"
          indicatorClassName={`bg-gradient-to-r ${service.progressColor || ''}`}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-[#0c0c0c]">
            {step.completed ? (
              <div className={`flex items-center justify-center w-4 h-4 rounded-full ${service.bgColor || ''}`}>
                <CheckCircle2 className={`w-3 h-3 ${service.textColor || ''}`} />
              </div>
            ) : (
              <Circle className="w-4 h-4 text-slate-600" />
            )}
            <span className={`text-xs ${step.completed ? "text-slate-200" : "text-slate-500"}`}>
              {step.name || 'Unnamed Step'}
            </span>
          </div>
        ))}
      </div>

      <div className="text-xs text-slate-500">
        Last updated: {service.lastUpdated || 'Never'}
      </div>
    </div>
  )
}