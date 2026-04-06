import { Link } from "react-router";
import { Sprout, Calendar, TrendingUp, Users, Award, ArrowRight } from "lucide-react";
import { activities } from "../data/mockData";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [participationCount, setParticipationCount] = useState(0);
  const [greenScore, setGreenScore] = useState(72);

  useEffect(() => {
    const participations = JSON.parse(localStorage.getItem("participations") || "[]");
    setParticipationCount(participations.length);
  }, []);

  const upcomingActivities = activities.filter((a) => a.status === "Upcoming").slice(0, 3);
  const totalActivities = activities.filter((a) => a.status !== "Completed").length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Welcome Back, Student! 🌿</h1>
        <p className="text-gray-600">Track your green campus journey and participate in sustainability initiatives.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Activities */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#E8F5E9] rounded-lg flex items-center justify-center">
              <Sprout className="w-6 h-6 text-[#4CAF50]" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-semibold text-gray-800">{totalActivities}</p>
          <p className="text-sm text-gray-600">Active Green Activities</p>
        </div>

        {/* Campus Green Score */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#FFF9C4] rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-[#F9A825]" />
            </div>
            <span className="text-xs font-medium text-green-600">+5%</span>
          </div>
          <p className="text-2xl font-semibold text-gray-800">{greenScore}%</p>
          <p className="text-sm text-gray-600">Campus Green Score</p>
        </div>

        {/* My Participations */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#E3F2FD] rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-[#1976D2]" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-800">{participationCount}</p>
          <p className="text-sm text-gray-600">My Participations</p>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#FCE4EC] rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#C2185B]" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-800">{upcomingActivities.length}</p>
          <p className="text-sm text-gray-600">Upcoming Events</p>
        </div>
      </div>

      {/* Green Score Progress */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Campus Green Score Progress</h2>
          <span className="text-sm text-gray-600">{greenScore}% of target</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] h-full transition-all duration-1000 ease-out"
            style={{ width: `${greenScore}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-3">
          Our campus is on track to achieve Green Certification! Keep participating in activities to boost the score.
        </p>
      </div>

      {/* Upcoming Activities */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Upcoming Activities</h2>
          <Link to="/app/activities" className="text-sm text-[#4CAF50] hover:underline flex items-center gap-1">
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {upcomingActivities.map((activity) => (
            <Link
              key={activity.id}
              to={`/app/activities/${activity.id}`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-[#4CAF50] hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-[#E8F5E9] text-[#4CAF50] text-xs font-medium rounded-full">
                      {activity.category}
                    </span>
                    <span className="text-xs text-gray-500">{activity.date}</span>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">{activity.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{activity.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span>📍 {activity.location}</span>
                    <span>👥 {activity.currentParticipants}/{activity.maxParticipants}</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
