
import Image from "next/image"
import { useState } from "react"
import { CheckCircle, Calendar, Award, ArrowRight } from "lucide-react"
import Cookies from "universal-cookie"


const cookies = new Cookies();
export default function ProfilePage() {
  const [user] = useState({
    name: "Guest",
    image: "/placeholder.svg?height=100&width=100",
    taskSuccess: 0,
    totalTasksCompleted: 0,
    currentTask: "Complete project documentation",
    currentTaskDeadline: "2 days left",
    streaks: 0,
  })



  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto lg:min-w-3/4 bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
                <Image
                    src={user.image || "/placeholder.svg?height=100&width=100"}
                    alt={user.name}
                    width={96}
                    height={96}
                    className="h-24 w-24 rounded-full border-4 border-white object-cover"
                />
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></span>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="text-blue-100 mt-1">Premium Member</p>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{user.taskSuccess}</h2>
            <p className="text-gray-500 text-sm">Task Success Rate</p>
            <p className="text-xs text-gray-400 mt-1">{user.totalTasksCompleted} tasks completed</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-3">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Current Task</h2>
            <p className="text-gray-500 text-sm text-center">{user.currentTask}</p>
            <p className="text-xs text-red-500 mt-1">{user.currentTaskDeadline}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 mb-3">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{user.streaks} Days</h2>
            <p className="text-gray-500 text-sm">Current Streak</p>
            <div className="flex gap-1 mt-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${i < user.streaks % 7 ? "bg-orange-500" : "bg-gray-200"}`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="px-6 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { task: "Completed UI design for dashboard", date: "2 days ago", completed: true },
              { task: "Team meeting for project planning", date: "Yesterday", completed: true },
              { task: "Research on user experience improvements", date: "Today", completed: false },
            ].map((activity, index) => (
              <div key={index} className="flex items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${activity.completed ? "bg-green-100" : "bg-gray-100"}`}
                >
                  {activity.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowRight className="h-4 w-4 text-gray-600" />
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.task}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

