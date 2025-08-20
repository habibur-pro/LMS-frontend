import { BookOpen, LucideIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
type Props = {
  title: string;
  value: number | string;
  Icon: LucideIcon;
};
const StatsCard = ({ title, value, Icon }: Props) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <Icon className="w-8 h-8 text-blue-600" />
          <div>
            <p className="text-sm font-medium capitalize text-gray-600 dark:text-gray-300">
              {title}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
