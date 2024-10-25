import { FC } from "react";
import { motion } from "framer-motion";

export interface Task {
  name: string;
  status: "Completed" | "In Progress" | "Pending" | "Not Started"; 
  deadline: string;
  assignee: string;
}

interface TaskTableProps {
  tasks: Task[];
}

const TaskTable: FC<TaskTableProps> = ({ tasks }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <table className="mt-4 min-w-full text-left">
        <thead>
          <tr>
            <th className="border-b border-gray-600 pb-2">Task Name</th>
            <th className="border-b border-gray-600 pb-2">Status</th>
            <th className="border-b border-gray-600 pb-2">Deadline</th>
            <th className="border-b border-gray-600 pb-2">Assignee</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 1.5 }}
              className="transition-colors hover:bg-purple-500/10"
            >
              <td className="border-b border-gray-600 py-2">{task.name}</td>
              <td className="border-b border-gray-600 py-2">
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    task.status === "Completed"
                      ? "bg-green-500/20 text-green-400"
                      : task.status === "In Progress"
                        ? "bg-blue-500/20 text-blue-400"
                        : task.status === "Not Started"
                          ? "bg-yellow-500/20 text-yellow-400" 
                          : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td className="border-b border-gray-600 py-2">{task.deadline}</td>
              <td className="border-b border-gray-600 py-2">{task.assignee}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};


export default TaskTable;
