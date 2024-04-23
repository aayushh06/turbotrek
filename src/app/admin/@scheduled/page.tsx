import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAllScheduledDrives
} from "@/lib/appwrite";

export default async function ScheduledPage() {
  const scheduledDrives = await getAllScheduledDrives();

  return (
    <Table className="rounded">
      <TableHeader className="bg-gray-50 dark:bg-gray-800">
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Created at</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scheduledDrives.map((drive, index) => (
          <TableRow key={drive.$id}>
            <TableCell>{drive.name}</TableCell>
            <TableCell>{drive.email}</TableCell>
            <TableCell>{drive.phone}</TableCell>
            <TableCell>{new Date(drive.date).toLocaleDateString()}
              <small className="block">
                {new Date(drive.date).toLocaleTimeString()}
              </small>
            </TableCell>
            <TableCell>
              {new Date(drive.$createdAt).toDateString()}
              <small className="block">
                {new Date(drive.$createdAt).toLocaleTimeString()}
              </small>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
