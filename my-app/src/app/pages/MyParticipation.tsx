import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Calendar, MapPin, CheckCircle, Trophy, TrendingUp } from "lucide-react";
import { activities } from "../data/mockData";

const MyParticipation = () => {
  const [participatedActivities, setParticipatedActivities] = useState<typeof activities>([]);
  const [greenPoints, setGreenPoints] = useState(0);

  useEffect(() => {
    const participations = JSON.parse(localStorage.getItem("participations") || "[]");
    const myActivities = activities.filter((a) => participations.includes(a.id));
    setParticipatedActivities(myActivities);
    // Calculate green points (15 points per activity)
    setGreenPoints(myActivities.length * 15);
  }, []);

  const upcomingParticipations = participatedActivities.filter((a) => a.status === "Upcoming");
  const completedParticipations = participatedActivities.filter((a) => a.status === "Completed");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">My Participation 📋</h1>
        <p className="text-gray-600">Track your involvement in green campus activities.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#E8F5E9] rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#4CAF50]" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-semibold text-gray-800">{participatedActivities.length}</p>
          <p className="text-sm text-gray-600">Total Participations</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#FFF9C4] rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-[#F9A825]" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-800">{greenPoints}</p>
          <p className="text-sm text-gray-600">Green Points Earned</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#E3F2FD] rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#1976D2]" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-800">{upcomingParticipations.length}</p>
          <p className="text-sm text-gray-600">Upcoming Activities</p>
        </div>
      </div>

      {/* Tabs */}
      {participatedActivities.length > 0 ? (
        <div className="space-y-6">
          {/* Upcoming Participations */}
          {upcomingParticipations.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Upcoming Activities ({upcomingParticipations.length})
              </h2>
              <div className="space-y-4">
                {upcomingParticipations.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-[#E8F5E9] text-[#4CAF50] text-xs font-medium rounded-full">
                            {activity.category}
                          </span>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                            {activity.status}
                          </span>
                          <div className="flex items-center gap-1 text-green-600 ml-auto">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-xs font-medium">Registered</span>
                          </div>
                        </div>

                        <h3 className="font-semibold text-gray-800 mb-2">{activity.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{activity.description}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{activity.date} • {activity.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{activity.location}</span>
                          </div>
                        </div>
                      </div>

                      <Link
                        to={`/activities/${activity.id}`}
                        className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] transition-colors text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Participations */}
          {completedParticipations.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Completed Activities ({completedParticipations.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedParticipations.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-[#E8F5E9] text-[#4CAF50] text-xs font-medium rounded-full">
                        {activity.category}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        ✓ Completed
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-800 mb-2">{activity.title}</h3>
                    <div className="text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{activity.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                      <Trophy className="w-4 h-4" />
                      <span>+15 Green Points</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Participations Yet</h3>
          <p className="text-gray-600 mb-6">Start participating in green activities to make an impact!</p>
          <Link
            to="/participate"
            className="inline-block px-6 py-3 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] transition-colors font-medium"
          >
            Browse Activities
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyParticipation;
