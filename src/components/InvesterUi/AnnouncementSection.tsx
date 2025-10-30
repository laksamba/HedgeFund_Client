import React, { useState, useEffect } from "react";

interface Announcement {
  id: number;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

const AnnouncementSection: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const dummyData: Announcement[] = [
      {
        id: 1,
        title: "System Maintenance",
        message: "Our servers will be undergoing maintenance tonight from 12 AM to 2 AM.",
        type: "warning",
      },
      {
        id: 2,
        title: "New Feature!",
        message: "We’ve launched dark mode — check it out in your settings!",
        type: "success",
      },
      {
        id: 3,
        title: "Important Update",
        message: "Please verify your email address to continue using all features.",
        type: "info",
      },
    ];

    setTimeout(() => {
      setAnnouncements(dummyData);
    }, 1000);
  }, []);

  useEffect(() => {
    if (announcements.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [announcements]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-400 text-green-800";
      case "warning":
        return "bg-yellow-100 border-yellow-400 text-yellow-800";
      case "error":
        return "bg-red-100 border-red-400 text-red-800";
      default:
        return "bg-blue-100 border-blue-400 text-blue-800";
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 py-4 ">
      {/* <h2 className="text-xl md:text-2xl font-semibold mb-3 text-center">Announcements</h2> */}
      {announcements.length === 0 ? (
        <p className="text-gray-500 text-center">Loading announcements...</p>
      ) : (
        <div className="relative overflow-hidden h-auto min-h-[90px] flex items-center justify-center w-full">
          {announcements.map((item, index) => (
            <div
              key={item.id}
              className={`absolute transition-all duration-700 ease-in-out w-full ${
                index === currentIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div
                className={`border-l-4 p-1 rounded-md shadow-sm ${getTypeColor(item.type)}  mx-auto w-full`}
              >
                <h3 className="font-semibold text-lg md:text-xl">{item.title}</h3>
                <p className="text-sm md:text-base">{item.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementSection;
