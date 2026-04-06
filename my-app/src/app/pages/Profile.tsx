import { useEffect, useState } from "react";
import { User, Mail, GraduationCap, Calendar, Edit2, Save, X } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

interface StudentProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  joined_date: string | null;
  auditor_id: string | null;
  __v?: number;
}

interface EditableProfile {
  name: string;
  email: string;
  department: string;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [editedProfile, setEditedProfile] = useState<EditableProfile>({
    name: "",
    email: "",
    department: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("https://greenhouse-backend-kvyr.onrender.com/api/student/profile", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        setProfile(data as StudentProfile);
        setEditedProfile({
          name: data?.name || "",
          email: data?.email || "",
          department: data?.department || "",
        });
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveProfile = () => {
    if (!profile) return;

    setProfile({
      ...profile,
      name: editedProfile.name,
      email: editedProfile.email,
      department: editedProfile.department,
    });
    setIsEditing(false);
    toast.success("Profile updated locally");
  };

  const handleCancelEdit = () => {
    if (!profile) return;

    setEditedProfile({
      name: profile.name,
      email: profile.email,
      department: profile.department,
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-red-600 mb-2">{error || "Profile not found."}</p>
        <p className="text-sm text-gray-500">Please try again later.</p>
      </div>
    );
  }

  const initials = profile.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account settings and view your profile details.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-full flex items-center justify-center">
              <span className="text-5xl font-semibold text-white">{initials}</span>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-800">{profile.name}</p>
              <p className="text-sm text-gray-600">{profile._id}</p>
              <p className="text-xs text-gray-500 mt-1">Role: {profile.role}</p>
              <p className="text-xs text-gray-500">Status: {profile.status}</p>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 text-[#4CAF50] border border-[#4CAF50] rounded-lg hover:bg-[#E8F5E9] transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-800">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{profile.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-800">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{profile.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Department</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.department}
                    onChange={(e) => setEditedProfile({ ...editedProfile, department: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-800">
                    <GraduationCap className="w-4 h-4 text-gray-400" />
                    <span>{profile.department || "N/A"}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Joined Date</label>
                <div className="flex items-center gap-2 text-gray-800">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>
                    {profile.joined_date
                      ? new Date(profile.joined_date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 px-6 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

