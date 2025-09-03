"use client";

import {
  Users,
  Search,
  BarChart3,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { gsap } from "gsap";

const Features = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const features = [
    {
      title: "User Management",
      description:
        "View, search, and manage all users in your system with advanced filtering and pagination.",
      icon: Users,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/20",
      action: () => router.push("/dashboard/users"),
    },
    {
      title: "Search & Filter",
      description:
        "Quickly find users by name, email, username, or company with real-time search results.",
      icon: Search,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/20",
      action: () => router.push("/dashboard/users"),
    },
    {
      title: "User Analytics",
      description:
        "Get insights into user activity, growth trends, and engagement metrics.",
      icon: BarChart3,
      iconColor: "text-green-400",
      iconBg: "bg-green-500/20",
      action: () => router.push("/dashboard/users"),
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Create main timeline
      const tl = gsap.timeline();

      // Animate title
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      });

      // Animate cards with stagger
      tl.to(
        cardsRef.current,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

      // Add continuous floating animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.to(card, {
            y: -12,
            duration: 2.5 + index * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.3,
          });

          // Add subtle rotation animation
          gsap.to(card, {
            rotationY: 5,
            duration: 4 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.2,
          });
        }
      });

      // Animate icons with pulse effect
      const iconElements =
        containerRef.current?.querySelectorAll(".feature-icon");
      iconElements?.forEach((icon, index) => {
        gsap.to(icon, {
          scale: 1.1,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.5,
        });
      });

      // Add sparkle effect
      const sparkles =
        containerRef.current?.querySelectorAll(".feature-sparkle");
      sparkles?.forEach((sparkle, index) => {
        gsap.to(sparkle, {
          rotation: 360,
          duration: 8 + index * 2,
          repeat: -1,
          ease: "none",
        });

        gsap.to(sparkle, {
          opacity: 0.3,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.3,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  const handleCardHover = (index: number) => {
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        scale: 1.08,
        rotationY: 8,
        z: 50,
        duration: 0.4,
        ease: "power2.out",
      });

      // Animate the icon on hover
      const icon = card.querySelector(".feature-icon");
      if (icon) {
        gsap.to(icon, {
          scale: 1.3,
          rotation: 15,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      }

      // Animate the arrow
      const arrow = card.querySelector(".feature-arrow");
      if (arrow) {
        gsap.to(arrow, {
          x: 10,
          scale: 1.2,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  };

  const handleCardLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        scale: 1,
        rotationY: 0,
        z: 0,
        duration: 0.4,
        ease: "power2.out",
      });

      // Reset icon
      const icon = card.querySelector(".feature-icon");
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      // Reset arrow
      const arrow = card.querySelector(".feature-arrow");
      if (arrow) {
        gsap.to(arrow, {
          x: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  };

  return (
    <div ref={containerRef} style={{ perspective: "1000px" }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="feature-sparkle absolute top-10 right-20 h-4 w-4 text-purple-400/30" />
        <Zap className="feature-sparkle absolute bottom-20 left-10 h-5 w-5 text-blue-400/30" />
        <Sparkles className="feature-sparkle absolute top-1/2 right-1/4 h-3 w-3 text-green-400/30" />
      </div>

      <h2
        ref={titleRef}
        className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent text-center relative"
      >
        ✨ Key Features ✨
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card
              key={feature.title}
              ref={(el) => addCardRef(el, index)}
              onClick={feature.action}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => handleCardLeave(index)}
              className="bg-gray-900/50 border-gray-800 p-8 cursor-pointer hover:bg-gray-800/60 transition-all duration-500 backdrop-blur-sm group relative overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-4 right-4 w-1 h-1 bg-purple-400/50 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-0.5 h-0.5 bg-blue-400/50 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 right-8 w-1 h-1 bg-green-400/50 rounded-full animate-bounce"></div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

              <div className="space-y-6 relative z-10">
                <div
                  className={`w-16 h-16 rounded-xl ${feature.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative`}
                >
                  <Icon
                    className={`h-8 w-8 ${feature.iconColor} feature-icon`}
                  />

                  {/* Icon glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                <div className="flex items-center text-purple-400 font-medium group-hover:text-blue-400 transition-colors duration-300">
                  <span>Explore Feature</span>
                  <ArrowRight className="ml-2 h-5 w-5 feature-arrow transform transition-transform duration-300" />
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
