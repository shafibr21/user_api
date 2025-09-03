"use client";

import React, { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation, Mail, Phone, Globe } from "lucide-react";
import { gsap } from "gsap";
import { User } from "@/hooks/useUsers";

interface QuickActionsCardProps {
  user: User;
}

const QuickActionsCard: React.FC<QuickActionsCardProps> = ({ user }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, {
        y: 30,
        opacity: 0,
      });

      gsap.set(buttonsRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.8,
      });

      // Animate card
      gsap.to(cardRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      });

      // Animate buttons with stagger
      gsap.to(buttonsRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const addButtonRef = (el: HTMLDivElement | null, index: number) => {
    if (el) buttonsRef.current[index] = el;
  };

  const handleButtonHover = (index: number) => {
    const button = buttonsRef.current[index];
    if (button) {
      gsap.to(button, {
        scale: 1.1,
        y: -2,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleButtonLeave = (index: number) => {
    const button = buttonsRef.current[index];
    if (button) {
      gsap.to(button, {
        scale: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const actions = [
    {
      icon: Mail,
      label: "Send Email",
      action: () => window.open(`mailto:${user.email}`),
      color: "hover:bg-blue-600 hover:border-blue-600",
    },
    {
      icon: Phone,
      label: "Call",
      action: () => window.open(`tel:${user.phone}`),
      color: "hover:bg-green-600 hover:border-green-600",
    },
    {
      icon: Globe,
      label: "Visit Website",
      action: () => window.open(`http://${user.website}`, "_blank"),
      color: "hover:bg-purple-600 hover:border-purple-600",
    },
  ];

  return (
    <Card
      ref={cardRef}
      className="bg-gray-900/50 border-gray-700 p-6 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-500 group relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
            <Navigation className="h-5 w-5 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors duration-300">
            Quick Actions
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div
                key={action.label}
                ref={(el) => addButtonRef(el, index)}
                onMouseEnter={() => handleButtonHover(index)}
                onMouseLeave={() => handleButtonLeave(index)}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={action.action}
                  className={` hover:text-white transition-all duration-300 ${action.color}`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {action.label}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default QuickActionsCard;
