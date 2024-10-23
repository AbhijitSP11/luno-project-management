"use client";

import Header from "@/components/Header";
import ModalNewTask from "@/components/ModalNewTask";
import TaskBoard from "@/components/TaskTable";
import Spinner from "@/components/Spinner";

import {
  Priority,
  Task,
  useGetAuthUserQuery,
  useGetTasksByUserQuery,
} from "@/state/api";
import { dataGridClassNames, dataGridSxStyles } from "@/utils/dataGridClassNames.utils";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  priority: Priority;
};

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value.username || "Unassigned",
  },
];

const ReusablePriorityPage = ({ priority }: Props) => {
  const { theme } = useTheme();

  const [view, setView] = useState("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  const { user, isLoading:userLoading } = useAuth(true);
  const userId = Number(user?.id) ?? 0;
  
  const {
    data: tasks,
    isLoading,
    isError: isTasksError,
  } = useGetTasksByUserQuery(userId, {
    skip: userId === null,
  });

  const isDarkMode = theme === "dark";

  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority,
  );

  if (isTasksError || !tasks) return <div>Error fetching tasks</div>;

  return (
    <div className="m-5 p-4">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add Task
          </button>
        }
      />
      <div className="mb-4 flex justify-start border bg-gray-100 dark:bg-gray-700 dark:border-transparent border-gray-100 shadow-sm p-1 w-min rounded-md">
        <button
          className={`px-4 py-2 rounded-m ${
            view === "list" ? "bg-white shadow-sm dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-700"
          } rounded-lg`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`px-4 py-2 ${
            view === "table" ? "bg-white shadow-sm dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-700"
          } rounded-lg`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>
      {isLoading ? (
        <div><Spinner/></div>
      ) : view === "list" ? (
       <div>
        <TaskBoard tasks={tasks}/>
       </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="z-0 w-full">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              getRowId={(row) => row.id}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ReusablePriorityPage;