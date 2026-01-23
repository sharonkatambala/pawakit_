
import { Zap, Mail, Phone, MapPin, ArrowRight, Shield, Activity, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="relative bg-gradient-to-b from-background to-secondary/50 border-t border-border/50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-lg opacity-75"></div>
                <div className="relative bg-gradient-primary p-3 rounded-xl shadow-glow">
                  <Zap className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  {t('pawakit')}
                </span>
                <span className="text-xs text-muted-foreground font-medium tracking-wider">
                  TECHNOLOGIES
                </span>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary/10 border border-primary/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-success/10 border border-success/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-success" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-info/10 border border-info/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-info" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-6 text-lg">{t('quickLinks')}</h3>
            <div className="space-y-3">
              <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground transition-all duration-300 group">
                <span className="mr-2">{t('home')}</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
              <Link to="/auth" className="flex items-center text-muted-foreground hover:text-foreground transition-all duration-300 group">
                <span className="mr-2">{t('login')}</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
              <Link to="/contact" className="flex items-center text-muted-foreground hover:text-foreground transition-all duration-300 group">
                <span className="mr-2">{t('contact')}</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-foreground font-semibold mb-6 text-lg">{t('services')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Installation &amp; Setup</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Training &amp; Capacity Building</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span>Maintenance</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-2 h-2 bg-info rounded-full"></div>
                <span>Callibration</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-foreground font-semibold mb-6 text-lg">{t('contact')}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-muted-foreground group hover:text-foreground transition-colors duration-300">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">info@pawakit.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground group hover:text-foreground transition-colors duration-300">
                <div className="p-2 rounded-lg bg-success/10 border border-success/20 group-hover:bg-success/20 transition-colors">
                  <Phone className="w-4 h-4 text-success" />
                </div>
                <span className="text-sm">+255 694 352 388</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground group hover:text-foreground transition-colors duration-300">
                <div className="p-2 rounded-lg bg-info/10 border border-info/20 group-hover:bg-info/20 transition-colors">
                  <MapPin className="w-4 h-4 text-info" />
                </div>
                <span className="text-sm leading-relaxed">
                  Muhimbili University of Health and Allied Science (MUHAS),
                  <br />
                  United Nations Road, Upanga West
                  <br />
                  P.O. Box 65000
                  <br />
                  Dar es Salaam, Tanzania
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2025 {t('pawakit')}. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};
