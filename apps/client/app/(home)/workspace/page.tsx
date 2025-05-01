"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/components/ui/tabs"

import { Button } from "@repo/components/ui/button"
import { ProjectNotes } from "@repo/components/ui/project-notes"
import { ProjectHeader } from "@repo/components/ui/project-header"
import { ServiceCard } from "@repo/components/ui/service-card"
import { Bug, Wrench, Search, Zap, FileText, Share2} from "lucide-react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("bug-fixing")

  const projectDetails = {
    name: "Cleven E-commerce Platform",
    id: "CLV-2023-0042",
    status: "Running",
    githubLink: "https://github.com/clevenstudios/ecommerce-platform",
    uploadedBy: "Sarah Johnson",
    uploadDate: "Oct 15, 2023",
    deadline: "Dec 30, 2023",
  }

  const services = [
    {
      id: "bug-fixing",
      name: "Bug Fixing",
      icon: Bug,
      steps: [
        { name: "Issue Reported", completed: true },
        { name: "Bug Identified", completed: true },
        { name: "Fix in Progress", completed: true },
        { name: "Testing Phase", completed: false },
        { name: "Deployment", completed: false },
      ],
      percentage: 60,
      lastUpdated: "Nov 10, 2023",
      status: "In Progress",
    },
    {
      id: "maintenance",
      name: "Maintenance & Support",
      icon: Wrench,
      steps: [
        { name: "System Audit", completed: true },
        { name: "Performance Check", completed: true },
        { name: "Updates Applied", completed: false },
        { name: "Security Scan", completed: false },
        { name: "Final Report", completed: false },
      ],
      percentage: 40,
      lastUpdated: "Nov 8, 2023",
      status: "In Progress",
    },
    {
      id: "seo",
      name: "SEO Optimization",
      icon: Search,
      steps: [
        { name: "Keyword Analysis", completed: true },
        { name: "On-Page SEO", completed: false },
        { name: "Content Optimization", completed: false },
        { name: "Backlink Strategy", completed: false },
        { name: "Performance Review", completed: false },
      ],
      percentage: 20,
      lastUpdated: "Nov 5, 2023",
      status: "Started",
    },
    {
      id: "speed",
      name: "Website Speed Optimization",
      icon: Zap,
      steps: [
        { name: "Performance Audit", completed: true },
        { name: "Asset Optimization", completed: true },
        { name: "Code Minification", completed: false },
        { name: "Caching Implementation", completed: false },
        { name: "Final Testing", completed: false },
      ],
      percentage: 40,
      lastUpdated: "Nov 7, 2023",
      status: "In Progress",
    },
    {
      id: "content",
      name: "Content Update & Management",
      icon: FileText,
      steps: [
        { name: "Content Review", completed: true },
        { name: "Updates Planned", completed: true },
        { name: "Content Creation", completed: false },
        { name: "Implementation", completed: false },
        { name: "Client Approval", completed: false },
      ],
      percentage: 40,
      lastUpdated: "Nov 9, 2023",
      status: "In Progress",
    },
    {
      id: "social",
      name: "Social Media Integration",
      icon: Share2,
      steps: [
        { name: "Platform Selection", completed: true },
        { name: "API Integration", completed: false },
        { name: "Feed Configuration", completed: false },
        { name: "Testing", completed: false },
        { name: "Deployment", completed: false },
      ],
      percentage: 20,
      lastUpdated: "Nov 4, 2023",
      status: "Started",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6 space-y-8">
        <ProjectHeader project={projectDetails} />
        <Tabs defaultValue="bug-fixing" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-muted/30 p-1 rounded-lg border border-border/50">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 bg-transparent h-auto p-1">
              {services.map((service) => (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="flex items-center gap-2 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                >
                  <service.icon className="h-4 w-4" />
                  <span className="hidden md:inline">{service.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {services.map((service) => (
            <TabsContent key={service.id} value={service.id} className="space-y-4 mt-6">
              <ServiceCard service={service} />
            </TabsContent>
          ))}
        </Tabs>

        <div className="w-full">
          <ProjectNotes />
        </div>
      </main>

      <footer className="border-t py-6 md:py-0 bg-muted/20">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
          <p className="text-sm text-muted-foreground">© 2023 Cleven Studios. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Help
            </Button>
            <Button variant="ghost" size="sm">
              Privacy
            </Button>
            <Button variant="ghost" size="sm">
              Terms
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
