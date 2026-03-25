import { useParams, useNavigate, Link } from "react-router";
import { Calendar, MapPin, User, Clock, Users, ArrowLeft, CheckCircle } from "lucide-react";
import { activities } from "../data/mockData";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const ActivityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isParticipating, setIsParticipating] = useState(false);

  const activity = activities.find((a) => a.id === id);

  useEffect(() => {
    if (activity) {
      const participations = JSON.parse(localStorage.getItem("participations") || "[]");
      setIsParticipating(participations.includes(activity.id));
    }
  }, [activity]);

  if (!activity) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-600">Activity not found.</p>
        <Link to="/activities" className="text-[#4CAF50] hover:underline mt-4 inline-block">
          Back to Activities
        </Link>
      </div>
    );
  }

  const handleParticipate = () => {
    const participations = JSON.parse(localStorage.getItem("participations") || "[]");
    
    if (isParticipating) {
      // Remove participation
      const updated = participations.filter((id: string) => id !== activity.id);
      localStorage.setItem("participations", JSON.stringify(updated));
      setIsParticipating(false);
      toast.success("Participation cancelled successfully!");
    } else {
      // Add participation
      participations.push(activity.id);
      localStorage.setItem("participations", JSON.stringify(participations));
      setIsParticipating(true);
      toast.success("Successfully registered for the activity!");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-gray-100 text-gray-700";
      case "Ongoing":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const canParticipate = activity.status === "Upcoming" || activity.status === "Ongoing";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate("/activities")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Activities</span>
      </button>

      {/* Activity Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 bg-[#E8F5E9] text-[#4CAF50] text-sm font-medium rounded-full">
              {activity.category}
            </span>
            <span className={`px-4 py-1.5 text-sm font-medium rounded-full ${getStatusColor(activity.status)}`}>
              {activity.status}
            </span>
          </div>
          {isParticipating && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Registered</span>
            </div>
          )}
        </div>

        <h1 className="text-3xl font-semibold text-gray-800 mb-4">{activity.title}</h1>
        <p className="text-gray-600 text-lg leading-relaxed">{activity.description}</p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Guidelines */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Participation Guidelines</h2>
            <ul className="space-y-3">
              {activity.guidelines.map((guideline, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#E8F5E9] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-[#4CAF50]">{index + 1}</span>
                  </div>
                  <span className="text-gray-700">{guideline}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          {canParticipate && (
            <button
              onClick={handleParticipate}
              className={`w-full py-4 rounded-lg font-medium transition-colors ${
                isParticipating
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-[#4CAF50] hover:bg-[#45a049] text-white"
              }`}
            >
              {isParticipating ? "Cancel Registration" : "Register for Activity"}
            </button>
          )}

          {activity.status === "Completed" && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-gray-600">This activity has been completed.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Activity Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Activity Details</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium text-gray-800">{activity.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium text-gray-800">{activity.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-800">{activity.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Organizer</p>
                  <p className="font-medium text-gray-800">{activity.organizer}</p>
                </div>
              </div>

              {activity.maxParticipants && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">Participants</p>
                    <p className="font-medium text-gray-800 mb-2">
                      {activity.currentParticipants} / {activity.maxParticipants}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#4CAF50] h-2 rounded-full transition-all"
                        style={{
                          width: `${((activity.currentParticipants || 0) / activity.maxParticipants) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;
