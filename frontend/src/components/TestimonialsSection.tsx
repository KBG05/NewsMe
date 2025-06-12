
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Tech Journalist",
      content: "News Me has completely transformed how I stay updated with industry trends. The AI curation is incredibly accurate.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Johnson",
      role: "Startup Founder",
      content: "I get exactly the news I need for my business decisions. No more information overload, just relevant insights.",
      rating: 5,
      avatar: "MJ"
    },
    {
      name: "Elena Rodriguez",
      role: "Data Scientist",
      content: "The personalization gets better every day. It's like having a personal news assistant that knows exactly what matters to me.",
      rating: 5,
      avatar: "ER"
    }
  ];

  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 scroll-trigger">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 dual-text">
            Loved by thousands
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join the community of professionals who rely on News Me for their daily insights
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card rounded-3xl p-8 scroll-trigger hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-primary mb-4 opacity-60" />
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 scroll-trigger">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">50K+</div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">1M+</div>
            <div className="text-gray-400">Articles Curated</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">95%</div>
            <div className="text-gray-400">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-gray-400">Real-time Updates</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
