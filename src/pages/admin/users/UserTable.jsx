import React from "react";
import { Card, Flex, Heading, Table } from "@radix-ui/themes";
import moment from "moment";

const UserTable = ({ usersData, title, tableType }) => {
  const tableHeader = [
    {
      label: "S/N",
      className: `hidden md:table-cell ${tableType === "sm" ? "hidden" : ""}`,
    },
    { label: "NAME", className: "" },
    {
      label: "EMAIL",
      className: `hidden md:table-cell ${tableType === "sm" ? "hidden" : ""}`,
    },
    { label: "DATE JOIN", className: "" },
    {
      label: "STATUS",
      className: `hidden md:table-cell ${tableType === "sm" ? "hidden" : ""}`,
    },
  ];

  const smallTableHeader = [
    { label: "NAME", className: "" },
    { label: "DATE JOIN", className: "" },
  ];

  const usedTableHead = tableType === "sm" ? smallTableHeader : tableHeader;

  return (
    <Card>
      <Heading mb={"5"}>{title}</Heading>

      <Table.Root>
        <Table.Header>
          <Table.Row className="">
            {usedTableHead.map((th) => (
              <Table.Cell className={th.className} key={th.label}>
                {th.label}
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {usersData.map((user, i) => (
            <Table.Row key={user.id}>
              <Table.Cell
                className={`${
                  tableType === "sm" ? "hidden--cell" : "hidden md:table-cell"
                }`}
              >
                {i + 1}
              </Table.Cell>

              {/* <Table.Cell>
                <EditBetModal betData={user} />
                
              </Table.Cell> */}

              <Table.Cell>
                {user.first_name?.toUpperCase()} {user.last_name?.toUpperCase()}
                <p className="m-0 mt-1 text-zinc-500 md:hidden">
                  {user.is_staff ? "Admin" : "Regular"}
                </p>
              </Table.Cell>

              <Table.Cell
                className={
                  tableType === "sm" ? "hidden--cell" : "hidden md:table-cell"
                }
              >
                {user.email}
              </Table.Cell>

              <Table.Cell>
                <Flex className="" direction={"column"}>
                  <span>{moment(user.date_joined).format("D MMM YY")}</span>
                  <span>{moment(user.date_joined).format("HH:mm")}</span>
                </Flex>
              </Table.Cell>

              <Table.Cell
                className={
                  tableType === "sm" ? "hidden--cell" : "hidden md:table-cell"
                }
              >
                {user.is_staff ? "Admin" : "Regular"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default UserTable;
