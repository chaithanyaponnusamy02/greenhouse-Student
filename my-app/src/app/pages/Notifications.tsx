import { useState, useEffect } from "react";
import { Bell, Calendar, CheckCircle, Megaphone, Clock } from "lucide-react";
import { format } from "date-fns";

interface Notification {
  id: string;
  type: "new_activity" | "reminder" | "confirmation";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    // Load notifications from localStorage or use default
    const stored = localStorage.getItem("notifications");
    if (stored) {
      setNotifications(JSON.parse(stored));
    } else {
      const defaultNotifications: Notification[] = [
        {
          id: "1",
          type: "new_activity",
          title: "New Activity Announced!",
          message: "Campus Tree Plantation Drive has been scheduled for Feb 15, 2026. Register now!",
          timestamp: "2026-02-09T10:30:00",
          read: false
        },
        {
          id: "2",
          type: "reminder",
          title: "Activity Reminder",
          message: "Energy Conservation Workshop is starting tomorrow at 2:00 PM. Don't forget!",
          timestamp: "2026-02-09T09:00:00",
          read: false
        },
        {
          id: "3",
          type: "confirmation",
          title: "Registration Confirmed",
          message: "You have successfully registered for the Campus Cleanup Drive on Feb 20, 2026.",
          timestamp: "2026-02-08T16:45:00",
          read: true
        },
        {
          id: "4",
          type: "new_activity",
          title: "New Activity Added",
          message: "Water Conservation Seminar scheduled for Feb 22. Check it out!",
          timestamp: "2026-02-07T14:20:00",
          read: true
        },
        {
          id: "5",
          type: "reminder",
          title: "Activity Starting Soon",
          message: "Campus Tree Plantation Drive starts in 6 days. Prepare accordingly!",
          timestamp: "2026-02-09T08:00:00",
          read: false
        }
      ];
      setNotifications(defaultNotifications);
      localStorage.setItem("notifications", JSON.stringify(defaultNotifications));
    }
  }, []);

  const markAsRead = (id: string) => {
    const updated = notifications.map((notif) =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map((notif) => ({ ...notif, read: true }));
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "new_activity":
        return <Megaphone className="w-5 h-5 text-blue-600" />;
      case "reminder":
        return <Clock className="w-5 h-5 text-orange-600" />;
      case "confirmation":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "new_activity":
        return "bg-blue-100";
      case "reminder":
        return "bg-orange-100";
      case "confirmation":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Notifications 🔔</h1>
        <p className="text-gray-600">Stay updated with green campus activities and events.</p>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "all"
                  ? "bg-[#4CAF50] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "unread"
                  ? "bg-[#4CAF50] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-[#4CAF50] hover:underline font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => !notification.read && markAsRead(notification.id)}
              className={`bg-white rounded-xl shadow-sm border p-6 transition-all cursor-pointer ${
                notification.read
                  ? "border-gray-100 hover:shadow-md"
                  : "border-[#4CAF50] bg-green-50/30 hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconBg(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className={`font-semibold ${notification.read ? "text-gray-800" : "text-gray-900"}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-[#4CAF50] rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>

                  <p className="text-gray-700 mb-3">{notification.message}</p>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {format(new Date(notification.timestamp), "MMM dd, yyyy 'at' h:mm a")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Notifications</h3>
            <p className="text-gray-600">
              {filter === "unread"
                ? "You're all caught up! No unread notifications."
                : "You don't have any notifications yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
