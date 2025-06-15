import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Smartphone } from "lucide-react";

export const UseMobileNotification = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Add a small delay before showing the notification
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, []);

  if (isMobile) return null;

  return (
    !isMobile && (
      <div
        className={`absolute top-6 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
      >
        <Card className="bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300 shadow-xl hover:shadow-2xl transition-all duration-300 animate-bounce-subtle">
          <CardContent className="flex items-center gap-3 p-4">
            <Smartphone className="min-w-6 size-6 text-blue-600 animate-pulse" />
            <span className="text-sm font-semibold text-blue-900">
              📱 For the best experience, please open this app on your mobile device
            </span>
          </CardContent>
        </Card>
      </div>
    )
  );
};
