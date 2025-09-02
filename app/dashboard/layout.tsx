"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, LayoutDashboard, Search, Settings, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"



export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/dashboard/users", icon: Users },
    { name: "Search", href: "/dashboard/search", icon: Search },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen flex w-full">
      {/* Background with overlay */}
      <div 
        className="fixed inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/dashboard-bg.jpg)" }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background/90 to-background/70" />

      {/* Sidebar */}
      <aside
        className={cn(
          "relative z-50 flex flex-col transition-all duration-300 ease-smooth",
          sidebarOpen ? "w-64" : "w-16",
          isMobile && !sidebarOpen && "w-0 overflow-hidden",
          isMobile && sidebarOpen && "fixed left-0 top-0 h-full w-64 shadow-glow"
        )}
      >
        <div className="flex flex-col h-full glass-card rounded-r-2xl border-r-0">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            {sidebarOpen && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg animate-glow" />
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Dashboard
                </h1>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href || pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative",
                    "hover:bg-primary/10 hover:text-primary hover:scale-105 hover:shadow-primary",
                    active
                      ? "bg-gradient-primary text-primary-foreground shadow-primary"
                      : "text-muted-foreground",
                    !sidebarOpen && "justify-center px-2"
                  )}
                >
                  <Icon
                    className={cn(
                      "flex-shrink-0 transition-transform duration-200 group-hover:scale-110",
                      sidebarOpen ? "mr-3 h-5 w-5" : "h-5 w-5"
                    )}
                  />
                  {sidebarOpen && <span className="animate-fade-in">{item.name}</span>}

                  {/* Tooltip for collapsed state */}
                  {!sidebarOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col relative z-10">
        <div className="flex-1 p-4 md:p-6 animate-slide-up">{children}</div>
      </main>
    </div>
  )
}
