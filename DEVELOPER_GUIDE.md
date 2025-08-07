# Windsong Psychiatric Associates - Developer Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Key Components](#key-components)
4. [Chatbot System - Complete Guide](#chatbot-system---complete-guide)
5. [Forms & EmailJS Integration](#forms--emailjs-integration)
6. [Responsive Design System](#responsive-design-system)
7. [Content Management](#content-management)
8. [Development Workflow](#development-workflow)
9. [Troubleshooting Guide](#troubleshooting-guide)
10. [Maintenance Checklist](#maintenance-checklist)

---

## Project Overview

**Windsong Psychiatric Associates** is a React-based website for a mental health practice serving North Carolina, South Carolina, and Maryland. The practice is run by Felicia Davis, MSN, PMHNP-BC, FNP-BC, a board-certified psychiatric nurse practitioner.

### Core Purpose
- Provide information about psychiatric services
- Enable new patient intake through online forms
- Offer comprehensive chatbot support for common questions
- Display practice locations, hours, and contact information
- Handle insurance verification and fee transparency

### Key Practice Information
- **Provider**: Felicia Davis, MSN, PMHNP-BC, FNP-BC
- **Phone**: (980) 585-2019
- **Fax**: (980) 585-2016  
- **Email**: contact@windsongpsychiatric.com
- **Hours**: Monday-Thursday 8:00 AM – 7:00 PM, Friday Closed, Saturday by appointment
- **Services**: Psychiatric evaluations, medication management, telemedicine, injections, geriatric care
- **Age Range**: Adolescents (13+) and adults of all ages

---

## Architecture & Technology Stack

### Core Technologies
- **Frontend**: React 18 with functional components and hooks
- **Routing**: React Router DOM v6
- **Styling**: Custom CSS with responsive design
- **Email**: EmailJS for form submissions
- **Animations**: DotLottie React for animations
- **Build**: Create React App
- **Deployment**: GitHub Pages (assumed)

### Project Structure
```
src/
├── components/          # All React components
├── styles/             # Global styles and icons
├── App.jsx             # Main app component and routing
└── main.jsx           # Entry point

public/
├── index.html         # Main HTML template
└── favicon/           # Favicon files
```

---

## Key Components

### 1. **App.jsx** - Main Router
- Handles all routing with React Router
- Manages scroll-to-top functionality
- Imports and renders all page components

### 2. **Navbar.jsx** - Navigation Header
- Responsive hamburger menu for mobile
- Sticky navigation with scroll effects
- Phone number and logo integration

### 3. **Hero.jsx** - Landing Page Header
- Primary call-to-action for new patients
- Responsive illustration and messaging

### 4. **Services.jsx** - Service Overview
- Grid layout of core services with icons
- Links to detailed services page

### 5. **Provider.jsx** - Felicia Davis Introduction
- Brief provider overview with photo
- Links to full provider page

### 6. **Insurance.jsx** - Insurance Logos
- Visual display of accepted insurance plans
- Responsive logo grid

### 7. **Benefits.jsx** - Why Choose Windsong
- Three key differentiators with icons
- Responsive card layout

### 8. **Locations.jsx** - Office Information
- Three physical locations plus virtual care
- Embedded Google Maps for each location
- Complete address, phone, and hours

### 9. **CTA.jsx** - Call to Action
- Primary conversion section
- Links to new patient form and patient portal

### 10. **Footer.jsx** - Site Footer
- Contact information and quick links
- Responsive layout with multiple sections

### 11. **FixedButtons.jsx** - Floating Action Buttons
- Policies & Fees modal trigger
- Chatbot toggle button
- Mobile-optimized positioning

### 12. **PoliciesModal.jsx** - Policies & Fees Modal
- Tabbed interface for fees and policies
- Complete fee schedule and attendance policy
- Mobile-responsive modal design

### 13. **Chatbot.jsx** - AI Assistant (see detailed section below)

### 14. **Forms** - Patient Intake System
- NewPatientFormFixed.jsx - Multi-step new patient intake
- Multiple specialized forms (consent, release, etc.)
- EmailJS integration for submissions

---

## Chatbot System - Complete Guide

### Overview
The chatbot is the most complex component, designed to handle comprehensive patient inquiries with emotional intelligence appropriate for mental health services.

### Architecture

#### Core Files
- **Chatbot.jsx** - Main component with all logic
- **Chatbot.css** - Complete styling including responsive design

#### Key Features
1. **Persistent Session Storage** - Messages saved across page navigation
2. **Responsive Design** - Different UI for mobile/tablet vs desktop
3. **Intelligent Response Matching** - Keyword scoring system
4. **Link Handling** - Custom navigation with chatbot minimization
5. **Emotional Intelligence** - Crisis detection and empathetic responses

### Response System Architecture

#### 1. Response Structure
Each response object contains:
```javascript
responseKey: {
  keywords: ['trigger', 'words', 'phrases'],
  priority: 1-10, // Higher number = higher priority
  response: 'Static text' || function(input) { return 'Dynamic text'; },
  type: 'greeting'|'info'|'support'|'crisis'|'action',
  followUp: { // Optional
    text: 'Follow-up message',
    button: { text: 'Button Text', link: '/path' }
  }
}
```

#### 2. Response Categories (Current Implementation)

**High Priority (Crisis & Support)**
- `emotionalSupport` - For users expressing distress
- `crisis` - Emergency situations
- `crisisResources` - Mental health crisis resources

**Core Information**
- `greeting` - Welcome messages with name detection
- `services` - Complete service overview
- `providerInfo` - Felicia Davis background and credentials
- `insurance` - Insurance coverage details
- `locationContact` - Office locations and contact info
- `telehealth` - Virtual appointment information

**Specific Queries**
- `appointment` - Scheduling process
- `newPatient` - New patient onboarding
- `sessionCosts` - Fees and pricing
- `attendancePolicy` - Cancellation policies
- `ageEligibility` - Age requirements and specializations
- `forms` - Patient forms and paperwork

**Advanced Features**
- `conditionTreatment` - Specific mental health conditions
- `specificServices` - Injections, cognitive assessments, etc.
- `whyChoose` - Practice benefits and differentiators

#### 3. Intelligent Matching System

**Priority Levels:**
1. **Crisis Detection** (Always first priority)
2. **Emotional Support** (Second priority)  
3. **Scored Matching** (All other responses)

**Scoring Algorithm:**
- Keyword length bonus (longer phrases score higher)
- Exact match bonus (+50 points)
- Multiple keyword bonus (+10 per additional match)
- Priority multiplier (score × priority level)
- Best score wins

### How to Update Chatbot Responses

#### Adding New Responses
1. **Open** `src/components/Chatbot.jsx`
2. **Find** the `responses` object (around line 35)
3. **Add new response** following this template:

```javascript
newResponseKey: {
  keywords: ['keyword1', 'phrase to match', 'another trigger'],
  priority: 7, // 1-10, higher = more important
  response: 'Your response text with <strong>HTML formatting</strong>',
  type: 'info', // or 'support', 'crisis', 'action', 'greeting'
  followUp: { // Optional
    text: 'Follow-up message',
    button: { text: 'Button Text', link: '/page-link' }
  }
},
```

#### Updating Existing Responses
1. **Find the response key** you want to update
2. **Modify keywords** to improve matching
3. **Update response text** with new information
4. **Test thoroughly** with various phrasings

#### Response Writing Best Practices
1. **Use HTML formatting**: `<strong>text</strong>` for emphasis
2. **Structure with bullets**: Use • or numbered lists
3. **Include links**: `<a href="/page">Link text</a>` 
4. **Be empathetic**: Especially for mental health context
5. **Provide actions**: Give users clear next steps
6. **Keep concise**: But thorough enough to be helpful

#### Testing New Responses
1. **Add keywords** that users might actually type
2. **Test variations**: "How much does it cost" vs "what are your fees"
3. **Check mobile**: Ensure formatting works on small screens
4. **Verify links**: Make sure all links work correctly

### Mobile/Responsive Behavior

#### Key Features
- **Bottom sheet design** on mobile/tablet
- **Different titles**: "Chat" on mobile, "Windsong Assistant" on desktop  
- **Link handling**: Auto-minimize on mobile when links are clicked
- **Scroll preservation**: Maintains position across navigation
- **Touch-optimized**: Larger buttons and touch targets

#### Responsive Breakpoints
- **Mobile**: ≤767px (bottom sheet, simplified UI)
- **Tablet**: 768-1024px (bottom sheet, medium UI)
- **Desktop**: >1024px (floating window, full UI)

### Session Management
- **Messages persist** across page navigation using `sessionStorage`
- **Scroll position saved** when navigating via links
- **State restoration** when chatbot is reopened
- **Auto-scroll** to latest bot message

---

## Forms & EmailJS Integration

### EmailJS Configuration

#### Service Setup
- **Service ID**: `service_idvcxum`
- **Public Key**: `wFQLtLxDwWnkGF0TF`
- **Recipient**: `contact@windsongpsychiatric.com`

#### Template IDs by Form
- **New Patient Form**: `template_xjaha0n`
- **Financial Responsibility Form**: `template_thdv17m`

### Form Components

#### NewPatientFormFixed.jsx - Main Intake Form
**Steps:**
1. Who is seeking care?
2. What support are you looking for?
3. Previous mental health care?
4. Appointment type preference?  
5. Availability times?
6. Personal & insurance information
7. Additional notes
8. Success confirmation

**Key Features:**
- Multi-step progress indicator
- Validation for each step
- Insurance provider selection with logos
- Conditional fields based on responses
- EmailJS integration for submission

#### Other Forms
- **ConsentForTreatmentForm.jsx** - Treatment consent
- **ReleaseOfInfoForm.jsx** - Information release authorization
- **AttendancePolicyForm.jsx** - Policy acknowledgment  
- **FinancialResponsibilityForm.jsx** - Payment responsibility
- **NeurolepticConsentForm.jsx** - Medication consent
- **PatientReferralForm.jsx** - Referral information

### Updating Forms

#### Adding New Fields
1. **Update formData state** with new field
2. **Add validation** in `validateStep()` function
3. **Create form UI** for the field
4. **Update EmailJS template** parameters
5. **Test submission** end-to-end

#### Modifying EmailJS Templates
1. **Log into EmailJS dashboard**
2. **Edit template** with new variables
3. **Update template parameters** in form component
4. **Test with real submission**

---

## Responsive Design System

### Breakpoint Strategy
```css
/* Mobile First Approach */
/* Base styles: Mobile (up to 767px) */

/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1025px) { }

/* Mobile-specific detection for chatbot */
@media (max-width: 767px), 
       (max-device-width: 767px), 
       screen and (max-width: 430px) and (-webkit-min-device-pixel-ratio: 2) { }
```

### Key Responsive Components

#### Navbar
- **Mobile**: Hamburger menu with overlay
- **Desktop**: Horizontal navigation with all links visible

#### Chatbot  
- **Mobile**: Bottom sheet covering 90% of screen
- **Desktop**: Floating window in bottom-right corner

#### Forms
- **Mobile**: Single column layout, larger touch targets
- **Desktop**: Multi-column layout where appropriate

#### Grid Layouts
- **Services**: 1 column mobile, 2-3 columns desktop
- **Insurance logos**: Responsive flex wrap
- **Locations**: Stacked mobile, grid desktop

### CSS Organization
- **Component-specific CSS** files for each component
- **Global styles** in `src/styles/`
- **Icons.css** for shared icon styles
- **Consistent spacing** using CSS custom properties

---

## Content Management

### Key Content Areas

#### Provider Information (Felicia Davis)
**Location**: `src/components/About.jsx`
**Contains**:
- Full educational background
- Clinical experience summary  
- Practice philosophy and mission
- Professional credentials

#### Services Information
**Locations**: 
- `src/components/Services.jsx` (overview)
- `src/components/ServicesPage.jsx` (detailed)

**Services Covered**:
- Psychiatric Evaluations
- Medication Management  
- Telemedicine
- Specialized Care
- Injections
- Prevention & Wellness
- Geriatric Care

#### Insurance Information
**Location**: `src/components/Insurance.jsx`
**Accepted Plans**:
- Tricare, Blue Cross Blue Shield
- Medicaid, Medicare
- Humana, United Healthcare  
- Cigna, Aetna, Partners

#### Location Information
**Location**: `src/components/Locations.jsx`
**Offices**:
1. **Huntersville, NC**: 9820 Northcross Center Court, Suite 50
2. **Fort Mill, SC**: 975 Market Street, Suite 201-F  
3. **Baltimore, MD**: 33 S. Gay Street, Suite 202
4. **Virtual Care**: Available in NC, SC, MD, GA, VA, DC, FL

#### Policies & Fees
**Location**: `src/components/PoliciesModal.jsx`
**Contains**:
- Service fees (New patient: $280, Follow-up: $140)
- Cancellation policies (24-hour notice required)
- Late fees ($50 late cancel, $120 no-show)
- Payment options (insurance, HSA/FSA, cards)

### Updating Content

#### Text Changes
1. **Find the component** containing the content
2. **Edit the JSX** directly in the component file
3. **Update chatbot responses** if information changed
4. **Test display** on all screen sizes
5. **Commit changes** with descriptive message

#### Adding New Services
1. **Update Services.jsx** with new service card
2. **Add to ServicesPage.jsx** with detailed information
3. **Update chatbot responses** to include new service
4. **Add to new patient form** if relevant
5. **Update any marketing copy** mentioning services

#### Changing Contact Information
**Files to Update**:
- `src/components/Footer.jsx`
- `src/components/Contact.jsx`
- `src/components/Locations.jsx`
- `src/components/Chatbot.jsx` (contact response)
- `src/components/NewPatientFormFixed.jsx` (EmailJS config)

---

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Git Workflow & Commit Standards

#### Important Commit Rules
1. **NEVER mention AI, Claude, GPT, or automated generation** in commit messages
2. **Always use**: `Authored by: Brandi Kinard <brandi.kinard@gmail.com>`
3. **Be descriptive** about what changed and why
4. **Test thoroughly** before committing

#### Commit Message Template
```
Brief description of changes

- Specific change 1
- Specific change 2  
- Specific change 3

Detailed explanation if needed.

Authored by: Brandi Kinard <brandi.kinard@gmail.com>
```

#### Example Good Commit Messages
```
Fix mobile navigation overlay positioning

- Adjust z-index for mobile menu overlay
- Fix hamburger menu toggle state
- Improve touch targets for mobile navigation
- Ensure proper layering on all screen sizes

Authored by: Brandi Kinard <brandi.kinard@gmail.com>
```

### Testing Checklist
Before any commit:
- [ ] Test on mobile (iPhone/Android)
- [ ] Test on tablet (iPad)  
- [ ] Test on desktop
- [ ] Check all forms work
- [ ] Verify chatbot responses
- [ ] Test all navigation links
- [ ] Check responsive design
- [ ] Validate HTML/CSS
- [ ] Test EmailJS submissions

---

## Troubleshooting Guide

### Common Issues & Solutions

#### Chatbot Not Responding Correctly
**Problem**: User input not matching expected responses
**Solution**:
1. Check keyword matching in response object
2. Add more keyword variations
3. Verify priority scoring is correct
4. Test with actual user phrases

#### Mobile Layout Issues
**Problem**: Components not displaying correctly on mobile
**Solution**:
1. Check media queries in component CSS
2. Verify responsive breakpoints
3. Test on actual devices, not just browser resize
4. Check for overflow issues

#### Form Submission Failures
**Problem**: EmailJS submissions not working
**Solution**:
1. Verify EmailJS service configuration
2. Check template parameter mapping
3. Confirm template IDs are correct
3. Test network connectivity
4. Check browser console for errors

#### Modal Not Opening
**Problem**: Policies & Fees modal not displaying
**Solution**:
1. Check modal state management
2. Verify click handlers are attached
3. Check CSS z-index stacking
4. Ensure overlay click detection works

### Browser Compatibility
**Supported Browsers**:
- Chrome 90+ (primary target)
- Safari 14+ (iOS compatibility)
- Firefox 88+
- Edge 90+

**Testing Priority**:
1. Mobile Safari (iPhone)
2. Mobile Chrome (Android)
3. Desktop Chrome
4. Desktop Safari

### Performance Considerations
- **Lazy loading** implemented for images
- **Code splitting** for large components
- **Session storage** used instead of local storage
- **Optimized images** from GitHub CDN

---

## Maintenance Checklist

### Weekly Tasks
- [ ] Test chatbot with new common questions
- [ ] Check EmailJS form submissions
- [ ] Verify all links work correctly
- [ ] Test mobile responsiveness

### Monthly Tasks  
- [ ] Review chatbot analytics (if available)
- [ ] Update provider information if needed
- [ ] Check insurance plan accuracy
- [ ] Test all forms end-to-end
- [ ] Review and update FAQ responses

### Quarterly Tasks
- [ ] Update service offerings
- [ ] Review and update fees/policies
- [ ] Check for new insurance plans
- [ ] Update provider credentials
- [ ] Review site performance

### Annual Tasks
- [ ] Complete content audit
- [ ] Update copyright year
- [ ] Review all policies and procedures
- [ ] Update provider photos if needed
- [ ] Comprehensive security review

### Emergency Updates
**For urgent changes (fees, hours, contact info)**:
1. **Update content** in relevant components
2. **Update chatbot responses** immediately  
3. **Test thoroughly** but quickly
4. **Deploy immediately** if critical
5. **Document changes** for future reference

---

## Important Notes for Future Development

### DO NOT BREAK
- **EmailJS integration** - Forms are critical for business
- **Mobile responsiveness** - Most users are on mobile
- **Chatbot session persistence** - Users expect conversations to continue
- **Crisis detection** - Mental health context requires immediate crisis response

### ALWAYS REMEMBER
- **This is a mental health practice** - Tone and empathy matter
- **Users may be in crisis** - Quick access to help is vital
- **Professional appearance** - Design reflects practice quality
- **HIPAA considerations** - Be mindful of privacy requirements

### FUTURE ENHANCEMENTS TO CONSIDER
- Analytics integration (Google Analytics, etc.)
- Online appointment scheduling
- Patient portal integration
- More sophisticated chatbot with ML
- Multi-language support
- Accessibility improvements (WCAG compliance)
- SEO optimization

---

*This guide should be updated whenever significant changes are made to the system. Keep it current for future developers and maintenance.*