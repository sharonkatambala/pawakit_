import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Eye, Target, Heart, Users, Shield, Lightbulb, Handshake, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const About = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const teamMembers = [
    {
      name: "Staphod Mwahalende",
      title: "Chief Executive Officer (CEO) & Technical Lead",
      image: "/lovable-uploads/james-luhanga.png"
    },
    {
      name: "Zaima Marine",
      title: "Chief Operating Officer (COO)",
      image: "/lovable-uploads/zaima-marine.png"
    },
    {
      name: "James Luhanga",
      title: "Chief Technology Officer (CTO)",
      image: "/lovable-uploads/staphod-mwahalende.png"
    },
    {
      name: "Sharon Katambala",
      title: "Artificial Intelligence & Web Systems Lead",
      image: "/lovable-uploads/dina-ngiga.png"
    },
    {
      name: "Dina Ngiga",
      title: "Stakeholder Engagement Lead (SEL)",
      image: "/lovable-uploads/sharon-katambala.png"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 backdrop-blur-sm mb-6">
              <span className="text-sm font-semibold text-yellow-100 tracking-wide">
                About Pawakit
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Engineering Resilient Healthcare
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're transforming healthcare delivery across Africa through intelligent power management and sustainable biomedical technology solutions.
            </p>
          </div>
        </div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </section>

      {/* Motto Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center mb-8">
              <Zap className="w-12 h-12 text-primary mr-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Motto</h2>
            </div>
            <div className="bg-gradient-to-r from-primary/20 via-yellow-400/20 to-orange-400/20 rounded-2xl p-12 border border-primary/30 backdrop-blur-sm">
              <h3 className="text-4xl md:text-5xl font-black text-center bg-gradient-to-r from-primary via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-6">
                Smart Energy. Resilient Clinics. Health That Lasts.
              </h3>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                A bold promise to engineer intelligent power systems that strengthen healthcare delivery—wherever it's needed most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="glass hover-lift border-primary/20 transition-all duration-500">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">Vision Statement</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed text-center">
                  To transform healthcare in Africa by ensuring every facility—no matter how remote—has access to safe, reliable, and sustainable biomedical technology. Our vision is powered by shared value, local innovation, and radical accountability.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass hover-lift border-green-500/20 transition-all duration-500">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">Mission Statement</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed text-center">
                  We empower biomedical professionals and health facilities through high-quality device servicing, co-created solutions, and an equity-based ownership model that rewards real contribution and measurable impact.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <Heart className="w-12 h-12 text-primary mr-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Core Values</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="glass hover-lift border-blue-500/20 transition-all duration-500 text-center">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  We build systems that work, even in the toughest conditions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass hover-lift border-green-500/20 transition-all duration-500 text-center">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Equity</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  We believe ownership and impact should be shared.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass hover-lift border-purple-500/20 transition-all duration-500 text-center">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-4">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  We fuse engineering with empathy to solve real-world problems.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass hover-lift border-orange-500/20 transition-all duration-500 text-center">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  We operate with clarity, honesty, and measurable outcomes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass hover-lift border-teal-500/20 transition-all duration-500 text-center md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-4">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  We co-create with communities, not just for them.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Strategic Focus Areas */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Strategic Focus Areas</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our core competencies driving healthcare transformation
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              "Medical Device Servicing & Safety",
              "Smart Power Systems for Health Facilities", 
              "AI-Driven Monitoring & Predictive Maintenance",
              "Equitable Ownership & Contribution-Based Models",
              "Stakeholder Engagement & Public Health Alignment"
            ].map((area, index) => (
              <div key={index} className="flex items-center space-x-4 p-6 rounded-xl bg-muted/30 border border-primary/20 hover:border-primary/40 transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-medium text-foreground">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Pawakit Exists */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-yellow-400/10 to-orange-400/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Why Pawakit Exists</h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p className="bg-background/80 backdrop-blur-sm rounded-xl p-8 border border-primary/20">
                Because no clinic should lose a life due to power failure.
              </p>
              <p className="bg-background/80 backdrop-blur-sm rounded-xl p-8 border border-primary/20">
                Because biomedical talent deserves tools that match their potential.
              </p>
              <p className="bg-background/80 backdrop-blur-sm rounded-xl p-8 border border-primary/20">
                Because innovation must serve—not just impress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the passionate innovators behind Pawakit's mission to transform healthcare energy management
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* First Row - 3 members */}
            <div className="grid md:grid-cols-3 gap-8 mb-8 justify-items-center">
              {teamMembers.slice(0, 3).map((member, index) => (
                <Card key={index} className="glass hover-lift border-primary/20 transition-all duration-500 text-center group w-full max-w-sm">
                  <CardHeader className="pb-4">
                    <div className="relative mx-auto mb-4">
                      <div className="w-64 h-80 mx-auto rounded-xl overflow-hidden bg-muted/20 transition-all duration-300 shadow-lg">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground mb-2">{member.name}</CardTitle>
                    <CardDescription className="text-sm font-semibold text-primary">{member.title}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
            
            {/* Second Row - 2 members */}
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto justify-items-center">
              {teamMembers.slice(3).map((member, index) => (
                <Card key={index + 3} className="glass hover-lift border-primary/20 transition-all duration-500 text-center group w-full max-w-sm">
                  <CardHeader className="pb-4">
                    <div className="relative mx-auto mb-4">
                      <div className="w-64 h-80 mx-auto rounded-xl overflow-hidden bg-muted/20 transition-all duration-300 shadow-lg">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground mb-2">{member.name}</CardTitle>
                    <CardDescription className="text-sm font-semibold text-primary">{member.title}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;