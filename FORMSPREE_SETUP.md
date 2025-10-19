# Formspree Setup Guide for Joy Events

## Step 1: Create Formspree Account
1. Go to [formspree.io](https://formspree.io)
2. Sign up for a free account using `joypartythess@gmail.com`
3. Verify your email address

## Step 2: Create a New Form
1. In your Formspree dashboard, click "New Form"
2. Choose "React" as your framework
3. Set the form name to "Joy Events Contact Forms"
4. Set the redirect URL to your website (optional)

## Step 3: Get Your Form Endpoint
1. After creating the form, copy the form endpoint URL
2. It will look like: `https://formspree.io/f/xbjnbznw`
3. Replace `YOUR_FORM_ID` in `/components/FormspreeService.tsx` with your actual form ID

## Step 4: Configure Form Settings
In your Formspree dashboard, configure:

### Email Settings:
- **Send to**: `joypartythess@gmail.com`
- **Reply-to**: Use the submitter's email
- **Subject**: Joy Events - Form Submission

### Spam Protection:
- Enable reCAPTCHA (recommended)
- Enable honeypot protection

### Notifications:
- Enable email notifications for new submissions
- Set up webhook notifications if needed

## Step 5: Update the Code
1. Open `/components/FormspreeService.tsx`
2. Replace the `FORMSPREE_ENDPOINT` with your actual endpoint:
   ```typescript
   private static readonly FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_ACTUAL_FORM_ID'
   ```

## Step 6: Test the Integration
1. Submit a test form from each form type:
   - Contact form
   - Program booking
   - Partner application
   - Team application
   - Review form
2. Check your email for submissions
3. Verify all data is being sent correctly

## Form Types Supported:
- **Contact**: General inquiries
- **Program Booking**: Event booking requests
- **Partner**: Partnership applications
- **Team**: Job applications
- **Review**: Customer reviews

## Email Template Structure:
Each form submission will include:
- Form type identification
- All user-provided data
- Language preference
- Submission timestamp
- Professional email formatting

## Free Plan Limitations:
- 50 submissions per month
- Formspree branding in emails
- Basic spam protection

## Upgrade Benefits:
- Unlimited submissions
- Remove Formspree branding
- Advanced spam protection
- Custom redirects
- Webhooks
- File uploads

## Troubleshooting:
1. **Forms not sending**: Check the endpoint URL
2. **Emails not received**: Check spam folder, verify email settings
3. **Validation errors**: Check required field configuration
4. **CORS errors**: Ensure domain is whitelisted in Formspree settings

## Security Notes:
- Never expose sensitive data in form submissions
- All data is transmitted securely via HTTPS
- Formspree handles spam protection automatically
- Consider GDPR compliance for EU customers