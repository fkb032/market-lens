# Code Passport: Arabic-Speaking Markets

## Overview

The Arabic-speaking world spans 25+ countries, 400M+ people, and enormous economic diversity, from the Gulf states (UAE, Saudi Arabia, Qatar) with some of the highest GDPs per capita in the world, to North Africa (Egypt, Morocco, Tunisia) with large young populations and growing digital economies. What unifies them is the Arabic language, which fundamentally reshapes how digital products must work, and a shared cultural fabric rooted in Islam that influences everything from calendar design to color psychology to gender-related UX decisions.

The most common mistake Western product teams make is treating Arabic support as a CSS toggle. "Just flip the layout." In reality, RTL is the tip of the iceberg. Underneath it is a completely different set of expectations about trust, social interaction, time, and identity.

---

## 1. Layout and Direction

This is the most visible and most consistently broken dimension.

**RTL (Right-to-Left) fundamentals:**
- Arabic reads right to left. This means the entire spatial logic of your interface reverses. Navigation that was on the left goes to the right. The "back" button moves to the right side. Progress bars fill from right to left. Breadcrumbs flow right to left.
- This is not just text alignment. It is the entire visual hierarchy. The eye enters the page from the top-right, not the top-left. Your most important content and primary actions should be positioned accordingly.

**What must mirror:**
- Navigation menus (hamburger icon moves to the right)
- Sidebar placement (flips to the right side)
- Breadcrumbs and progress indicators (flow direction reverses)
- Card layouts in grids (first item is top-right, not top-left)
- Form label alignment (labels right-aligned or right of fields)
- Table column order (first column is rightmost)
- Slide-in panels and drawers (enter from the left, not the right)
- Swipe gestures (swipe left to go forward, swipe right to go back... the opposite of LTR)
- Carousel/slider arrows (left arrow advances, right arrow goes back)

**What must NOT mirror:**
- Phone numbers (always LTR: +966 50 123 4567)
- Email addresses (always LTR)
- URLs (always LTR)
- Latin brand names and logos
- Clocks (clockwise is still clockwise)
- Music player controls (play/pause/skip are universal)
- Mathematical notation and numbers within text (Arabic numerals or Western numerals are both LTR in direction)
- Video playback controls

**Bidirectional (BiDi) text challenges:**
- Real Arabic content frequently mixes Arabic and Latin text (brand names, English terms, numbers). This creates "BiDi" text runs that are notoriously difficult to render correctly.
- Test with real mixed content, not just pure Arabic strings. A sentence like "قم بتنزيل التطبيق من App Store" (Download the app from the App Store) has an embedded LTR segment inside an RTL sentence.
- CSS `direction: rtl` and `unicode-bidi` properties handle some of this, but complex cases need explicit markup (`<bdo>`, `<bdi>` elements).

**Common RTL bugs to look for:**
- Icons that imply direction are not mirrored (back arrows, reply icons, forward/share icons, undo/redo)
- Padding and margin are not swapped (left padding in LTR should become right padding in RTL)
- Absolute positioning breaks (elements pinned to left:0 should be right:0 in RTL)
- Border-radius is wrong (rounded corners on wrong side)
- Box shadows cast in wrong direction
- Text truncation with ellipsis appears on wrong side
- Checkmarks and radio buttons are on wrong side of labels
- Close buttons (X) on modals and toasts are on wrong side
- Scrollbar position (should be on the left in RTL)

**Audit checklist:**
- [ ] Full RTL layout mirroring is implemented (not just text-align)
- [ ] Navigation, sidebars, and drawers are mirrored to correct sides
- [ ] Directional icons are mirrored (back arrow, reply, forward, undo/redo)
- [ ] Non-directional elements are NOT mirrored (phone numbers, URLs, playback controls)
- [ ] Progress bars, breadcrumbs, and steppers flow right-to-left
- [ ] Swipe gestures are reversed (if applicable)
- [ ] BiDi text renders correctly with mixed Arabic/Latin content
- [ ] Padding, margin, and absolute positioning are properly swapped
- [ ] CSS logical properties used (`margin-inline-start` not `margin-left`)
- [ ] Card grids and lists flow right-to-left

---

## 2. Color and Iconography

**Cultural color associations:**
- **Green:** Strongly associated with Islam, the Prophet Muhammad, and paradise. It carries deep respect and positive connotation. Using green for success states, positive actions, and branding is natural. Be careful about using green for trivial or negative purposes (green error messages, green delete buttons). In Saudi Arabia specifically, green is the national color.
- **Gold/amber:** Associated with luxury, generosity, and heritage. Widely used in premium branding across the Gulf. Works well for premium tiers, VIP features.
- **Black:** Sophisticated and premium (Gulf markets especially). Does not carry the mourning connotation as strongly as in some Western contexts. Black and gold together signal luxury.
- **White:** Purity and peace. Common in minimal, clean designs. Well-received across the region.
- **Red:** Caution needed. While it works for urgency and sales, it can also be associated with danger or blood. Less universally "exciting" than in Western markets. Use deliberately.
- **Blue:** Trusted, safe, professional. Similar connotation to Western markets. Financial services, tech, and healthcare use it heavily.

**Iconography considerations:**
- Avoid icons that feature dogs in prominent positive roles (culturally sensitive in Islamic context).
- Hand gestures: the "thumbs up" is generally fine in most Arabic-speaking countries, but the "OK" hand gesture (circle with thumb and forefinger) can be offensive in some regions.
- Religious symbols: do not use crescent moon and star as decorative elements. They carry religious weight.
- Alcohol imagery: avoid in Saudi Arabia and other conservative Gulf markets, even as metaphors (no "champagne bottle" for celebrations).
- Gender in illustrations: be thoughtful about depicting women. In Saudi and Gulf contexts, illustrations showing women without hijab can alienate users. Many brands use abstract or diverse representations.

**Audit checklist:**
- [ ] Green is not used for trivial or negative purposes
- [ ] Color palette is culturally appropriate (no unintentional religious or offensive connotation)
- [ ] Icons avoid culturally sensitive imagery (dogs in positive roles, alcohol, offensive gestures)
- [ ] Illustrations of people are culturally appropriate for the target sub-market
- [ ] Religious symbols are not used decoratively

---

## 3. Trust and Identity

**Trust signals that matter:**
- Government endorsement or licensing matters enormously, especially in the Gulf. Displaying a "licensed by [regulatory body]" badge carries real weight. In Saudi Arabia, showing your CR (Commercial Registration) number builds trust (similar to CNPJ in Brazil).
- "Made locally" or "Gulf-based" signals trust. Regional identity matters. Saying "Dubai-based" or "Saudi company" on your about page is a trust signal.
- Arabic-language customer support. Not just a translated FAQ. Actual Arabic-speaking agents available via WhatsApp, chat, or phone. English-only support signals "this product isn't really for us."
- Social proof from regional figures, influencers, or known brands. Gulf markets are heavily influenced by social media personalities. A recommendation from a known Saudi influencer can drive more trust than a security badge.

**Payment trust:**
- Cash on delivery (COD) is still significant in many markets, especially Egypt, Saudi Arabia, and parts of North Africa. Users don't trust entering card details online with unfamiliar brands.
- Offering COD, even if you prefer online payment, is a trust signal: "We're confident enough in our product that we'll ship before you pay."
- As online payment adoption grows (especially Apple Pay in the Gulf), COD is declining but not gone.

**Identity and verification:**
- National ID systems vary by country. Saudi has the Iqama (residency ID) and National ID. UAE has Emirates ID. Egypt has National ID.
- OTP verification via SMS is the standard second factor. WhatsApp OTP is growing.
- Phone number is the primary identifier in most markets (more reliable than email for user accounts).

**Audit checklist:**
- [ ] Business registration or licensing displayed for relevant market
- [ ] Arabic-language support is available (not just English)
- [ ] Regional social proof present (local brands, regional influencers, Arabic testimonials)
- [ ] Cash on delivery offered where market expects it (Saudi, Egypt)
- [ ] Phone number accepted as primary account identifier (not email-only)
- [ ] OTP/SMS verification uses local phone number formats

---

## 4. Payments and Commerce

**Payment methods by sub-market:**

**Gulf (Saudi, UAE, Qatar, Kuwait, Bahrain, Oman):**
- Credit/debit cards (Visa, Mastercard, and importantly Mada in Saudi Arabia)
- Apple Pay (very high adoption in the Gulf, especially UAE and Saudi)
- STC Pay (Saudi), Samsung Pay
- Cash on delivery (declining but still present, especially Saudi)
- Tabby and Tamara (buy-now-pay-later, massive growth in Gulf e-commerce)
- Bank transfers

**North Africa (Egypt, Morocco, Tunisia):**
- Cash on delivery (dominant in Egypt)
- Fawry (Egypt, bill payment network)
- Mobile wallets: Vodafone Cash (Egypt), Orange Money
- Credit cards (lower penetration, growing)
- Instapay (Egypt's instant payment system, growing like Pix in Brazil)

**Pricing and currency:**
- Gulf: SAR (Saudi Riyal), AED (UAE Dirham), QAR (Qatari Riyal). Most are pegged to USD so pricing is stable.
- North Africa: EGP (Egyptian Pound, fluctuates significantly), MAD (Moroccan Dirham).
- Arabic numeral display: Most Arabic-speaking markets use Western numerals (1, 2, 3). Some contexts use Eastern Arabic numerals (١, ٢, ٣). Support both, but default to Western numerals for commerce.
- Decimal formatting varies: some markets use Arabic comma (٫) as decimal separator, others use Western period. Default to the convention of your target sub-market.

**Buy-now-pay-later (BNPL):**
- Tabby and Tamara dominate Gulf BNPL. Adoption is extremely high among younger demographics.
- Showing "Split into 4 payments of X" on product pages significantly increases conversion in Saudi and UAE.
- BNPL is not just a payment method in the Gulf. It's a cultural norm for online shopping.

**Audit checklist:**
- [ ] Mada card support for Saudi Arabia
- [ ] Apple Pay available for Gulf markets
- [ ] Cash on delivery available for Saudi Arabia and Egypt
- [ ] BNPL options (Tabby/Tamara) displayed on product pages for Gulf markets
- [ ] Local payment methods supported (Fawry for Egypt, STC Pay for Saudi)
- [ ] Currency displayed correctly for target market
- [ ] Arabic and Western numeral formats handled correctly

---

## 5. Communication Patterns

**WhatsApp vs other channels:**
- WhatsApp is dominant across the Arabic-speaking world for personal and business communication. Same principle as Brazil: WhatsApp is infrastructure.
- In Saudi Arabia, WhatsApp has 95%+ penetration. It is the default channel for customer service inquiries.
- Snapchat is unusually popular in Saudi Arabia and Gulf states (one of the highest per-capita usage rates in the world). For younger demographics, Snapchat is a primary social platform.
- Instagram is massive for commerce, especially fashion, beauty, and food in the Gulf.
- Twitter/X has high engagement in Saudi Arabia (one of the most active markets globally). It functions as a customer service escalation channel and a space for public complaints.

**Tone and formality:**
- Arabic has distinct formal and informal registers. Modern Standard Arabic (MSA) is formal and pan-Arab. Dialects (Saudi, Egyptian, Levantine, Moroccan) are informal and regional.
- For product UI and marketing: MSA is safer for broad reach, but dialect-specific copy resonates more deeply. Egyptian dialect is the most widely understood due to media dominance.
- Gulf markets lean toward respectful but not stiff. Addressing users with appropriate honorifics matters more than in Western products.
- Avoid overly casual or humorous tone in initial interactions. Warmth is expressed through respect and helpfulness, not jokes.

**Audit checklist:**
- [ ] WhatsApp contact available for customer support
- [ ] Arabic copy uses appropriate register (MSA for broad reach, dialect for targeted markets)
- [ ] Tone is respectful and warm (not overly casual or jokey)
- [ ] Social media strategy accounts for regional platform preferences (Snapchat in Saudi, Instagram in Gulf)
- [ ] Customer service channels include Arabic-speaking support

---

## 6. Forms and Data Collection

**Name format:**
- Arabic names follow a different structure: given name + father's name + grandfather's name + family name. "Ahmed bin Mohammed Al-Rashid" (Ahmed, son of Mohammed, of the Al-Rashid family).
- "bin" (son of) and "bint" (daughter of) are patronymic markers, not middle names.
- "Al-" prefixes on family names are common and should not be separated ("Al-Rashid" is one unit).
- Provide generous field lengths. Arabic full names can be long.
- Single "Full Name" field is often safer than First/Last split.

**Phone format:**
- Saudi: +966 5X XXX XXXX (mobile starts with 5)
- UAE: +971 5X XXX XXXX
- Egypt: +20 1X XXXX XXXX
- Validate by country and accept local format (without country code) when the market is known.

**Address format:**
- Address structures vary significantly by country and are often less standardized than Western addresses.
- In Saudi Arabia, many areas use district names rather than street addresses. Google Maps location pins are sometimes used as delivery addresses.
- Providing a "location pin" or map-based address input can be more reliable than traditional form fields in Gulf markets.
- P.O. Boxes are more common than street addresses for some use cases.

**Date and calendar:**
- The Hijri (Islamic) calendar is used alongside the Gregorian calendar in Saudi Arabia and other Gulf states. Government and some business contexts use Hijri dates.
- Dual calendar display (Hijri + Gregorian) is best practice for Saudi-facing products.
- Weekend varies: Saudi Arabia's weekend is Friday-Saturday (changed from Thursday-Friday in 2022). Egypt and most North African countries observe Friday-Saturday weekend. UAE shifted to Saturday-Sunday in 2022.
- Know which weekend your target market observes. Scheduling features, delivery estimates, and "business days" calculations must account for this.

**Audit checklist:**
- [ ] Name fields accommodate Arabic naming conventions (patronymics, Al- prefixes, long names)
- [ ] Phone validation matches target country format
- [ ] Address input supports map-based/pin-drop for Gulf markets
- [ ] Hijri calendar support for Saudi Arabia (at minimum, dual display)
- [ ] Weekend days are correct for target market (not defaulting to Saturday-Sunday everywhere)
- [ ] Date format appropriate for market (DD/MM/YYYY is standard in most Arabic-speaking countries)

---

## 7. Connectivity and Performance

**Gulf states (high connectivity):**
- UAE and Saudi Arabia have excellent internet infrastructure, high smartphone penetration, and widespread 5G.
- Users expect fast, polished experiences. Performance is still important (nobody likes slow sites) but the constraint is quality expectations, not bandwidth.
- Flagship devices dominate. iPhone market share is very high in the Gulf.

**North Africa and other markets (mixed connectivity):**
- Egypt, Morocco, and Tunisia have growing but uneven connectivity. Urban areas are well-connected, rural areas less so.
- Android dominates in North Africa. Budget and mid-range devices are common.
- Data costs are a consideration in Egypt. Optimize accordingly.
- Egypt has experienced periodic internet throttling and disruptions. Build resilience into your app (offline capability, graceful degradation).

**Audit checklist:**
- [ ] Performance optimized for target sub-market (high expectations in Gulf, bandwidth constraints in North Africa)
- [ ] Device targeting appropriate (iOS-focused for Gulf, Android-focused for North Africa)
- [ ] Image optimization and lazy loading implemented
- [ ] Core flows work on slower connections (for North African markets)

---

## 8. Legal and Compliance

**Data protection:**
- Saudi Arabia: PDPL (Personal Data Protection Law), effective 2023. Requires consent for data processing, breach notification, and data localization for certain categories.
- UAE: Federal Decree-Law No. 45 of 2021 on Personal Data Protection. GDPR-inspired with local requirements.
- Egypt: Data Protection Law No. 151 of 2020. Requires registration with the Data Protection Center.
- Morocco: Law 09-08 on Personal Data Protection. Enforced by the CNDP.

**Content restrictions:**
- Content that criticizes government, religion (Islam), or royal families is illegal in most Gulf states.
- Gambling content is prohibited across the region.
- Alcohol-related content is restricted in Saudi Arabia (no advertising, limited e-commerce).
- Dating and "adult" content is heavily restricted or blocked in Saudi Arabia and other Gulf states.
- User-generated content platforms must moderate for these restrictions. What's acceptable on a US platform may be illegal in the Gulf.

**E-commerce regulations:**
- Saudi Arabia: CITC (Communications and IT Commission) regulates e-commerce. Licenses may be required.
- Consumer protection laws require clear return policies, pricing transparency, and delivery commitments.

**Audit checklist:**
- [ ] Data protection compliance for target market (PDPL for Saudi, UAE data law, etc.)
- [ ] Content restrictions observed (no gambling, alcohol, or sensitive political/religious content)
- [ ] Privacy policy available in Arabic
- [ ] Cookie consent mechanism present
- [ ] E-commerce licensing requirements met for target market

---

## 9. Social and Cultural UX

**Islamic calendar and prayer times:**
- During Ramadan (month of fasting), user behavior shifts dramatically. Activity peaks late at night (after iftar) and drops during the day. Marketing campaigns, push notifications, and feature launches should account for this.
- Prayer times (five daily prayers) affect engagement patterns. Some apps show prayer time notifications or pause certain activities during prayer times. At minimum, be aware that there are five periods daily when engagement drops briefly.
- Eid al-Fitr (end of Ramadan) and Eid al-Adha are the biggest holidays. Plan promotions, shipping cutoffs, and support staffing around these.

**Gender considerations:**
- Gender segregation norms vary by country. Saudi Arabia has relaxed significantly in recent years, but some contexts still expect gender-aware UX.
- Some e-commerce categories (clothing, fitness, beauty) may benefit from gender-specific browsing experiences or filters.
- Women's privacy online is a priority. Features that expose female users' identities, locations, or photos to unknown males can be a safety and cultural issue (parallel to the Brazil profiles insight).
- Hijab and modest fashion is a major e-commerce category. Ensure product categorization and imagery reflect this.

**Social and community dynamics:**
- Family and community endorsement carries enormous weight in purchase decisions. "Family plan" features, family sharing, and group buying resonate.
- Guest checkout is important. Many users, especially women, may not want to create accounts with personal details on unfamiliar sites.
- Reviews from local users (Arabic-language reviews from people in the same country) are far more trusted than international reviews.

**Audit checklist:**
- [ ] Ramadan-aware UX (timing of notifications, promotional calendar, engagement patterns)
- [ ] Prayer time considerations (engagement pattern awareness, optional integrations)
- [ ] Gender privacy respected (no forced identity exposure)
- [ ] Guest checkout available
- [ ] Arabic-language reviews prioritized over international reviews
- [ ] Modest fashion and culturally appropriate product imagery used where relevant
- [ ] Family-oriented features considered (group accounts, family sharing)

---

## 10. Accessibility and Inclusion

**Arabic typography:**
- Arabic script is cursive and connected. Letters change shape based on position (beginning, middle, end of word). Poor font choices can make text illegible.
- Use fonts designed for Arabic: Noto Sans Arabic, IBM Plex Arabic, Dubai (designed specifically for the Dubai government), Tajawal, Cairo. Do not rely on fallback fonts.
- Font size should be slightly larger than Latin equivalents for readability (Arabic characters are denser).
- Line height needs to be more generous for Arabic text (1.6-1.8x vs 1.4-1.5x for Latin).
- Avoid all-caps styling. Arabic does not have a concept of uppercase/lowercase. "Uppercase" CSS applied to Arabic text does nothing and may cause rendering issues.

**Numerals:**
- Eastern Arabic numerals (٠١٢٣٤٥٦٧٨٩) vs Western Arabic numerals (0123456789). Most commerce uses Western, but some users and some contexts prefer Eastern.
- Best practice: default to Western numerals for commerce, allow Eastern numerals in settings or use the user's device locale to determine preference.

**Screen readers and RTL accessibility:**
- Screen readers handle Arabic well when semantic HTML is correct. Ensure `lang="ar"` and `dir="rtl"` attributes are set properly.
- ARIA labels should be in Arabic for Arabic-language pages.
- Tab order should follow RTL flow (right to left, top to bottom).

**Audit checklist:**
- [ ] Arabic font is intentionally chosen (not system fallback)
- [ ] Font size is slightly larger than Latin equivalent
- [ ] Line height is generous (1.6x minimum for Arabic body text)
- [ ] No CSS text-transform: uppercase applied to Arabic text
- [ ] `lang="ar"` and `dir="rtl"` attributes are set on the HTML element
- [ ] Tab order follows RTL flow
- [ ] ARIA labels are in Arabic
- [ ] Numeral format matches market convention
