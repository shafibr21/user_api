"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useUser } from "@/hooks/useUsers";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft, Mail, Phone, Globe, MapPin, Building, User, Navigation, Briefcase,
} from "lucide-react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

export default function UserDetailsPage() {
  const params = useParams<{ id: string }>();

  const id = params?.id; 
  const router = useRouter();

  const { data: user, isLoading, error } = useUser(id);

  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user || !headerRef.current || !cardRef.current || !detailsRef.current) return;

    gsap.fromTo(headerRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
    gsap.fromTo(cardRef.current, { opacity: 0, scale: 0.9, rotateY: -15 }, { opacity: 1, scale: 1, rotateY: 0, duration: 0.8, delay: 0.2, ease: "back.out(1.7)" });
    gsap.fromTo(detailsRef.current.children, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.6, delay: 0.4, stagger: 0.1, ease: "power2.out" });
  }, [user]);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-slide-up">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="glass-card p-8 space-y-6">
              <div className="text-center space-y-4">
                <Skeleton className="h-24 w-24 rounded-full mx-auto" />
                <Skeleton className="h-6 w-32 mx-auto" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="glass-card p-6 space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="glass-card p-8 text-center max-w-md">
          <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-semibold mb-2">User not found</h3>
          <p className="text-muted-foreground mb-4">
            The user you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push("/dashboard/users")} className="bg-gradient-primary">
            Back to Users
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div ref={headerRef} className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/dashboard/users")}
          className="glass-card hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-200 hover:scale-105"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {user.name}
          </h1>
          <p className="text-muted-foreground">User Profile Details</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Card */}
        <div className="lg:col-span-1">
          <Card
            ref={cardRef}
            className={cn("glass-card p-8 space-y-6 card-3d", "hover:shadow-glow transition-all duration-300")}
          >
            <div className="text-center space-y-4">
              <div className="relative mx-auto">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-glow">
                  <User className="h-12 w-12 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full border-2 border-background animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-muted-foreground">@{user.username}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm break-all">{user.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm">{user.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-4 w-4 text-secondary flex-shrink-0" />
                <a
                  href={`http://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-primary transition-colors underline underline-offset-2"
                >
                  {user.website}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Building className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">{user.company.name}</span>
              </div>
            </div>

            <div>
              <Badge variant="secondary" className="glass-card w-full justify-center py-2">
                <Briefcase className="h-3 w-3 mr-1" />
                {user.company.catchPhrase}
              </Badge>
            </div>
          </Card>
        </div>

        {/* Details */}
        <div ref={detailsRef} className="lg:col-span-2 space-y-6">
          {/* Address Card */}
          <Card className="glass-card p-6 card-3d hover:shadow-glow transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Address</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Street</p>
                <p className="font-medium">{user.address.street} {user.address.suite}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">City</p>
                <p className="font-medium">{user.address.city}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Zipcode</p>
                <p className="font-medium">{user.address.zipcode}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Coordinates</p>
                <p className="font-medium text-xs">{user.address.geo.lat}, {user.address.geo.lng}</p>
              </div>
            </div>
          </Card>

          {/* Company Card */}
          <Card className="glass-card p-6 card-3d hover:shadow-glow transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Building className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Company</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Company Name</p>
                <p className="font-medium text-lg">{user.company.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Catch Phrase</p>
                <p className="italic text-primary">{user.company.catchPhrase}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Business</p>
                <p className="text-muted-foreground">{user.company.bs}</p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-card p-6 card-3d hover:shadow-glow transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Navigation className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold">Quick Actions</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" onClick={() => window.open(`mailto:${user.email}`)} className="glass-card hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-200 hover:scale-105">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.open(`tel:${user.phone}`)} className="glass-card hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all duration-200 hover:scale-105">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.open(`http://${user.website}`, "_blank")} className="glass-card hover:bg-secondary/10 hover:text-secondary hover:border-secondary/50 transition-all duration-200 hover:scale-105">
                <Globe className="h-4 w-4 mr-2" />
                Visit Website
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
