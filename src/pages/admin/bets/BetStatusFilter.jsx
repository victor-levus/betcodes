import { Select } from "@radix-ui/themes";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const statuses = [
  { label: "All" },
  { label: "Success", value: "SUCCESS" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Lost", value: "LOST" },
];

const BetStatusFilter = () => {
  const router = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy"));

        const query = params.size ? "?" + params.toString() : "";
        router("/dashboard/bets" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by Bet status..." />
      <Select.Content>
        {statuses.map((status, i) => (
          <Select.Item key={i} value={status.value || "undefined"}>
            {status.label}{" "}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default BetStatusFilter;
