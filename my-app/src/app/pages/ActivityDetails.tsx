import { useParams, useNavigate, Link } from "react-router";
import { Calendar, MapPin, User, Clock, Users, ArrowLeft, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";

interface StudentActivityApiItem {
  _id: string;
  title: string;
  category: string;
  description: string;
  activity_date: string;
  status: string;
  created_at: string;
  __v?: number;
}

const ActivityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<StudentActivityApiItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isParticipating, setIsParticipating] = useState(false);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    const fetchActivity = async () => {
      if (!id) {
        setLoading(false);
        setError("Activity ID is missing.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`https://greenhouse-backend-kvyr.onrender.com/api/student/activities/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        if (!data || !data._id) {
          setError("Activity not found.");
          setActivity(null);
        } else {
          setActivity(data as StudentActivityApiItem);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load activity details");
        setActivity(null);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  useEffect(() => {
    if (activity) {
      const participations = JSON.parse(localStorage.getItem("participations") || "[]");
      setIsParticipating(participations.includes(activity._id));
    }
  }, [activity]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-600">Loading activity details...</p>
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-600">{error || "Activity not found."}</p>
        <Link to="/app/participate" className="text-[#4CAF50] hover:underline mt-4 inline-block">
          Back to Activities
        </Link>
      </div>
    );
  }

  const handleParticipate = async () => {
    if (isParticipating || registering) return;

    setRegistering(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `https://greenhouse-backend-kvyr.onrender.com/api/student/participate/${activity._id}`,
        {},
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );

      setIsParticipating(true);
      const participations = JSON.parse(localStorage.getItem("participations") || "[]");
      if (!participations.includes(activity._id)) {
        participations.push(activity._id);
        localStorage.setItem("participations", JSON.stringify(participations));
      }
      toast.success(data?.message || "Participation marked");
    } catch (err: any) {
      const apiMessage = err.response?.data?.message;
      if (apiMessage?.toLowerCase?.().includes("already participated")) {
        setIsParticipating(true);
        const participations = JSON.parse(localStorage.getItem("participations") || "[]");
        if (!participations.includes(activity._id)) {
          participations.push(activity._id);
          localStorage.setItem("participations", JSON.stringify(participations));
        }
      }
      toast.error(apiMessage || "Failed to register for activity");
    } finally {
      setRegistering(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-gray-100 text-gray-700";
      case "ongoing":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const isAfterToday = (dateValue: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activityDate = new Date(dateValue);
    activityDate.setHours(0, 0, 0, 0);

    return activityDate > today;
  };

  const canParticipate =
    (activity.status?.toLowerCase() === "approved" || activity.status?.toLowerCase() === "ongoing") &&
    isAfterToday(activity.activity_date);
  const isPastActivity = !isAfterToday(activity.activity_date);
  const formattedDate = new Date(activity.activity_date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate("/app/participate")}
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
              {activity.status?.charAt(0).toUpperCase() + activity.status?.slice(1)}
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
              {[
                "Arrive at least 10 minutes before the activity starts",
                "Bring your student ID for attendance confirmation",
                "Follow coordinator instructions during the event",
              ].map((guideline, index) => (
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
              disabled={isParticipating || registering}
              className={`w-full py-4 rounded-lg font-medium transition-colors ${
                isParticipating
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#4CAF50] hover:bg-[#45a049] text-white"
              }`}
            >
              {registering ? "Registering..." : isParticipating ? "Already Registered" : "Register for Activity"}
            </button>
          )}

          {(activity.status?.toLowerCase() === "completed" || isPastActivity) && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-gray-600">This activity date has passed.</p>
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
                  <p className="font-medium text-gray-800">{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium text-gray-800">10:00 AM - 12:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-800">Campus</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Organizer</p>
                  <p className="font-medium text-gray-800">Green Campus Team</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-2">Participants</p>
                  <p className="font-medium text-gray-800 mb-2">
                    Open for student participation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;

