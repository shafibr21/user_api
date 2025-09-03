"use client";

import React, { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Activity, Globe, TrendingUp, Users } from "lucide-react";
import { gsap } from "gsap";
import { User } from "@/hooks/useUsers";

interface StatsGridProps {
  users?: User[];
  isLoading?: boolean;
}

const StatsGrid: React.FC<StatsGridProps> = ({
  users = [],
  isLoading = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const stats = [
    {
      label: "Total Users",
      value: users?.length || 10,
      trend: "+12%",
      trendColor: "text-green-400",
      icon: Users,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/20",
    },
    {
      label: "Active Sessions",
      value: 7,
      trend: "+8%",
      trendColor: "text-green-400",
      icon: Activity,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/20",
    },
    {
      label: "Growth Rate",
      value: "23.5%",
      trend: "+5%",
      trendColor: "text-green-400",
      icon: TrendingUp,
      iconColor: "text-green-400",
      iconBg: "bg-green-500/20",
    },
    {
      label: "Global Reach",
      value: 10,
      trend: "+3%",
      trendColor: "text-green-400",
      icon: Globe,
      iconColor: "text-orange-400",
      iconBg: "bg-orange-500/20",
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Add floating animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.to(card, {
            y: -8,
            duration: 2.5 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.2,
          });
        }
      });

      // Add number counting animation
      const numberElements =
        containerRef.current?.querySelectorAll(".stat-number");
      numberElements?.forEach((element, index) => {
        const finalValue = element.textContent;
        if (finalValue && !isNaN(Number(finalValue))) {
          gsap.fromTo(
            element,
            {
              textContent: 0,
              scale: 0.5,
              opacity: 0,
            },
            {
              textContent: Number(finalValue),
              scale: 1,
              opacity: 1,
              duration: 1.5,
              delay: 0.5 + index * 0.15,
              ease: "power2.out",
              snap: { textContent: 1 },
            }
          );
        } else {
          gsap.fromTo(
            element,
            {
              scale: 0.5,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              delay: 0.5 + index * 0.15,
              ease: "elastic.out(1, 0.5)",
            }
          );
        }
      });

      // Add icon pulse animation
      const iconElements = containerRef.current?.querySelectorAll(".stat-icon");
      iconElements?.forEach((element, index) => {
        gsap.to(element, {
          scale: 1.1,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.3,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  const addCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  const handleCardHover = (index: number) => {
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        scale: 1.05,
        rotationY: 5,
        z: 30,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleCardLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        scale: 1,
        rotationY: 0,
        z: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      style={{ perspective: "1000px" }}
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            ref={(el) => addCardRef(el, index)}
            onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={() => handleCardLeave(index)}
            className="bg-gray-900/50 border-gray-800 p-6 hover:bg-gray-800/50 transition-all duration-300 cursor-pointer backdrop-blur-sm relative overflow-hidden group"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-2 right-2 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-0.5 h-0.5 bg-blue-400 rounded-full animate-ping"></div>
              <div className="absolute top-1/2 left-2 w-1 h-1 bg-green-400 rounded-full animate-bounce"></div>
            </div>

            <div className="flex items-center justify-between mb-4 relative z-10">
              <div
                className={`p-3 rounded-xl ${stat.iconBg} transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110`}
              >
                <Icon className={`h-6 w-6 ${stat.iconColor} stat-icon`} />
              </div>
              <span
                className={`text-xs ${stat.trendColor} bg-green-400/10 px-2 py-1 rounded-full transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-2`}
              >
                {stat.trend}
              </span>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-1 text-white stat-number">
                {isLoading ? (
                  <div className="h-8 w-16 bg-gray-700 animate-pulse rounded" />
                ) : (
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-400 transform transition-all duration-300 group-hover:text-gray-300">
                {stat.label}
              </p>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsGrid;
