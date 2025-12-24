import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Hospital, Users, Wrench, UserCheck, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const getAuthErrorMessage = (error: any) => {
  const raw = String(error?.message ?? 'Authentication failed');
  const lower = raw.toLowerCase();

  if (lower.includes('email not confirmed')) {
    return 'Email not confirmed. Use “Resend confirmation email”, then try again.';
  }

  if (lower.includes('invalid login credentials')) {
    return 'Invalid email or password.';
  }

  if (lower.includes('user already registered')) {
    return 'An account with this email already exists. Please sign in instead.';
  }

  if (lower.includes('requested path is invalid') || lower.includes('redirect')) {
    return 'Email link could not be sent due to a redirect URL configuration issue.';
  }

  return raw;
};

export default function PawakitAuth() {
  const navigate = useNavigate();
  const {
    login,
    signup,
    loading,
    isLoggedIn,
    requestPasswordReset,
    resendConfirmationEmail,
  } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const busy = isLoading || loading;

  useEffect(() => {
    if (!loading && isLoggedIn) {
      navigate('/dashboard', { replace: true });
    }
  }, [isLoggedIn, loading, navigate]);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'clinical_staff' as const,
    referenceNumber: ''
  });

  const roleOptions = [
    { value: 'hospital_super_admin', label: 'Hospital Super Admin', icon: Hospital, description: 'Manage entire hospital operations' },
    { value: 'department_sub_admin', label: 'Department Sub-Admin', icon: Users, description: 'Manage specific department' },
    { value: 'engineer', label: 'Engineer/Technician', icon: Wrench, description: 'Technical device management' },
    { value: 'clinical_staff', label: 'Clinical Staff', icon: UserCheck, description: 'Doctors, Nurses, Attendants' },
    { value: 'external_stakeholder', label: 'External Stakeholder', icon: Eye, description: 'Read-only compliance access' }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const { error } = await login(loginData.email, loginData.password);

    if (error) {
      toast.error(getAuthErrorMessage(error));
    } else {
      toast.success('Login successful!');
      navigate('/dashboard');
    }
    setIsLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!loginData.email) {
      toast.error('Enter your email first');
      return;
    }

    setIsLoading(true);
    const { error } = await requestPasswordReset(loginData.email);

    if (error) {
      toast.error(getAuthErrorMessage(error));
      if (String(error?.message ?? '').toLowerCase().includes('requested path is invalid')) {
        toast.info('Fix in Supabase: Authentication → URL Configuration → add your app URL to Redirect URLs.');
      }
    } else {
      toast.success('Password reset email sent. Please check your inbox.');
    }

    setIsLoading(false);
  };

  const handleResendConfirmation = async () => {
    if (!loginData.email) {
      toast.error('Enter your email first');
      return;
    }

    setIsLoading(true);
    const { error } = await resendConfirmationEmail(loginData.email);

    if (error) {
      toast.error(getAuthErrorMessage(error));
      if (String(error?.message ?? '').toLowerCase().includes('requested path is invalid')) {
        toast.info('Fix in Supabase: Authentication → URL Configuration → add your app URL to Redirect URLs.');
      }
    } else {
      toast.success('Confirmation email sent. Please check your inbox.');
    }

    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.firstName || !signupData.lastName || !signupData.email || !signupData.password || !signupData.referenceNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (signupData.referenceNumber !== 'PAWAV1-8301') {
      toast.error('Invalid reference number. Please contact administration for the correct reference code.');
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (signupData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    const { error } = await signup(
      signupData.firstName,
      signupData.lastName,
      signupData.email,
      signupData.password,
      signupData.role
    );

    if (error) {
      toast.error(getAuthErrorMessage(error));
      if (String(error?.message ?? '').toLowerCase().includes('requested path is invalid')) {
        toast.info('Fix in Supabase: Authentication → URL Configuration → add your app URL to Redirect URLs.');
      }
    } else {
      toast.success('Account created successfully! If email confirmation is enabled, check your inbox.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">PAWAKIT Access Portal</h1>
          <p className="text-muted-foreground">
            Advanced Hospital Device Monitoring & Management System
          </p>
        </div>

        <Card className="shadow-xl border-border/50 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">Authentication Required</CardTitle>
            <CardDescription>
              Access your department's monitoring dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email Address</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your.name@hospital.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      disabled={busy}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      disabled={busy}
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <Button
                      type="button"
                      variant="link"
                      className="h-auto p-0 text-muted-foreground"
                      onClick={handleForgotPassword}
                      disabled={busy}
                    >
                      Forgot password?
                    </Button>

                    <Button
                      type="button"
                      variant="link"
                      className="h-auto p-0 text-muted-foreground"
                      onClick={handleResendConfirmation}
                      disabled={busy}
                    >
                      Resend confirmation email
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={busy}
                  >
                    {busy ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-firstname">First Name</Label>
                      <Input
                        id="signup-firstname"
                        placeholder="Staphod"
                        value={signupData.firstName}
                        onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                        disabled={busy}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-lastname">Last Name</Label>
                      <Input
                        id="signup-lastname"
                        placeholder="Mwahalende"
                        value={signupData.lastName}
                        onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                        disabled={busy}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your.name@hospital.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      disabled={busy}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-reference">Reference Number</Label>
                    <Input
                      id="signup-reference"
                      type="text"
                      placeholder="Enter reference number"
                      value={signupData.referenceNumber}
                      onChange={(e) => setSignupData({ ...signupData, referenceNumber: e.target.value })}
                      disabled={busy}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Reference number provided by PAWAKIT administration
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-role">Role</Label>
                    <Select
                      value={signupData.role}
                      onValueChange={(value) => setSignupData({ ...signupData, role: value as typeof signupData.role })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((role) => {
                          const IconComponent = role.icon;
                          return (
                            <SelectItem key={role.value} value={role.value}>
                              <div className="flex items-center space-x-2">
                                <IconComponent className="w-4 h-4" />
                                <div>
                                  <div className="font-medium">{role.label}</div>
                                  <div className="text-xs text-muted-foreground">{role.description}</div>
                                </div>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showSignupPassword ? 'text' : 'password'}
                          placeholder="Minimum 6 characters"
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          disabled={busy}
                          required
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground"
                          onClick={() => setShowSignupPassword((v) => !v)}
                          disabled={busy}
                          aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                        >
                          {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="signup-confirm"
                          type={showSignupPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                          disabled={busy}
                          required
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground"
                          onClick={() => setShowSignupPassword((v) => !v)}
                          disabled={busy}
                          aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                        >
                          {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={busy}
                  >
                    {busy ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}