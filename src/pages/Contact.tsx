import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, MapPin, Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

const Contact = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you within 24 hours.");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contact <span className="text-yellow-400">PAWAKIT</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your hospital's energy management? Get in touch with our team
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-400">Get in Touch</CardTitle>
                <CardDescription className="text-gray-400">
                  We're here to help you implement smart energy monitoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-400">Pawakit8@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <p className="text-gray-400">+255 694 352 388</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-white font-medium">Address</p>
                    <p className="text-gray-400">Muhimbili, Dar es salaam Tanzania</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-400">Business Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Monday - Friday</span>
                  <span className="text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Saturday</span>
                  <span className="text-white">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sunday</span>
                  <span className="text-white">Emergency Only</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Forms */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="hospital" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger value="hospital" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
                  Hospitals
                </TabsTrigger>
                <TabsTrigger value="investor" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
                  Investors
                </TabsTrigger>
                <TabsTrigger value="partner" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
                  Partners
                </TabsTrigger>
              </TabsList>

              <TabsContent value="hospital">
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Hospital Contact Form</CardTitle>
                    <CardDescription className="text-gray-400">
                      Request a demo or consultation for your healthcare facility
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-white">First Name</Label>
                          <Input
                            id="firstName"
                            required
                            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-white">Last Name</Label>
                          <Input
                            id="lastName"
                            required
                            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hospital" className="text-white">Hospital Name</Label>
                        <Input
                          id="hospital"
                          required
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position" className="text-white">Position</Label>
                        <Select>
                          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                            <SelectValue placeholder="Select your position" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="admin">Hospital Administrator</SelectItem>
                            <SelectItem value="ceo">CEO/Director</SelectItem>
                            <SelectItem value="engineer">Biomedical Engineer</SelectItem>
                            <SelectItem value="technician">Maintenance Manager</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="beds" className="text-white">Number of Beds</Label>
                        <Select>
                          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                            <SelectValue placeholder="Select hospital size" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="small">Under 100 beds</SelectItem>
                            <SelectItem value="medium">100-300 beds</SelectItem>
                            <SelectItem value="large">300-500 beds</SelectItem>
                            <SelectItem value="xlarge">500+ beds</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-white">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your power monitoring needs..."
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending..." : "Request Demo"}
                        <Send className="ml-2 w-4 h-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="investor">
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Investor Contact Form</CardTitle>
                    <CardDescription className="text-gray-400">
                      Interested in investing in healthcare technology innovation?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-white">First Name</Label>
                          <Input
                            id="firstName"
                            required
                            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-white">Last Name</Label>
                          <Input
                            id="lastName"
                            required
                            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-white">Company/Fund Name</Label>
                        <Input
                          id="company"
                          required
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="investmentType" className="text-white">Investment Type</Label>
                        <Select>
                          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                            <SelectValue placeholder="Select investment type" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="seed">Seed Funding</SelectItem>
                            <SelectItem value="series-a">Series A</SelectItem>
                            <SelectItem value="series-b">Series B</SelectItem>
                            <SelectItem value="strategic">Strategic Investment</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-white">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your investment interests..."
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending..." : "Send Message"}
                        <Send className="ml-2 w-4 h-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="partner">
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Partnership Contact Form</CardTitle>
                    <CardDescription className="text-gray-400">
                      Let's explore partnership opportunities in healthcare technology
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-white">First Name</Label>
                          <Input
                            id="firstName"
                            required
                            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-white">Last Name</Label>
                          <Input
                            id="lastName"
                            required
                            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-white">Company Name</Label>
                        <Input
                          id="company"
                          required
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partnershipType" className="text-white">Partnership Type</Label>
                        <Select>
                          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                            <SelectValue placeholder="Select partnership type" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="technology">Technology Integration</SelectItem>
                            <SelectItem value="distribution">Distribution Partner</SelectItem>
                            <SelectItem value="reseller">Reseller Partner</SelectItem>
                            <SelectItem value="oem">OEM Partnership</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-white">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Describe your partnership proposal..."
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending..." : "Send Proposal"}
                        <Send className="ml-2 w-4 h-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
