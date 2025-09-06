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
            <p className="text-sm font-medium capitalize text-gray-700 ">
              {title}
            </p>
            <p className="text-2xl font-bold ">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
