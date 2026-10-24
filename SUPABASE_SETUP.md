# Supabase Google OAuth Setup Guide

This guide will walk you through setting up Google OAuth authentication with Supabase for the DishaAI project.

---

## 📋 Prerequisites

- A Google account
- A Supabase account (free tier works fine)
- Node.js and npm installed
- This project cloned locally

---

## 🚀 Step-by-Step Setup

### **Step 1: Create Supabase Project**

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign in"**
3. Sign up/Sign in (GitHub login recommended)
4. Click **"New Project"**
5. Fill in the details:
   - **Name**: `DishaAI` (or your preferred name)
   - **Database Password**: Create a strong password and **save it securely**
   - **Region**: Choose closest to your location (e.g., US East, EU West)
   - **Pricing Plan**: Select **Free** tier
6. Click **"Create new project"**
7. Wait 1-2 minutes for provisioning

---

### **Step 2: Get Supabase Credentials**

1. In your Supabase dashboard, click the **⚙️ Settings** icon (bottom left)
2. Go to **API** under "Configuration"
3. Copy the following:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: Long string starting with `eyJ...`
   
   ⚠️ **Important**: Do NOT use the `service_role` key (that's for server-side only)

4. Save these for Step 5

---

### **Step 3: Set Up Google Cloud Project**

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Sign in with your Google account
3. Click the **project dropdown** (top left)
4. Click **"New Project"**
   - **Project Name**: `DishaAI`
   - Click **"Create"**
5. Wait for creation, then select the new project

---

### **Step 4: Configure OAuth Consent Screen**

1. In Google Cloud Console, search for **"OAuth consent screen"** in the top search bar
2. Click on **OAuth consent screen** from results
3. Select **External** user type
4. Click **"Create"**
5. Fill in **required fields**:
   - **App name**: `DishaAI`
   - **User support email**: Your email
   - **Developer contact email**: Your email
6. Click **"Save and Continue"**
7. On **Scopes** page: Click **"Save and Continue"** (skip this)
8. On **Test users** page: Click **"Save and Continue"** (skip this)
9. Click **"Back to Dashboard"**

---

### **Step 5: Create OAuth 2.0 Credentials**

1. In left sidebar, go to **APIs & Services** → **Credentials**
2. Click **"+ CREATE CREDENTIALS"** (top button)
3. Select **"OAuth client ID"**
4. Choose **Application type**: **Web application**
5. Set **Name**: `DishaAI Web Client`
6. Under **Authorized redirect URIs**:
   - Click **"+ Add URI"**
   - Paste your Supabase callback URL:
     ```
     https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback
     ```
     Replace `xxxxxxxxxxxxx` with your actual Supabase project ID from Step 2
7. Click **"Create"**
8. A popup will show your credentials:
   - **Client ID**: Copy this
   - **Client Secret**: Copy this
9. Click **"OK"**

---

### **Step 6: Configure Google Provider in Supabase**

1. Go back to your **Supabase Dashboard**
2. Navigate to **Authentication** (left sidebar)
3. Click on **Providers**
4. Scroll down and find **Google**
5. Toggle **Enable** to ON
6. Paste your Google credentials:
   - **Client ID**: From Step 5
   - **Client Secret**: From Step 5
7. Click **"Save"**

---

### **Step 7: Configure Frontend Environment Variables**

1. In your project, navigate to `frontend/` folder
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
3. Open `.env` and update with your Supabase credentials from Step 2:
   ```env
   VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

---

### **Step 8: Install Dependencies & Run**

1. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open browser: [http://localhost:5173/login](http://localhost:5173/login)

4. Click **"Continue with Google"** and test the login!

---

## ✅ Verification Checklist

- [ ] Supabase project created and running
- [ ] Supabase URL and anon key copied
- [ ] Google Cloud project created
- [ ] OAuth consent screen configured
- [ ] OAuth 2.0 credentials created
- [ ] Redirect URI added to Google credentials
- [ ] Google provider enabled in Supabase
- [ ] Client ID and Secret added to Supabase
- [ ] `.env` file created with credentials
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Login page accessible
- [ ] Google sign-in works

---

## 🔧 Troubleshooting

### **Issue: "This site can't be reached" after Google login**

**Cause**: Wrong Supabase URL in `.env` file

**Solution**: 
1. Check your `.env` file
2. Ensure URL matches exactly from Supabase dashboard
3. No trailing slashes or `/rest/v1/`
4. Restart dev server after changing `.env`

---

### **Issue: "redirect_uri_mismatch" error**

**Cause**: Google redirect URI doesn't match Supabase callback URL

**Solution**:
1. Go to Google Cloud Console → Credentials
2. Edit your OAuth client
3. Make sure redirect URI is:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```
4. Save changes
5. Wait 5 minutes for Google to propagate changes

---

### **Issue: Login button does nothing**

**Cause**: Missing or incorrect Supabase credentials

**Solution**:
1. Check browser console for errors (F12)
2. Verify `.env` file exists in `frontend/` folder
3. Verify credentials are correct
4. Restart dev server (`Ctrl+C` then `npm run dev`)

---

### **Issue: User redirected but not logged in**

**Cause**: Google provider not enabled in Supabase

**Solution**:
1. Go to Supabase Dashboard → Authentication → Providers
2. Find Google provider
3. Toggle it ON
4. Add Client ID and Secret
5. Click Save

---

## 📁 Project Structure

```
DishaAI/
├── frontend/
│   ├── src/
│   │   ├── lib/
│   │   │   └── supabase.ts          # Supabase client
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx      # Auth state management
│   │   ├── pages/
│   │   │   ├── login.tsx            # Login page
│   │   │   └── login.css            # Login styles
│   │   └── App.tsx                  # Main app with AuthProvider
│   ├── .env                         # Your credentials (DO NOT COMMIT)
│   ├── .env.example                 # Template for other developers
│   └── package.json
├── backend/
│   └── ...
└── SUPABASE_SETUP.md               # This file
```

---

## 🔒 Security Notes

1. **Never commit `.env` file** to git (it's in `.gitignore`)
2. **Never share your `service_role` key** publicly
3. The `anon` key is safe to use in frontend (it's public)
4. Use Supabase Row Level Security (RLS) for database access control
5. Rotate credentials if accidentally exposed

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [React + Supabase Tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-react)

---

## 🆘 Need Help?

If you're stuck:
1. Check the troubleshooting section above
2. Review the verification checklist
3. Check browser console for errors (F12)
4. Verify all credentials are correct
5. Make sure dev server is running

---

**Setup complete! 🎉 Your Google OAuth authentication is now ready to use.**
