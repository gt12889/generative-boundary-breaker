
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface UserNavProps {
  profile: { username: string | null } | null;
}

const UserNav = ({ profile }: UserNavProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

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
  );
};

export default UserNav;
