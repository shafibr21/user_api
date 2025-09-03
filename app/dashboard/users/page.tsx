"use client";

import { useUsers, User } from "@/hooks/useUsers";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Search,
  ArrowRight,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { gsap } from "gsap";

export default function UsersPage() {
  const { data: users, isLoading } = useUsers();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  // Animation refs
  const headerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  const filteredUsers =
    users?.filter(
      (u: User) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.username.toLowerCase().includes(search.toLowerCase())
    ) ?? [];

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  // GSAP Animations
  useEffect(() => {
    if (!users || isLoading) return;

    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.fromTo(
        headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 3, ease: "power1.out" }
      );

      // Search bar animation
      gsap.fromTo(
        searchRef.current,
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // Cards staggered entrance
      gsap.fromTo(
        cardsRef.current,
        { y: 80, opacity: 0, rotationY: 15, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.05,
          delay: 0.2,
        }
      );

      // Pagination entrance
      if (paginationRef.current) {
        gsap.fromTo(
          paginationRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.8 }
        );
      }

      // Floating animation for header icon
      const headerIcon = headerRef.current?.querySelector(".header-icon");
      if (headerIcon) {
        gsap.to(headerIcon, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, [users, isLoading, paginatedUsers]);

  // Card hover animations
  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;

      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          duration: 0.3,
          ease: "power2.out",
          boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
        });

        // Animate avatar
        const avatar = card.querySelector(".user-avatar");
        if (avatar) {
          gsap.to(avatar, {
            scale: 1.1,
            rotation: 5,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        // Animate arrow
        const arrow = card.querySelector(".card-arrow");
        if (arrow) {
          gsap.to(arrow, {
            x: 5,
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        // Sparkle effect
        createSparkles(card);
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        });

        const avatar = card.querySelector(".user-avatar");
        if (avatar) {
          gsap.to(avatar, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        const arrow = card.querySelector(".card-arrow");
        if (arrow) {
          gsap.to(arrow, {
            x: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, [paginatedUsers]);

  const createSparkles = (element: HTMLElement) => {
    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement("div");
      sparkle.className =
        "absolute w-1 h-1 bg-purple-400 rounded-full pointer-events-none";
      sparkle.style.left = Math.random() * 100 + "%";
      sparkle.style.top = Math.random() * 100 + "%";
      element.appendChild(sparkle);

      gsap.fromTo(
        sparkle,
        { scale: 0, opacity: 1 },
        {
          scale: 1.5,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => sparkle.remove(),
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-6 bg-gray-900/50 border-gray-800">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6" style={{ perspective: "1000px" }}>
      {/* Header */}
      <div ref={headerRef} className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="header-icon w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Users className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <span className="text-purple-400 font-semibold">
            {filteredUsers.length} items
          </span>
          <span>/</span>
          <span>{Math.ceil(filteredUsers.length / usersPerPage)} page(s)</span>
        </div>
      </div>

      {/* Search */}
      <div ref={searchRef} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
        />
      </div>

      {/* Users Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {paginatedUsers.map((user: User, index: number) => (
          <Link key={user.id} href={`/dashboard/users/${user.id}`}>
            <Card
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="relative p-6 bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 transition-all duration-300 cursor-pointer backdrop-blur-sm group overflow-hidden"
            >
              {/* User Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="relative">
                    <Avatar className="user-avatar w-12 h-12 transition-transform duration-300">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                        alt={user.name}
                      />
                      <AvatarFallback className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {user.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-400">@{user.username}</p>
                  </div>
                </div>
                <ArrowRight className="card-arrow h-4 w-4 text-gray-500 group-hover:text-purple-400 transition-all duration-300" />
              </div>

              {/* User Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm group-hover:translate-x-1 transition-transform duration-300">
                  <Mail className="h-4 w-4 text-purple-400" />
                  <span className="text-gray-300 truncate">{user.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm group-hover:translate-x-1 transition-transform duration-300 delay-75">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">{user.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm group-hover:translate-x-1 transition-transform duration-300 delay-150">
                  <Globe className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300 truncate">{user.website}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm group-hover:translate-x-1 transition-transform duration-300 delay-200">
                  <MapPin className="h-4 w-4 text-orange-400" />
                  <span className="text-gray-300">{user.address.city}</span>
                </div>
              </div>

              {/* Company Badge */}
              <div className="mt-4 pt-4 border-t border-gray-800 group-hover:border-purple-800 transition-colors duration-300">
                <div className="flex items-center space-x-2">
                  <Building className="h-3 w-3 text-gray-500 group-hover:text-purple-400 transition-colors duration-300" />
                  <span className="text-xs text-gray-500 group-hover:text-purple-300 transition-colors duration-300">
                    {user.company.name}
                  </span>
                </div>
                <p className="text-xs text-purple-400 mt-1 italic group-hover:text-purple-300 transition-colors duration-300">
                  &ldquo;{user.company.catchPhrase}&rdquo;
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          ref={paginationRef}
          className="flex items-center justify-center space-x-2 mt-8"
        >
          <Button
            variant="ghost"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="text-gray-400 hover:text-white hover:bg-gray-800 hover:scale-110 transition-all duration-300"
          >
            ←
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "ghost"}
              onClick={() => setCurrentPage(page)}
              className={
                page === currentPage
                  ? "bg-purple-600 text-white hover:bg-purple-700 scale-110 shadow-lg shadow-purple-600/30"
                  : "text-gray-400 hover:text-white hover:bg-gray-800 hover:scale-110 transition-all duration-300"
              }
            >
              {page}
            </Button>
          ))}

          <Button
            variant="ghost"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="text-gray-400 hover:text-white hover:bg-gray-800 hover:scale-110 transition-all duration-300"
          >
            →
          </Button>
        </div>
      )}
    </div>
  );
}
