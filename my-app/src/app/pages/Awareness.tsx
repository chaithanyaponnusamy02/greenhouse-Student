import { Lightbulb, Droplet, Zap, Leaf, TreePine } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const Awareness = () => {
  const resources = [
    {
      id: "1",
      title: "Reduce, Reuse, Recycle",
      icon: "♻️",
      description: "The three R's are essential principles for sustainable living. Learn how to implement them in your daily life.",
      image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xlJTIwYmlucyUyMHdhc3RlJTIwc2VncmVnYXRpb258ZW58MXx8fHwxNzcwNzQwODAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-green-50 to-emerald-50",
      Icon: Leaf,
      tips: [
        "Always carry a reusable water bottle",
        "Use cloth bags instead of plastic",
        "Donate old clothes and books",
        "Avoid single-use plastics",
        "Compost organic waste"
      ]
    },
    {
      id: "2",
      title: "Energy Conservation Tips",
      icon: "⚡",
      description: "Small changes in daily habits can lead to significant energy savings and reduced carbon footprint.",
      image: "https://images.unsplash.com/photo-1628206554160-63e8c921e398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVsJTIwcmVuZXdhYmxlJTIwZW5lcmd5fGVufDF8fHx8MTc3MDY3NDA3NHww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-yellow-50 to-orange-50",
      Icon: Zap,
      tips: [
        "Turn off lights when leaving a room",
        "Unplug devices when not in use",
        "Use natural light whenever possible",
        "Opt for energy-efficient appliances",
        "Use stairs instead of elevators when possible"
      ]
    },
    {
      id: "3",
      title: "Water Conservation",
      icon: "💧",
      description: "Water is precious. Every drop counts in creating a sustainable future for our planet.",
      image: "https://images.unsplash.com/photo-1604994477975-399c19397739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGRyb3AlMjBjb25zZXJ2YXRpb258ZW58MXx8fHwxNzcwNzQwODA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-blue-50 to-cyan-50",
      Icon: Droplet,
      tips: [
        "Fix leaky faucets immediately",
        "Take shorter showers",
        "Don't let water run while brushing teeth",
        "Collect rainwater for plants",
        "Use a bucket instead of a hose for washing"
      ]
    },
    {
      id: "4",
      title: "Green Transportation",
      icon: "🚴",
      description: "Choose eco-friendly transportation options to reduce air pollution and carbon emissions.",
      image: "https://images.unsplash.com/photo-1758599543187-0dfc7b8551a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWN5Y2xlJTIwY29tbXV0ZSUyMGdyZWVuJTIwdHJhbnNwb3J0YXRpb258ZW58MXx8fHwxNzcwNzQwODA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-teal-50 to-green-50",
      Icon: TreePine,
      tips: [
        "Walk or bike for short distances",
        "Use public transportation",
        "Carpool with classmates",
        "Maintain vehicles for better fuel efficiency",
        "Support electric vehicle initiatives"
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Green Awareness & Resources 🌍</h1>
        <p className="text-gray-600">Learn about sustainability and eco-friendly practices for a greener future.</p>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#E8F5E9] to-[#C8E6C9] rounded-xl p-8 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-[#4CAF50]" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Campus Green Policies</h2>
          </div>
          <p className="text-gray-700 max-w-2xl mb-4">
            Our campus is committed to achieving carbon neutrality by 2030. Every student's participation in 
            green initiatives contributes to this goal. Together, we can create a sustainable future.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full">
              <span className="text-green-600">✓</span>
              <span>Zero Waste Initiative</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full">
              <span className="text-green-600">✓</span>
              <span>100% Renewable Energy</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full">
              <span className="text-green-600">✓</span>
              <span>Green Transportation</span>
            </div>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute right-0 top-0 opacity-10">
          <Leaf className="w-64 h-64 text-green-800" />
        </div>
      </div>

      {/* Resources Grid */}
      <div className="space-y-8">
        {resources.map((resource, index) => {
          const Icon = resource.Icon;
          return (
            <div
              key={resource.id}
              className={`bg-gradient-to-r ${resource.color} rounded-xl overflow-hidden shadow-sm border border-gray-100`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <ImageWithFallback
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6 text-[#4CAF50]" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800">{resource.title}</h3>
                  </div>

                  <p className="text-gray-700 mb-6">{resource.description}</p>

                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-3">💡 Practical Tips:</h4>
                    <ul className="space-y-2">
                      {resource.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-[#E8F5E9] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs text-[#4CAF50]">✓</span>
                          </div>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Card */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Make a Difference?</h3>
        <p className="text-gray-600 mb-6">
          Start participating in green activities and help our campus achieve sustainability goals.
        </p>
        <a
          href="/participate"
          className="inline-block px-8 py-3 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] transition-colors font-medium"
        >
          Browse Activities
        </a>
      </div>
    </div>
  );
};

export default Awareness;
