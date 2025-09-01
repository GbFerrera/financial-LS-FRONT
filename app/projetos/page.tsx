"use client"

import * as React from "react"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  DollarSign,
  User,
  Clock,
  Archive,
  Edit,
  Trash2,
  Eye
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Dados mockados dos projetos
const mockProjects = [
  {
    id: 1,
    title: "Sistema de Gestão Financeira",
    description: "Desenvolvimento de plataforma completa para gestão financeira empresarial",
    status: "em_andamento",
    start_date: "2024-01-15",
    end_date: "2024-06-30",
    price: 150000,
    user_name: "João Silva",
    user_email: "joao@empresa.com",
    tasks: 12
  },
  {
    id: 2,
    title: "Integração API Bancária",
    description: "Integração com APIs de bancos para automatização de transações",
    status: "planejado",
    start_date: "2024-03-01",
    end_date: "2024-05-15",
    price: 85000,
    user_name: "Maria Santos",
    user_email: "maria@empresa.com",
    tasks: 8
  },
  {
    id: 3,
    title: "Dashboard Analytics",
    description: "Criação de dashboard avançado com análises e relatórios",
    status: "concluido",
    start_date: "2023-11-01",
    end_date: "2024-01-30",
    price: 95000,
    user_name: "Pedro Costa",
    user_email: "pedro@empresa.com",
    tasks: 15
  }
]

const statusMap = {
  planejado: { label: "Planejado", color: "bg-blue-100 text-blue-800" },
  em_andamento: { label: "Em Andamento", color: "bg-yellow-100 text-yellow-800" },
  concluido: { label: "Concluído", color: "bg-green-100 text-green-800" },
  cancelado: { label: "Cancelado", color: "bg-red-100 text-red-800" }
}

export default function Projetos() {
  const [projects, setProjects] = React.useState(mockProjects)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("todos")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const [newProject, setNewProject] = React.useState({
    title: "",
    description: "",
    status: "planejado",
    start_date: "",
    end_date: "",
    price: "",
    user_id: ""
  })

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreateProject = () => {
    const projectData = {
      ...newProject,
      id: Date.now(),
      price: parseFloat(newProject.price) || 0,
      user_name: "Usuário Teste",
      user_email: "usuario@teste.com",
      tasks: 0
    }
    
    setProjects([...projects, projectData])
    setNewProject({
      title: "",
      description: "",
      status: "planejado",
      start_date: "",
      end_date: "",
      price: "",
      user_id: ""
    })
    setIsCreateDialogOpen(false)
  }

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id))
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Gestão de Projetos</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie todos os projetos da empresa
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Projeto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Criar Novo Projeto</DialogTitle>
                <DialogDescription>
                  Preencha as informações do projeto
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Título do Projeto</Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    placeholder="Digite o título do projeto"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    placeholder="Descreva o projeto"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={newProject.status} onValueChange={(value) => setNewProject({...newProject, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planejado">Planejado</SelectItem>
                        <SelectItem value="em_andamento">Em Andamento</SelectItem>
                        <SelectItem value="concluido">Concluído</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Valor (R$)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProject.price}
                      onChange={(e) => setNewProject({...newProject, price: e.target.value})}
                      placeholder="0,00"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start_date">Data de Início</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={newProject.start_date}
                      onChange={(e) => setNewProject({...newProject, start_date: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end_date">Data de Término</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={newProject.end_date}
                      onChange={(e) => setNewProject({...newProject, end_date: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateProject}>
                  Criar Projeto
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Filtros e Busca */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Status</SelectItem>
              <SelectItem value="planejado">Planejado</SelectItem>
              <SelectItem value="em_andamento">Em Andamento</SelectItem>
              <SelectItem value="concluido">Concluído</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lista de Projetos */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge className={statusMap[project.status as keyof typeof statusMap].color}>
                      {statusMap[project.status as keyof typeof statusMap].label}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{project.user_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>R$ {project.price.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(project.start_date).toLocaleDateString('pt-BR')} - {' '}
                      {new Date(project.end_date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Archive className="h-4 w-4 text-muted-foreground" />
                    <span>{project.tasks} tarefas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Archive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum projeto encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "todos" 
                ? "Tente ajustar os filtros de busca"
                : "Comece criando seu primeiro projeto"
              }
            </p>
            {!searchTerm && statusFilter === "todos" && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Projeto
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  )
}