
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold font-mono">
              &lt;Ahmed Ramadan/&gt;
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md">
              Software Engineer & Competitive Programmer specialized in .NET development and algorithm optimization.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com/Ahmed-Ramadan-Ahmed" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/ahmed-ramadan-348264225/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="mailto:aramadan442000@gmail.com" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} A.R.A. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center mt-4 md:mt-0">
            <a 
              href="https://leetcode.com/u/A_Ramadan_A/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary mx-3 my-1"
            >
              LeetCode
            </a>
            <a 
              href="https://codeforces.com/profile/A.R.A" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary mx-3 my-1"
            >
              Codeforces
            </a>
            <a 
              href="https://www.codechef.com/users/ahmed_ramadan" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary mx-3 my-1"
            >
              CodeChef
            </a>
            <a 
              href="https://www.hackerrank.com/profile/aramadan442000" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary mx-3 my-1"
            >
              HackerRank
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
