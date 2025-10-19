import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function PartnersSection() {
  const partners = [
    {
      name: "Rainbow Palace",
      logo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF5Z3JvdW5kJTIwY2hpbGRyZW4lMjBpbmRvb3J8ZW58MXx8fHwxNzU4MjI2NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Indoor playground and party venue",
    },
    {
      name: "Sweet Dreams Bakery",
      logo: "https://images.unsplash.com/photo-1556691421-cf15fe7eb6cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBjYWtlJTIwc3dlZXRzfGVufDF8fHx8MTc1ODIyNjUyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Custom birthday cakes and treats",
    },
    {
      name: "Magic Moments Photography",
      logo: "https://images.unsplash.com/photo-1493612276216-ee3925520721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMGNhbWVyYSUyMGV2ZW50fGVufDF8fHx8MTc1ODIyNjUzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Professional event photography",
    },
    {
      name: "Balloon Paradise",
      logo: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxsb29ucyUyMGNvbG9yZnVsJTIwcGFydHl8ZW58MXx8fHwxNzU4MjI2NTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Premium balloon decorations",
    },
    {
      name: "Kostis Catering",
      logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRlcmluZyUyMGZvb2QlMjBzZXJ2aWNlfGVufDF8fHx8MTc1ODIyNjUzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Delicious catering services",
    },
    {
      name: "Little Star Costumes",
      logo: "https://images.unsplash.com/photo-1578662015686-4ac6d3af60da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3N0dW1lcyUyMGNoaWxkcmVuJTIwZHJlc3MlMjB1cHxlbnwxfHx8fDE3NTgyMjY1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Children's costume rentals",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-center mb-16 text-gray-800"
          style={{ fontFamily: "Bowlby One SC, sans-serif" }}
        >
          Our Trusted Partners
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto"
        >
          We collaborate with the best local businesses in
          Thessaloniki to bring you exceptional service and
          unforgettable experiences.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 group"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300">
                <ImageWithFallback
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-black text-gray-800 text-center mb-3 group-hover:text-[#B26CC5] transition-colors duration-200">
                {partner.name}
              </h3>
              <p className="text-gray-600 text-center">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}