import { Link } from "react-router";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { activities } from "../data/mockData";

const Participation = () => {
  const upcomingActivities = activities.filter((a) => a.status === "Upcoming" || a.status === "Ongoing");

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Participate in Activities 🤝</h1>
        <p className="text-gray-600">Join green campus initiatives and make a difference.</p>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-[#E8F5E9] to-[#C8E6C9] rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🌱</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Why Participate?</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Contribute to campus sustainability goals</li>
              <li>• Earn green points and certificates</li>
              <li>• Network with like-minded students</li>
              <li>• Learn eco-friendly practices</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Available Activities */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Available Activities ({upcomingActivities.length})
        </h2>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {upcomingActivities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#E8F5E9] text-[#4CAF50] text-xs font-medium rounded-full">
                    {activity.category}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {activity.status}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">{activity.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{activity.description}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{activity.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{activity.location}</span>
                  </div>
                  {activity.maxParticipants && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>
                        {activity.currentParticipants}/{activity.maxParticipants} spots filled
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-stretch lg:items-end gap-3">
                <Link
                  to={`/activities/${activity.id}`}
                  className="px-6 py-3 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] transition-colors font-medium text-center flex items-center justify-center gap-2"
                >
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {activity.maxParticipants && (
                  <div className="w-48">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Availability</span>
                      <span>
                        {Math.round(((activity.currentParticipants || 0) / activity.maxParticipants) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#4CAF50] h-2 rounded-full transition-all"
                        style={{
                          width: `${((activity.currentParticipants || 0) / activity.maxParticipants) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Activities */}
      {upcomingActivities.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-600 mb-2">No upcoming activities available at the moment.</p>
          <p className="text-sm text-gray-500">Check back later for new opportunities!</p>
        </div>
      )}
    </div>
  );
};

export default Participation;
