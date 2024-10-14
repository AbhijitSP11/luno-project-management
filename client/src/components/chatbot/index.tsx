import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Home, ChevronLeft, CheckSquare, PlusCircle, BarChart2, Sparkles } from 'lucide-react';
import { Input } from '@/UI/input';
import { Button } from '@/UI/button';
import { useTheme } from 'next-themes';
import { useGroqChatMutation } from '@/state/api';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { addMessageToChat } from '@/state/chatSlice';

const ChatBot = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const messages = useAppSelector((state) => state.chat.messages);

  const [sendMessage, { isLoading }] = useGroqChatMutation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [inputText, setInputText] = useState<string>('');

  const toggleChat = () => setIsOpen(!isOpen);

  const menuOptions = [
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, subOptions: [
      'Ask about your current tasks',
      'Tasks according to priority (urgent tasks)',
      'Tasks completed',
      'Comments, attachments and description related to a task'
    ]},
    { id: 'create', label: 'Create', icon: PlusCircle, subOptions: [
      'Create Task',
      'Create Project Board'
    ]},
    { id: 'summarize', label: 'Summarize', icon: BarChart2, subOptions: [
      'Timeline of a project',
      'Tasks assigned to users in a team'
    ]}
  ];

  const renderContent = () => {
    if (currentSection === 'home') {
      return (
        <>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-200 dark:bg-blue-700 rounded-full animate-pulse"></div>
              <div className="relative p-2 bg-white dark:bg-dark-secondary rounded-full border-2 border-blue-500">
                <Sparkles className="size-4 text-blue-500" />
              </div>
            </div>
            <div className='w-full flex flex-col gap-2 border dark:border-gray-500 p-2 rounded-md'>
              <h2 className="text-base font-semibold dark:text-gray-50">Ask AI</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">How can I assist you today?</p>
            </div>
          </div>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
            Select an option below or type your question:
          </p>
          <div className="grid grid-cols-1 gap-3">
            {menuOptions.map(option => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.id}
                  onClick={() => setCurrentSection(option.id)}
                  className="flex items-center justify-start gap-3 font-normal text-left bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg p-3 
                  dark:bg-dark-secondary dark:text-gray-50 dark:border dark:border-gray-500 dark:hover:bg-gray-700"
                >
                  <Icon className="h-5 w-5" />
                  <span>{option.label}</span>
                </Button>
              );
            })}
          </div>
        </>
      );
    }

    const section = menuOptions.find(option => option.id === currentSection);
    return (
      <div className="space-y-3">
        {section && section.subOptions.map((subOption, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full text-left justify-start bg-white hover:bg-gray-100 text-gray-800 rounded-lg p-3 
            dark:bg-dark-secondary dark:text-gray-50"
            onClick={() => {/* Handle sub-option click */}}
          >
            {subOption}
          </Button>
        ))}
      </div>
    );
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    try {
      const response = await sendMessage({ message: inputText }).unwrap();
      dispatch(addMessageToChat({ role: 'user', content: inputText }));
      setInputText('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.3 }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }}
            className="dark:bg-dark-secondary bg-white shadow-xl w-[300px] md:w-[400px] h-[80vh] mb-2 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 rounded-t-xl dark:bg-dark-secondary bg-gray-50 border-b">
              <div className="flex items-center gap-3">
                {currentSection !== 'home' && (
                  <Button variant="ghost" size="icon" onClick={() => setCurrentSection('home')} className="p-1">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                )}
                <span className="flex items-center gap-2 font-semibold text-lg">
                  <p className="dark:text-gray-50 text-gray-800">Proto</p>
                  <p className="text-blue-500">AI</p>
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleChat} className="text-gray-500 dark:text-gray-50 hover:text-gray-700">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-dark-secondary dark:text-gray-50">
              {renderContent()}
              <div className="space-y-4 mt-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.role === 'bot' && (
                      <div className="rounded-full border border-blue-400 p-2">
                        <Sparkles className='size-4' />
                      </div>
                    )}
                    <div className={`p-4 rounded-lg border border-gray-300 dark:border-gray-600 ${message.role === 'user' ? 
                      'bg-blue-100 dark:bg-transparent ml-auto' : 'bg-gray-100 dark:bg-transparent'}`}>
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 dark:bg-dark-secondary bg-gray-50 border-t rounded-b-xl">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Input 
                  placeholder="Type your message..." 
                  className="flex-grow bg-white dark:bg-dark-secondary dark:text-gray-50" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage(e);
                    }
                  }}
                />
                <Button 
                  size="icon" 
                  className="bg-blue-700 hover:bg-blue-600 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!inputText.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="bg-blue-700 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>
    </div>
  );
  
};

export default ChatBot;