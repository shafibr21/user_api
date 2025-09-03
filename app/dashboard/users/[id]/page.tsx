"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUsers";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User as UserIcon } from "lucide-react";
import UserHeader from "@/components/user-detail/UserHeader";
import UserDetailContent from "@/components/user-detail/UserDetailContent";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const { data: user, isLoading, error } = useUser(userId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-blue-200 text-lg">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
            <UserIcon className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-red-200">User not found</h2>
          <p className="text-red-300">
            The user you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button
            onClick={() => router.push("/dashboard/users")}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <UserHeader user={user} />
        <UserDetailContent user={user} />
      </div>
    </div>
  );
}
