import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { Calendar, MapPin, CheckCircle, Trophy, TrendingUp } from "lucide-react";
import axios from "axios";

interface ActivityItem {
  _id: string;
  title: string;
  category: string;
  description: string;
  activity_date: string;
  status: string;
  created_at: string;
  __v?: number;
}

interface StudentParticipationItem {
  _id: string;
  student_id: string;
  activity_id: ActivityItem;
  participation_date: string;
  __v?: number;
}

const MyParticipation = () => {
  const [participations, setParticipations] = useState<StudentParticipationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyParticipations = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("https://greenhouse-backend-kvyr.onrender.com/api/student/my-activities", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        setParticipations(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load participations");
        setParticipations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyParticipations();
  }, []);

  const isUpcomingOrToday = (dateValue: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activityDate = new Date(dateValue);
    activityDate.setHours(0, 0, 0, 0);

    return activityDate >= today;
  };

  const upcomingParticipations = useMemo(
    () => participations.filter((p) => p.activity_id && isUpcomingOrToday(p.activity_id.activity_date)),
    [participations]
  );

  const completedParticipations = useMemo(
    () => participations.filter((p) => p.activity_id && !isUpcomingOrToday(p.activity_id.activity_date)),
    [participations]
  );

  const greenPoints = participations.length * 15;

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-blue-100 text-blue-700";
      case "ongoing":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">My Participation</h1>
        <p className="text-gray-600">Track your involvement in green campus activities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#E8F5E9] rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#4CAF50]" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-semibold text-gray-800">{participations.length}</p>
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

      {loading && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-600">Loading your participations...</p>
        </div>
      )}

      {error && !loading && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-red-600 mb-2">{error}</p>
          <p className="text-sm text-gray-500">Please try again later.</p>
        </div>
      )}

      {!loading && !error && participations.length > 0 ? (
        <div className="space-y-6">
          {upcomingParticipations.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Upcoming Activities ({upcomingParticipations.length})
              </h2>
              <div className="space-y-4">
                {upcomingParticipations.map((participation) => {
                  const activity = participation.activity_id;
                  return (
                    <div
                      key={participation._id}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 bg-[#E8F5E9] text-[#4CAF50] text-xs font-medium rounded-full">
                              {activity.category}
                            </span>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                              {activity.status?.charAt(0).toUpperCase() + activity.status?.slice(1)}
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
                              <span>{formatDate(activity.activity_date)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>Campus</span>
                            </div>
                          </div>
                        </div>

                        <Link
                          to={`/app/activities/${activity._id}`}
                          className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] transition-colors text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {completedParticipations.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Completed Activities ({completedParticipations.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedParticipations.map((participation) => {
                  const activity = participation.activity_id;
                  return (
                    <div
                      key={participation._id}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-[#E8F5E9] text-[#4CAF50] text-xs font-medium rounded-full">
                          {activity.category}
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Completed
                        </span>
                      </div>

                      <h3 className="font-semibold text-gray-800 mb-2">{activity.title}</h3>
                      <div className="text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{formatDate(activity.activity_date)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                        <Trophy className="w-4 h-4" />
                        <span>+15 Green Points</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {!loading && !error && participations.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Participations Yet</h3>
          <p className="text-gray-600 mb-6">Start participating in green activities to make an impact!</p>
          <Link
            to="/app/participate"
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

