"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/components/common/select"
import { ScrollArea } from "@repo/components/common/scroll-area"
import { Button } from "@repo/components/common/button"
import { Input } from "@repo/components/common/input"
import { Textarea } from "@repo/components/common/textarea"
import { Card, CardContent, CardHeader } from "@repo/components/common/card"
import { Badge } from "@repo/components/common/badge"
import { Calendar } from "@repo/components/common/calender"
import { Popover, PopoverContent, PopoverTrigger } from "@repo/components/common/popOver"

import { Plus, X, Search, CalendarIcon, Clock, CheckCircle2, Circle, AlertCircle, Filter, Trash2 } from "lucide-react"
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
    low: "bg-green-500/20 text-green-400 border-green-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    urgent: "bg-red-500/20 text-red-400 border-red-500/30",
}

const statusColors = {
    todo: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    "in-progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    completed: "bg-green-500/20 text-green-400 border-green-500/30",
}

export default function CompactTaskWidget() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterStatus, setFilterStatus] = useState<Status | "all">("all")
    const [showFilters, setShowFilters] = useState(false)
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: "TSK-001",
            title: "Design System Update",
            description: "Update component library",
            priority: "high",
            status: "in-progress",
            category: "development",
            dueDate: new Date(2024, 11, 30),
            createdAt: new Date(2024, 11, 20),
            assignee: "John Doe",
        },
        {
            id: "TSK-002",
            title: "Client Review",
            description: "Prepare quarterly materials",
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
            description: "Review team PRs",
            priority: "medium",
            status: "completed",
            category: "development",
            createdAt: new Date(2024, 11, 18),
        },
        {
            id: "TSK-004",
            title: "Bug Fixes",
            description: "Fix critical issues",
            priority: "high",
            status: "todo",
            category: "work",
            dueDate: new Date(2024, 11, 28),
            createdAt: new Date(2024, 11, 23),
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

            return matchesSearch && matchesStatus
        })
    }, [tasks, searchQuery, filterStatus])

    const taskStats = useMemo(() => {
        const total = tasks.length
        const completed = tasks.filter((t) => t.status === "completed").length
        const inProgress = tasks.filter((t) => t.status === "in-progress").length
        const overdue = tasks.filter((t) => t.dueDate && t.dueDate < new Date() && t.status !== "completed").length

        return { total, completed, inProgress, overdue, completionRate: Math.round((completed / total) * 100) }
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
                return <CheckCircle2 className="h-3 w-3" />
            case "in-progress":
                return <Clock className="h-3 w-3" />
            default:
                return <Circle className="h-3 w-3" />
        }
    }

    const isOverdue = (task: Task) => {
        return task.dueDate && task.dueDate < new Date() && task.status !== "completed"
    }

    return (
        <div className="w-80 h-fit">
            {/* Task Stats Card */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm mb-4">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Task Overview</h3>
                        <Button onClick={openModal} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-3">
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <p className="text-gray-400">Tasks Completed</p>
                            <p className="text-white font-semibold">
                                {taskStats.completed} / {taskStats.total}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400">In Progress</p>
                            <p className="text-white font-semibold">{taskStats.inProgress}</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Overall Completion</span>
                            <span className="text-white font-semibold">{taskStats.completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${taskStats.completionRate}%` }}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tasks List Card */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Tasks</h3>
                        <div className="flex items-center gap-1">
                            <Button
                                onClick={() => setShowFilters(!showFilters)}
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                            >
                                <Filter className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="space-y-2">
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
                            <Input
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-7 h-8 bg-gray-800/50 border-gray-600 text-white text-sm placeholder:text-gray-400 focus:border-blue-500"
                            />
                        </div>

                        {showFilters && (
                            <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as Status | "all")}>
                                <SelectTrigger className="h-8 bg-gray-800/50 border-gray-600 text-white text-sm">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="todo">To Do</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="pt-0">
                    <ScrollArea className="h-80">
                        <div className="space-y-2">
                            {filteredTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={`p-3 rounded-lg border bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-200 ${isOverdue(task) ? "border-red-500/50" : "border-gray-700"
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2 flex-1">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => toggleTaskStatus(task.id)}
                                                className="p-0 h-auto text-gray-400 hover:text-white"
                                            >
                                                {getStatusIcon(task.status)}
                                            </Button>
                                            <span className="text-xs font-mono text-gray-500">{task.id}</span>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => deleteTask(task.id)}
                                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-400 hover:bg-gray-700"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>

                                    <h4
                                        className={`text-sm font-medium mb-1 ${task.status === "completed" ? "line-through text-gray-500" : "text-white"
                                            }`}
                                    >
                                        {task.title}
                                    </h4>
                                    <p className="text-xs text-gray-400 mb-2 line-clamp-1">{task.description}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-1">
                                            <Badge className={`text-xs px-1 py-0 ${priorityColors[task.priority]}`}>
                                                {task.priority.charAt(0).toUpperCase()}
                                            </Badge>
                                            <Badge className={`text-xs px-1 py-0 ${statusColors[task.status]}`}>
                                                {task.status === "in-progress" ? "IP" : task.status === "completed" ? "✓" : "TD"}
                                            </Badge>
                                        </div>

                                        {task.dueDate && (
                                            <div
                                                className={`flex items-center gap-1 text-xs ${isOverdue(task) ? "text-red-400" : "text-gray-400"}`}
                                            >
                                                <CalendarIcon className="h-3 w-3" />
                                                <span>{format(task.dueDate, "MMM dd")}</span>
                                                {isOverdue(task) && <AlertCircle className="h-3 w-3" />}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {filteredTasks.length === 0 && (
                                <div className="text-center py-8 text-gray-400">
                                    <Circle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No tasks found</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            {/* Create Task Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300"
                    onClick={closeModal}
                >
                    <div
                        className="bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-700 p-6 w-full max-w-md animate-in zoom-in-95 duration-300 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Create Task</h2>
                            <Button
                                onClick={closeModal}
                                size="icon"
                                variant="ghost"
                                className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full h-8 w-8"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Task Title *</label>
                                <Input
                                    placeholder="Enter task title"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
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
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
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
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Due Date</label>
                                <Popover>
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
                                </Popover>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                <Textarea
                                    placeholder="Describe the task..."
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 min-h-[80px] resize-none"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <Button
                                    type="button"
                                    onClick={closeModal}
                                    variant="ghost"
                                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                                    Create Task
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
