"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import { Textarea } from "@/components/common/textarea"
import { Card, CardContent, CardHeader } from "@/components/common/card"
import { Badge } from "@/components/common/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/select"
import { Calendar } from "@/components/common/calender"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/common/popover"
import {
  Plus,
  X,
  Edit,
  Search,
  CalendarIcon,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  Target,
  Users,
  Trash2,
} from "lucide-react"
import { format } from "date-fns"

type Priority = "low" | "medium" | "high" | "urgent"
type Status = "todo" | "in-progress" | "completed"
type Category = "work" | "personal" | "urgent" | "meeting" | "development"

interface Task {
  id: string
  title: string
  description: string
  priority: Priority
  status: Status
  category: Category
  dueDate?: Date
  createdAt: Date
  assignee?: string
}

const priorityColors = {
  low: "bg-green-500/10 text-green-500 border-green-500/20",
  medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  urgent: "bg-red-500/10 text-red-500 border-red-500/20",
}

const statusColors = {
  todo: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  "in-progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  completed: "bg-green-500/10 text-green-400 border-green-500/20",
}

const categoryColors = {
  work: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  personal: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  urgent: "bg-red-500/10 text-red-400 border-red-500/20",
  meeting: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  development: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
}

export default function ProfessionalTaskManager() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all")
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all")
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "TSK-001",
      title: "Design System Implementation",
      description: "Create a comprehensive design system for the application",
      priority: "high",
      status: "in-progress",
      category: "development",
      dueDate: new Date(2024, 11, 30),
      createdAt: new Date(2024, 11, 20),
      assignee: "John Doe",
    },
    {
      id: "TSK-002",
      title: "Client Meeting Preparation",
      description: "Prepare presentation materials for quarterly review",
      priority: "urgent",
      status: "todo",
      category: "meeting",
      dueDate: new Date(2024, 11, 25),
      createdAt: new Date(2024, 11, 22),
      assignee: "Jane Smith",
    },
    {
      id: "TSK-003",
      title: "Code Review",
      description: "Review pull requests from the development team",
      priority: "medium",
      status: "completed",
      category: "development",
      createdAt: new Date(2024, 11, 18),
    },
  ])

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as Priority,
    category: "work" as Category,
    dueDate: undefined as Date | undefined,
    assignee: "",
  })

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = filterStatus === "all" || task.status === filterStatus
      const matchesPriority = filterPriority === "all" || task.priority === filterPriority

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [tasks, searchQuery, filterStatus, filterPriority])

  const taskStats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.status === "completed").length
    const inProgress = tasks.filter((t) => t.status === "in-progress").length
    const overdue = tasks.filter((t) => t.dueDate && t.dueDate < new Date() && t.status !== "completed").length

    return { total, completed, inProgress, overdue }
  }, [tasks])

  const openModal = () => setIsModalOpen(true)

  const closeModal = () => {
    setIsModalOpen(false)
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      category: "work",
      dueDate: undefined,
      assignee: "",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.title.trim()) {
      const task: Task = {
        id: `TSK-${String(tasks.length + 1).padStart(3, "0")}`,
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        status: "todo",
        category: newTask.category,
        dueDate: newTask.dueDate,
        createdAt: new Date(),
        assignee: newTask.assignee || undefined,
      }
      setTasks([task, ...tasks])
      closeModal()
    }
  }

  const toggleTaskStatus = (taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const newStatus = task.status === "completed" ? "todo" : task.status === "todo" ? "in-progress" : "completed"
          return { ...task, status: newStatus }
        }
        return task
      }),
    )
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4" />
      default:
        return <Circle className="h-4 w-4" />
    }
  }

  const isOverdue = (task: Task) => {
    return task.dueDate && task.dueDate < new Date() && task.status !== "completed"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Task Manager</h1>
              <p className="text-gray-400">Organize and track your work efficiently</p>
            </div>
            <Button
              onClick={openModal}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Tasks</p>
                    <p className="text-2xl font-bold text-white">{taskStats.total}</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">In Progress</p>
                    <p className="text-2xl font-bold text-white">{taskStats.inProgress}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Completed</p>
                    <p className="text-2xl font-bold text-white">{taskStats.completed}</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Overdue</p>
                    <p className="text-2xl font-bold text-white">{taskStats.overdue}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
              />
            </div>

            <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as Status | "all")}>
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-800/50 border-gray-700 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={(value) => setFilterPriority(value as Priority | "all")}>
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-800/50 border-gray-700 text-white">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <Card
              key={task.id}
              className={`bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl ${
                isOverdue(task) ? "ring-2 ring-red-500/50" : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleTaskStatus(task.id)}
                      className="p-0 h-auto text-gray-400 hover:text-white"
                    >
                      {getStatusIcon(task.status)}
                    </Button>
                    <span className="text-sm font-mono text-gray-400">{task.id}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteTask(task.id)}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-gray-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <h3
                  className={`font-semibold mb-2 ${task.status === "completed" ? "line-through text-gray-500" : "text-white"}`}
                >
                  {task.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{task.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={`text-xs ${priorityColors[task.priority]}`}>{task.priority}</Badge>
                  <Badge className={`text-xs ${statusColors[task.status]}`}>{task.status.replace("-", " ")}</Badge>
                  <Badge className={`text-xs ${categoryColors[task.category]}`}>{task.category}</Badge>
                </div>

                <div className="space-y-2 text-xs text-gray-400">
                  {task.dueDate && (
                    <div className={`flex items-center gap-1 ${isOverdue(task) ? "text-red-400" : ""}`}>
                      <CalendarIcon className="h-3 w-3" />
                      <span>Due: {format(task.dueDate, "MMM dd, yyyy")}</span>
                      {isOverdue(task) && <AlertCircle className="h-3 w-3" />}
                    </div>
                  )}
                  {task.assignee && (
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{task.assignee}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Target className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No tasks found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        )}

        {/* Create Task Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300"
            onClick={closeModal}
          >
            <div
              className="bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-700 p-6 w-full max-w-2xl animate-in zoom-in-95 duration-300 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Create New Task</h2>
                <Button
                  onClick={closeModal}
                  size="icon"
                  variant="ghost"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Task Title *</label>
                    <Input
                      placeholder="Enter task title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value) => setNewTask({ ...newTask, priority: value as Priority })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <Select
                      value={newTask.category}
                      onValueChange={(value) => setNewTask({ ...newTask, category: value as Category })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="work">Work</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
                    {/* <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newTask.dueDate ? format(newTask.dueDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                        <Calendar
                          mode="single"
                          selected={newTask.dueDate}
                          onSelect={(date) => setNewTask({ ...newTask, dueDate: date })}
                          initialFocus
                          className="bg-gray-800"
                        />
                      </PopoverContent>
                    </Popover> */}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Assignee</label>
                    <Input
                      placeholder="Assign to..."
                      value={newTask.assignee}
                      onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                    <Textarea
                      placeholder="Describe the task..."
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 min-h-[100px] resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                  <Button
                    type="button"
                    onClick={closeModal}
                    variant="ghost"
                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                  >
                    Create Task
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
