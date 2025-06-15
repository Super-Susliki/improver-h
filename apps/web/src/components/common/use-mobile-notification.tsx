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
      <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="flex items-center gap-3 p-4">
            <Smartphone className="w-5 h-5 text-blue-600 animate-pulse" />
            <span className="text-sm font-medium text-blue-800">
              📱 For the best experience, please open this app on your mobile device
            </span>
          </CardContent>
        </Card>
      </div>
    )
  );
};
