import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, AlertTriangle, TrendingUp, Activity, Users, CheckCircle, Star } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { SlideCarousel } from "@/components/SlideCarousel";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { RestrictedPopup } from "@/components/RestrictedPopup";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isLoggedIn } = useAuth();
  const { checkAccess } = useProtectedRoute();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleDashboardAccess = () => {
    checkAccess(() => navigate('/dashboard'));
  };

  const handleRestrictedAccess = () => {
    navigate('/pawakit-auth');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat transform scale-105 animate-zoom-in-out"
            style={{
              backgroundImage: `url('/lovable-uploads/5c9d4ee1-46ed-4c30-bcd9-2f667ae4f8b4.png')`,
              animation: 'zoomInOut 25s ease-in-out infinite alternate'
            }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-black/40"></div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full flex-1 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-5xl mx-auto space-y-8 py-16">
              {/* Main Title */}
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight animate-fade-in-up">
                  <span className="block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text text-transparent">
                    PAWAKIT V2.0
                  </span>
                </h1>
                
                {/* Subtitle */}
                <div className="space-y-2">
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in-up animation-delay-100">
                    Tanzania's clean tech innovation
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium">
                    eliminating <span className="text-yellow-300 font-bold">80% of healthcare disruptions</span>
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium">
                    through intelligent power management
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-up animation-delay-200">
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-black font-semibold px-8 py-4 text-lg shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
                  onClick={handleDashboardAccess}
                >
                  <span className="relative z-10 flex items-center">
                    Access Dashboard
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="group relative overflow-hidden border-2 border-white/30 text-white hover:bg-white/5 hover:border-white/50 backdrop-blur-sm px-8 py-4 text-lg transition-all duration-300 hover:-translate-y-0.5"
                  onClick={() => navigate('/contact')}
                >
                  <span className="relative z-10">Learn More</span>
                  <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </div>

              {/* Trust Indicators - Moved below buttons */}
              <div className="pt-16 pb-8 animate-fade-in-up animation-delay-300">
                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 px-4">
                  {[
                    { 
                      icon: <Shield className="h-5 w-5 text-yellow-400" />, 
                      text: 'Secure & Reliable' 
                    },
                    { 
                      icon: <Activity className="h-5 w-5 text-yellow-400" />, 
                      text: 'Real-time Monitoring' 
                    },
                    { 
                      icon: <Users className="h-5 w-5 text-yellow-400" />, 
                      text: 'Healthcare Focused' 
                    }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/10 hover:border-yellow-400/30 transition-all duration-300 cursor-default"
                    >
                      <span className="group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </span>
                      <span className="text-sm sm:text-base text-white font-medium">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Scroll indicator */}
                <div className="mt-8 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm text-yellow-300 mb-2">Scroll to explore</span>
                  <div className="w-6 h-10 border-2 border-yellow-300/50 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse delay-500"></div>
      </section>

      {/* Problem & Solution Section */}
      <section 
        className="relative py-24 bg-gradient-to-b from-background to-muted/30 overflow-hidden scroll-mt-20"
        id="problem"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/lovable-uploads/hospital-emergency.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-2 rounded-full bg-yellow-500/20 border border-yellow-400/30 backdrop-blur-sm mb-6">
                <span className="text-sm font-semibold text-yellow-100 tracking-wide">
                  The Challenge
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                The Hidden Emergency in <span className="text-yellow-300">African Healthcare</span>
              </h2>
            </div>

            {/* Statistics removed as requested */}

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-10 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">The Critical Impact</h3>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 leading-relaxed">
                        Across Sub-Saharan Africa, healthcare facilities face dangerous energy gaps that directly impact patient care. Midwives are forced to deliver babies by flashlight, vaccines spoil due to unreliable refrigeration, and critical care is compromised during power outages.
                      </p>
                      <p className="text-gray-300 leading-relaxed mt-4">
                        Power instability leads to delayed emergency procedures, frequent equipment breakdowns, and unreliable diagnostics. Without consistent electricity, sterilization fails, infection risks increase, and digital health records become unreliable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-24 bg-muted/30 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 backdrop-blur-sm mb-6">
              <span className="text-sm font-semibold text-yellow-100 tracking-wide">
                Core Features
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              What We <span className="text-yellow-500">Deliver</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive solutions designed specifically for healthcare energy management
            </p>
          </div>

          <div className="relative">
            <SlideCarousel 
              itemsPerView={3} 
              className="px-4 md:px-12" 
              autoSlide={true}
              autoSlideInterval={5000} // 5 seconds between slides
              autoSlideMode="pingpong"
              showPagination={true}
              paginationStyle="dots"
              loop={true}
            >
              {[
                {
                  icon: <Activity className="w-8 h-8 text-white" />,
                  title: "Live Monitoring",
                  description: "Real-time device status monitoring with instant alerts and comprehensive analytics",
                  color: "from-blue-500 to-blue-600",
                  border: "border-blue-500/20",
                  iconBg: "bg-blue-500",
                  docPath: "/docs/live-monitoring"
                },
                {
                  icon: <Shield className="w-8 h-8 text-white" />,
                  title: "Smart Alerts",
                  description: "Intelligent notification system that prioritizes critical events and reduces alert fatigue",
                  color: "from-green-500 to-green-600",
                  border: "border-green-500/20",
                  iconBg: "bg-green-500",
                  docPath: "/docs/smart-alerts"
                },
                {
                  icon: <Users className="w-8 h-8 text-white" />,
                  title: "Patient Safety",
                  description: "Enhanced patient care through continuous monitoring of critical medical equipment",
                  color: "from-purple-500 to-purple-600",
                  border: "border-purple-500/20",
                  iconBg: "bg-purple-500",
                  docPath: "/docs/patient-safety"
                },
                {
                  icon: <TrendingUp className="w-8 h-8 text-white" />,
                  title: "Power Analytics",
                  description: "Advanced analytics to optimize energy usage and reduce operational costs",
                  color: "from-yellow-500 to-yellow-600",
                  border: "border-yellow-500/20",
                  iconBg: "bg-yellow-500",
                  docPath: "/docs/power-analytics"
                },
                {
                  icon: <Zap className="w-8 h-8 text-white" />,
                  title: "Predictive Maintenance",
                  description: "AI-powered monitoring to predict and prevent equipment failures before they occur",
                  color: "from-red-500 to-red-600",
                  border: "border-red-500/20",
                  iconBg: "bg-red-500",
                  docPath: "/docs/predictive-maintenance"
                }
              ].map((feature, index) => (
                <div key={index} className="px-2 pb-8">
                  <Card className={`group relative h-full bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-xl border ${feature.border} overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-${feature.iconBg}/10`}>
                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${feature.color}`}></div>
                    <CardHeader className="pt-8 pb-4 px-6">
                      <div className={`mx-auto w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground text-center">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <CardDescription className="text-muted-foreground leading-relaxed text-center">
                        {feature.description}
                      </CardDescription>
                      <div className="mt-6 flex justify-center">
                        <Link to={feature.docPath || "/docs/overview"} className="inline-flex items-center text-sm font-medium text-yellow-400 hover:text-yellow-300 transition-colors duration-300 group">
                          Learn more
                          <ArrowRight className="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </CardContent>
                    <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                    </div>
                  </Card>
                </div>
              ))}
            </SlideCarousel>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-background scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 backdrop-blur-sm mb-6">
              <span className="text-sm font-semibold text-yellow-100 tracking-wide">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Benefits of <span className="text-yellow-500">PAWAKIT V2.0</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your healthcare facility with reliable, intelligent power management solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-yellow-500" />,
                title: "24/7 Reliable Power",
                description: "Ensure continuous operation of critical medical equipment with our uninterruptible power solutions.",
                features: [
                  "Zero downtime for critical equipment",
                  "Automatic failover systems",
                  "Battery backup solutions"
                ],
                color: "from-yellow-500/10 to-yellow-500/5",
                border: "border-yellow-500/20",
                iconBg: "bg-yellow-500/10"
              },
              {
                icon: <Shield className="w-6 h-6 text-green-500" />,
                title: "Equipment Protection",
                description: "Safeguard your valuable medical equipment from power fluctuations and electrical damage.",
                features: [
                  "Surge protection",
                  "Voltage regulation",
                  "Early fault detection"
                ],
                color: "from-green-500/10 to-green-500/5",
                border: "border-green-500/20",
                iconBg: "bg-green-500/10"
              },
              {
                icon: <Users className="w-6 h-6 text-blue-500" />,
                title: "User-Friendly Interface",
                description: "Intuitive controls designed for healthcare professionals with minimal technical training.",
                features: [
                  "Simple touch controls",
                  "Clear status indicators",
                  "Multilingual support"
                ],
                color: "from-blue-500/10 to-blue-500/5",
                border: "border-blue-500/20",
                iconBg: "bg-blue-500/10"
              },
              {
                icon: <Activity className="w-6 h-6 text-purple-500" />,
                title: "Smart Monitoring",
                description: "Real-time insights and alerts to keep your operations running smoothly.",
                features: [
                  "Remote monitoring",
                  "Predictive maintenance",
                  "Energy usage analytics"
                ],
                color: "from-purple-500/10 to-purple-500/5",
                border: "border-purple-500/20",
                iconBg: "bg-purple-500/10"
              }
            ].map((benefit, index) => (
              <div key={index} className="group">
                <div className={`h-full bg-gradient-to-br ${benefit.color} border ${benefit.border} rounded-2xl p-6 transition-all duration-500 hover:shadow-lg hover:-translate-y-2 overflow-hidden relative`}>
                  <div className={`w-12 h-12 ${benefit.iconBg} rounded-xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground mb-4">{benefit.description}</p>
                  <ul className="space-y-2 mt-4">
                    {benefit.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-black font-semibold px-8 py-4 text-lg shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
              onClick={() => navigate('/contact')}
            >
              <span className="relative z-10 flex items-center">
                Request a Demo
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-yellow-500/10 via-primary/20 to-orange-500/10 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-8">
              <CheckCircle className="w-10 h-10 text-black" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Transform Your Hospital's Power Management?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Join leading healthcare facilities already using PAWAKIT for reliable, smart energy monitoring
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-black font-semibold px-8 py-4 text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate('/contact')}
              >
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-foreground/30 text-foreground hover:bg-foreground/10 backdrop-blur-sm px-8 py-4 text-lg transition-all duration-300"
                onClick={() => navigate('/dashboard')}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-muted/30 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 backdrop-blur-sm mb-6">
              <span className="text-sm font-semibold text-yellow-100 tracking-wide">
                Testimonials
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Trusted by <span className="text-yellow-500">Healthcare Professionals</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from medical experts who rely on PAWAKIT for uninterrupted power management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Nahya Salim",
                role: "Pediatrician, Muhimbili National Hospital (MNH)",
                content: "PAWAKIT has transformed how we manage power in our hospital. The real-time monitoring has significantly improved our response to equipment issues.",
                rating: 5,
                color: "yellow"
              },
              {
                name: "Dr. James Mwambene",
                role: "Medical Director, KCMC Hospital",
                content: "The predictive maintenance feature has saved us countless hours and resources. We've seen a 40% reduction in equipment downtime since implementation.",
                rating: 5,
                color: "green"
              },
              {
                name: "Sister Grace Mwakasege",
                role: "Head Nurse, Aga Khan Hospital",
                content: "The system is so intuitive that our staff needed minimal training. The peace of mind knowing our power is stable is invaluable for patient care.",
                rating: 5,
                color: "blue"
              }
            ].map((testimonial, index) => (
              <div key={index} className="group">
                <Card className="h-full bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full bg-${testimonial.color}-500/10 flex items-center justify-center`}>
                        <Users className={`w-6 h-6 text-${testimonial.color}-500`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-foreground">{testimonial.name}</CardTitle>
                        <CardDescription className="text-sm">{testimonial.role}</CardDescription>
                      </div>
                    </div>
                    <div className="flex mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                        />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-muted-foreground leading-relaxed italic">
                      "{testimonial.content}"
                    </blockquote>
                  </CardContent>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Card>
              </div>
            ))}
          </div>

          {/* 'Read More Testimonials' button removed as requested */}
        </div>
      </section>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <RestrictedPopup onSignIn={() => navigate('/pawakit-auth')} />
      
      <Footer />
    </div>
  );
};

export default Index;
