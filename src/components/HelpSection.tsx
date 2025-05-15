
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Brain, BookOpen, Network, Gauge, Puzzle } from "lucide-react";

const HelpSection = () => {
  const helpItems = [{
    icon: <Code className="h-8 w-8 text-primary" />,
    title: "Technical Interview Preparation",
    description: "Prepare for technical interviews with mock sessions and targeted problem-solving practice."
  }, {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: "Competitive Programming Training",
    description: "I provide specialized coaching to help you improve your competitive programming skills and contest strategy."
  }, {
    icon: <Puzzle className="h-8 w-8 text-primary" />,
    title: "Algorithmic Problem Solving",
    description: "I can help you solve complex algorithmic problems and optimize your solutions for better performance."
  }, {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Algorithm Analysis",
    description: "Learn how to analyze algorithm complexity and design more efficient solutions to computational problems."
  }, {
    icon: <Network className="h-8 w-8 text-primary" />,
    title: "Data Structures Expertise",
    description: "Master advanced data structures that are crucial for solving complex problems efficiently."
  }, {
    icon: <Gauge className="h-8 w-8 text-primary" />,
    title: "Performance Optimization",
    description: "Optimize your code for better performance and learn techniques to handle large input sizes."
  }];
  
  return (
    <section id="help" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2 text-center transform transition-all duration-500 hover:scale-105">
          I Can <span className="gradient-text">Help With</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Leveraging my experience in competitive programming and software development to help you succeed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {helpItems.map((item, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 transform hover:scale-[1.03] hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4 transition-all duration-300 transform hover:rotate-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
