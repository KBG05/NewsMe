
import { Zap, Shield, Cpu} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Cpu className="w-6 h-6"/>,
      title: 'AI-Powered',
      description: 'Advanced algorithms curate personalized content based on your interests and reading patterns.',
      color: 'bg-blue-500'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Get weekly news and trending topics delivered instantly to your inbox with latest updates.',
      color: 'bg-purple-500'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Privacy First',
      description: 'Your data is encrypted and protected. Unsubscribe anytime with a single click.',
      color: 'bg-emerald-500'
    }
  ];

  const stats = [
    { value: '10+', label: 'Subscribers' },
    { value: 'Weekly', label: 'Updates' },
    { value: '100%', label: 'Secure' }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 scroll-trigger dual-text">
          Why Choose NewsMe?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card rounded-3xl p-8 text-center scroll-trigger hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`w-16 h-16 ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-center space-x-12 md:space-x-24 scroll-trigger">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
