import TableView, { TableColumnModel } from "@/components/table-view";
import { SearchParamsUser } from "./page";
import { getListUser } from "./user-server";
import { MetaModel, UserModel } from "./user-model";
import { TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ButtonGroup } from "@/components/ui/button-group";
import EditUser from "./edit-user";
import DeleteUser from "./delete-user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getColorFromName, getShortText } from "@/lib/utils";

const columns: TableColumnModel[] = [
  {
    title: "No",
  },
  {
    title: "Name",
  },
  {
    title: "Email",
  },
  {
    title: "CreatedAt",
  },
  {
    title: "Action",
  },
];

export default async function UserTable({
  searchParams,
}: {
  searchParams?: Promise<SearchParamsUser>;
}) {
  const { pg = 1, lm = 10, search = "" } = await searchParams!;
  const data = await getListUser(pg, lm, search);

  let users: UserModel[] = [];
  let meta: MetaModel | null = null;
  if (data) {
    users = data.data;
    meta = data.meta;
  }

  let indexPage = 1;
  indexPage = pg - 1;
  const noPage = indexPage * lm + 1;

  return (
    <TableView columns={columns} meta={meta!}>
      {users.length > 0 ? (
        users.map((row, index) => {
          const date = row.createdAt;
          const formatted = date
            ? format(new Date(date as Date), "MMM dd, yyyy")
            : "-";

          return (
            <TableRow key={index}>
              <TableCell>{noPage + index}</TableCell>
              <TableCell>
                <div className="flex flex-row items-center gap-3">
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarFallback
                      className="text-primary-foreground"
                      style={{
                        background: `linear-gradient(to right bottom, oklch(${getColorFromName(
                          row.name!,
                        )} / 0.3), oklch(${getColorFromName(row.name!)}))`,
                      }}
                    >
                      {getShortText(row.name!)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{row.name}</span>
                </div>
              </TableCell>
              <TableCell className="lowercase">{row.email}</TableCell>
              <TableCell>{formatted}</TableCell>
              <TableCell>
                <div className="flex flex-row justify-end">
                  <ButtonGroup>
                    <EditUser userModel={row} />
                    <DeleteUser userModel={row} />
                  </ButtonGroup>
                </div>
              </TableCell>
            </TableRow>
          );
        })
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No users found.
          </TableCell>
        </TableRow>
      )}
    </TableView>
  );
}
