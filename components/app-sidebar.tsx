"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  Building2,
  BarChart3,
  CreditCard,
  DollarSign,
  Receipt,
  Wallet,
  TrendingUp,
  Target,
  Settings2,
  Home,
  PieChart,
  FileText,
  Calendar,
  Archive,
  User,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { NavSecondary } from "@/components/nav-secondary"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Dados da empresa financeira
const data = {
  user: {
    name: "João Silva",
    email: "joao.silva@linkfinancial.com",
    avatar: "/avatars/user.jpg",
  },
  teams: [
    {
      name: "LinkFinancial",
      logo: Building2,
      plan: "Enterprise",
    },
    {
      name: "Matriz SP",
      logo: DollarSign,
      plan: "Corporate",
    },
    {
      name: "Filial RJ",
      logo: Building2,
      plan: "Branch",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      items: [
        {
          title: "Visão Geral",
          url: "/",
        },
      ],
    },
    {
      title: "Usuários",
      url: "/users",
      icon: Users,
      items: [
        {
          title: "Visão Geral",
          url: "/users",
        },
      ],
    },
    {
      title: "Financeiro",
      url: "#",
      icon: DollarSign,
      items: [
        {
          title: "Fluxo de Caixa",
          url: "/cash-flow",
        },
        {
          title: "Contas a Pagar",
          url: "/accounts-payable",
        },
        {
          title: "Contas a Receber",
          url: "/accounts-receivable",
        },
        {
          title: "Conciliação",
          url: "/reconciliation",
        },
      ],
    },
    {
      title: "Relatórios",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Relatórios Gerenciais",
          url: "/reports",
        },
        {
          title: "Análise de Performance",
          url: "/analytics",
        },
        {
          title: "Projeções",
          url: "/projections",
        },
        {
          title: "Exportar Dados",
          url: "/export",
        },
      ],
    },
    {
      title: "Projetos",
      url: "/projetos",
      icon: Archive,
      items: [
        {
          title: "Gestão de Projetos",
          url: "/projetos",
        },
        {
          title: "Relatórios de Projetos",
          url: "/projetos/reports",
        },
      ],
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Empresa",
          url: "/settings/company",
        },
        {
          title: "Usuários",
          url: "/users",
        },
        {
          title: "Integrações",
          url: "/settings/integrations",
        },
        {
          title: "Segurança",
          url: "/settings/security",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Orçamento 2024",
      url: "/budget/2024",
      icon: Target,
    },
    {
      name: "Análise de Custos",
      url: "/cost-analysis",
      icon: BarChart3,
    },
    {
      name: "Planejamento Fiscal",
      url: "/tax-planning",
      icon: Calendar,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  // Atualiza os itens do menu com base na rota atual
  const navMainWithActive = React.useMemo(() => {
    return data.navMain.map(item => {
      // Verifica se é a rota exata ou uma subrota
      const isActive = item.url === '/' 
        ? pathname === '/'
        : pathname.startsWith(item.url) && item.url !== '#'

      return {
        ...item,
        isActive,
        items: item.items?.map(subItem => ({
          ...subItem,
          isActive: pathname === subItem.url
        }))
      }
    })
  }, [pathname])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <TeamSwitcher teams={data.teams} />
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainWithActive} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
