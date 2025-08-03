import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import LearningLevels from "@/components/LearningLevels";
import CodeEditor from "@/components/CodeEditor";
import ChallengesSection from "@/components/ChallengesSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navigation />
      <HeroSection />
      <LearningLevels />
      <CodeEditor />
      <ChallengesSection />
      <ProjectsSection />
    </div>
  );
}
