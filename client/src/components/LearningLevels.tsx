import { Sprout, Route, Settings, Rocket, Lock } from "lucide-react";

export default function LearningLevels() {
  const levels = [
    {
      id: 1,
      title: "Level 1: Absolute Beginner",
      description: "Your first steps into programming",
      icon: Sprout,
      color: "green",
      gradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      progressColor: "bg-green-500",
      buttonColor: "bg-green-600 hover:bg-green-700",
      totalLessons: 30,
      completedLessons: 0,
      isUnlocked: true,
      lessons: [
        "What is JavaScript?",
        "Hello World Program",
        "Variables and Values",
        "Basic Math Operations",
        "Working with Text",
        "Building Sentences",
        "Personal Introduction Challenge"
      ]
    },
    {
      id: 2,
      title: "Level 2: Basic Concepts",
      description: "Making decisions in code",
      icon: Route,
      color: "blue",
      gradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      progressColor: "bg-blue-500",
      buttonColor: "bg-gray-300",
      buttonText: "text-gray-500",
      totalLessons: 15,
      completedLessons: 0,
      isUnlocked: false,
      lessons: [
        "If and Else Statements",
        "Comparing Values",
        "Logical Operators",
        "Grade Calculator",
        "BMI Calculator",
        "Rock Paper Scissors Logic"
      ]
    },
    {
      id: 3,
      title: "Level 3: First Functions",
      description: "Creating reusable code blocks",
      icon: Settings,
      color: "purple",
      gradient: "from-purple-50 to-violet-50",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      progressColor: "bg-purple-500",
      buttonColor: "bg-gray-300",
      buttonText: "text-gray-500",
      totalLessons: 15,
      completedLessons: 0,
      isUnlocked: false,
      lessons: [
        "What are Functions?",
        "Creating Your First Function",
        "Function Parameters",
        "Return Values",
        "Calculator Functions",
        "Temperature Converter",
        "Text Processing Functions"
      ]
    },
    {
      id: 4,
      title: "Level 4: Arrays & Objects",
      description: "Working with data collections",
      icon: Rocket,
      color: "orange",
      gradient: "from-orange-50 to-amber-50",
      borderColor: "border-orange-200",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      progressColor: "bg-orange-500",
      buttonColor: "bg-gray-300",
      buttonText: "text-gray-500",
      totalLessons: 10,
      completedLessons: 0,
      isUnlocked: false,
      lessons: [
        "Introduction to Arrays",
        "Array Methods",
        "Working with Objects",
        "Object Methods",
        "Student Grade Book",
        "Shopping Cart Project"
      ]
    }
  ];

  const startLevel = (levelId: number) => {
    // Scroll to challenges section
    const challengesSection = document.getElementById('challenges');
    if (challengesSection) {
      challengesSection.scrollIntoView({ behavior: 'smooth' });
      
      // Add a small delay to ensure scrolling completes, then trigger level filter
      setTimeout(() => {
        // Dispatch a custom event to notify the challenges component
        window.dispatchEvent(new CustomEvent('filterByLevel', { detail: { level: levelId } }));
      }, 500);
    }
  };

  return (
    <section id="levels" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Beginner Learning Path</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Master JavaScript fundamentals through four carefully designed levels, each building on the previous one
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {levels.map((level) => {
            const IconComponent = level.icon;
            const progressPercentage = (level.completedLessons / level.totalLessons) * 100;
            
            return (
              <div 
                key={level.id}
                className={`bg-gradient-to-br ${level.gradient} rounded-2xl p-8 border ${level.borderColor} ${level.isUnlocked ? '' : 'opacity-60'}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{level.title}</h3>
                    <p className="text-slate-600">{level.description}</p>
                  </div>
                  <div className={`${level.iconBg} rounded-full p-3`}>
                    <IconComponent className={`h-8 w-8 ${level.iconColor}`} />
                  </div>
                </div>
                
                {/* Clean progress bar - starts at 0% */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700">Progress</span>
                    <span className="text-sm text-slate-600">
                      {level.completedLessons}/{level.totalLessons} lessons
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`${level.progressColor} h-3 rounded-full transition-all duration-300`}
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {level.lessons.map((lesson, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3 flex items-center justify-center">
                        {level.isUnlocked ? (
                          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        ) : (
                          <Lock className="h-3 w-3 text-gray-400" />
                        )}
                      </div>
                      <span className={level.isUnlocked ? "text-slate-700" : "text-slate-500"}>
                        {lesson}
                      </span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => level.isUnlocked && startLevel(level.id)}
                  disabled={!level.isUnlocked}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    level.isUnlocked 
                      ? level.buttonColor + " text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {level.isUnlocked 
                    ? `Start Level ${level.id}`
                    : `Complete Level ${level.id - 1} First`
                  }
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
