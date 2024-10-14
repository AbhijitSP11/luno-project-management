"use client";
import { useGetTeamsQuery } from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import Header from "@/components/Header";
import {
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/utils/dataGridClassNames.utils";
import { useTheme } from "next-themes";
import Spinner from "@/UI/spinner";

const columns: GridColDef[] = [
  { field: "id", headerName: "Team ID", width: 100 },
  { field: "teamName", headerName: "Team Name", width: 200 },
  { field: "productOwnerUsername", headerName: "Product Owner", width: 200 },
  {
    field: "projectManagerUsername",
    headerName: "Project Manager",
    width: 200,
  },
];

const Teams = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const { theme } = useTheme();
    const isDarkMode = theme === "dark";

  if (isLoading) return <div> <Spinner/> </div>;
  if (isError || !teams) return <div>Error fetching teams</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={teams || []}
          columns={columns}
          pagination
       
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Teams;