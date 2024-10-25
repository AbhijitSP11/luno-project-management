"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Sparkles,
  Brain,
  LineChart,
  Calendar,
  ArrowRight,
  Terminal,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import AsterAIPreview from '@/components/AsterAIPreview';
import Link from 'next/link';

const boardData = {
  todo: [
    { id: 1, title: "Research competitors", priority: "high", assignee: "Alex K.", dueDate: "Mar 28" },
    { id: 2, title: "Design system update", priority: "medium", assignee: "Sarah M.", dueDate: "Mar 30" }
  ],
  inProgress: [
    { id: 3, title: "User interviews", priority: "high", assignee: "Mike R.", dueDate: "Mar 29" },
    { id: 4, title: "API integration", priority: "medium", assignee: "Lisa T.", dueDate: "Apr 1" }
  ],
  review: [
    { id: 5, title: "Landing page copy", priority: "low", assignee: "John D.", dueDate: "Mar 31" }
  ],
  completed: [
    { id: 6, title: "Brand guidelines", priority: "high", assignee: "Emma S.", dueDate: "Mar 27" }
  ]
};
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};


const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            x: [-200, 0, -200],
            y: [-200, 0, -200],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl"
          animate={{
            x: [200, 0, 200],
            y: [200, 0, 200],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-pink-500/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 17, repeat: Infinity }}
        />
      </div>

      {/* Rest of the content with improved contrast */}
      <div className="relative z-10">
        {/* Hero Section */}
        <header className="container mx-auto px-4 py-20">
          <nav className="flex justify-between items-center mb-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Aster AI
            </div>
            <Link href="api/auth/signin">
              <button 
                  className="px-6 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg 
                border border-purple-500/50 transition-all text-white"              >
                Login
              </button>
            </Link>
          </nav>

          {/* Enhanced Hero Content */}
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <motion.div className="inline-flex items-center px-4 py-2 bg-purple-500/10 rounded-full text-purple-300 text-sm mb-8 border border-purple-500/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Next-Gen Project Management
            </motion.div>

            <motion.h1 className="text-6xl font-bold mb-6 leading-tight text-white">
              Manage Projects with{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AI Superpowers
              </span>
            </motion.h1>

            <motion.p className="text-xl text-gray-300 mb-12">
              Experience lightning-fast project management with AI assistance. Built for modern teams.
            </motion.p>

            <motion.button
              className="px-8 py-4 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center text-lg text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Aster Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
        </header>

        {/* Board View Preview Section */}
        <motion.section
          className="container mx-auto px-4 py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Visual Task Management</h2>
            <p className="text-gray-300">Drag and drop tasks between columns with ease</p>
          </div>

          <div className="bg-gray-900/50 rounded-2xl p-8 border border-purple-500/20 backdrop-blur-xl">
            <div className="grid grid-cols-4 gap-6">
              {Object.entries(boardData).map(([column, tasks]) => (
                <div key={column} className="bg-gray-900/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    {column === 'todo' && <Clock className="w-5 h-5 text-blue-400" />}
                    {column === 'inProgress' && <Terminal className="w-5 h-5 text-yellow-400" />}
                    {column === 'review' && <AlertCircle className="w-5 h-5 text-purple-400" />}
                    {column === 'completed' && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                    <h3 className="font-semibold text-white capitalize">
                      {column.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <span className="ml-auto bg-gray-800 px-2 py-1 rounded-full text-xs text-gray-400">
                      {tasks.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {tasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-800 p-4 rounded-lg border border-gray-700/50 hover:border-purple-500/30 transition-all cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-white">{task.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                            task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>{task.assignee}</span>
                          <span>{task.dueDate}</span>
                        </div>
                        <motion.div
                          className="absolute inset-0 border-2 border-purple-500/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          layoutId={`task-border-${task.id}`}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* AI Assistant Section (Previous enhanced version remains the same) */}
        <AsterAIPreview />

        {/* Features Grid (Previous version with improved colors) */}
        <motion.section
          className="container mx-auto px-4 py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Everything You Need</h2>
            <p className="text-gray-300">Streamlined project management with powerful AI assistance</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Brain className="w-6 h-6" />,
                title: "AI Task Management",
                desc: "Automatically organize, prioritize, and track tasks"
              },
              {
                icon: <LineChart className="w-6 h-6" />,
                title: "Smart Analytics",
                desc: "AI-powered insights and project predictions"
              },
              {
                icon: <Calendar className="w-6 h-6" />,
                title: "Intelligent Scheduling",
                desc: "Optimize meeting times and project deadlines"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="group p-6 bg-gray-900/50 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Final CTA Section */}
        <motion.section
          className="container mx-auto px-4 py-24 text-center relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto relative z-10">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl"
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="bg-gray-900/50 rounded-2xl p-12 border border-purple-500/20 backdrop-blur-xl">
              <h2 className="text-4xl font-bold mb-6 text-white">
                Ready to Transform Your Project Management?
              </h2>
              <p className="text-gray-300 mb-8">
                Join thousands of teams using Aster to streamline their workflows
              </p>
              <motion.button
                className="px-8 py-4 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center text-lg text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default HomePage;