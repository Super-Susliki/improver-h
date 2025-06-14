import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Smartphone } from "lucide-react";

export const UseMobileNotification = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    !isMobile && (
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="flex items-center gap-3 p-4">
            <Smartphone className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              📱 For the best experience, please open this app on your mobile device
            </span>
          </CardContent>
        </Card>
      </div>
    )
  );
};
