"use client";

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { 
  Zap, 
  Sparkles, 
  ArrowRight, 
  Star,
  Rocket
} from 'lucide-react'

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
        y: 100,
        opacity: 0
      });

      gsap.set(cardsRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.8,
        rotationY: 15
      });

      // Create main timeline
      const tl = gsap.timeline();

      // Animate title with elastic effect
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)"
      })

      // Animate subtitle
      .to(subtitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.8")

      // Animate button
      .to(buttonRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.4")

      // Animate cards
      .to(cardsRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)"
      }, "-=0.2");

      // Add floating animation to cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.to(card, {
            y: -10,
            duration: 2 + (index * 0.3),
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.2
          });
        }
      });

      // Add sparkle animation
      const sparkles = containerRef.current?.querySelectorAll('.sparkle');
      if (sparkles) {
        gsap.to(sparkles, {
          rotation: 360,
          duration: 8,
          repeat: -1,
          ease: "none",
          stagger: 0.5
        });

        gsap.to(sparkles, {
          scale: 1.2,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          stagger: 0.3
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-950 relative overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating sparkles */}
        <Sparkles className="sparkle absolute top-10 right-10 h-6 w-6 text-purple-400/50" />
        <Star className="sparkle absolute top-32 left-16 h-4 w-4 text-blue-400/50" />
        <Zap className="sparkle absolute bottom-20 left-20 h-5 w-5 text-yellow-400/50" />
        <Sparkles className="sparkle absolute bottom-32 right-32 h-6 w-6 text-pink-400/50" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-20">
          <h1 
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent leading-tight"
          >
            User API
            <span className="block text-4xl md:text-6xl mt-4 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-900 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the future of user management with stunning animations, 
            real-time data, and beautiful modern design.
          </p>
          
          <div ref={buttonRef} className="flex justify-center">
            <Link href="/dashboard">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 group"
              >
                <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                Launch Dashboard
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home