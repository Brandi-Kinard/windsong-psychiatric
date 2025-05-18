# EmailJS Setup Guide

## Steps to Set Up EmailJS

1. **Create an EmailJS Account**
   - Go to [emailjs.com](https://www.emailjs.com/)
   - Sign up for a free account

2. **Add an Email Service**
   - Go to "Email Services" in your dashboard
   - Click "Add New Service"
   - Choose your email provider (Gmail works well)
   - Follow the authentication steps
   - Note your **Service ID** (looks like: `service_abc123`)

3. **Create an Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Set up your template:

   **Subject**: `{{subject}}`
   
   **Content**:
   ```
   From: {{from_name}} ({{from_email}})
   
   {{message}}
   ```

   - In the "To email" field, use: `{{to_email}}`
   - Note your **Template ID** (looks like: `template_xyz789`)

4. **Get Your Public Key**
   - Go to "Account" → "API Keys"
   - Copy your **Public Key** (looks like: `ABC123xyz`)

5. **Update the Code**
   In `src/components/NewPatientForm.jsx`, replace:
   ```javascript
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
   const TEST_EMAIL = 'your-test-email@gmail.com';
   ```

6. **Test the Form**
   - Keep `TEST_MODE = true` initially
   - Submit a test form
   - Check your test email

7. **Go Live**
   - Set `TEST_MODE = false` when ready
   - Forms will then go to the production email