
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

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

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [profile, setProfile] = useState<{ username: string | null } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();
        setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
        {profile && (
          <span className="text-gray-700">
            Welcome, {profile.username || 'User'}
          </span>
        )}
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="bg-white hover:bg-gray-100"
        >
          Sign Out
        </Button>
      </div>

      <section className="section relative bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-rose-600 font-medium tracking-wider text-sm uppercase">
                Welcome to GenAI Ventures
              </span>
              <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
                <span className="text-reveal">
                  <span>Breaking Boundaries</span>
                </span>
                <br />
                <span className="text-reveal" style={{ animationDelay: "0.1s" }}>
                  <span>with AI Solutions</span>
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
                Enabling unprecedented success through innovative AI solutions that tackle
                your most challenging problems.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Button 
                  onClick={() => navigate("/prompt")}
                  className="px-8 py-3 rounded-full bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
                >
                  Get Started
                </Button>
                <Button
                  variant="outline" 
                  className="px-8 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
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
      </section>

      <section className="section bg-gradient-to-t from-rose-50 to-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <span className="text-rose-600 font-medium tracking-wider text-sm uppercase">
              Get Started
            </span>
            <h2 className="mt-6 text-4xl font-bold text-gray-900">
              Ready to Transform Your Future?
            </h2>
            <p className="mt-6 text-xl text-gray-600">
              Contact us today to discover how our AI solutions can help you achieve
              unprecedented success.
            </p>
            <Button
              onClick={() => navigate("/prompt")}
              className="mt-10 px-8 py-3 rounded-full bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
