import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Code, Laptop, Trophy, User } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const codingLanguages = ["C", "C++", "C#", "Go", "Java", "Python", "JS"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col md:flex-row gap-12"
        >
          <motion.div variants={itemVariants} className="md:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-6"
            >
              About <motion.span 
                whileHover={{ scale: 1.05 }}
                className="gradient-text inline-block"
              >Me</motion.span>
            </motion.h2>
            <motion.div 
              variants={containerVariants}
              className="space-y-4 text-gray-600 dark:text-gray-400"
            >
              <motion.p variants={itemVariants}>
                I'm a passionate Software Engineer specialized in .NET development with a strong background in competitive programming. 
                With extensive experience in algorithm optimization and problem-solving, I bring a unique analytical approach to software development.
              </motion.p>
              <motion.p variants={itemVariants}>
                I hold a Bachelor's degree in Artificial Intelligence and have dedicated significant time to mentoring and coaching aspiring 
                competitive programmers for over 2 years. My deep understanding of data structures and algorithms has helped me excel in 
                competitive programming platforms worldwide.
              </motion.p>
              <motion.p variants={itemVariants}>
                When I'm not coding or competing, I enjoy sharing my knowledge with others and continuously pursuing new challenges in the tech world.
              </motion.p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-8"
            >
              <h3 className="font-bold mb-3">Coding Languages</h3>
              <motion.div 
                variants={containerVariants}
                className="flex flex-wrap gap-3"
              >
                {codingLanguages.map((lang, index) => (
                  <motion.span
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--primary), 0.2)" }}
                    className="px-3 py-1 bg-primary/10 rounded-full text-primary font-medium text-sm"
                  >
                    {lang}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="md:w-1/2">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xl font-bold mb-6 font-mono"
            >
              <span className="text-primary"># </span>Experience
            </motion.h3>
            
            <motion.div 
              variants={containerVariants}
              className="space-y-6"
            >
              {[
                {
                  icon: Briefcase,
                  title: "Software Engineer | .NET Developer",
                  subtitle: "Free • Open To Work",
                  description: "Developing and maintaining robust backend applications using .NET Core. Implementing efficient algorithms and optimizing database performance."
                },
                {
                  icon: User,
                  title: "Competitive Programming Coach",
                  subtitle: "2022 - Present",
                  description: "Mentoring students in competitive programming, teaching advanced algorithms and problem-solving techniques. Helping teams prepare for international competitions."
                },
                {
                  icon: Laptop,
                  title: "Bachelor's Degree in AI",
                  subtitle: "Fayoum University • 2020 - 2024",
                  description: "Studied artificial intelligence, machine learning, and advanced algorithms."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="mt-1 p-2 rounded-md bg-primary/10"
                        >
                          <item.icon className="text-primary" size={20} />
                        </motion.div>
                        <div>
                          <h4 className="font-bold">{item.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.subtitle}</p>
                          <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
