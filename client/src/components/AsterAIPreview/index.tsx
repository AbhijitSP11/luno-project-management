"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {CheckCircle2, Brain, Terminal, Wand2, Sparkles, User} from "lucide-react";
import TypingAnimation from "../ui/typingAnimation";
import TaskTable from "../Table";
import { initialTasks } from "@/constants/constants";
import NewTaskCard from "../NewTaskCard";
import CarouselContent from "../CarouselContent";

const AsterAIPreview = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showResponse, setShowResponse] = useState<boolean>(false);
  const [responseText] = useState<string>("");

  const userQuery = "Provide me details of ongoing tasks in Project Apollo.";
  const newTaskQuery =
    "Create a new task for implementing the authentication system.";

  const handleScrollIntoView = () => {
    setLoading(true);
    setShowResponse(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const InitialFeatures = () => (
    <div className="mb-12 border-b border-gray-700 pb-8">
      <h2 className="mb-6 text-2xl font-semibold text-purple-400">Features</h2>
      <div className="space-y-4">
        {[
          {
            icon: <Brain className="h-7 w-7 text-purple-400" />,
            title: "Context-Aware Assistance",
            desc: "Get instant answers about your projects, tasks, and team availability",
          },
          {
            icon: <Terminal className="h-7 w-7 text-purple-400" />,
            title: "Natural Language Commands",
            desc: "Create tasks, schedule meetings, and generate reports using simple text",
          },
          {
            icon: <Wand2 className="h-7 w-7 text-purple-400" />,
            title: "Smart Automations",
            desc: "Let AI handle routine tasks and provide intelligent suggestions",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
              {feature.icon}
            </div>
            <div>
              <h3 className="mb-1 text-lg font-semibold">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );


  return (
    <motion.section
      className="container mx-auto px-4 py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={handleScrollIntoView}
    >
      <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gray-900 p-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Column - Features */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-purple-400" />
              <h2 className="text-4xl font-semibold">Meet Aster AI</h2>
            </div>

            <InitialFeatures />
            <CarouselContent />

            <motion.button
              className="z-50 mt-6 inline-flex items-center rounded-lg bg-purple-600 px-6 py-3 text-base transition-colors hover:bg-purple-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Aster AI Now
              <motion.span
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </motion.button>
          </div>

          {/* Right Column - Interactive Chat Demo */}
          <div className="rounded-xl border border-purple-500/20 bg-gray-950 p-6">
            <div className="space-y-4">
              {/* Chat Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-green-400" />
                  <span className="text-sm text-gray-400">
                    Aster AI is ready to assist
                  </span>
                </div>
              </div>
              {/* User Query with Typing Animation */}
              <motion.div
                className="flex items-start justify-end gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="max-w-[80%] flex-1 rounded-lg bg-gray-900 p-4">
                  <TypingAnimation text={userQuery} />
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20">
                  <User className="h-5 w-5 text-purple-400" />
                </div>
              </motion.div>
              {/* AI Response with Typing Animation */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="max-w-[80%] flex-1 rounded-lg bg-purple-500/10 p-4 text-purple-200">
                    <TypingAnimation text={responseText} />
                    <TaskTable tasks={initialTasks} />
                  </div>
                </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20">
                  <Brain className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1 rounded-lg bg-blue-500/10 p-4 text-blue-200">
                  <TypingAnimation text="Use the summarize feature to generate a detailed task summary." />
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex-1 rounded-lg bg-gray-900 p-4">
                  <TypingAnimation text={newTaskQuery} />
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20">
                  <User className="h-5 w-5 text-purple-400" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 rounded-lg bg-green-500/10 p-4 text-green-200"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                      <span>Task created successfully!</span>
                    </div>
                    <NewTaskCard />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="rounded-lg bg-purple-500/10 p-4 text-purple-200"
                  >
                    <TypingAnimation text="I've created the authentication system task and assigned it to David. The task has been prioritized for the next sprint. Would you like me to set up any dependencies or add more details to this task?" />
                  </motion.div>
                </div>
              </motion.div>

              {showResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 3 }}
                  className="mt-4 flex items-center justify-center gap-2"
                >
                  <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 font-medium text-green-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                    Tasks loaded successfully! 🎉
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/5 to-blue-500/5"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.div
          className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-purple-500/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </motion.section>
  );
};

export default AsterAIPreview;
