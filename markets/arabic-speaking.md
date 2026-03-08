# Code Passport: Arabic-speaking Checklist

Market-specific audit checklist for Arabic-speaking markets. Used by the `/code-passport` skill to audit codebases targeting Arabic-speaking users.

---

## Category 1: RTL Layout and Direction

| Check | How to Verify | Severity |
|-------|--------------|----------|
| HTML dir="rtl" attribute set | Grep HTML templates for `dir="rtl"` or dynamic direction setting based on locale. | CRITICAL |
| CSS direction: rtl implemented | Grep CSS files for `direction: rtl` or RTL-specific styling. Check for logical properties usage. | CRITICAL |
| Navigation and sidebars mirrored | Read navigation components and sidebar layouts. Check if positioning switches from left to right in RTL mode. | CRITICAL |
| Directional icons mirrored | Grep for arrow icons, back buttons, reply icons. Check if they flip direction in RTL (back arrow should point right). | CRITICAL |
| Non-directional elements preserved | Check that phone numbers, URLs, email addresses, and playback controls maintain LTR direction in RTL layout. | CRITICAL |
| Progress indicators flow RTL | Read progress bar, breadcrumb, and stepper components. Check if they flow right-to-left in Arabic mode. | WARNING |
| CSS logical properties used | Grep CSS for `margin-inline-start`, `padding-inline-end` instead of `margin-left`, `padding-right` for RTL compatibility. | WARNING |
| Swipe gestures reversed | If touch gestures exist, check if left swipe advances and right swipe goes back (opposite of LTR). | WARNING |
| BiDi text handling | Check for `unicode-bidi`, `<bdo>`, `<bdi>` elements or libraries to handle mixed Arabic/Latin text correctly. | WARNING |

**How to scan:**
```
Grep for: "dir=", "direction:", "rtl", "ltr", "margin-left", "padding-right", "unicode-bidi"
Read: HTML layout templates, CSS files, navigation components, icon components, progress indicators
```

---

## Category 2: Typography and Arabic Text Rendering

| Check | How to Verify | Severity |
|-------|--------------|----------|
| Arabic-specific fonts loaded | Grep font declarations for Arabic fonts (Noto Sans Arabic, IBM Plex Arabic, Dubai, Tajawal, Cairo) not just generic fallbacks. | CRITICAL |
| Font size increased for Arabic | Check CSS for larger font sizes in Arabic locale (Arabic text needs 10-15% larger size than Latin equivalents). | WARNING |
| Line height generous for Arabic | Grep CSS for line-height values. Arabic text requires 1.6-1.8x line height vs 1.4-1.5x for Latin. | WARNING |
| No text-transform uppercase on Arabic | Grep CSS for `text-transform: uppercase` and check if it's applied to Arabic content (Arabic has no uppercase concept). | WARNING |
| lang="ar" attribute set | Grep HTML templates for `lang="ar"` or dynamic language attribute setting for Arabic pages. | WARNING |

**How to scan:**
```
Grep for: "Noto Sans Arabic", "IBM Plex Arabic", "Dubai", "Tajawal", "Cairo", "text-transform", "lang=", "line-height"
Read: CSS font declarations, typography configuration, HTML head/layout templates
```

---

## Category 3: Numbers and Date Formatting

| Check | How to Verify | Severity |
|-------|--------------|----------|
| Western Arabic numerals used | Check number formatting utilities. Most Arabic markets use 0123456789, not ٠١٢٣٤٥٦٧٨٩ for commerce. | WARNING |
| Eastern Arabic numeral support | Check if application can display Eastern Arabic numerals (٠١٢٣٤٥٦٧٨٩) based on user preference or locale. | WARNING |
| Date format DD/MM/YYYY | Grep date formatting functions for Middle Eastern format (DD/MM/YYYY), not US format (MM/DD/YYYY). | WARNING |
| Hijri calendar support | Grep for Hijri, Islamic calendar, or dual calendar display functionality, especially important for Saudi Arabia. | WARNING |
| Correct weekend days | Check calendar/scheduling logic for regional weekends (Friday-Saturday for Saudi/Egypt, Saturday-Sunday for UAE post-2022). | WARNING |

**How to scan:**
```
Grep for: "toLocaleString", "Intl.DateTimeFormat", "hijri", "islamic.*calendar", "weekend", date formatting patterns
Read: date utility functions, calendar components, locale configuration files
```

---

## Category 4: Payment Methods and Currency

| Check | How to Verify | Severity |
|-------|--------------|----------|
| Local currency support | Grep for regional currencies (SAR, AED, EGP, QAR) and proper currency symbols display. | CRITICAL |
| Mada card support | Grep payment configuration for Mada (Saudi domestic card network) integration. | CRITICAL |
| Apple Pay integration | Check for Apple Pay support, especially critical for Gulf markets with high iPhone adoption. | WARNING |
| Cash on delivery option | Grep payment methods for COD, cash on delivery, or "الدفع عند الاستلام" - essential for Saudi Arabia and Egypt. | WARNING |
| BNPL integration | Grep for Tabby, Tamara, or buy-now-pay-later payment options popular in Gulf markets. | WARNING |
| Local payment gateways | Check for regional payment processors (Paytabs, Moyasar, Fawry for Egypt, STC Pay for Saudi). | WARNING |
| Phone number payment identifier | Check if phone numbers can be used for payment account creation/login, not just email. | WARNING |

**How to scan:**
```
Grep for: "SAR", "AED", "EGP", "QAR", "mada", "apple.*pay", "tabby", "tamara", "fawry", "stc.*pay", "cod", "cash.*delivery"
Read: payment configuration, checkout flow, payment method components
```

---

## Category 5: Trust Signals and Identity

| Check | How to Verify | Severity |
|-------|--------------|----------|
| Business registration displayed | Grep for CR number (Saudi Commercial Registration), trade license display, or government registration badges. | WARNING |
| Arabic customer support | Check contact/support pages for Arabic language support indication, not just English-only support. | WARNING |
| Regional social proof | Grep testimonials, reviews, or social proof sections for Arabic content or regional customer references. | WARNING |
| Local business address | Check footer/contact pages for regional business address (not just US/Europe address for regional market). | WARNING |
| SMS OTP verification | Check authentication flow for SMS-based OTP, which is standard in Arabic markets over email verification. | WARNING |
| National ID support | Grep form validation for regional ID formats (Saudi Iqama, Emirates ID, Egyptian National ID patterns). | WARNING |

**How to scan:**
```
Grep for: "commercial.*registration", "trade.*license", "arabic.*support", "customer.*service", "otp", "sms", "iqama", "emirates.*id"
Read: footer component, contact/about pages, authentication flow, form validation
```

---

## Category 6: Communication and Social Integration

| Check | How to Verify | Severity |
|-------|--------------|----------|
| WhatsApp contact integration | Grep for WhatsApp contact, wa.me links, or WhatsApp Business API integration for customer service. | CRITICAL |
| WhatsApp sharing | Check share components include WhatsApp as a sharing option alongside other social platforms. | WARNING |
| Regional social platforms | Check for Snapchat integration/sharing (popular in Gulf) or regional platform considerations. | WARNING |
| Arabic language tone | Read Arabic copy in i18n files for appropriate formality level (MSA vs dialect, respectful tone). | WARNING |

**How to scan:**
```
Grep for: "whatsapp", "wa.me", "snapchat", "share", social media integrations
Read: share components, contact pages, i18n files for Arabic (ar.json, ar-SA.json), communication flows
```

---

## Category 7: Forms and User Data

| Check | How to Verify | Severity |
|-------|--------------|----------|
| Arabic name format support | Read name input fields. Check if they accommodate long Arabic names with patronymics (bin/bint) and family prefixes (Al-). | WARNING |
| Generous name field lengths | Check form validation for name fields with sufficient character limits for Arabic names (often longer than Western names). | WARNING |
| Phone number format validation | Read phone validation logic for regional formats (+966 5X, +971 5X, +20 1X) and accept local format without country code. | WARNING |
| Address supports regional format | Check address forms for regional addressing (district names, P.O. boxes, map-based input for Gulf markets). | WARNING |
| Map-based address input | Grep for Google Maps, location picker, or pin-drop address input which is more reliable than text fields in Gulf markets. | WARNING |

**How to scan:**
```
Grep for: phone validation patterns, address forms, "google.*maps", "location.*picker", name field validation, "maxlength"
Read: form components, validation utilities, address input components, name input fields
```

---

## Category 8: Cultural and Religious Considerations

| Check | How to Verify | Severity |
|-------|--------------|----------|
| No inappropriate imagery | Grep image assets and check for alcohol imagery, dogs in positive roles, or offensive hand gestures in icons/illustrations. | WARNING |
| Appropriate color usage | Check that green is not used for trivial negative purposes (green is associated with Islam and should be respected). | WARNING |
| Gender-appropriate illustrations | Review user illustrations/avatars for cultural appropriateness in conservative markets (modest dress, hijab considerations). | WARNING |
| Prayer time awareness | Check for prayer time integration or at minimum awareness in notification timing and engagement patterns. | WARNING |
| Ramadan calendar awareness | Grep for Ramadan-specific features, promotional calendar, or behavioral pattern considerations. | WARNING |
| Modest fashion categorization | If e-commerce, check product categories for modest/Islamic fashion options and appropriate imagery. | WARNING |

**How to scan:**
```
Grep for: "prayer", "ramadan", "modest", "halal", "islamic", color usage in CSS, image file names
Read: image assets, product categories, promotional calendar logic, notification scheduling
```

---

## Category 9: Accessibility and Screen Readers

| Check | How to Verify | Severity |
|-------|--------------|----------|
| Arabic ARIA labels | Check that ARIA labels, alt text, and accessibility strings are in Arabic for Arabic-language pages. | WARNING |
| Tab order follows RTL | Verify that tab navigation flows right-to-left in RTL layout, not left-to-right. | WARNING |
| Screen reader language tags | Check that screen reader content is properly tagged with Arabic language attributes. | WARNING |

**How to scan:**
```
Grep for: "aria-label", "alt=", "tabindex", "role=", accessibility configuration
Read: accessibility utilities, ARIA implementations, screen reader configurations
```

---

## Category 10: Legal and Compliance

| Check | How to Verify | Severity |
|-------|--------------|----------|
| Arabic privacy policy | Check for privacy policy availability in Arabic language, not just English. | CRITICAL |
| Regional data protection compliance | Grep for PDPL (Saudi), UAE data protection, or regional privacy law compliance implementation. | CRITICAL |
| Content restriction awareness | Check content moderation for gambling, alcohol (Saudi), dating restrictions based on target market. | WARNING |
| Cookie consent in Arabic | Check cookie consent banner displays in Arabic with appropriate legal language. | WARNING |
| Regional business licensing | Check for e-commerce licensing compliance (Saudi CITC, UAE economic licenses) where required. | WARNING |

**How to scan:**
```
Grep for: "privacy.*policy", "cookie.*consent", "pdpl", "data.*protection", content moderation rules, business license display
Read: privacy policy page, cookie consent component, legal compliance documentation
```

---

## Category 11: Performance for Regional Connectivity

| Check | How to Verify | Severity |
|-------|--------------|----------|
| CDN with MENA edge nodes | Check CDN configuration for Middle East/North Africa edge locations to reduce latency from US/Europe. | WARNING |
| Image optimization pipeline | Check for WebP/AVIF support, lazy loading, and responsive images for bandwidth-conscious North African markets. | WARNING |
| Offline capability | Check for service worker or offline functionality, important for markets with unreliable connectivity (Egypt). | WARNING |
| Core functionality without JS | Verify critical flows render server-side for slower connections in developing markets. | WARNING |

**How to scan:**
```
Grep for: CDN configuration, "webp", "avif", "lazy", "loading=", "service-worker", "sw.js"
Read: CDN setup, image optimization config, service worker registration, server-side rendering config
```

---

## Category 12: Localization Infrastructure

| Check | How to Verify | Severity |
|-------|--------------|----------|
| ar locale configured | Check i18n configuration for Arabic locale (ar, ar-SA, ar-EG, ar-AE) not just English. | CRITICAL |
| RTL CSS framework | Check for RTL CSS framework integration (Bootstrap RTL, Tailwind RTL) or custom RTL implementation. | CRITICAL |
| Arabic font loading strategy | Check font loading configuration for Arabic fonts with proper font-display and performance optimization. | WARNING |
| Locale-specific routing | Check if Arabic content is properly routed (/ar/, /ar-sa/) with correct hreflang tags. | WARNING |
| Arabic SEO optimization | Grep for hreflang="ar" tags and Arabic-specific SEO configuration. | WARNING |

**How to scan:**
```
Grep for: "ar-SA", "ar-EG", "ar-AE", "ar", "hreflang", "rtl", "font-display", locale routing config
Read: i18n configuration, routing setup, SEO/meta tag configuration, CSS framework setup
```

---

## Contextual Intelligence

The audit adapts based on what kind of product it detects:

**E-commerce / marketplace:**
- Full payment audit emphasized (Mada, Apple Pay, BNPL, COD)
- Trust signals critical (business registration, Arabic support)
- Cultural imagery and modest fashion considerations
- Regional delivery and address handling

**SaaS / subscription:**
- Arabic customer support essential
- Hijri calendar integration for Saudi market
- Regional data protection compliance (PDPL)
- Arabic documentation and onboarding

**Fintech / financial services:**
- National ID validation critical
- Islamic banking compliance (Sharia-compliant products)
- Enhanced trust signals and regulatory compliance
- SMS OTP and phone-first authentication

**Content / media:**
- Content restriction compliance paramount
- Cultural sensitivity in imagery and topics
- Regional social sharing (WhatsApp, Snapchat)
- Performance optimization for varied connectivity

**B2B / enterprise:**
- Arabic language support throughout
- Regional business registration display
- Cultural calendar awareness (Ramadan business patterns)
- Formal Arabic tone in communications