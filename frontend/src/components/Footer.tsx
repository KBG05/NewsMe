
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [unsubscribeEmail, setUnsubscribeEmail] = useState('');
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);
  const { toast } = useToast();

  const handleUnsubscribe = async () => {
    if (!unsubscribeEmail) return;
    
    setIsUnsubscribing(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/unsubscribe/${encodeURIComponent(unsubscribeEmail)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "Successfully unsubscribed",
          description: "You will no longer receive our newsletter.",
        });
        setUnsubscribeEmail('');
      } else {
        throw new Error('Unsubscribe failed');
      }
    } catch (error) {
      toast({
        title: "Unsubscribe failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsUnsubscribing(false);
    }
  };

  return (
    <footer className="py-16 px-6 border-t border-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main description */}
        {/* <div className="mb-12">
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Transforming global information into strategic intelligence for decision-makers who shape the future.
          </p>
        </div> */}

        {/* Navigation Links
        <div className="flex justify-center space-x-8 mb-8">
          <a href="#" className="text-gray-400 hover:text-primary transition-colors">About Us</a>
          <a href="#" className="text-gray-400 hover:text-primary transition-colors">Contact Us</a>
          <a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a>
        </div> */}

        {/* Unsubscribe Section */}
        <div className="mb-8">
          <p className="text-gray-400 mb-4">Unsubscribe from our newsletter</p>
          <div className="flex justify-center gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={unsubscribeEmail}
              onChange={(e) => setUnsubscribeEmail(e.target.value)}
              className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 rounded-xl"
            />
            <Button 
              onClick={handleUnsubscribe}
              disabled={!unsubscribeEmail || isUnsubscribing}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 rounded-xl disabled:opacity-50"
            >
              {isUnsubscribing ? 'Unsubscribing...' : 'Unsubscribe'}
            </Button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-2 mb-8 text-gray-400 text-sm">
          <p></p>
        </div>

        {/* Copyright */}
        <div className="text-gray-500 text-sm">
          <p>© 2025 NewsMe . All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
