
const TopicsSection = () => {
  const topics = [
    'Climate Action', 'Space Exploration', 'Quantum Computing', 'Cryptocurrency',
    'Mental Health', 'Sustainable Energy', 'Biotechnology', 'Virtual Reality',
    'Blockchain', 'Machine Learning', 'Cybersecurity', 'Social Media',
    'Electric Vehicles', 'Smart Cities', 'Gene Therapy', 'Artificial Intelligence'
  ];

  // Duplicate topics for seamless loop
  const duplicatedTopics = [...topics, ...topics];

  return (
    <section className="py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 scroll-trigger dual-text">
          Trending Topics
        </h2>
        
        {/* First row - moving right */}
        <div className="relative mb-8">
          <div className="flex space-x-4 animate-scroll-loop">
            {duplicatedTopics.map((topic, index) => (
              <div
                key={`row1-${index}`}
                className="topic-badge rounded-full px-6 py-3 whitespace-nowrap text-white font-medium"
              >
                {topic}
              </div>
            ))}
          </div>
        </div>

        {/* Second row - moving left */}
        <div className="relative">
          <div className="flex space-x-4 animate-scroll-loop" style={{ animationDirection: 'reverse' }}>
            {duplicatedTopics.reverse().map((topic, index) => (
              <div
                key={`row2-${index}`}
                className="topic-badge rounded-full px-6 py-3 whitespace-nowrap text-white font-medium"
              >
                {topic}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
