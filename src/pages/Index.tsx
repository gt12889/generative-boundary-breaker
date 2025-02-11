
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "./Index/components/Header";
import Features from "./Index/components/Features";
import GetStarted from "./Index/components/GetStarted";
import UserNav from "./Index/components/UserNav";

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [profile, setProfile] = useState<{ username: string | null } | null>(null);

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

  return (
    <div className="overflow-hidden">
      <UserNav profile={profile} />

      <section className="section relative bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Header />
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <Features />
      </section>

      <section className="section bg-gradient-to-t from-rose-50 to-white">
        <GetStarted />
      </section>
    </div>
  );
};

export default Index;
