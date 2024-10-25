import { slideVariants } from "@/constants/constants";
import { AnimatePresence, motion } from "framer-motion";
import {PieChart, Users, Calendar, Shield, CheckCircle2, Clock, GitBranch,
    Target, BarChart, ChevronLeft, ChevronRight} from "lucide-react";
import { useEffect, useState } from "react";

const CarouselContent = () => {
    const [currentFeatureIndex, setCurrentFeatureIndex] = useState<number>(0);
    const carouselFeatures = ["summary", "newTask"];
    const [responseText, setResponseText] = useState<string>("");
    const [autoCycle, setAutoCycle] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [showResponse, setShowResponse] = useState<boolean>(false);

    const featureTimeouts: { [key: string]: number } = {
        summary: 2000,
        newTask: 3000,
      };
    
    const currentFeature = carouselFeatures[currentFeatureIndex];
    const handleNext = () => {
        setAutoCycle(false);
        setCurrentFeatureIndex((prev) =>
          prev === carouselFeatures.length - 1 ? 0 : prev + 1,
        );
      };
    
      const handlePrev = () => {
        setAutoCycle(false);
        setCurrentFeatureIndex((prev) =>
          prev === 0 ? carouselFeatures.length - 1 : prev - 1,
        );
      };
    
      useEffect(() => {
        if (showResponse && !loading) {
          const timeout = setTimeout(() => {
            setResponseText("Here's your project summary:");
            setCurrentFeatureIndex(0);
          }, 1000);
    
          return () => clearTimeout(timeout);
        }
      }, [showResponse, loading]);

      

  useEffect(() => {
    if (autoCycle) {
      const timer = setTimeout(() => {
        setCurrentFeatureIndex((prev) =>
          prev === carouselFeatures.length - 1 ? 0 : prev + 1,
        );
      }, featureTimeouts[carouselFeatures[currentFeatureIndex]]);
      return () => clearTimeout(timer);
    }
  }, [currentFeatureIndex, autoCycle]);
    return (
      <div className="relative z-20 mt-8">
        <AnimatePresence mode="wait" custom={currentFeatureIndex}>
          <motion.div
            key={currentFeatureIndex}
            custom={currentFeatureIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            {currentFeature === "summary" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-purple-400">
                  Project Insights
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-purple-500/10 p-4">
                    <PieChart className="mb-2 h-6 w-6 text-purple-400" />
                    <h4 className="mb-1 font-medium">Task Distribution</h4>
                    <p className="text-sm text-gray-400">33% In Progress</p>
                    <p className="text-sm text-gray-400">33% Completed</p>
                    <p className="text-sm text-gray-400">33% Not Started</p>
                  </div>
                  <div className="rounded-lg bg-purple-500/10 p-4">
                    <Users className="mb-2 h-6 w-6 text-purple-400" />
                    <h4 className="mb-1 font-medium">Team Workload</h4>
                    <p className="text-sm text-gray-400">3 Active Members</p>
                    <p className="text-sm text-gray-400">1.0 Tasks/Person</p>
                  </div>
                </div>
                <div className="rounded-lg bg-purple-500/10 p-4">
                  <Calendar className="mb-2 h-6 w-6 text-purple-400" />
                  <h4 className="mb-1 font-medium">Timeline Overview</h4>
                  <p className="text-sm text-gray-400">Next deadline: Mar 28</p>
                  <p className="text-sm text-gray-400">
                    All tasks scheduled within 2 weeks
                  </p>
                </div>
              </div>
            )}

            {currentFeature === "newTask" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-green-400">
                  <span className="flex items-center gap-2">
                    <Shield className="h-8 w-8" />
                    Authentication System
                  </span>
                </h3>

                <div className="rounded-lg border border-green-500/30 bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-green-500/20 p-2">
                        <CheckCircle2 className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">
                          Task Created Successfully
                        </h4>
                        <p className="text-sm text-gray-400">
                          Added to Sprint Backlog
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-400">
                      High Priority
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-green-500/20 bg-gray-800/50 p-4">
                    <Clock className="mb-2 h-6 w-6 text-green-400" />
                    <h4 className="mb-2 font-medium">Timeline</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Start Date:</span>
                        <span>Apr 1</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Due Date:</span>
                        <span>Apr 15</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-gray-700">
                        <div className="h-full w-1/4 rounded-full bg-green-400" />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-green-500/20 bg-gray-800/50 p-4">
                    <GitBranch className="mb-2 h-6 w-6 text-green-400" />
                    <h4 className="mb-2 font-medium">Dependencies</h4>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">
                        • API Gateway Setup
                      </p>
                      <p className="text-sm text-gray-400">• Database Schema</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg border border-green-500/20 bg-gray-800/50 p-4">
                    <Target className="mb-2 h-6 w-6 text-green-400" />
                    <h4 className="mb-1 font-medium">Story Points</h4>
                    <p className="text-2xl font-bold text-green-400">15</p>
                  </div>
                  <div className="rounded-lg border border-green-500/20 bg-gray-800/50 p-4">
                    <Users className="mb-2 h-6 w-6 text-green-400" />
                    <h4 className="mb-1 font-medium">Team Size</h4>
                    <p className="text-2xl font-bold text-green-400">3</p>
                  </div>
                  <div className="rounded-lg border border-green-500/20 bg-gray-800/50 p-4">
                    <BarChart className="mb-2 h-6 w-6 text-green-400" />
                    <h4 className="mb-1 font-medium">Progress</h4>
                    <p className="text-2xl font-bold text-green-400">25%</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 z-50 -translate-x-12 -translate-y-1/2 cursor-pointer rounded-full bg-gray-800/50 p-2 transition-colors hover:bg-gray-800"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 z-50 -translate-y-1/2 translate-x-12 cursor-pointer rounded-full bg-gray-800/50 p-2 transition-colors hover:bg-gray-800"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="absolute -bottom-12 left-1/2 flex -translate-x-1/2 gap-2">
          {carouselFeatures.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setAutoCycle(false);
                setCurrentFeatureIndex(index);
              }}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentFeatureIndex === index
                  ? "bg-purple-400"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  export default CarouselContent;