"use client";

import { motion } from "framer-motion";
import { Flame, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakCard({ currentStreak, longestStreak }: StreakCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Flame className="h-5 w-5" />
            Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{currentStreak}</div>
              <div className="text-sm text-orange-700">Current Streak</div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-sm text-orange-600">
              <Trophy className="h-4 w-4" />
              <span>Best: {longestStreak} days</span>
            </div>
            
            <div className="flex justify-center">
              <div className="flex gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < currentStreak % 7 ? 'bg-orange-500' : 'bg-orange-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}