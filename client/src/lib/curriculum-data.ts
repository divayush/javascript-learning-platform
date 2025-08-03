// Static curriculum data for beginner learning levels
export const curriculumLevels = [
  {
    level: 1,
    title: "Absolute Beginner",
    description: "Your first steps into programming",
    totalLessons: 8,
    modules: [
      "What is JavaScript?",
      "Your First Code",
      "Variables and Values", 
      "Numbers and Text",
      "Basic Operations",
      "Storing Information",
      "Displaying Results",
      "Practice Exercises"
    ]
  },
  {
    level: 2,
    title: "Basic Concepts", 
    description: "Making decisions in code",
    totalLessons: 6,
    modules: [
      "If and Else Statements",
      "Comparing Values",
      "True and False Logic",
      "Multiple Conditions",
      "Logical Operators",
      "Decision Making Practice"
    ]
  },
  {
    level: 3,
    title: "First Functions",
    description: "Creating reusable code blocks", 
    totalLessons: 7,
    modules: [
      "What are Functions?",
      "Creating Your First Function",
      "Function Parameters",
      "Return Values",
      "Function Scope",
      "Built-in Functions",
      "Function Practice"
    ]
  },
  {
    level: 4,
    title: "Simple Projects",
    description: "Build your first applications",
    totalLessons: 5,
    modules: [
      "Interactive Greeting",
      "Simple Calculator", 
      "Number Guessing Game",
      "To-Do List Basics",
      "Final Project"
    ]
  }
];

export const progressData = {
  // Clean slate - no fake progress data
  completedLessons: 0,
  totalLessons: curriculumLevels.reduce((total, level) => total + level.totalLessons, 0),
  currentLevel: 1,
  unlockedLevels: [1], // Only level 1 is unlocked initially
};
