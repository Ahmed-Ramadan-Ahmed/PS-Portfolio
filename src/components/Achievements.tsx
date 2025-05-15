import { Card, CardContent } from "@/components/ui/card";
import { Award, Code, Star, Trophy, User } from "lucide-react";
const Achievements = () => {
  const achievements = [{
    icon: <Trophy className="h-10 w-10 text-primary" />,
    title: "Top 2%",
    platform: "LeetCode",
    description: "Ranked in the top 2% of competitive programmers worldwide on LeetCode."
  }, {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "Expert",
    platform: "Codeforces",
    description: "Achieved Expert level on Codeforces, demonstrating advanced problem-solving skills."
  }, {
    icon: <Star className="h-10 w-10 text-primary" />,
    title: "5 Stars",
    platform: "Codechef",
    description: "Earned 5 stars and Division 1 status on Codechef, placing among elite programmers."
  }, {
    icon: <Trophy className="h-10 w-10 text-primary" />,
    title: "Top 100",
    platform: "IEEExtreme 2024",
    description: "Ranked in the top 100 competitors in the global IEEExtreme programming competition."
  }, {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "3000+",
    platform: "Problems Solved",
    description: "Successfully solved over 3,000 algorithmic problems across various competitive platforms."
  }, {
    icon: <User className="h-10 w-10 text-primary" />,
    title: "2+ Years",
    platform: "Coaching",
    description: "Mentored and coached aspiring competitive programmers for over 2 years."
  }];
  return <section id="achievements" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2 text-center">
          My <span className="gradient-text">Achievements</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">Recognitions and milestones from my journey in competitive programming.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => <Card key={index} className="overflow-hidden border-t-4 border-t-primary hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    {achievement.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-mono">@{achievement.platform}</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              </CardContent>
            </Card>)}
        </div>

        <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2 font-mono">
              <span className="text-primary"># </span>
              Problem Solving Stats
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              A summary of my competitive programming journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-mono">Total Problems</p>
              <p className="text-3xl font-bold">3000+</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-mono">Contests Participated</p>
              <p className="text-3xl font-bold">250+</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-mono">Global Rankings</p>
              <p className="text-3xl font-bold">Top 2%</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-mono">Students Mentored</p>
              <p className="text-3xl font-bold">100+</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Achievements;