"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle, Award, TrendingUp, User as UserIcon } from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

/**
 * Render the user's profile page showing avatar, member info, stats, and achievements, or a centered loading spinner when no user is available.
 *
 * Displays an avatar (Next.js Image or fallback icon) with a status indicator, a set of animated stat cards (tasks completed/created, current and longest streak), and an achievements grid that visually reflects earned status.
 *
 * @returns The JSX element for the profile page or a loading placeholder when no user is present.
 */
export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </>
    );
  }

  const achievements = [
    {
      title: "Task Master",
      description: "Completed 10+ tasks",
      earned: user.totalTasksCompleted >= 10,
      icon: CheckCircle,
    },
    {
      title: "Streak Keeper",
      description: "Maintained a 7-day streak",
      earned: user.longestStreak >= 7,
      icon: Award,
    },
    {
      title: "Productivity Pro",
      description: "Created 25+ tasks",
      earned: user.totalTasksCreated >= 25,
      icon: TrendingUp,
    },
  ];

  return (
    <>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="relative inline-block">
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt={user.displayName}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-blue-600 flex items-center justify-center">
                <UserIcon className="h-12 w-12 text-white" />
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mt-4">{user.displayName}</h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500 mt-2">
            Member since {formatDate(user.createdAt)}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{user.totalTasksCompleted}</div>
                <div className="text-sm text-gray-600">Tasks Completed</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{user.totalTasksCreated}</div>
                <div className="text-sm text-gray-600">Tasks Created</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{user.currentStreak}</div>
                <div className="text-sm text-gray-600">Current Streak</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{user.longestStreak}</div>
                <div className="text-sm text-gray-600">Longest Streak</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.earned
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <achievement.icon
                        className={`h-6 w-6 ${
                          achievement.earned ? 'text-green-600' : 'text-gray-400'
                        }`}
                      />
                      <h3 className={`font-medium ${
                        achievement.earned ? 'text-green-900' : 'text-gray-600'
                      }`}>
                        {achievement.title}
                      </h3>
                      {achievement.earned && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Earned
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm ${
                      achievement.earned ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {achievement.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}