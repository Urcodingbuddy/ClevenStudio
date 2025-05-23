"use client";

import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/packages/ui/tabs";
import { ProjectNotes } from "@repo/components/ui/project-notes";
import { ProjectHeader } from "@repo/components/ui/project-header";
import {
  Bug,
  Wrench,
  Search,
  Zap,
  FileText,
  Share2,
  RefreshCw,
  CheckCircle2,
  Circle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/packages/ui/card";
import { Progress } from "@repo/packages/ui/progress";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("bug-fixing");

  const projectDetails = {
    name: "Cleven E-commerce Platform",
    id: "CLV-2023-0042",
    status: "Running",
    githubLink: "https://github.com/clevenstudios/ecommerce-platform",
    uploadedBy: "Sarah Johnson",
    uploadDate: "Oct 15, 2023",
    deadline: "Dec 30, 2023",
  };

  const services = [
    {
      id: "bug-fixing",
      name: "Bug Fixing",
      icon: Bug,
      color: "blue",
      bgColor: "white",
      textColor: "white",
      borderColor: "border-zinc-800",
      progressColor: "bg-white",
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
      color: "green",
      bgColor: "bg-[#1a1a1a]",
      textColor: "text-white",
      borderColor: "border-zinc-800",
      gressColor: "bg-white",
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
      color: "purple",
      bgColor: "bg-[#1a1a1a]",
      textColor: "text-white",
      borderColor: "border-zinc-800",
      progressColor: "bg-white",
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
      color: "amber",
      bgColor: "bg-[#1a1a1a]",
      textColor: "text-white",
      borderColor: "border-zinc-800",
      progressColor: "bg-white",
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
      color: "red",
      bgColor: "bg-[#1a1a1a]",
      textColor: "text-white",
      borderColor: "border-red-800",
      progressColor: "bg-white",
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
      color: "white",
      bgColor: "bg-[#1a1a1a]",
      textColor: "text-white",
      borderColor: "border-teal-800",
      progressColor: "bg-white",
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
  ];

  // Find the active service
  const activeService =
    services.find((service) => service.id === activeTab) || services[0];

  return (
    <div className="min-h-screen bg-[#09090b] p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-white">
            Project Overview
          </h1>
          <span
            className={`px-2 py-1 border flex justify-evenly gap-1 w-16 items-center text-sm font-medium rounded-full ${activeService?.bgColor} ${activeService?.textColor}`}
          >
            Live <Zap className="w-3" />
          </span>
        </div>
        <button className="p-2 rounded-full bg-[#09090b] text-white hover:-rotate-360 transition transform-3d border duration-1000">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Project Details */}
      <ProjectHeader project={projectDetails} />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Service Details */}
        <div className="lg:col-span-2">
          <Card className="bg-[#09090b] backdrop-blur-3xl border shadow-lg overflow-hidden">
            <CardHeader className="pb-2 border-b ">
              <CardTitle className="text-lg">Service Details</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs
                defaultValue="bug-fixing"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="px-4 py-2 border-b">
                  <TabsList className="h-auto p-1 bg-[#09090b] rounded-md flex flex-wrap gap-1">
                    {services.map((service) => (
                      <TabsTrigger
                        key={service.id}
                        value={service.id}
                        className={`flex items-center gap-2 py-2 px-3 data-[state=active]:${service.bgColor} data-[state=active]:${service.textColor}`}
                      >
                        <service.icon className="w-4 h-4" />
                        <span className="text-xs">{service.name}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {services.map((service) => (
                  <TabsContent
                    key={service.id}
                    value={service.id}
                    className="p-4 mt-0"
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-4">
                      {/* Service Progress Card */}
                      <Card
                        className={`bg-[#09090b] border-${service.borderColor} shadow-lg`}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md font-medium text-muted-foreground">
                            Overall Progress
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xl font-bold ${service.textColor}`}
                            >
                              {service.percentage}%
                            </span>{" "}
                          </div>
                          <Progress
                            value={service.percentage}
                            className="h-1 mt-3 bg-muted"
                            indicatorClassName={`bg-gradient-to-r ${service.progressColor}`}
                          />
                          <p className="mt-2 text-xs text-muted-foreground">
                            Last updated: {service.lastUpdated}
                          </p>
                        </CardContent>
                      </Card>

                      {/* Service Status Card */}
                      <Card
                        className={`bg-[#09090b] border-${service.borderColor} shadow-lg`}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md font-medium text-muted-foreground">
                            Status
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xl font-bold ${service.textColor}`}
                            >
                              {service.status}
                            </span>
                            <span
                              className={`flex items-center justify-center w-6 h-6 rounded-full ${service.bgColor}`}
                            >
                              <span
                                className={`w-3  rounded-full ${service.textColor} animate-pulse`}
                              ></span>
                            </span>
                          </div>

                          <Progress
                            value={service.percentage}
                            className="h-1 mt-3 bg-muted"
                            indicatorClassName={`bg-gradient-to-r ${service.progressColor}`}
                          />

                          <p className="mt-2 text-xs text-muted-foreground">
                            {
                              service.steps.filter((step) => step.completed)
                                .length
                            }{" "}
                            of {service.steps.length} steps completed
                          </p>
                        </CardContent>
                      </Card>

                      {/* Time Remaining Card */}
                      <Card
                        className={`bg-[#09090b] border-${service.borderColor} shadow-lg`}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            Time Remaining
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xl font-bold ${service.textColor}`}
                            >
                              {Math.floor(Math.random() * 30) + 1} days
                            </span>
                            <span
                              className={`flex items-center justify-center w-6 h-6 rounded-full ${service.bgColor} ${service.textColor}`}
                            >
                              <RefreshCw className="w-4 h-4" />
                            </span>
                          </div>
                          <Progress
                            value={service.percentage}
                            className="h-1 mt-3 bg-muted"
                            indicatorClassName={`bg-gradient-to-r ${service.progressColor}`}
                          />
                          <p className="mt-2 text-xs text-muted-foreground">
                            Deadline: {projectDetails.deadline}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="bg-[#09090b]  shadow-lg mb-0">
                      <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex items-center justify-center w-6 h-6 rounded-full ${service.bgColor} ${service.textColor}`}
                          >
                            <service.icon className="w-5 h-5" />
                          </div>
                          <CardTitle className="text-md font-medium">
                            {service.name}
                          </CardTitle>
                        </div>
                        <div
                          className={`px-2 py-1 text-sm text-muted-foreground font-medium rounded-full ${service.bgColor} ${service.textColor}`}
                        >
                          
                          <span className="text-white">
                            {service.percentage}%
                          </span>{" "}
                          {service.status}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-1 flex justify-evenly items-center gap-2">
                            <Progress
                              value={service.percentage}
                              className="h-2 bg-muted"
                              indicatorClassName={`bg-gradient-to-r ${service.progressColor}`}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                            {service.steps.map((step, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 p-2 rounded-md bg-[#09090b]"
                              >
                                {step.completed ? (
                                  <div
                                    className={`flex items-center justify-center w-4 h-4 rounded-full ${service.bgColor}`}
                                  >
                                    <CheckCircle2
                                      className={`w-3 h-3 ${service.textColor}`}
                                    />
                                  </div>
                                ) : (
                                  <Circle className="w-4 h-4 text-slate-600" />
                                )}
                                <span
                                  className={`text-xs ${step.completed ? "text-slate-200" : "text-slate-500"}`}
                                >
                                  {step.name}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="text-xs text-slate-500">
                            Last updated: {service.lastUpdated}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Project Stats */}
          <Card className="bg-[#09090b] shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium ">
                Project Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Tasks Completed</span>
                  <span className="text-white/90">
                    {services.reduce(
                      (acc, service) =>
                        acc +
                        service.steps.filter((step) => step.completed).length,
                      0
                    )}{" "}
                    /
                    {services.reduce(
                      (acc, service) => acc + service.steps.length,
                      0
                    )}
                  </span>
                </div>
                <Progress
                  value={Math.round(
                    (services.reduce(
                      (acc, service) =>
                        acc +
                        service.steps.filter((step) => step.completed).length,
                      0
                    ) /
                      services.reduce(
                        (acc, service) => acc + service.steps.length,
                        0
                      )) *
                      100
                  )}
                  className="h-1 bg-muted"
                  indicatorClassName="bg-white"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Services Started
                  </span>
                  <span className="text-white/90">
                    {services.length} / {services.length}
                  </span>
                </div>
                <Progress
                  value={100}
                  className="h-1 bg-muted"
                  indicatorClassName="bg-white"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Overall Completion
                  </span>
                  <span className="text-white/90">
                    {Math.round(
                      services.reduce(
                        (acc, service) => acc + service.percentage,
                        0
                      ) / services.length
                    )}
                    %
                  </span>
                </div>
                <Progress
                  value={Math.round(
                    services.reduce(
                      (acc, service) => acc + service.percentage,
                      0
                    ) / services.length
                  )}
                  className="h-1 bg-muted"
                  indicatorClassName="bg-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Project Notes */}
          <Card className="bg-[#09090b]  shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Project Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectNotes />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
