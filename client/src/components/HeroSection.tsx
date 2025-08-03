import { Play, Code, Trophy } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="bg-gradient-to-br from-teal-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Start Your JavaScript Journey
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Learn JavaScript from absolute beginner to advanced with hands-on projects, interactive challenges, and step-by-step guidance designed for first-time programmers.
          </p>
          
          {/* Clean slate progress indicator */}
          <div className="bg-white rounded-xl p-6 max-w-4xl mx-auto mb-8 shadow-sm">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Begin?</h3>
              <p className="text-slate-600">Start with the fundamentals and build your way up</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Play className="h-6 w-6 text-teal-600" />
                </div>
                <h4 className="font-semibold text-slate-900">Start Fresh</h4>
                <p className="text-sm text-slate-600">No prior experience needed</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Code className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-slate-900">Learn by Doing</h4>
                <p className="text-sm text-slate-600">Interactive coding exercises</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-slate-900">Build Projects</h4>
                <p className="text-sm text-slate-600">Create real applications</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => scrollToSection("levels")}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors"
            >
              Start Learning Now
            </button>
            <button 
              onClick={() => scrollToSection("editor")}
              className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-4 rounded-lg text-lg font-medium transition-colors"
            >
              Try Code Editor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
