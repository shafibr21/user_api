"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { User } from "@/hooks/useUsers";

interface UserHeaderProps {
  user: User;
}

const UserHeader: React.FC<UserHeaderProps> = ({ user }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, {
        y: -30,
        opacity: 0,
      });

      gsap.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Add floating animation to title
      gsap.to(titleRef.current, {
        y: -2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={headerRef} className="flex items-center gap-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push("/dashboard/users")}
        className="border-blue-300/30  hover:bg-blue-800/30 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Users
      </Button>
      <div>
        <h1 ref={titleRef} className="text-3xl font-bold text-white">
          {user.name}
        </h1>
        <p className="text-blue-200">@{user.username}</p>
      </div>
    </div>
  );
};

export default UserHeader;
