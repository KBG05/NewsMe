
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Brain, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HeroSectionProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const HeroSection = ({ currentStep, setCurrentStep }: HeroSectionProps) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    topic: '',
    keywords: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);
  const { toast } = useToast();

  const handleContinue = () => {
    if (currentStep === 0 && formData.email) {
      setCurrentStep(1);
    } else if (currentStep === 1 && formData.name && formData.topic && formData.keywords.length > 0) {
      handleSubmit();
    }
  };

  const handleStepBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddKeyword = (keyword: string) => {
    if (keyword.trim() && !formData.keywords.includes(keyword.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keyword.trim()]
      }));
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          topic_of_interest: formData.topic,
          keywords: formData.keywords
        }),
      });

      if (response.ok) {
        setCurrentStep(2);
        toast({
          title: "Verification link sent!",
          description: "Check your email to complete your subscription.",
        });
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    setCanResend(false);
    setResendTimer(60);
    
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    await handleSubmit();
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-15">
      <div className="text-center max-w-4xl mx-auto scroll-trigger">
        {/* Logo */}
        <div className="mb-0 animate-scale-in">
          <div className="w-24 h-24 bg-gradient-to-br from-[#CBE491] animate-pulse ] to-[#CBE491]/60 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#CBE491]/30 relative overflow-hidden border-2 border-[#CBE491]/20">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <Brain className="w-12 h-12 text-[#0f140a] relative z-10 " />
            <div className="absolute inset-0 animate-pulse bg-[#CBE491]/10 rounded-3xl"></div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-8xl md:text-9xl font-medium mb-14 animate-fade-up dual-text">
          NewsMe
        </h1>

        {/* Tagline */}
        <div className="mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl md:text-2xl font-thin text-foreground mb-8">
            News that matters, 
            <span className="font-normal"> insights that inspires.</span> 
            {/* <span className="text-[#CBE491]">NewsMe</span> */}
          </h2>
          <p className="text-xl text-[#CBE491] font-thin mb-2">5 minutes weekly, Infinite clarity.</p>
          <p className="text-xl text-foreground"></p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-3 mb-12 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          {[0, 1, 2].map((step) => (
            <div
              key={step}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step === currentStep ? 'bg-[#CBE491]' : step < currentStep ? 'bg-[#CBE491]/60' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Step 0: Email Input */}
        {currentStep === 0 && (
          <div className="max-w-md mx-auto animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="flex-1 bg-card border-border text-foreground placeholder-muted-foreground h-12 rounded-xl"
              />
              <Button 
                onClick={handleContinue}
                disabled={!formData.email}
                className="bg-[#CBE491] hover:bg-[#CBE491]/90 text-[#0f140a] px-6 h-12 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#CBE491]/30 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Continue
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <div className="max-w-2xl mx-auto animate-fade-up">
            <h2 className="text-3xl font-bold text-foreground mb-4">Tell us about yourself</h2>
            <p className="text-muted-foreground mb-8">Personalize your AI newsletter experience</p>
            
            <div className="space-y-6">
              <div className="text-left">
                <label className="block text-foreground mb-2">Your Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-card border-border text-foreground h-12 rounded-xl"
                />
              </div>
              
              <div className="text-left">
                <label className="block text-foreground mb-2">Topic of Interest</label>
                <Input
                  type="text"
                  placeholder="e.g., Technology, Finance, AI"
                  value={formData.topic}
                  onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                  className="bg-card border-border text-foreground h-12 rounded-xl"
                />
              </div>
              
              <div className="text-left">
                <label className="block text-foreground mb-2">Keywords</label>
                <Input
                  type="text"
                  placeholder="Add keywords (press Enter to add)"
                  className="bg-card border-border text-foreground h-12 rounded-xl"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const target = e.target as HTMLInputElement;
                      handleAddKeyword(target.value);
                      target.value = '';
                    }
                  }}
                />
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {formData.keywords.map((keyword, index) => (
                    <span 
                      key={index}
                      className="bg-[#CBE491]/20 text-[#CBE491] px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {keyword}
                      <button onClick={() => handleRemoveKeyword(keyword)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Button 
                variant="outline" 
                onClick={handleStepBack}
                className="flex-1 h-12 rounded-xl bg-card border-border text-foreground hover:bg-accent"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              <Button 
                onClick={handleContinue}
                disabled={!formData.name || !formData.topic || formData.keywords.length === 0 || isSubmitting}
                className="flex-1 bg-[#CBE491] hover:bg-[#CBE491]/90 text-[#0f140a] h-12 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? 'Verifying...' : 'Verify'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Success */}
        {currentStep === 2 && (
          <div className="max-w-2xl mx-auto animate-scale-in">
            <div className="w-20 h-20 bg-[#CBE491] rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-[#0f140a]" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Verification Link Sent!</h2>
            <p className="text-muted-foreground mb-8">
              We've sent a magic link to <span className="text-[#CBE491]">{formData.email}</span>. 
              Click the link to complete your subscription.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => setCurrentStep(0)}
                variant="outline"
                className="bg-card border-border text-foreground hover:bg-accent h-12 px-8 rounded-xl"
              >
                Start Over
              </Button>
              <Button 
                onClick={handleResend}
                disabled={!canResend}
                className="bg-[#CBE491] hover:bg-[#CBE491]/90 text-[#0f140a] h-12 px-8 rounded-xl disabled:opacity-50 font-medium"
              >
                {canResend ? 'Resend Link' : `Resend in ${resendTimer}s`}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
