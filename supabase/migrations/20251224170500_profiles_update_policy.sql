-- Allow authenticated users to update their own profile
-- This enables saving profile info from the client app while respecting RLS.

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

GRANT UPDATE ON TABLE public.profiles TO authenticated;
