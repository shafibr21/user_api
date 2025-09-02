"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Activity,
  TrendingUp,
  ArrowRight,
  Search,
  UserPlus,
  Globe,
  BarChart3,
} from "lucide-react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
//import dashboardBg from "@/assets/dashboard-bg.jpg";

// ---- Replace this with SWR/React Query/Server fetching ----
function useUsers(): { data: any[]; isLoading: boolean } {
  return { data: [], isLoading: false };
}

export default function Dashboard() {
  const router = useRouter();
  const { data: users, isLoading } = useUsers();

  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    if (heroRef.current && statsRef.current && cardsRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 30, rotateX: -10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          delay: 0.3,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      );

      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, x: 30, rotateY: -5 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.8,
          delay: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        }
      );
    }
  }, []);

  // Stats data
  const stats = [
    {
      label: "Total Users",
      value: users?.length || 0,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
      trend: "+12%",
    },
    {
      label: "Active Sessions",
      value: Math.floor((users?.length || 0) * 0.7),
      icon: Activity,
      color: "text-accent",
      bgColor: "bg-accent/10",
      trend: "+8%",
    },
    {
      label: "Growth Rate",
      value: "23.5%",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      trend: "+5%",
    },
    {
      label: "Global Reach",
      value: new Set(users?.map((u) => u.address?.city) || []).size,
      icon: Globe,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      trend: "+3%",
    },
  ];

  // Feature cards
  const features = [
    {
      title: "User Management",
      description:
        "View, search, and manage all users in your system with advanced filtering and pagination.",
      icon: Users,
      action: () => router.push("/users"),
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Search & Filter",
      description:
        "Quickly find users by name, email, username, or company with real-time search results.",
      icon: Search,
      action: () => router.push("/users"),
      gradient: "from-accent to-blue-400",
    },
    {
      title: "User Analytics",
      description:
        "Get insights into user activity, growth trends, and engagement metrics.",
      icon: BarChart3,
      action: () => router.push("/analytics"),
      gradient: "from-green-500 to-emerald-400",
    },
  ];

  return (
    <div className="space-y-12 animate-slide-up">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative overflow-hidden rounded-3xl p-8 md:p-12 glass-card"
      >
        <Image
          src={"/placeholder.svg"}
          alt="Dashboard background"
          fill
          className="absolute inset-0 object-cover opacity-40"
          priority
        />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Welcome to your
            </span>
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent animate-glow">
              User Dashboard
            </span>
          </h1>

          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Manage your users efficiently with our modern, animated interface.
            Search, filter, and view detailed user information with beautiful 3D
            interactions.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={() => router.push("/users")}
              className="bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-primary"
            >
              <Users className="mr-2 h-5 w-5" />
              View All Users
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="glass-card border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Add New User
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        ref={statsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className={cn(
                "glass-card p-6 card-3d hover:shadow-glow transition-all duration-300",
                "hover:scale-105 cursor-pointer group"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-xl", stat.bgColor)}>
                  <Icon className={cn("h-6 w-6", stat.color)} />
                </div>
                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                  {isLoading ? (
                    <div className="h-8 w-16 bg-muted animate-pulse rounded" />
                  ) : (
                    stat.value
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Feature Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Key Features
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                onClick={feature.action}
                className={cn(
                  "glass-card p-6 cursor-pointer group card-3d",
                  "hover:shadow-glow transition-all duration-300 hover:scale-105"
                )}
              >
                <div className="space-y-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center",
                      feature.gradient,
                      "group-hover:scale-110 transition-transform duration-300"
                    )}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="flex items-center text-sm text-primary group-hover:translate-x-1 transition-transform duration-200">
                    <span>Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
