"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { User } from "@/hooks/useUsers";
import UserProfileCard from "./UserProfileCard";
import AddressCard from "./AddressCard";
import CompanyCard from "./CompanyCard";
import QuickActionsCard from "./QuickActionsCard";

interface UserDetailContentProps {
  user: User;
}

const UserDetailContent: React.FC<UserDetailContentProps> = ({ user }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([profileRef.current, infoRef.current], {
        y: 50,
        opacity: 0,
      });

      // Animate main sections
      const tl = gsap.timeline();

      tl.to(profileRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }).to(
        infoRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      style={{ perspective: "1000px" }}
    >
      {/* Profile Section */}
      <div ref={profileRef} className="lg:col-span-1">
        <UserProfileCard user={user} />
      </div>

      {/* Information Section */}
      <div ref={infoRef} className="lg:col-span-2 space-y-6">
        <AddressCard address={user.address} />
        <CompanyCard company={user.company} />
        <QuickActionsCard user={user} />
      </div>
    </div>
  );
};

export default UserDetailContent;
