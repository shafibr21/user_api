"use client";

import React, { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, Globe, Building, Briefcase } from "lucide-react";
import { gsap } from "gsap";
import { User } from "@/hooks/useUsers";

interface UserProfileCardProps {
  user: User;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([avatarRef.current, infoRef.current, contactRef.current], {
        y: 30,
        opacity: 0,
        scale: 0.9,
      });

      // Animate elements in sequence
      const tl = gsap.timeline();

      tl.to(avatarRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
        .to(
          infoRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          contactRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        );

      // Add floating animation
      gsap.to(cardRef.current, {
        y: -5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <Card
      ref={cardRef}
      className="bg-gray-900/50 border-gray-700 p-6 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-500 group"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Avatar */}
        <div ref={avatarRef} className="relative">
          <Avatar className="w-24 h-24 group-hover:scale-110 transition-transform duration-300">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
              alt={user.name}
            />
            <AvatarFallback className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* User Info */}
        <div ref={infoRef} className="text-center">
          <h2 className="text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {user.name}
          </h2>
          <p className="text-gray-400">@{user.username}</p>
        </div>

        {/* Contact Info */}
        <div
          ref={contactRef}
          className="w-full space-y-3 pt-4 border-t border-gray-700"
        >
          <div className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors duration-300 group/item cursor-pointer">
            <Mail className="h-4 w-4 text-blue-400 group-hover/item:scale-110 transition-transform duration-300" />
            <span className="text-sm truncate">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors duration-300 group/item cursor-pointer">
            <Phone className="h-4 w-4 text-blue-400 group-hover/item:scale-110 transition-transform duration-300" />
            <span className="text-sm">{user.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors duration-300 group/item cursor-pointer">
            <Globe className="h-4 w-4 text-blue-400 group-hover/item:scale-110 transition-transform duration-300" />
            <a
              href={`http://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-blue-400 transition-colors truncate"
            >
              {user.website}
            </a>
          </div>
          <div className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors duration-300 group/item cursor-pointer">
            <Building className="h-4 w-4 text-blue-400 group-hover/item:scale-110 transition-transform duration-300" />
            <span className="text-sm truncate">{user.company.name}</span>
          </div>
        </div>

        {/* Company Badge */}
        <div className="w-full p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors duration-300">
          <div className="flex items-center justify-center space-x-2">
            <Briefcase className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400 text-center">
              {user.company.catchPhrase}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserProfileCard;
