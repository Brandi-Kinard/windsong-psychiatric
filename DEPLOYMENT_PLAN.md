# Windsong Psychiatric Website Deployment Plan

## Phase 1: Email Migration (Do First!)
1. Set up Google Workspace or Zoho Mail
2. Update MX records to point to new email provider
3. Test email thoroughly before proceeding
4. Keep Wix active during this phase

## Phase 2: Domain Preparation
1. Purchase windsongpsych.com from Namecheap/Google Domains
2. Transfer existing domains away from Wix (if they're there)
3. Keep all domains with same registrar for easier management

## Phase 3: Deploy to Vercel
1. Connect GitHub repo to Vercel
2. Configure build settings:
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
3. Deploy and test on Vercel's temporary URL

## Phase 4: Connect Domains
1. In Vercel:
   - Add windsongpsych.com as primary domain
   - Add windsongpsychiatric.com as redirect
   - Add windsongpsychiatry.com as redirect
2. Update DNS records at your registrar:
   - A record pointing to Vercel's IP
   - CNAME for www subdomain
3. Wait for DNS propagation (up to 48 hours)

## Phase 5: Decommission Wix
1. Only after confirming:
   - Email works perfectly
   - All domains redirect properly
   - New site is fully functional
2. Export any remaining Wix data
3. Cancel Wix subscription

## Important Considerations
- Keep backups of everything
- Don't rush - overlap services during transition
- Test thoroughly at each step
- Document all passwords and settings

## Ongoing Maintenance
- Vercel auto-deploys when you push to GitHub
- Domain renewals yearly
- Email service monthly/yearly
- SSL certificates handled automatically by Vercel