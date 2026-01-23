// src/components/dashboard/StatsCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatItem } from "@/types";

interface StatsCardProps {
  stat: StatItem;
}

export function StatsCard({ stat }: StatsCardProps) {
  return (
    <Card className="transition-all hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-800/50 hover:-translate-y-1 bg-card text-card-foreground overflow-hidden">
      <CardHeader className="pb-0.5 pt-3 px-4">
        <CardTitle className="text-xs font-medium text-muted-foreground truncate leading-none">
          {stat.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0.5 pb-3 px-4">
        <div className="text-xl md:text-2xl font-bold truncate leading-none">
          {stat.value}
        </div>
      </CardContent>
    </Card>
  );
}
