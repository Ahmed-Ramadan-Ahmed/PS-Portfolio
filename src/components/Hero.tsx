import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const fullName = "Ahmed Ramadan Ahmed";
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setDisplayText(fullName.slice(0, currentIndex));
        setCursorPosition(currentIndex);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 150); // Slightly slower for better visibility

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-grid-pattern z-0"
        style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='%239C92AC' d='M0 0h2v2H0zm4 4h2v2H4zm8 0h2v2h-2zm4 0h2v2h-2zm-4 4h2v2h-2zm4 4h2v2h-2z'/%3E%3C/svg%3E\")",
          backgroundSize: "30px 30px"
        }}
      />
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center space-x-2 mb-6"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white"
              >
                <Code size={18} />
              </motion.div>
              <p className="text-gray-600 dark:text-gray-400 font-mono">Software Engineer & Competitive Programmer</p>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Hi, I'm{" "}
              <motion.span 
                className="gradient-text inline-block relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <span className="inline-block">
                  {displayText}
                  <motion.span
                    className="inline-block w-[2px] h-[1em] bg-primary ml-[2px]"
                    animate={{ 
                      opacity: [1, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    style={{
                      position: "absolute",
                      left: `${cursorPosition * 0.6}em`,
                      top: "0",
                      height: "100%"
                    }}
                  />
                </span>
              </motion.span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="h-12 mb-8"
            >
              <div className="font-mono text-xl md:text-2xl overflow-hidden whitespace-nowrap border-r-2 border-primary animate-typing animate-cursor-blink">
                Expert Competitive Programmer
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl"
            >
              Software engineer specialized in .NET development with a passion for competitive programming 
              and algorithm optimization.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" asChild>
                  <a href="#contact">Book a Meeting</a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" asChild>
                  <a href="#help">See How I Can Help</a>
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.00, duration: 0.1 }}
              className="mt-16 flex gap-4 flex-wrap"
            >
              {[
                "LeetCode: Top 2%",
                "Codeforces: Expert",
                "Codechef: Top 22 in Egypt",
                "IEEEXtreme 2024: Top 95 Worldwide",
                "FU-ICPC: Founder • Former Leader"
              ].map((text, index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.00 + index * 0.02, duration: 0.1 }}
                  whileHover={{ y: -3, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                  className="code-text w-auto bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md"
                >
                  <span className="text-primary">#</span> {text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 lg:mt-0 lg:ml-10"
          >
            <motion.div 
              whileHover={{ scale: 1.02 , rotate: 2 }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl"
            >
              <img 
                src="https://drive.google.com/file/d/11WnZu8TmutWOS2aTmUVwvsCQ-EYwTKcc/view?usp=sharing"
                alt="Ahmed Ramadan Ahmed" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center"
      >
        <motion.a 
          href="#about"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white dark:bg-gray-800 p-2 w-10 h-10 ring-1 ring-slate-200/20 dark:ring-slate-800/50 shadow-lg rounded-full flex items-center justify-center"
        >
          <motion.svg 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-6 text-primary" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </motion.svg>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
