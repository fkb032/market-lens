# Code Passport: Brazil Audit
**Project:** acme-ecommerce
**Date:** 2026-03-05
**Scanned:** 847 files across 62 directories

---

## Score: 52/100

**CRITICAL issues:** 3
**Warnings:** 11
**Passing:** 38
**Not applicable:** 19 (excluded from scoring)

## Low-Bandwidth Score: 68/100

---

## Critical Issues (Must Fix)

### 1. No Pix payment integration
**Category:** Payments
**File:** src/lib/payments/gateway.ts:23
**Finding:** Payment gateway only configures Stripe with USD credit card processing. No Pix integration found anywhere in the codebase.
**Fix:** Integrate Pix via a Brazilian payment gateway (Pagarme, Stone, or Mercado Pago). Pix is the most-used payment method in Brazil with 150M+ users. Without it, you're losing a significant share of potential transactions.

### 2. No CPF field at checkout
**Category:** Identity and CPF
**File:** src/components/checkout/CheckoutForm.tsx:45-89
**Finding:** Checkout form collects name, email, address, and card details but no CPF field. CPF is required for any credit card transaction in Brazil.
**Fix:** Add a CPF input field (format: XXX.XXX.XXX-XX) with mod-11 checksum validation. Place it near the payment section. Use an input mask for auto-formatting.

### 3. No cookie consent mechanism
**Category:** Legal, Compliance, and LGPD
**File:** src/app/layout.tsx
**Finding:** No cookie consent banner, no consent management library, and no cookie preference storage found. The site loads Google Analytics, Meta Pixel, and Hotjar without consent. This violates LGPD.
**Fix:** Add a cookie consent banner with granular category controls (essential, analytics, marketing). Block non-essential scripts until consent is given.

---

## Warnings (Should Fix)

### 1. Currency formatted as USD
**Category:** Currency and Formatting
**File:** src/utils/formatPrice.ts:12
**Finding:** `formatPrice()` uses `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })`. Three components call this function: `ProductCard.tsx:34`, `CartSummary.tsx:67`, `CheckoutTotal.tsx:22`.
**Fix:** Change locale to `pt-BR` and currency to `BRL`. Output should be R$ 1.299,90 format.

### 2. No installment display on product pages
**Category:** Payments
**File:** src/components/product/ProductPrice.tsx:18
**Finding:** Product price component only renders the full price. No installment breakdown shown. Brazilian shoppers expect to see "12x de R$ XX,XX sem juros" alongside the full price.
**Fix:** Add installment calculation below the price. Show the monthly amount and whether interest-free.

### 3. No Reclame Aqui reference
**Category:** Trust Signals
**File:** (not found)
**Finding:** No reference to "Reclame Aqui" or "reclameaqui" found anywhere in the codebase. Reclame Aqui is the most important trust signal in Brazilian e-commerce.
**Fix:** Add your Reclame Aqui rating or link in the footer. If you don't have a Reclame Aqui page yet, create one.

### 4. CNPJ not displayed
**Category:** Trust Signals
**File:** src/components/layout/Footer.tsx:12-45
**Finding:** Footer contains company name, copyright, and social media links but no CNPJ.
**Fix:** Add your CNPJ (format: XX.XXX.XXX/XXXX-XX) to the footer component.

### 5. WhatsApp contact missing
**Category:** Communication and WhatsApp
**File:** src/components/layout/Header.tsx:8, src/pages/contact.tsx:15
**Finding:** Header has email and phone icons. Contact page lists email and a contact form. No WhatsApp link found anywhere.
**Fix:** Add a WhatsApp contact button using the wa.me/[number] link format.

### 6. No boleto payment option
**Category:** Payments
**File:** src/lib/payments/gateway.ts:23
**Finding:** Only credit card payment configured via Stripe. No boleto bancario option.
**Fix:** Add boleto via a Brazilian payment gateway. Include clear messaging about expiration (3-5 days) and processing time (1-3 business days).

### 7. European Portuguese detected in copy
**Category:** Copy and Tone
**File:** src/i18n/pt.json:145
**Finding:** Line 145 uses "contacto" (European Portuguese). Brazilian Portuguese uses "contato". Also found "telemovel" on line 203 (should be "celular") and "autocarro" on line 287 (should be "onibus").
**Fix:** Review pt.json for European Portuguese conventions. Have a native Brazilian Portuguese speaker review the full file.

### 8. Date format uses MM/DD/YYYY
**Category:** Currency and Formatting
**File:** src/utils/formatDate.ts:8
**Finding:** `formatDate()` outputs dates as MM/DD/YYYY (US format). Brazil uses DD/MM/YYYY.
**Fix:** Change date formatting to DD/MM/YYYY for the pt-BR locale.

### 9. No CEP auto-fill
**Category:** Forms and Data Collection
**File:** src/components/checkout/AddressForm.tsx:30-75
**Finding:** Address form has a CEP field but no auto-fill integration. Users must manually enter street, neighborhood, city, and state.
**Fix:** Integrate the ViaCEP API (free). When user enters CEP, auto-populate street, bairro, city, and state.

### 10. No account deletion mechanism
**Category:** Legal, Compliance, and LGPD
**File:** src/pages/account/settings.tsx:20-80
**Finding:** Account settings allows password change and email update but no option to delete account or request data deletion. LGPD requires this.
**Fix:** Add a "Delete my account" flow or a "Request data deletion" link.

### 11. Phone number not accepted as account identifier
**Category:** SMS and Verification
**File:** src/lib/auth/providers.ts:5-20
**Finding:** Signup and login flows are email-only. Many Brazilians are phone-first. Phone number login or signup is not supported.
**Fix:** Add phone number as an alternative account identifier for signup and login.

---

## Passing Checks

**Trust Signals:**
- Physical address visible - `src/components/layout/Footer.tsx:38`
- Phone number visible - `src/components/layout/Footer.tsx:41`
- Security seals present - `src/components/layout/Footer.tsx:52` (Comodo SSL badge)
- Nota fiscal integration - `src/lib/checkout/invoice.ts:12` (NFe generation via Focusnfe API)

**Identity and CPF:**
- CPF in signup flow - `src/components/auth/SignupForm.tsx:56`

**Communication and WhatsApp:**
- WhatsApp as support channel - `src/pages/support.tsx:22` (WhatsApp listed in support page text, but no clickable link)

**Copy and Tone:**
- Copy is in Brazilian Portuguese - `src/i18n/pt.json` (pt-BR locale file present)
- Not Spanish - no Spanish language strings detected
- Tone is warm and informal - copy uses "voce", conversational style, appropriate warmth
- Error messages are helpful - `src/i18n/pt.json:300-340` (validation messages in clear Portuguese)

**Forms and Data Collection:**
- Name field accommodates Brazilian names - `src/components/forms/NameInput.tsx:8` (single "Nome completo" field)
- Address includes Complemento - `src/components/checkout/AddressForm.tsx:55`
- Phone field accepts Brazilian format - `src/components/forms/PhoneInput.tsx:22` (validates 11-digit mobile with DDD)

**Social Login and Identity Verification:**
- Facebook login available - `src/lib/auth/providers.ts:12`
- Instagram login available - `src/lib/auth/providers.ts:18`
- Social account signals surfaced - `src/components/profile/TrustBadge.tsx:30`

**Legal, Compliance, and LGPD:**
- Privacy policy exists in Portuguese - `src/pages/privacy.tsx`
- Privacy policy states data collection purposes - `src/pages/privacy.tsx:15-80`
- Data processing consent is explicit - `src/components/auth/SignupForm.tsx:72`
- DPO contact listed - `src/pages/privacy.tsx:92`
- Consent revocation mechanism - `src/pages/account/settings.tsx:65`
- Return policy displayed - `src/pages/returns.tsx`
- Transparent pricing - no hidden fees added at checkout
- Delivery timeframe commitments - `src/components/checkout/ShippingOptions.tsx:18`

**Localization Infrastructure:**
- pt-BR locale configured - `src/i18n/config.ts:3`
- hreflang tag present - `src/app/layout.tsx:15`
- Portuguese 404 page - `src/app/not-found.tsx`

**Social, Cultural, and Safety:**
- Referral flow supports WhatsApp - `src/components/referral/ShareModal.tsx:25`

**Identity Exposure:**
- Profile photo optional - `src/models/User.ts:18`
- Block functionality exists - `src/components/reviews/ReviewCard.tsx:45`

**Low-Bandwidth Resilience:**
- Image optimization - `next.config.mjs` (Next.js Image with automatic WebP)
- No auto-playing video - no video elements with autoplay found
- Responsive to 360px - `tailwind.config.js:14`
- No auto-playing GIFs - no large GIF or Lottie files detected

---

## Not Applicable

- Boleto expiration messaging - no boleto integration exists (see Warning #6)
- Pix discount displayed - no Pix integration exists (see Critical #1)
- Installments in pricing model - not a SaaS/subscription product
- WhatsApp link format - no WhatsApp link exists to validate (see Warning #5)
- Platform leakage strategy - not a marketplace
- Promotional calendar - no promotional/holiday logic found in codebase
- Southern Hemisphere seasonal awareness - no seasonal marketing content in codebase
- Safe meetup features - not a marketplace
- In-app payment promoted over cash - not a marketplace
- Timezone handling for BRT - no date/time logic that requires timezone awareness found
- Portuguese transactional emails - email templates not in codebase
- Portuguese loading and empty states - app uses skeleton loaders without text
- Local card acquirer support - using Stripe (see Critical #1)
- SMS OTP for verification - no SMS integration found

---

## Manual Review Checklist

These items require human judgment and can't be fully verified from code alone:

- [ ] December/Christmas promotional content uses summer imagery (not snow/winter)
- [ ] Brand's Reclame Aqui page is actively monitored and has a good rating
- [ ] Customer support team includes Portuguese-speaking agents on WhatsApp
- [ ] Installment pricing model accounts for interest absorption costs
- [ ] Portuguese copy reads naturally to a native Brazilian speaker
- [ ] Physical address in footer is a real, verifiable Brazilian address

---

## Additional Observations

- **Signup flow asks for "Company Name" but not CNPJ.** For B2B sales in Brazil, CNPJ is the standard business identifier. (`src/components/auth/SignupForm.tsx:34`)

- **Referral flow has WhatsApp sharing but it's buried.** The WhatsApp share button exists but it's the third option after email and "Copy Link." In Brazil, WhatsApp should be the first and most prominent sharing option. (`src/components/referral/ShareModal.tsx:25`)

- **Search bar placeholder says "Search products..." in English.** The i18n file has a Portuguese translation but the component has a hardcoded English fallback that appears briefly before hydration. (`src/components/search/SearchBar.tsx:12`)

- **Order confirmation page doesn't mention nota fiscal.** After purchase, Brazilian customers expect to receive a nota fiscal. The generation logic exists but is not surfaced to the user. (`src/pages/order/confirmation.tsx`)

- **Contact form doesn't include phone number field.** Brazilian users will likely just close the form and look for a WhatsApp number instead. (`src/pages/contact.tsx:30`)

- **Stripe is the only payment gateway.** Card decline rates through foreign acquirers are significantly higher. Consider migrating to Pagarme, Stone, or Mercado Pago. (`src/lib/payments/gateway.ts:23`)
