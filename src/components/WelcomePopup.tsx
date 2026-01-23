import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FileText, TrendingUp, Activity } from "lucide-react";

export const WelcomePopup = () => {
  const { user, profile, showWelcomePopup, setShowWelcomePopup } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setShowWelcomePopup(false);
    navigate(path);
  };

  if (!showWelcomePopup || !user || !profile) return null;

  return (
    <Dialog open={showWelcomePopup} onOpenChange={setShowWelcomePopup}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            <span className="inline-block mr-2">👋</span>
            Hello, {profile.first_name}!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <p className="text-center text-muted-foreground">
            Welcome to PAWAKIT! You now have access as a <strong>{profile.role.replace(/_/g, ' ')}</strong>. Where would you like to start?
          </p>
          
          <div className="space-y-3">
            <Button 
              variant="default"
              className="w-full justify-start h-12 text-left"
              onClick={() => handleNavigation('/dashboard')}
            >
              <Activity className="mr-3 h-5 w-5" />
              <div>
                <div className="font-semibold">🚀 Continue to Dashboard</div>
                <div className="text-sm opacity-80">Access your monitoring system</div>
              </div>
            </Button>
            
            <Button 
              variant="outline"
              className="w-full justify-start h-12 text-left"
              onClick={() => handleNavigation('/about')}
            >
              <TrendingUp className="mr-3 h-5 w-5" />
              <div>
                <div className="font-semibold">⚡ See Our Impact</div>
                <div className="text-sm opacity-80">Learn about our mission and team</div>
              </div>
            </Button>
            
            <Button 
              variant="outline"
              className="w-full justify-start h-12 text-left"
              onClick={() => handleNavigation('/contact')}
            >
              <FileText className="mr-3 h-5 w-5" />
              <div>
                <div className="font-semibold">📄 Get In Touch</div>
                <div className="text-sm opacity-80">Connect with our team</div>
              </div>
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full mt-4"
            onClick={() => setShowWelcomePopup(false)}
          >
            Continue browsing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};