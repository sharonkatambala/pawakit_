import { useAuth } from "@/contexts/AuthContext";
import { useCallback } from "react";

export const useProtectedRoute = () => {
  const { isLoggedIn, setShowRestrictedPopup } = useAuth();

  const checkAccess = useCallback((callback?: () => void) => {
    if (isLoggedIn) {
      if (callback) callback();
      return true;
    } else {
      setShowRestrictedPopup(true);
      return false;
    }
  }, [isLoggedIn, setShowRestrictedPopup]);

  return { checkAccess, isLoggedIn };
};