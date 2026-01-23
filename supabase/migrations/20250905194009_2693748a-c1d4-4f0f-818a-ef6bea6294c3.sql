-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM (
  'super_super_admin',
  'hospital_super_admin', 
  'department_sub_admin',
  'engineer',
  'clinical_staff',
  'external_stakeholder'
);

-- Create enum for device status
CREATE TYPE public.device_status AS ENUM (
  'active',
  'inactive', 
  'maintenance',
  'disconnected',
  'error'
);

-- Create enum for alert types
CREATE TYPE public.alert_type AS ENUM (
  'technical',
  'safety',
  'maintenance',
  'compliance'
);

-- Create hospitals table
CREATE TABLE public.hospitals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create departments table  
CREATE TABLE public.departments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hospital_id UUID NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  hospital_id UUID REFERENCES public.hospitals(id) ON DELETE CASCADE,
  department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role app_role NOT NULL DEFAULT 'clinical_staff',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pawakit_units table
CREATE TABLE public.pawakit_units (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  department_id UUID NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
  unit_name TEXT NOT NULL,
  serial_number TEXT UNIQUE NOT NULL,
  total_ports INTEGER NOT NULL DEFAULT 8,
  installed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_maintenance TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create devices table
CREATE TABLE public.devices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pawakit_unit_id UUID NOT NULL REFERENCES public.pawakit_units(id) ON DELETE CASCADE,
  device_name TEXT NOT NULL,
  model_number TEXT NOT NULL,
  serial_number TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  rated_power DECIMAL(10,2) NOT NULL,
  operating_voltage DECIMAL(8,2),
  assigned_port INTEGER,
  status device_status DEFAULT 'inactive',
  registered_by UUID REFERENCES public.profiles(id),
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(pawakit_unit_id, assigned_port)
);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id UUID NOT NULL REFERENCES public.devices(id) ON DELETE CASCADE,
  alert_type alert_type NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  message TEXT NOT NULL,
  technical_details JSONB,
  acknowledged BOOLEAN DEFAULT false,
  acknowledged_by UUID REFERENCES public.profiles(id),
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  resolved BOOLEAN DEFAULT false,
  resolved_by UUID REFERENCES public.profiles(id),
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create audit_logs table
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pawakit_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = _user_id
      AND role = _role
      AND is_active = true
  )
$$;

-- Create function to get user hospital
CREATE OR REPLACE FUNCTION public.get_user_hospital(_user_id UUID)
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT hospital_id
  FROM public.profiles
  WHERE id = _user_id
    AND is_active = true
$$;

-- Create function to get user department
CREATE OR REPLACE FUNCTION public.get_user_department(_user_id UUID)
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT department_id
  FROM public.profiles
  WHERE id = _user_id
    AND is_active = true
$$;

-- RLS Policies for hospitals
CREATE POLICY "Super Super Admin can view all hospitals"
ON public.hospitals FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'super_super_admin'));

CREATE POLICY "Hospital admins can view their hospital"
ON public.hospitals FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_super_admin') OR
  (public.has_role(auth.uid(), 'hospital_super_admin') AND id = public.get_user_hospital(auth.uid()))
);

-- RLS Policies for departments
CREATE POLICY "Users can view departments in their hospital"
ON public.departments FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_super_admin') OR
  hospital_id = public.get_user_hospital(auth.uid())
);

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "Super admins can view all profiles in their scope"
ON public.profiles FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_super_admin') OR
  (public.has_role(auth.uid(), 'hospital_super_admin') AND hospital_id = public.get_user_hospital(auth.uid())) OR
  (public.has_role(auth.uid(), 'department_sub_admin') AND department_id = public.get_user_department(auth.uid()))
);

-- RLS Policies for pawakit_units
CREATE POLICY "Users can view units in their hospital/department"
ON public.pawakit_units FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_super_admin') OR
  department_id IN (
    SELECT d.id FROM public.departments d
    WHERE d.hospital_id = public.get_user_hospital(auth.uid())
  ) OR
  department_id = public.get_user_department(auth.uid())
);

-- RLS Policies for devices
CREATE POLICY "Users can view devices in their scope"
ON public.devices FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_super_admin') OR
  pawakit_unit_id IN (
    SELECT pu.id FROM public.pawakit_units pu
    JOIN public.departments d ON pu.department_id = d.id
    WHERE d.hospital_id = public.get_user_hospital(auth.uid())
      OR pu.department_id = public.get_user_department(auth.uid())
  )
);

-- RLS Policies for alerts
CREATE POLICY "Users can view alerts in their scope"
ON public.alerts FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_super_admin') OR
  device_id IN (
    SELECT dev.id FROM public.devices dev
    JOIN public.pawakit_units pu ON dev.pawakit_unit_id = pu.id
    JOIN public.departments d ON pu.department_id = d.id
    WHERE d.hospital_id = public.get_user_hospital(auth.uid())
      OR pu.department_id = public.get_user_department(auth.uid())
  )
);

-- RLS Policies for audit_logs
CREATE POLICY "Users can view audit logs in their scope"
ON public.audit_logs FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_super_admin') OR
  user_id IN (
    SELECT p.id FROM public.profiles p
    WHERE p.hospital_id = public.get_user_hospital(auth.uid())
      OR p.department_id = public.get_user_department(auth.uid())
  )
);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', 'User'),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', ''),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data ->> 'role')::app_role, 'clinical_staff'::app_role)
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_hospitals_updated_at
  BEFORE UPDATE ON public.hospitals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_departments_updated_at
  BEFORE UPDATE ON public.departments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pawakit_units_updated_at
  BEFORE UPDATE ON public.pawakit_units
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_devices_updated_at
  BEFORE UPDATE ON public.devices
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();