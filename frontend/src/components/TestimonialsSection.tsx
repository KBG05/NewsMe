
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Kushal B",
      role: "Tech Enthusiast",
      content: "News Me has completely transformed how I stay updated with industry trends. The AI curation is incredibly accurate.",
      rating: 5,
      avatar: "KBG"
    },
    {
      name: "Siddarth AY",
      role: "Tech Guru",
      content: "I get exactly the news I need for my business decisions. No more information overload, just relevant insights.",
      rating: 5,
      avatar: "SA"
    },
    {
      name: "Anish Kasetty",
      role: "Student & Developer",
      content: "The personalization gets better every day. It's like having a personal news assistant that knows exactly what matters to me.",
      rating: 5,
      avatar: "AK"
    }
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 scroll-trigger">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join the professionals who rely on NewsMe for strategic insights
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
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
              
              <Quote className="w-8 h-8 text-[#CBE491] mb-4 opacity-60" />
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#CBE491] rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#0f140a] font-bold text-sm">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section - Updated with new data */}
        <div className="grid md:grid-cols-4 gap-8 scroll-trigger">
          <div className="text-center">
            <div className="text-6xl font-bold text-[#CBE491] mb-2">10+</div>
            <div className="text-lg font-semibold text-white mb-1">Daily Readers</div>
            <div className="text-gray-400 text-sm">Professionals trust NewsMe</div>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold text-[#CBE491] mb-2">200+</div>
            <div className="text-lg font-semibold text-white mb-1">Global Sources</div>
            <div className="text-gray-400 text-sm">Comprehensive coverage</div>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold text-[#CBE491] mb-2">95%</div>
            <div className="text-lg font-semibold text-white mb-1">Time Saved</div>
            <div className="text-gray-400 text-sm">Compared to traditional news</div>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold text-[#CBE491] mb-2">5 min</div>
            <div className="text-lg font-semibold text-white mb-1">Daily Read</div>
            <div className="text-gray-400 text-sm">Perfect for busy schedules</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
