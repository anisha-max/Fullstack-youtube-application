"use client";

import Link from "next/link";

export default function NotificationDropdown({ notifications, setNotifications }) {
  async function markAsRead(id) {
    await fetch("/api/notification/read", {
      method: "PATCH",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });

    setNotifications(prev =>
      prev.map(n =>
        n._id === id ? { ...n, isRead: true } : n
      )
    );
  }

  return (
    <div className="absolute right-0 mt-3 w-80 rounded-xl border border-[#BAE6FD] bg-[#F0F9FF] shadow-xl z-50 overflow-hidden">
      
      {/* Header */}
      <div className="px-4 py-3 font-semibold text-[#0C4A6E] border-b border-[#BAE6FD] bg-[#E0F2FE]">
        Notifications
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <p className="px-4 py-6 text-sm text-[#075985] text-center">
          No notifications yet
        </p>
      )}

      {/* Notification Items */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.map(n => (
          <Link
            href={n.link || "#"}
            key={n._id}
            onClick={() => markAsRead(n._id)}
            className={`block px-4 py-3 border-b border-[#BAE6FD] transition ${
              !n.isRead
                ? "bg-[#E0F2FE] hover:bg-[#BAE6FD]"
                : "bg-transparent hover:bg-[#E0F2FE]"
            }`}
          >
            <p className="text-sm font-medium text-[#0C4A6E]">
              {n.title}
            </p>
            <p className="text-xs text-[#075985] mt-0.5">
              {n.message}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}