"use client";

import React, { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Building } from "lucide-react";
import { gsap } from "gsap";

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, {
        y: 20,
        opacity: 0,
      });

      gsap.to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
      });

      // Add floating animation
      gsap.to(cardRef.current, {
        y: -3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 0.5,
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleHover = () => {
    gsap.to(cardRef.current, {
      scale: 1.02,
      rotationY: -2,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      rotationY: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <Card
      ref={cardRef}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className="bg-gray-900/50 border-gray-700 p-6 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-500 group relative overflow-hidden cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 right-4 w-1 h-1 bg-purple-400/50 rounded-full animate-pulse"></div>
        <div className="absolute bottom-6 left-6 w-0.5 h-0.5 bg-blue-400/50 rounded-full animate-ping"></div>
      </div>

      <div ref={contentRef} className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500/20 rounded-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
            <Building className="h-5 w-5 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
            Company
          </h3>
        </div>

        <div className="space-y-4">
          <div className="group/item">
            <p className="text-sm text-gray-400 mb-1">Company Name</p>
            <p className="text-white text-lg font-semibold group-hover/item:text-purple-300 transition-colors duration-300">
              {company.name}
            </p>
          </div>
          <div className="group/item">
            <p className="text-sm text-gray-400 mb-1">Catch Phrase</p>
            <p className="text-blue-400 italic group-hover/item:text-purple-400 transition-colors duration-300">
              &ldquo;{company.catchPhrase}&rdquo;
            </p>
          </div>
          <div className="group/item">
            <p className="text-sm text-gray-400 mb-1">Business</p>
            <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
              {company.bs}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CompanyCard;
