import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Course {
  code: string;
  title: string;
}

interface CourseData {
  CS: Course[];
  Econ: Course[];
  Math: Course[];
  Other: Course[];
}

// Course data organized by category
const courseData: CourseData = {
  CS: [
    { code: 'CS 188', title: 'Introduction to Artificial Intelligence' },
    { code: 'CS 186', title: 'Introduction to Database Systems' },
    { code: 'CS 170', title: 'Efficient Algorithms' },
    { code: 'CS 161', title: 'Computer Security' },
    { code: 'CS 70', title: 'Discrete Math & Probability' },
    { code: 'CS 61C', title: 'Machine Architecture' },
    { code: 'CS 61B', title: 'Data Structures' },
    { code: 'CS 61A', title: 'Structure & Interpretation' },
  ],
  Econ: [
    { code: 'ECON 155', title: 'Urban Economics' },
    { code: 'ECON 140', title: 'Econometrics' },
    { code: 'ECON 139', title: 'Asset Pricing & Portfolio Theory' },
    { code: 'ECON 136', title: 'Financial Economics' },
    { code: 'ECON 101B', title: 'Macroeconomics (Quantitative)' },
    { code: 'ECON 100A', title: 'Microeconomics' },
    { code: 'ECON 2', title: 'Introduction to Economics (Quantitative)' },
  ],
  Math: [
    { code: 'MATH 53', title: 'Multivariable Calculus' },
    { code: 'MATH 1B', title: 'Single Variable Calculus 2' },
    { code: 'EECS 16A', title: 'Linear Algebra' },
  ],
  Other: [
    { code: 'DATA C100', title: 'Principles & Techniques of Data Science' },
    { code: 'DATA 8', title: 'Foundations of Data Science' },
    { code: 'STAT 20', title: 'Introduction to Statistics' },
    { code: 'UGBA 88', title: 'Data and Decisions' },
    { code: 'UGBA 10', title: 'Introduction to Business' },
  ],
};

interface Tab {
  id: keyof CourseData;
  label: string;
}

// Tab configuration
const tabs: Tab[] = [
  { id: 'CS', label: 'Computer Science' },
  { id: 'Econ', label: 'Economics' },
  { id: 'Math', label: 'Mathematics' },
  { id: 'Other', label: 'Other' },
];

const Coursework: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof CourseData>('CS');

  return (
    <section id="coursework" className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-xl font-bold mb-12 text-left text-gray-900 dark:text-white">
        [ Coursework ]
      </h2>

      {/* Tab Navigation */}
      <div className="flex flex-row mb-8 border-b border-gray-200 dark:border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-lg font-mono transition-colors border-b-2 flex-1 text-left ${
              activeTab === tab.id
                ? 'text-black dark:text-white border-black dark:border-white font-bold'
                : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-black dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Course List - Fixed height based on CS tab (longest) */}
      <div className="min-h-[480px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {courseData[activeTab].map((course, index) => (
              <motion.div
                key={`${activeTab}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ 
                  delay: index * 0.05, 
                  duration: 0.2,
                  exit: { delay: (courseData[activeTab].length - 1 - index) * 0.03 }
                }}
                className="flex items-start gap-4 py-2"
              >
                {/* Course Code */}
                <span className="font-bold text-gray-900 dark:text-white font-mono text-lg flex-shrink-0 min-w-[120px]">
                  {course.code}
                </span>
                {/* Course Title */}
                <span className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {course.title}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Coursework;
