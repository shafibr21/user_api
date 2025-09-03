"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, UserPlus } from "lucide-react";
import Features from "@/components/features";
import StatsGrid from "@/components/statsGrid";
import { useUsers } from "@/hooks/useUsers";
import { gsap } from "gsap";

export default function Dashboard() {
  const router = useRouter();
  const { data: users, isLoading } = useUsers();
  const heroRef = useRef<HTMLDivElement>(null);
  const geometricRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(heroRef.current, {
        y: 100,
        opacity: 0,
      });

      gsap.set(featuresRef.current, {
        y: 50,
        opacity: 0,
      });

      // Animate hero section
      gsap.to(heroRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      });

      // Animate features section
      gsap.to(featuresRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      // Animate geometric shapes
      const shapes = geometricRef.current?.children;
      if (shapes) {
        Array.from(shapes).forEach((shape, index) => {
          gsap.to(shape, {
            rotation: 360,
            duration: 20 + index * 5,
            repeat: -1,
            ease: "none",
          });

          gsap.to(shape, {
            y: -20,
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.3,
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="space-y-8 p-6 min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/10 to-blue-950/10">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-cyan-900/50 p-8 border border-purple-500/20 backdrop-blur-sm"
      >
        {/* Geometric background elements */}
        <div ref={geometricRef} className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-32 h-32 border border-purple-400/30 rotate-45 rounded-lg"></div>
          <div className="absolute top-20 right-32 w-20 h-20 border border-blue-400/30 rotate-12 rounded-lg"></div>
          <div className="absolute bottom-10 right-20 w-16 h-16 border border-cyan-400/30 -rotate-12 rounded-lg"></div>
          <div className="absolute top-1/2 right-40 w-24 h-24 border border-purple-300/20 rotate-45 rounded-full"></div>
          <div className="absolute bottom-20 right-60 w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rotate-45 rounded-lg"></div>
        </div>

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Welcome to your</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              User Dashboard
            </span>
          </h1>

          <p className="text-gray-300 mb-8 leading-relaxed text-lg">
            Manage your users efficiently with our modern, animated interface.
            Search, filter, and view detailed user information with beautiful 3D
            interactions.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={() => router.push("/dashboard/users")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 hover:scale-105 transition-all duration-300 group"
            >
              <Users className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              View All Users
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:scale-105 transition-all duration-300 group"
            >
              <UserPlus className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              Add New User
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid with GSAP animations */}
      <StatsGrid users={users} isLoading={isLoading} />

      {/* Features Section */}
      <div ref={featuresRef}>
        <Features />
      </div>
    </div>
  );
}
