"use client";

import React, { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { gsap } from "gsap";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface AddressCardProps {
  address: Address;
}

const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
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
        delay: 0.2,
        ease: "power3.out",
      });

      // Add hover animation setup
      const handleMouseEnter = () => {
        gsap.to(cardRef.current, {
          scale: 1.02,
          rotationY: 2,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
          scale: 1,
          rotationY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      cardRef.current?.addEventListener("mouseenter", handleMouseEnter);
      cardRef.current?.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        cardRef.current?.removeEventListener("mouseenter", handleMouseEnter);
        cardRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <Card
      ref={cardRef}
      className="bg-gray-900/50 border-gray-700 p-6 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-500 group relative overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

      <div ref={contentRef} className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
            <MapPin className="h-5 w-5 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
            Address
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group/item">
            <p className="text-sm text-gray-400 mb-1">Street</p>
            <p className="text-white group-hover/item:text-blue-300 transition-colors duration-300">
              {address.street} {address.suite}
            </p>
          </div>
          <div className="group/item">
            <p className="text-sm text-gray-400 mb-1">City</p>
            <p className="text-white group-hover/item:text-blue-300 transition-colors duration-300">
              {address.city}
            </p>
          </div>
          <div className="group/item">
            <p className="text-sm text-gray-400 mb-1">Zipcode</p>
            <p className="text-white group-hover/item:text-blue-300 transition-colors duration-300">
              {address.zipcode}
            </p>
          </div>
          <div className="group/item">
            <p className="text-sm text-gray-400 mb-1">Coordinates</p>
            <p className="text-white text-xs group-hover/item:text-blue-300 transition-colors duration-300">
              {address.geo.lat}, {address.geo.lng}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AddressCard;
