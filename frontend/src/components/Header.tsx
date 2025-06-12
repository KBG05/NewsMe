
import { Zap } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6">
      <div className="flex items-center justify-start">
        <div className="flex items-center space-x-3 glass-card rounded-2xl px-4 py-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <Zap className="w-4 h-4 text-white relative z-10" />
            <div className="absolute inset-0 animate-pulse bg-primary/20 rounded-lg"></div>
          </div>
          <span className="text-white font-semibold text-lg">News Me</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
