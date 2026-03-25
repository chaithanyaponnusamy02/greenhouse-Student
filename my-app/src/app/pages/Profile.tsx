import { useState } from "react";
import { User, Mail, GraduationCap, Calendar, Award, Edit2, Lock, Save, X } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [profile, setProfile] = useState({
    id: "STU2024001",
    name: "Alex Johnson",
    email: "alex.johnson@campus.edu",
    department: "Computer Science",
    year: "3rd Year",
    enrollmentDate: "2023-08-15",
  });

  const [editedProfile, setEditedProfile] = useState(profile);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const participationCount = JSON.parse(localStorage.getItem("participations") || "[]").length;
  const greenPoints = participationCount * 15;

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    if (passwords.new.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Reset password form
    setPasswords({ current: "", new: "", confirm: "" });
    setIsChangingPassword(false);
    toast.success("Password changed successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">My Profile 👤</h1>
        <p className="text-gray-600">Manage your account settings and view your achievements.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-full flex items-center justify-center">
              <span className="text-5xl font-semibold text-white">
                {profile.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-800">{profile.name}</p>
              <p className="text-sm text-gray-600">{profile.id}</p>
            </div>
          </div>

          {/* Profile Info */}
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
              {/* Name */}
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

              {/* Email */}
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

              {/* Department */}
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
                    <span>{profile.department}</span>
                  </div>
                )}
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Year</label>
                {isEditing ? (
                  <select
                    value={editedProfile.year}
                    onChange={(e) => setEditedProfile({ ...editedProfile, year: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                ) : (
                  <div className="flex items-center gap-2 text-gray-800">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{profile.year}</span>
                  </div>
                )}
              </div>

              {/* Enrollment Date */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Enrollment Date</label>
                <div className="flex items-center gap-2 text-gray-800">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{new Date(profile.enrollmentDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Edit Actions */}
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-800">{greenPoints}</p>
              <p className="text-sm text-gray-600">Green Points Earned</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-800">{participationCount}</p>
              <p className="text-sm text-gray-600">Activities Participated</p>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
          </div>
          {!isChangingPassword && (
            <button
              onClick={() => setIsChangingPassword(true)}
              className="px-4 py-2 text-[#4CAF50] border border-[#4CAF50] rounded-lg hover:bg-[#E8F5E9] transition-colors"
            >
              Change
            </button>
          )}
        </div>

        {isChangingPassword && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Current Password</label>
              <input
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">New Password</label>
              <input
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleChangePassword}
                className="px-6 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] transition-colors"
              >
                Update Password
              </button>
              <button
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswords({ current: "", new: "", confirm: "" });
                }}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {!isChangingPassword && (
          <p className="text-sm text-gray-600">Keep your account secure by using a strong password.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
