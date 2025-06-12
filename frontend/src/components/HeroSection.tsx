
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Zap, Plus, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HeroSectionProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const HeroSection = ({ currentStep, setCurrentStep }: HeroSectionProps) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    topics: [] as string[],
    verificationCode: ['', '', '', '', '', '']
  });
  const [showError, setShowError] = useState(false);
  const { toast } = useToast();

  const handleContinue = () => {
    if (currentStep === 0 && formData.email) {
      setCurrentStep(1);
    } else if (currentStep === 1 && formData.name && formData.topics.length > 0) {
      setCurrentStep(2);
      toast({
        title: "Details saved",
        description: "We've sent a verification code to your email.",
      });
    }
  };

  const handleStepBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddTopic = (topic: string) => {
    if (topic.trim() && !formData.topics.includes(topic.trim())) {
      setFormData(prev => ({
        ...prev,
        topics: [...prev.topics, topic.trim()]
      }));
    }
  };

  const handleRemoveTopic = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.filter(t => t !== topic)
    }));
  };

  const handleVerificationInput = (index: number, value: string) => {
    const newCode = [...formData.verificationCode];
    newCode[index] = value;
    setFormData(prev => ({ ...prev, verificationCode: newCode }));
    
    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    const code = formData.verificationCode.join('');
    if (code === '123456') {
      setCurrentStep(3);
      setShowError(false);
      toast({
        title: "Email verified successfully!",
        description: "Welcome to News Me! Your account is now active.",
      });
    } else {
      setShowError(true);
      toast({
        title: "Verification failed",
        description: "Invalid or expired code. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="text-center max-w-4xl mx-auto scroll-trigger">
        {/* Logo */}
        <div className="mb-8 animate-scale-in">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <Zap className="w-10 h-10 text-white relative z-10" />
            <div className="absolute inset-0 animate-pulse bg-primary/20 rounded-3xl"></div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-up dual-text">
          News Me
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          AI-Powered Newsletter Platform
        </p>

        {/* Description */}
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
          Get personalized insights delivered to your inbox
        </p>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-3 mb-12 animate-fade-up" style={{ animationDelay: '0.6s' }}>
          {[0, 1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step === currentStep ? 'bg-primary' : step < currentStep ? 'bg-primary/60' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Step 0: Email Input */}
        {currentStep === 0 && (
          <div className="max-w-md mx-auto animate-fade-up" style={{ animationDelay: '0.8s' }}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="flex-1 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 h-12 rounded-xl"
              />
              <Button 
                onClick={handleContinue}
                disabled={!formData.email}
                className="bg-primary hover:bg-primary/90 text-white px-6 h-12 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <h2 className="text-3xl font-bold text-white mb-4">Tell us about yourself</h2>
            <p className="text-gray-400 mb-8">Personalize your AI newsletter experience</p>
            
            <div className="space-y-6">
              <div className="text-left">
                <label className="block text-white mb-2">Your Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-800/50 border-gray-600 text-white h-12 rounded-xl"
                />
              </div>
              
              <div className="text-left">
                <label className="block text-white mb-2">Topics of Interest</label>
                <div className="flex gap-2 mb-4">
                  <Input
                    type="text"
                    placeholder="Add topics (e.g., AI, Technology, Sports...)"
                    className="bg-gray-800/50 border-gray-600 text-white h-12 rounded-xl flex-1"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const target = e.target as HTMLInputElement;
                        handleAddTopic(target.value);
                        target.value = '';
                      }
                    }}
                  />
                  <Button 
                    size="icon" 
                    className="bg-primary hover:bg-primary/90 h-12 w-12 rounded-xl"
                    onClick={() => {
                      const input = document.querySelector('input[placeholder*="Add topics"]') as HTMLInputElement;
                      if (input?.value) {
                        handleAddTopic(input.value);
                        input.value = '';
                      }
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.topics.map((topic, index) => (
                    <span 
                      key={index}
                      className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {topic}
                      <button onClick={() => handleRemoveTopic(topic)}>
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
                className="flex-1 h-12 rounded-xl bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              <Button 
                onClick={handleContinue}
                disabled={!formData.name || formData.topics.length === 0}
                className="flex-1 bg-primary hover:bg-primary/90 h-12 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Email Verification */}
        {currentStep === 2 && (
          <div className="max-w-2xl mx-auto animate-fade-up">
            <h2 className="text-3xl font-bold text-white mb-4">Verify Your Email</h2>
            <p className="text-gray-400 mb-8">
              We've sent a 6-digit code to <span className="text-primary">{formData.email}</span>
            </p>
            
            <div className="flex justify-center gap-3 mb-6">
              {formData.verificationCode.map((digit, index) => (
                <Input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleVerificationInput(index, e.target.value)}
                  className="w-12 h-12 text-center bg-gray-800/50 border-gray-600 text-white rounded-xl text-lg"
                />
              ))}
            </div>

            {showError && (
              <div className="bg-red-500/20 border border-red-500 rounded-xl p-3 mb-6 animate-scale-in">
                <p className="text-red-400 text-sm">Invalid or expired code. Please try again.</p>
              </div>
            )}

            <p className="text-gray-400 text-sm mb-8">
              Didn't receive the code? <button className="text-primary hover:underline">Resend</button>
            </p>

            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={handleStepBack}
                className="flex-1 h-12 rounded-xl bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              <Button 
                onClick={handleVerify}
                className="flex-1 bg-primary hover:bg-primary/90 h-12 rounded-xl"
              >
                Verify
                <Check className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto animate-scale-in">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Welcome to News Me!</h2>
            <p className="text-gray-400 mb-8">
              Your personalized newsletter is ready. You'll receive your first digest shortly.
            </p>
            <Button 
              onClick={() => setCurrentStep(0)}
              className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-xl"
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
