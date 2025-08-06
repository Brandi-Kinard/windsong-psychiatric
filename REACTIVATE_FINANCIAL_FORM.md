# Financial Responsibility Form - Reactivation Instructions

## Current Status: TEMPORARILY HIDDEN
The Patient Financial Responsibility form has been temporarily hidden pending EmailJS subscription upgrade from 6 to unlimited form templates.

## Files That Need Reactivation:

### 1. `/src/App.jsx`
**Lines 28 and 85:** Uncomment the import and route:
```jsx
// CURRENTLY:
// import FinancialResponsibilityForm from './components/FinancialResponsibilityForm';
// {/* <Route path="/financial-responsibility" element={<FinancialResponsibilityForm />} /> */}

// CHANGE TO:
import FinancialResponsibilityForm from './components/FinancialResponsibilityForm';
<Route path="/financial-responsibility" element={<FinancialResponsibilityForm />} />
```

### 2. `/src/components/PatientForms.jsx`
**Lines 29-32:** Uncomment the success message handler:
```jsx
// CURRENTLY:
// } else if (sessionStorage.getItem('financialPolicySubmitted') === 'true') {
//   message = 'Patient Financial Responsibility and Payment Policy form was successfully submitted!';
//   sessionStorage.removeItem('financialPolicySubmitted');
// }

// CHANGE TO:
} else if (sessionStorage.getItem('financialPolicySubmitted') === 'true') {
  message = 'Patient Financial Responsibility and Payment Policy form was successfully submitted!';
  sessionStorage.removeItem('financialPolicySubmitted');
}
```

**Lines 74-78:** Uncomment the form card:
```jsx
// CURRENTLY:
// {
//   title: 'Patient Financial Responsibility',
//   link: '/financial-responsibility',
//   external: false
// }

// CHANGE TO:
{
  title: 'Patient Financial Responsibility',
  link: '/financial-responsibility',
  external: false
}
```

### 3. `/src/components/FinancialResponsibilityForm.jsx`
**Line 18:** Update the EmailJS template ID:
```jsx
// CURRENTLY:
const EMAILJS_TEMPLATE_ID = 'template_placeholder'; // Placeholder - will be updated

// CHANGE TO:
const EMAILJS_TEMPLATE_ID = 'YOUR_NEW_TEMPLATE_ID'; // Replace with actual EmailJS template ID
```

## EmailJS Template
The template content is ready in `/emailjs-templates/financial-responsibility-template.html`

## Files Ready (No Changes Needed):
- ✅ FinancialResponsibilityForm.jsx (component)
- ✅ FinancialResponsibilityForm.css (styling) 
- ✅ emailjs-templates/financial-responsibility-template.html (EmailJS template)

## Steps to Reactivate:
1. Upgrade EmailJS subscription to unlimited templates
2. Create new template in EmailJS using content from `financial-responsibility-template.html`
3. Get the new template ID from EmailJS
4. Uncomment the 3 sections mentioned above
5. Update the template ID in FinancialResponsibilityForm.jsx
6. Test the form submission

The form is fully implemented and styled to match your site's branding. It just needs to be uncommented and connected to the EmailJS template.