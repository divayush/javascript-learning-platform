import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-teal-600">JSMaster</h1>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-slate-600 hover:text-teal-600 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("levels")}
              className="text-slate-600 hover:text-teal-600 transition-colors"
            >
              Learning Path
            </button>
            <button 
              onClick={() => scrollToSection("editor")}
              className="text-slate-600 hover:text-teal-600 transition-colors"
            >
              Code Editor
            </button>
            <button 
              onClick={() => scrollToSection("challenges")}
              className="text-slate-600 hover:text-teal-600 transition-colors"
            >
              Challenges
            </button>
            <button 
              onClick={() => scrollToSection("projects")}
              className="text-slate-600 hover:text-teal-600 transition-colors"
            >
              Projects
            </button>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <button 
              onClick={() => scrollToSection("home")}
              className="block w-full text-left text-slate-600 hover:text-teal-600 py-2"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("levels")}
              className="block w-full text-left text-slate-600 hover:text-teal-600 py-2"
            >
              Learning Path
            </button>
            <button 
              onClick={() => scrollToSection("editor")}
              className="block w-full text-left text-slate-600 hover:text-teal-600 py-2"
            >
              Code Editor
            </button>
            <button 
              onClick={() => scrollToSection("challenges")}
              className="block w-full text-left text-slate-600 hover:text-teal-600 py-2"
            >
              Challenges
            </button>
            <button 
              onClick={() => scrollToSection("projects")}
              className="block w-full text-left text-slate-600 hover:text-teal-600 py-2"
            >
              Projects
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
