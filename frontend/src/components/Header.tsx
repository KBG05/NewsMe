
import { Brain } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6">
      <div className="flex items-center justify-start">
        <div className="flex items-center space-x-3 glass-card rounded-2xl px-4 py-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#CBE491] to-[#CBE491]/60 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg"></div>
            <Brain className="w-4 h-4 text-[#0f140a] relative z-10 rounded-lg" />
            <div className="absolute inset-0 animate-pulse bg-[#CBE491]/20 rounded-lg"></div>
          </div>
          <span className="text-[#CBE491] font-semibold text-lg">NewsMe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
