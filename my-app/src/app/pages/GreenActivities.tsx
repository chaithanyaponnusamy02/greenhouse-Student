import { useState } from "react";
import { Link } from "react-router";
import { Search, Filter, Calendar, MapPin, Users } from "lucide-react";
import { activities } from "../data/mockData";

const GreenActivities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Plantation", "Energy", "Waste Management", "Cleanliness", "Water"];

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || activity.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Green Campus Activities 🌱</h1>
        <p className="text-gray-600">Explore and participate in sustainability initiatives on campus.</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent bg-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">{filteredActivities.length}</span> activities
        </p>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <Link
            key={activity.id}
            to={`/app/activities/${activity.id}`}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-[#4CAF50] transition-all"
          >
            {/* Card Header */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <span className="px-3 py-1 bg-[#E8F5E9] text-[#4CAF50] text-xs font-medium rounded-full">
                  {activity.category}
                </span>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
              </div>

              <h3 className="font-semibold text-gray-800 mb-2">{activity.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">{activity.description}</p>

              {/* Activity Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{activity.date} • {activity.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{activity.location}</span>
                </div>
                {activity.maxParticipants && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{activity.currentParticipants}/{activity.maxParticipants} participants</span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            {activity.maxParticipants && (
              <div className="px-6 pb-4">
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
          </Link>
        ))}
      </div>

      {/* No Results */}
      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-600">No activities found. Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default GreenActivities;
