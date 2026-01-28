// src/components/dashboard/SessionsTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getStatusVariant } from "@/lib/utils";
import { Session } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SessionsTableProps {
  sessions: Session[];
}

export function SessionsTable({ sessions }: SessionsTableProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Today's Driving Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{session.student}</TableCell>
                <TableCell>{session.vehicle}</TableCell>
                <TableCell>{session.time}</TableCell>
                <TableCell>{session.instructor}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(session.status)}>
                    {session.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {sessions.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-8"
                >
                  No sessions scheduled for today
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
