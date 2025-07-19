# EmailJS Setup Guide for Cholo Bondhu Contact Form

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service
1. In your EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Submission - Cholo Bondhu

Hello,

You have received a new contact form submission from your Cholo Bondhu website:

**Contact Details:**
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

**Travel Details:**
Destination: {{destination}}
Check-in Date: {{checkin}}
Number of Travelers: {{travelers}}
Budget: {{budget}}

**Message:**
{{message}}

---
This email was sent from your Cholo Bondhu contact form.
Reply directly to this email to respond to {{from_name}}.
```

4. Save the template and note down your **Template ID**

## Step 4: Get Public Key
1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (also called User ID)

## Step 5: Update Configuration
Open the file `src/app/config/email.config.ts` and replace:

```typescript
export const emailConfig = {
  serviceId: 'YOUR_SERVICE_ID',        // Replace with your Service ID
  templateId: 'YOUR_TEMPLATE_ID',      // Replace with your Template ID
  publicKey: 'YOUR_PUBLIC_KEY',        // Replace with your Public Key
  toEmail: 'your-email@example.com'    // Replace with your email
};
```

## Step 6: Test the Form
1. Save your changes
2. The development server should automatically reload
3. Navigate to your contact form
4. Fill out and submit a test message
5. Check your email for the message

## Troubleshooting
- Make sure your email service is properly configured in EmailJS
- Check the browser console for any error messages
- Verify that all IDs are correctly copied from your EmailJS dashboard
- Ensure your email provider allows sending from EmailJS

## Free Plan Limits
- EmailJS free plan allows 200 emails per month
- For higher volume, consider upgrading to a paid plan

## Security Note
The public key is safe to use in frontend code as it only allows sending emails, not accessing your account.
