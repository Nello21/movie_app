import { User } from "@prisma/client";
import { UserIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserTable {
  users: User[];
  isLoading: boolean;
}

export const UserTable = ({ users, isLoading }: UserTable) => {
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span>Аватар</span>
          </TableHead>
          <TableHead>Имя</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="hidden md:table-cell">
            Зарегистрирован
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow className="text-center text-lg">
            Пользователи не найдены
          </TableRow>
        ) : (
          users.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell className="hidden sm:table-cell">
                <UserIcon
                  className="aspect-square rounded-md object-cover"
                  height={30}
                  width={30}
                />
              </TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="hidden md:table-cell">
                {String(user.createdAt)}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
