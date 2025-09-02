"use client";

import { useUsers } from "@/hooks/useUsers";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Search, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { Skeleton } from "@/components/ui/skeleton";

export default function UsersPage() {
  const { data: users, isLoading } = useUsers();
  const [search, setSearch] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  // Animate list items when users change
  useEffect(() => {
    if (!listRef.current) return;
    gsap.fromTo(
      listRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, [users]);

  const filteredUsers =
    users?.filter(
      (u: any) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    ) ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-glow">
        Users
      </h1>

      <div className="flex justify-between items-center">
        <Button className="bg-primary text-primary-foreground hover:scale-105 transition-transform">
          <Users className="mr-2 h-5 w-5" /> Add New User
        </Button>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button type="button">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-6 glass-card animate-pulse h-32" />
            ))
          : filteredUsers.map((user: any) => (
              <Link key={user.id} href={`/dashboard/users/${user.id}`}>
                <Card className="glass-card p-6 cursor-pointer hover:shadow-glow transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground">{user.city}</p>
                  </div>
                </Card>
              </Link>
            ))}
      </div>
    </div>
  );
}
