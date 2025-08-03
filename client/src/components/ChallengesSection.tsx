import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, HelpCircle, RotateCcw, Lightbulb, Target, Filter } from "lucide-react";
import type { Challenge } from "@shared/schema";

export default function ChallengesSection() {
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const { data: allChallenges = [], isLoading } = useQuery<Challenge[]>({
    queryKey: ["/api/challenges"],
  });

  // Filter challenges by selected level
  const challenges = selectedLevel 
    ? allChallenges.filter(challenge => challenge.level === selectedLevel)
    : allChallenges;

  // Listen for level filter events from Learning Levels component
  useEffect(() => {
    const handleLevelFilter = (event: CustomEvent) => {
      const level = event.detail.level;
      setSelectedLevel(level);
      setActiveChallenge(0); // Reset to first challenge of the level
    };

    window.addEventListener('filterByLevel', handleLevelFilter as EventListener);
    return () => window.removeEventListener('filterByLevel', handleLevelFilter as EventListener);
  }, []);

  const currentChallenge = challenges[activeChallenge];

  const loadChallenge = (index: number) => {
    setActiveChallenge(index);
    setUserCode(challenges[index]?.starterCode || "");
    setResult(null);
  };

  // Update user code when challenges change (due to level filtering)
  useEffect(() => {
    if (challenges.length > 0 && challenges[activeChallenge]) {
      setUserCode(challenges[activeChallenge].starterCode || "");
      setResult(null);
    }
  }, [challenges, activeChallenge]);

  const checkSolution = () => {
    if (!currentChallenge) return;
    
    const userCodeTrimmed = userCode.trim().toLowerCase().replace(/\s/g, '');
    const solutionTrimmed = currentChallenge.solution.toLowerCase().replace(/\s/g, '');
    
    const isCorrect = userCodeTrimmed.includes(solutionTrimmed);
    
    if (isCorrect) {
      setResult({
        type: 'success',
        message: 'Excellent work! Your solution is correct. Ready for the next challenge?'
      });
    } else {
      setResult({
        type: 'error',
        message: 'Not quite right. Try again or click the hint button for help!'
      });
    }
  };

  const showHint = () => {
    if (!currentChallenge) return;
    alert(`Hint: ${currentChallenge.hint}\n\nTry typing this code and see what happens!`);
    
    // Optionally pre-fill some of the solution
    if (userCode.trim() === '' || userCode === currentChallenge.starterCode) {
      const firstLine = currentChallenge.solution.split('\n')[0];
      setUserCode(firstLine + '\n// Complete the rest...');
    }
  };

  const resetChallenge = () => {
    if (currentChallenge) {
      setUserCode(currentChallenge.starterCode);
      setResult(null);
    }
  };

  if (isLoading) {
    return (
      <section id="challenges" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading challenges...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!challenges.length) {
    return (
      <section id="challenges" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-600">No challenges available yet.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="challenges" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Progressive Learning Challenges</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Over 60+ carefully designed challenges that teach you JavaScript step-by-step. 
            Each challenge builds on previous knowledge with clear explanations, hints, and hands-on practice.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 max-w-2xl mx-auto">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="text-green-600 font-semibold text-sm">Level 1</div>
              <div className="text-green-800 text-xs">30 Challenges</div>
              <div className="text-green-600 text-xs">Absolute Beginner</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="text-blue-600 font-semibold text-sm">Level 2</div>
              <div className="text-blue-800 text-xs">15 Challenges</div>
              <div className="text-blue-600 text-xs">Basic Concepts</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
              <div className="text-purple-600 font-semibold text-sm">Level 3</div>
              <div className="text-purple-800 text-xs">15 Challenges</div>
              <div className="text-purple-600 text-xs">First Functions</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <div className="text-orange-600 font-semibold text-sm">Level 4</div>
              <div className="text-orange-800 text-xs">10 Challenges</div>
              <div className="text-orange-600 text-xs">Arrays & Objects</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Level Filter */}
          <div className="bg-slate-100 px-6 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-700">Filter by Level:</span>
                <select 
                  value={selectedLevel || ''} 
                  onChange={(e) => {
                    const level = e.target.value ? parseInt(e.target.value) : null;
                    setSelectedLevel(level);
                    setActiveChallenge(0);
                  }}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">All Levels ({allChallenges.length} challenges)</option>
                  <option value="1">Level 1: Absolute Beginner ({allChallenges.filter(c => c.level === 1).length} challenges)</option>
                  <option value="2">Level 2: Basic Concepts ({allChallenges.filter(c => c.level === 2).length} challenges)</option>
                  <option value="3">Level 3: First Functions ({allChallenges.filter(c => c.level === 3).length} challenges)</option>
                  <option value="4">Level 4: Arrays & Objects ({allChallenges.filter(c => c.level === 4).length} challenges)</option>
                </select>
              </div>
              <div className="text-sm text-slate-600">
                {selectedLevel ? `Level ${selectedLevel}` : 'All Levels'} • {challenges.length} challenge{challenges.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Challenge Selector */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
              {challenges.map((challenge, index) => (
                <button 
                  key={challenge.id}
                  onClick={() => loadChallenge(index)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeChallenge === index
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}. {challenge.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Challenge Description */}
            <div className="p-6 border-r border-gray-200">
              {currentChallenge && (
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      Challenge {activeChallenge + 1}: {currentChallenge.title}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      {currentChallenge.description}
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">What you need to do:</h4>
                      <p className="text-blue-800 text-sm">
                        {currentChallenge.instructions}
                      </p>
                    </div>
                  </div>

                  {/* Step-by-step hints */}
                  <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Hint
                      </h4>
                      <p className="text-yellow-800 text-sm">
                        {currentChallenge.hint}
                      </p>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                        <Target className="h-4 w-4 mr-2" />
                        Expected Output
                      </h4>
                      <p className="text-green-800 text-sm font-mono bg-green-100 p-2 rounded">
                        {currentChallenge.expectedOutput}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Challenge Editor */}
            <div className="p-6">
              <div className="mb-4">
                <h4 className="font-semibold text-slate-900 mb-2">Your Code:</h4>
                <textarea 
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-32 font-mono text-sm border border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="// Write your code here..."
                />
              </div>

              <div className="flex space-x-3 mb-4">
                <button 
                  onClick={checkSolution}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Check Solution
                </button>
                <button 
                  onClick={showHint}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Show Hint
                </button>
                <button 
                  onClick={resetChallenge}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </button>
              </div>

              {/* Challenge Result */}
              {result && (
                <div className={`p-4 rounded-lg border ${
                  result.type === 'success' 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <div className="flex items-center">
                    {result.type === 'success' ? (
                      <Check className="h-5 w-5 text-green-600 mr-3" />
                    ) : (
                      <HelpCircle className="h-5 w-5 text-yellow-600 mr-3" />
                    )}
                    <div>
                      <h4 className={`font-semibold ${
                        result.type === 'success' ? 'text-green-900' : 'text-yellow-900'
                      }`}>
                        {result.type === 'success' ? 'Excellent work!' : 'Not quite right'}
                      </h4>
                      <p className={`text-sm ${
                        result.type === 'success' ? 'text-green-800' : 'text-yellow-800'
                      }`}>
                        {result.message}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress indicator */}
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">Challenge Progress</span>
                  <span className="text-sm text-slate-600">
                    {activeChallenge + 1} of {challenges.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((activeChallenge + 1) / challenges.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
