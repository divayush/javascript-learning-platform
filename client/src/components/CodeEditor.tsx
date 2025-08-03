import { useState } from "react";
import { Play, Trash2, Lightbulb, RotateCcw, AlertTriangle } from "lucide-react";

export default function CodeEditor() {
  const [code, setCode] = useState(`// Welcome to JavaScript!
// Try typing some code here:

console.log('Hello, World!');

// Create a variable
let myName = 'Your Name';
console.log('Hello, ' + myName);

// Try changing the name above and click Run!`);
  
  const [output, setOutput] = useState("// Ready to run your code...");
  const [showErrorHelp, setShowErrorHelp] = useState(false);

  const runCode = () => {
    setOutput("");
    setShowErrorHelp(false);
    
    // Create a mock console for output
    const logs: string[] = [];
    const mockConsole = {
      log: (...args: any[]) => {
        logs.push(args.join(" "));
      }
    };
    
    try {
      // Use Function constructor for safer evaluation
      const func = new Function("console", code);
      func(mockConsole);
      
      if (logs.length === 0) {
        setOutput("// Code executed successfully (no output)");
      } else {
        setOutput(logs.join("\n"));
      }
    } catch (error) {
      setOutput(`Error: ${(error as Error).message}`);
      setShowErrorHelp(true);
    }
  };

  const clearCode = () => {
    setCode("");
  };

  const clearOutput = () => {
    setOutput("// Ready to run your code...");
    setShowErrorHelp(false);
  };

  return (
    <section id="editor" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Interactive Code Editor</h2>
          <p className="text-xl text-slate-600">Practice JavaScript with our beginner-friendly code editor</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Code Input Panel */}
            <div className="border-r border-gray-200">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                  <Lightbulb className="h-5 w-5 text-teal-600 mr-2" />
                  JavaScript Code
                </h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={runCode}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Run
                  </button>
                  <button 
                    onClick={clearCode}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear
                  </button>
                </div>
              </div>
              <div className="p-6">
                <textarea 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 font-mono text-sm border border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="// Start coding here..."
                />
                
                {/* Beginner hints */}
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Beginner Tips:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Use <code className="bg-blue-100 px-1 rounded">console.log()</code> to display messages</li>
                        <li>• End each line with a semicolon (<code className="bg-blue-100 px-1 rounded">;</code>)</li>
                        <li>• Use quotes around text: <code className="bg-blue-100 px-1 rounded">'Hello'</code></li>
                        <li>• Press the Run button to see your results!</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Output Panel */}
            <div>
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                  <Play className="h-5 w-5 text-green-600 mr-2" />
                  Console Output
                </h3>
                <button 
                  onClick={clearOutput}
                  className="text-gray-500 hover:text-gray-700 text-sm flex items-center"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Clear
                </button>
              </div>
              <div className="p-6">
                <div className="bg-charcoal-800 text-green-400 font-mono text-sm p-4 rounded-lg h-64 overflow-y-auto">
                  <div className={`whitespace-pre-wrap ${output.includes("Error:") ? "text-red-400" : "text-green-400"}`}>
                    {output}
                  </div>
                </div>
                
                {/* Error help for beginners */}
                {showErrorHelp && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-900 mb-2">Common Beginner Mistakes:</h4>
                        <ul className="text-sm text-red-800 space-y-1">
                          <li>• Missing quotes around text</li>
                          <li>• Forgetting semicolons at the end of lines</li>
                          <li>• Spelling mistakes in function names</li>
                          <li>• Missing parentheses in functions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
