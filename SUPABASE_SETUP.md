# Supabase Authentication Setup

This document explains how to set up Supabase authentication for the San Diego Classic Car Detail website.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. A Supabase project created

## Setup Steps

### 1. Create Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

You can find these values in your Supabase project dashboard under Settings > API.

### 2. Configure Supabase Authentication

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Settings
3. Configure the following:

#### Site URL
Set your site URL (for development: `http://localhost:3000`)

#### Redirect URLs
Add redirect URLs for your application:
- Development: `http://localhost:3000/auth/callback`
- Production: `https://yourdomain.com/auth/callback`

#### Email Templates
Customize email templates as needed for:
- Confirm signup
- Reset password
- Magic link

### 3. Database Schema (Optional)

If you want to store additional user information, you can create a `profiles` table:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### 4. Authentication Features

The authentication system includes:

- **User Registration**: Collects first name, last name, email, and phone
- **User Login**: Email and password authentication
- **User Profile**: Displays user information in the navigation
- **Sign Out**: Secure logout functionality
- **Protected Routes**: Middleware to protect authenticated routes (if needed)

### 5. Usage

#### For Users:
1. Click the "Sign In" button in the navigation
2. Switch to "Create Account" to register
3. Fill in the required information (name, email, phone, password)
4. Check email for verification (if email confirmation is enabled)
5. Sign in with email and password

#### For Developers:
- Authentication state is managed by `AuthContext`
- User data is available throughout the app via `useAuth()` hook
- Forms are in `components/auth/` directory
- Supabase client configuration is in `lib/supabase.js`

### 6. Customization

You can customize the authentication forms by editing:
- `components/auth/LoginForm.js` - Login form
- `components/auth/RegisterForm.js` - Registration form
- `components/auth/AuthModal.js` - Modal wrapper

### 7. Security Notes

- Never commit `.env.local` to version control
- Use environment variables for all Supabase configuration
- Enable Row Level Security (RLS) on any custom tables
- Regularly rotate your service role key
- Use HTTPS in production

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables" error**
   - Ensure `.env.local` exists and contains all required variables
   - Restart your development server after adding environment variables

2. **Authentication not working**
   - Check that your Supabase URL and keys are correct
   - Verify redirect URLs are configured in Supabase dashboard
   - Check browser console for errors

3. **Email verification not working**
   - Check Supabase email settings
   - Verify SMTP configuration if using custom email
   - Check spam folder for verification emails

4. **User data not displaying**
   - Ensure user metadata is being saved during registration
   - Check that `getUserDisplayName()` function is working correctly
   - Verify user is properly authenticated

For more help, refer to the [Supabase documentation](https://supabase.com/docs) or check the browser console for error messages.
