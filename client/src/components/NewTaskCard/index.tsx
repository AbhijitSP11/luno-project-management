import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const NewTaskCard = () => {
    return (
      <motion.div
        className="rounded-lg border border-green-500/20 bg-gray-800 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              Authentication System Implementation
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Assignee:</span>
                <span className="text-green-400">David</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Deadline:</span>
                <span>Apr 15</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Status:</span>
                <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-400">
                  In Progress
                </span>
              </div>
            </div>
          </div>
          <motion.div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 1 }}
          >
            <Plus className="h-5 w-5 text-green-400" />
          </motion.div>
        </div>
      </motion.div>
    );
  };
export default NewTaskCard;