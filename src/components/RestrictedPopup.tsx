import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Shield } from "lucide-react";

interface RestrictedPopupProps {
  onSignIn: () => void;
}

export const RestrictedPopup = ({ onSignIn }: RestrictedPopupProps) => {
  const { showRestrictedPopup, setShowRestrictedPopup } = useAuth();

  const handleSignIn = () => {
    setShowRestrictedPopup(false);
    onSignIn();
  };

  return (
    <Dialog open={showRestrictedPopup} onOpenChange={setShowRestrictedPopup}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold flex items-center justify-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Access Restricted
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <p className="text-center text-muted-foreground">
            This section is available for registered members. Please Sign up or Log in to continue.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              className="flex-1"
              onClick={handleSignIn}
            >
              Sign In to PAWAKIT
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setShowRestrictedPopup(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};