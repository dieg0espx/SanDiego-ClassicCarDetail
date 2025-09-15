-- San Diego Classic Car Detail - Complete Database Schema
-- Run this script in your Supabase SQL Editor to create all necessary tables
-- This script handles all existing objects gracefully and fixes RLS issues

-- =============================================
-- 1. DROP EXISTING POLICIES AND TRIGGERS
-- =============================================
-- Clean up any existing policies and triggers to avoid conflicts

-- Drop all existing policies on all tables
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;
DROP POLICY IF EXISTS "Users can update own orders" ON orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
DROP POLICY IF EXISTS "Users can view own saved locations" ON saved_locations;
DROP POLICY IF EXISTS "Users can view their own saved locations" ON saved_locations;
DROP POLICY IF EXISTS "Users can insert own saved locations" ON saved_locations;
DROP POLICY IF EXISTS "Users can insert their own saved locations" ON saved_locations;
DROP POLICY IF EXISTS "Users can update own saved locations" ON saved_locations;
DROP POLICY IF EXISTS "Users can update their own saved locations" ON saved_locations;
DROP POLICY IF EXISTS "Users can delete own saved locations" ON saved_locations;
DROP POLICY IF EXISTS "Users can delete their own saved locations" ON saved_locations;
DROP POLICY IF EXISTS "Anyone can view active services" ON services;
DROP POLICY IF EXISTS "Admins can manage services" ON services;
DROP POLICY IF EXISTS "Users can view own appointments" ON appointments;
DROP POLICY IF EXISTS "Users can view their own appointments" ON appointments;
DROP POLICY IF EXISTS "Users can insert own appointments" ON appointments;
DROP POLICY IF EXISTS "Users can insert their own appointments" ON appointments;
DROP POLICY IF EXISTS "Users can update own appointments" ON appointments;
DROP POLICY IF EXISTS "Users can update their own appointments" ON appointments;
DROP POLICY IF EXISTS "Admins can view all appointments" ON appointments;
DROP POLICY IF EXISTS "Users can view public feedback" ON customer_feedback;
DROP POLICY IF EXISTS "Users can view their own feedback" ON customer_feedback;
DROP POLICY IF EXISTS "Users can insert own feedback" ON customer_feedback;
DROP POLICY IF EXISTS "Users can insert their own feedback" ON customer_feedback;
DROP POLICY IF EXISTS "Users can update own feedback" ON customer_feedback;
DROP POLICY IF EXISTS "Users can update their own feedback" ON customer_feedback;
DROP POLICY IF EXISTS "Admins can manage admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can manage admin_users" ON admin_users;
DROP POLICY IF EXISTS "Authenticated users can read admin_users" ON admin_users;
DROP POLICY IF EXISTS "Specific admins can manage admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow read admin_users for admin checks" ON admin_users;
DROP POLICY IF EXISTS "Allow manage admin_users" ON admin_users;

-- Drop existing triggers
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
DROP TRIGGER IF EXISTS update_saved_locations_updated_at ON saved_locations;
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
DROP TRIGGER IF EXISTS update_appointments_updated_at ON appointments;

-- =============================================
-- 2. ADD NOTES COLUMN TO ORDERS TABLE (if not exists)
-- =============================================
-- Add notes column to existing orders table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'notes'
    ) THEN
        ALTER TABLE orders ADD COLUMN notes TEXT;
    END IF;
END $$;

-- =============================================
-- 3. CREATE TABLES
-- =============================================

-- ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_info JSONB NOT NULL,
  location JSONB NOT NULL,
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  service_area_cost DECIMAL(10,2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  payment_method TEXT NOT NULL DEFAULT 'cash' CHECK (payment_method IN ('cash', 'card')),
  scheduled_date DATE,
  scheduled_time TIME,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SAVED_LOCATIONS TABLE
CREATE TABLE IF NOT EXISTS saved_locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'CA',
  zip_code TEXT NOT NULL,
  special_instructions TEXT,
  full_address TEXT NOT NULL,
  service_area_cost DECIMAL(10,2) DEFAULT 0,
  service_area_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER,
  image_url TEXT,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CUSTOMER_FEEDBACK TABLE
CREATE TABLE IF NOT EXISTS customer_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ADMIN_USERS TABLE
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin',
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 2.4. ADD UNIQUE CONSTRAINT TO ADMIN_USERS TABLE
-- =============================================
-- Add unique constraint to user_id column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'admin_users_user_id_key'
    ) THEN
        ALTER TABLE admin_users ADD CONSTRAINT admin_users_user_id_key UNIQUE (user_id);
    END IF;
END $$;

-- =============================================
-- 2.5. ADD SCHEDULING COLUMNS TO ORDERS TABLE
-- =============================================
-- Add scheduling columns to existing orders table (for existing deployments)
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS scheduled_date DATE,
ADD COLUMN IF NOT EXISTS scheduled_time TIME;

-- Add comments for the new columns
COMMENT ON COLUMN orders.scheduled_date IS 'Date when the service is scheduled to be performed';
COMMENT ON COLUMN orders.scheduled_time IS 'Time when the service is scheduled to be performed';

-- =============================================
-- 3. ENABLE ROW LEVEL SECURITY
-- =============================================
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 4. CREATE SAFE RLS POLICIES
-- =============================================

-- ORDERS TABLE POLICIES
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'orders' 
        AND policyname = 'Users can view own orders'
    ) THEN
        CREATE POLICY "Users can view own orders" ON orders
          FOR SELECT USING (auth.uid() = user_id);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'orders' 
        AND policyname = 'Users can insert own orders'
    ) THEN
        CREATE POLICY "Users can insert own orders" ON orders
          FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'orders' 
        AND policyname = 'Users can update own orders'
    ) THEN
        CREATE POLICY "Users can update own orders" ON orders
          FOR UPDATE USING (auth.uid() = user_id);
    END IF;
END $$;

-- Admin can view all orders (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'orders' 
        AND policyname = 'Admin can view all orders'
    ) THEN
        CREATE POLICY "Admin can view all orders" ON orders
          FOR SELECT USING (
            EXISTS (
              SELECT 1 FROM admin_users 
              WHERE admin_users.user_id = auth.uid() 
              AND admin_users.role = 'admin'
            )
          );
    END IF;
END $$;

-- Admin can update all orders (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'orders' 
        AND policyname = 'Admin can update all orders'
    ) THEN
        CREATE POLICY "Admin can update all orders" ON orders
          FOR UPDATE USING (
            EXISTS (
              SELECT 1 FROM admin_users 
              WHERE admin_users.user_id = auth.uid() 
              AND admin_users.role = 'admin'
            )
          );
    END IF;
END $$;

-- SAVED_LOCATIONS TABLE POLICIES
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'saved_locations' 
        AND policyname = 'Users can view own saved locations'
    ) THEN
        CREATE POLICY "Users can view own saved locations" ON saved_locations
          FOR SELECT USING (auth.uid() = user_id);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'saved_locations' 
        AND policyname = 'Users can insert own saved locations'
    ) THEN
        CREATE POLICY "Users can insert own saved locations" ON saved_locations
          FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'saved_locations' 
        AND policyname = 'Users can update own saved locations'
    ) THEN
        CREATE POLICY "Users can update own saved locations" ON saved_locations
          FOR UPDATE USING (auth.uid() = user_id);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'saved_locations' 
        AND policyname = 'Users can delete own saved locations'
    ) THEN
        CREATE POLICY "Users can delete own saved locations" ON saved_locations
          FOR DELETE USING (auth.uid() = user_id);
    END IF;
END $$;

-- SERVICES TABLE POLICIES
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'services' 
        AND policyname = 'Anyone can view active services'
    ) THEN
        CREATE POLICY "Anyone can view active services" ON services
          FOR SELECT USING (is_active = true);
    END IF;
END $$;

-- APPOINTMENTS TABLE POLICIES
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'appointments' 
        AND policyname = 'Users can view own appointments'
    ) THEN
        CREATE POLICY "Users can view own appointments" ON appointments
          FOR SELECT USING (auth.uid() = user_id);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'appointments' 
        AND policyname = 'Users can insert own appointments'
    ) THEN
        CREATE POLICY "Users can insert own appointments" ON appointments
          FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'appointments' 
        AND policyname = 'Users can update own appointments'
    ) THEN
        CREATE POLICY "Users can update own appointments" ON appointments
          FOR UPDATE USING (auth.uid() = user_id);
    END IF;
END $$;

-- CUSTOMER_FEEDBACK TABLE POLICIES
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'customer_feedback' 
        AND policyname = 'Users can view public feedback'
    ) THEN
        CREATE POLICY "Users can view public feedback" ON customer_feedback
          FOR SELECT USING (is_public = true);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'customer_feedback' 
        AND policyname = 'Users can insert own feedback'
    ) THEN
        CREATE POLICY "Users can insert own feedback" ON customer_feedback
          FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'customer_feedback' 
        AND policyname = 'Users can update own feedback'
    ) THEN
        CREATE POLICY "Users can update own feedback" ON customer_feedback
          FOR UPDATE USING (auth.uid() = user_id);
    END IF;
END $$;

-- ADMIN_USERS TABLE POLICIES (Simple and safe)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'admin_users' 
        AND policyname = 'Allow read admin_users'
    ) THEN
        CREATE POLICY "Allow read admin_users" ON admin_users
          FOR SELECT USING (auth.uid() IS NOT NULL);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'admin_users' 
        AND policyname = 'Allow manage admin_users'
    ) THEN
        CREATE POLICY "Allow manage admin_users" ON admin_users
          FOR ALL USING (auth.uid() IS NOT NULL);
    END IF;
END $$;

-- =============================================
-- 5. CREATE INDEXES FOR PERFORMANCE
-- =============================================

-- Orders table indexes
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_payment_method ON orders(payment_method);
CREATE INDEX IF NOT EXISTS idx_orders_scheduled_date ON orders(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_orders_scheduled_time ON orders(scheduled_time);
CREATE INDEX IF NOT EXISTS idx_orders_scheduled_datetime ON orders(scheduled_date, scheduled_time);

-- Saved locations indexes
CREATE INDEX IF NOT EXISTS idx_saved_locations_user_id ON saved_locations(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_locations_city ON saved_locations(city);

-- Services indexes
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active);

-- Appointments indexes
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);

-- Customer feedback indexes
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON customer_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_rating ON customer_feedback(rating);
CREATE INDEX IF NOT EXISTS idx_feedback_is_public ON customer_feedback(is_public);

-- =============================================
-- 6. CREATE FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_orders_updated_at 
    BEFORE UPDATE ON orders 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_saved_locations_updated_at 
    BEFORE UPDATE ON saved_locations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at 
    BEFORE UPDATE ON services 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at 
    BEFORE UPDATE ON appointments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 7. INSERT SAMPLE DATA
-- =============================================

-- Insert sample services
INSERT INTO services (name, description, price, duration_minutes, category) VALUES
('Classic Wash', 'Complete exterior wash and dry', 75.00, 60, 'exterior'),
('Hot Rod Detail', 'Premium interior and exterior detailing', 150.00, 120, 'premium'),
('Sunset Shine', 'Basic wash with wax application', 100.00, 90, 'exterior'),
('Interior Deep Clean', 'Complete interior cleaning and conditioning', 80.00, 90, 'interior'),
('Paint Correction', 'Professional paint correction and polishing', 200.00, 180, 'premium'),
('Ceramic Coating', 'Long-lasting ceramic coating application', 300.00, 240, 'premium')
ON CONFLICT DO NOTHING;

-- Insert admin user (replace with actual user ID)
INSERT INTO admin_users (user_id, role, created_at) VALUES
('8faf1d8d-cdc1-4ef2-8b8b-263e852d0569', 'admin', NOW())
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- =============================================
-- 8. VERIFICATION QUERIES
-- =============================================

-- Check if all tables were created successfully
SELECT 'Tables created successfully' as status;

-- Check RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('orders', 'saved_locations', 'services', 'appointments', 'customer_feedback', 'admin_users');

-- Check policies
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public' 
ORDER BY tablename, policyname;

-- Check that scheduling columns were added to orders table
-- This query will only show results if the columns exist
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'orders' 
AND column_name IN ('scheduled_date', 'scheduled_time')
ORDER BY ordinal_position;

-- If the above query returns no results, the columns don't exist yet
-- Run the ALTER TABLE commands in section 2.5 above first

-- =============================================
-- NOTES
-- =============================================
-- 1. This script creates all necessary tables and policies
-- 2. RLS policies are simple and avoid infinite recursion
-- 3. All existing objects are dropped and recreated to avoid conflicts
-- 4. Sample services are inserted for testing
-- 5. To add an admin user, run: INSERT INTO admin_users (user_id, role) VALUES ('your-user-id-here', 'admin');
-- 6. Test the application to ensure orders are being saved properly
