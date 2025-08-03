import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, BookOpen, Users, Rocket, Code, X } from "lucide-react";
import type { Project } from "@shared/schema";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [projectCode, setProjectCode] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");
  const [isProjectComplete, setIsProjectComplete] = useState(false);

  const startProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setActiveProject(project);
      setProjectCode(project.starterCode);
      closeModal();
    }
  };

  const exitProject = () => {
    setActiveProject(null);
    setProjectCode("");
    setPreviewHtml("");
    setIsProjectComplete(false);
  };

  const runCode = () => {
    // For HTML projects, we can directly set the preview
    if (activeProject?.technologies.includes("HTML")) {
      setPreviewHtml(projectCode);
      checkProjectCompletion();
    } else {
      // For JavaScript-only projects, create a simple HTML wrapper
      const htmlWrapper = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Project Preview</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .output { background: #f5f5f5; padding: 10px; border-radius: 5px; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div id="output" class="output">
            <h3>JavaScript Output:</h3>
            <div id="result"></div>
          </div>
          <script>
            try {
              // Capture console.log output
              const originalLog = console.log;
              const output = [];
              console.log = function(...args) {
                output.push(args.join(' '));
                originalLog.apply(console, arguments);
              };
              
              ${projectCode}
              
              // Display output
              document.getElementById('result').innerHTML = output.length > 0 ? 
                output.map(line => '<div>' + line + '</div>').join('') : 
                '<div>Code executed successfully!</div>';
                
              console.log = originalLog;
            } catch (error) {
              document.getElementById('result').innerHTML = '<div style="color: red;">Error: ' + error.message + '</div>';
            }
          </script>
        </body>
        </html>
      `;
      setPreviewHtml(htmlWrapper);
      checkProjectCompletion();
    }
  };

  const checkProjectCompletion = () => {
    if (!activeProject) return;
    
    // Simple completion check based on project requirements
    const codeLength = projectCode.trim().length;
    const hasRequiredElements = activeProject.technologies.some(tech => 
      projectCode.toLowerCase().includes(tech.toLowerCase())
    );
    
    // Mark as complete if code has content and includes required technologies
    const isComplete = codeLength > 50 && hasRequiredElements;
    setIsProjectComplete(isComplete);
    
    if (isComplete) {
      setTimeout(() => {
        alert("🎉 Congratulations! Your project looks complete!\n\nYou've successfully:\n• " + 
              activeProject.objectives.slice(0, 3).join('\n• ') + 
              "\n\nKeep practicing with more projects to improve your skills!");
      }, 1000);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Absolute Beginner":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          border: "border-green-200"
        };
      case "Basic Concepts":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          border: "border-blue-200"
        };
      case "First Functions":
        return {
          bg: "bg-purple-100",
          text: "text-purple-800",
          border: "border-purple-200"
        };
      case "Simple Projects":
        return {
          bg: "bg-orange-100",
          text: "text-orange-800",
          border: "border-orange-200"
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          border: "border-gray-200"
        };
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < difficulty ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const getTechColor = (tech: string) => {
    const colors = {
      "HTML": "bg-blue-100 text-blue-800",
      "CSS": "bg-purple-100 text-purple-800", 
      "JavaScript": "bg-green-100 text-green-800",
      "Functions": "bg-green-100 text-green-800",
      "Math": "bg-orange-100 text-orange-800",
      "Logic": "bg-red-100 text-red-800",
      "Arrays": "bg-yellow-100 text-yellow-800",
      "Loops": "bg-red-100 text-red-800",
      "Game Logic": "bg-green-100 text-green-800",
      "Interaction": "bg-purple-100 text-purple-800"
    };
    return colors[tech as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Beginner Projects</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Build real applications with step-by-step guidance designed for absolute beginners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => {
            const levelColors = getLevelColor(project.level);
            const isAvailable = project.level === "Absolute Beginner" || project.prerequisiteIds?.length === 0;
            
            return (
              <div 
                key={project.id}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col ${
                  !isAvailable ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${levelColors.bg} ${levelColors.text} text-xs font-medium px-3 py-1 rounded-full`}>
                    {project.level}
                  </div>
                  <div className="flex space-x-1">
                    {getDifficultyStars(project.difficulty)}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">{project.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{project.description}</p>
                
                <div className="space-y-2 mb-4">
                  {project.objectives.slice(0, 3).map((objective, index) => (
                    <div key={index} className="flex items-center text-sm text-slate-600">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        project.level === "Absolute Beginner" ? 'bg-green-500' :
                        project.level === "Basic Concepts" ? 'bg-blue-500' :
                        project.level === "First Functions" ? 'bg-purple-500' :
                        'bg-orange-500'
                      }`}></div>
                      {objective}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className={`text-xs px-2 py-1 rounded ${getTechColor(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => isAvailable && openProjectModal(project)}
                  disabled={!isAvailable}
                  className={`w-full py-2 rounded-lg font-medium transition-colors mt-auto ${
                    isAvailable
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isAvailable ? "Start Project" : "Complete Prerequisites"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Beginner Help Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Need Help Getting Started?</h3>
            <p className="text-slate-600">Every expert was once a beginner. Here's how to approach these projects:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Read the Instructions</h4>
              <p className="text-sm text-slate-600">Each project comes with step-by-step instructions and examples.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Use the Hints</h4>
              <p className="text-sm text-slate-600">Stuck? Click the hint button for guidance and code examples.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Practice & Experiment</h4>
              <p className="text-sm text-slate-600">Try different variations and see what happens. Learning by doing!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-full overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">{selectedProject.title}</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Project Level: {selectedProject.level}
                  </h3>
                  <p className="text-blue-800">{selectedProject.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">What You'll Learn:</h3>
                  <ul className="space-y-2">
                    {selectedProject.objectives.map((objective, index) => (
                      <li key={index} className="flex items-center text-slate-700">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Step-by-Step Guide:</h3>
                  <ol className="space-y-2">
                    {selectedProject.steps.map((step, index) => (
                      <li key={index} className="flex items-start text-slate-700">
                        <span className="bg-teal-100 text-teal-800 text-sm font-semibold px-2 py-1 rounded mr-3 flex-shrink-0">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Starter Code:</h3>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{selectedProject.starterCode}</code>
                  </pre>
                </div>
                
                <div className="flex space-x-4">
                  <button 
                    onClick={() => startProject(selectedProject.id)}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Start Coding
                  </button>
                  <button 
                    onClick={closeModal}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Editor */}
      {activeProject && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col h-screen">
          {/* Project Editor Header */}
          <div className="bg-slate-800 text-white p-4 flex justify-between items-center flex-shrink-0">
            <div>
              <h2 className="text-xl font-bold">{activeProject.title}</h2>
              <p className="text-slate-300 text-sm">{activeProject.level} Project</p>
            </div>
            <button 
              onClick={exitProject}
              className="bg-slate-600 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <X className="h-4 w-4 mr-2" />
              Exit Project
            </button>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 min-h-0">
            {/* Instructions Panel */}
            <div className="bg-gray-50 border-r border-gray-200 flex flex-col min-h-0">
              <div className="p-4 overflow-y-auto flex-1">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Project Description</h3>
                    <p className="text-slate-700 text-sm">{activeProject.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">What You'll Learn</h3>
                    <ul className="space-y-1">
                      {activeProject.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start text-slate-700 text-sm">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2 mt-1.5 flex-shrink-0"></div>
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Step-by-Step Instructions</h3>
                    <ol className="space-y-2">
                      {activeProject.steps.map((step, index) => (
                        <li key={index} className="flex items-start text-slate-700 text-sm">
                          <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-1.5 py-0.5 rounded mr-2 flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Technologies Used</h3>
                    <div className="flex flex-wrap gap-1">
                      {activeProject.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getTechColor(tech)}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {isProjectComplete && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <h4 className="text-green-800 font-semibold text-sm mb-1">🎉 Project Complete!</h4>
                      <p className="text-green-700 text-xs">Great work! You've successfully completed this project.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Code Editor Panel */}
            <div className="bg-white border-r border-gray-200 flex flex-col min-h-0">
              <div className="p-4 flex flex-col h-full min-h-0">
                <div className="mb-3 flex-shrink-0">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Your Code</h3>
                  <div className="text-xs text-slate-600">
                    Edit your code below and click "Run Code" to see the result.
                  </div>
                </div>
                
                <div className="flex-1 min-h-0 mb-3">
                  <textarea 
                    value={projectCode}
                    onChange={(e) => setProjectCode(e.target.value)}
                    className="w-full h-full font-mono text-xs border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                    placeholder="Start coding your project here..."
                  />
                </div>

                <div className="flex space-x-2 flex-shrink-0">
                  <button 
                    onClick={runCode}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors text-xs"
                  >
                    Run Code
                  </button>
                  <button 
                    onClick={() => {
                      setProjectCode(activeProject?.starterCode || "");
                      setPreviewHtml("");
                      setIsProjectComplete(false);
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg font-medium transition-colors text-xs"
                  >
                    Reset
                  </button>
                  <button 
                    onClick={() => {
                      alert("Hint: Try following the step-by-step instructions on the left!\n\nRemember to read through each step carefully and test your code as you go. If you're stuck, look at the starter code and try to understand what each part does.");
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors text-xs"
                  >
                    Get Hint
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="bg-white flex flex-col min-h-0">
              <div className="p-4 flex flex-col h-full min-h-0">
                <div className="mb-3 flex-shrink-0">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Live Preview</h3>
                  <div className="text-xs text-slate-600">
                    Your project will appear here when you run your code.
                  </div>
                </div>
                
                <div className="flex-1 min-h-0 border border-gray-300 rounded-lg overflow-hidden">
                  {previewHtml ? (
                    <iframe 
                      srcDoc={previewHtml}
                      className="w-full h-full border-0"
                      title="Project Preview"
                      sandbox="allow-scripts"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-50 text-gray-500 text-sm">
                      Click "Run Code" to see your project preview
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
