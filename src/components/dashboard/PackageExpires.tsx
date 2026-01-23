// src/components/dashboard/PackageExpiries.tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpiryItem } from "@/types";

interface PackageExpiriesProps {
  items: ExpiryItem[];
}

export function PackageExpiries({ items }: PackageExpiriesProps) {
  return (
   <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Package Expiries</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-3 last:border-0"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.package}</p>
            </div>
            <Badge variant={item.days <= 3 ? "destructive" : "outline"}>
              {item.days} days left
            </Badge>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-center text-muted-foreground py-4">
            No packages expiring soon
          </p>
        )}
      </CardContent>
    </Card>
  );
}
