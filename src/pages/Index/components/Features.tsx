
import { motion } from "framer-motion";

const features = [
  {
    title: "Boundary Breaking AI",
    description: "Push the limits of what's possible with our advanced AI solutions",
  },
  {
    title: "Custom Solutions",
    description: "Tailored approaches to meet your unique challenges",
  },
  {
    title: "Industry Leading",
    description: "Stay ahead with cutting-edge technology",
  },
  {
    title: "Collaborative Growth",
    description: "Partner with experts to achieve your goals",
  },
];

const Features = () => {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-20 animate-on-scroll">
        <span className="text-rose-600 font-medium tracking-wider text-sm uppercase">
          Features
        </span>
        <h2 className="mt-6 text-4xl font-bold text-gray-900">
          Transform Your Business
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="glass p-8 rounded-2xl"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
