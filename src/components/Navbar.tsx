import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, SunMoon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { isLoggedIn, logout } = useAuth();
  const { theme, toggle } = useTheme();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-primary p-3 rounded-xl shadow-glow">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                PAWAKIT
              </span>
              <span className="text-xs text-muted-foreground font-medium tracking-wider">
                TECHNOLOGIES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="relative text-muted-foreground hover:text-foreground transition-all duration-300 font-medium group"
            >
              {t('home')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/about" 
              className="relative text-muted-foreground hover:text-foreground transition-all duration-300 font-medium group"
            >
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {isLoggedIn && (
              <Link 
                to="/dashboard" 
                className="relative text-muted-foreground hover:text-foreground transition-all duration-300 font-medium group"
              >
                {t('dashboard')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
            <Link 
              to="/contact" 
              className="relative text-muted-foreground hover:text-foreground transition-all duration-300 font-medium group"
            >
              {t('contact')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <SunMoon className="w-5 h-5" />
            </button>
            {isLoggedIn ? (
              <Button 
                onClick={logout}
                variant="outline" 
                className="relative overflow-hidden border-primary/50 text-primary hover:text-primary-foreground hover:bg-primary font-semibold transition-all duration-300 hover:shadow-glow group"
              >
                <span className="relative z-10">{t('logout')}</span>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            ) : (
              <Link to="/pawakit-auth">
                <Button className="relative overflow-hidden bg-gradient-primary hover:bg-gradient-accent text-primary-foreground font-semibold transition-all duration-300 hover:shadow-glow group">
                  <span className="relative z-10">{t('login')} / {t('register')}</span>
                  <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden relative p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-haspopup="true"
          >
            <div className="relative">
              {isMenuOpen ? (
                <X className="w-6 h-6 animate-scale-in" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-navigation" className="md:hidden py-6 border-t border-border/50 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-muted/50"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link 
                to="/about" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-muted/50"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              {isLoggedIn && (
                <Link 
                  to="/dashboard" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-muted/50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('dashboard')}
                </Link>
              )}
              <Link 
                to="/contact" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-muted/50"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact')}
              </Link>

              {isLoggedIn ? (
                <>
                  <Button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    variant="outline" 
                    className="w-full border-primary/50 text-primary hover:text-primary-foreground hover:bg-primary font-semibold transition-all duration-300"
                  >
                    {t('logout')}
                  </Button>
                </>
              ) : (
                <Link to="/pawakit-auth" onClick={() => setIsMenuOpen(false)} className="mt-4">
                  <Button className="w-full bg-gradient-primary hover:bg-gradient-accent text-primary-foreground font-semibold transition-all duration-300 hover:shadow-glow">
                    {t('login')} / {t('register')}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
