# Copy Audit: Draft A (/draft-a)

Audited against [COPY-BRIEF.md](COPY-BRIEF.md) on 2026-10-05. Audit only: no page copy was changed.

Scope: everything visible on /draft-a (desktop and phone, calculator in every state), plus the page title, meta tags, alt text, and the two forms the page leads to (Get a Quote, and the sample profiles form inside the calculator). The Get a Quote form is the live `/contact/get-a-quote` page (`contact-form.config.ts`); the drafts link to it but do not restyle it.

"Pending" means the line is on the brief's pending list, so there is no rewrite. Those items are collected at the end.

---

## 1. Page title, meta, and alt text

| Current text | Issue | Proposed text |
|---|---|---|
| Tab title: "Draft A (Big Type) — Hirably" | Draft-only label. Em dash. The production title it stands in for is "Hirably — Hire World-Class Talent in Mexico": em dash and banned "world-class." | Option 1: "Hirably \| Hire Top Talent in Mexico. We Do the Rest." Option 2: "Hirably \| Your Team in Mexico, Done for You" |
| `<title>` and og:title: "Hirably \| Recruit, Onboard & Pay Your Team in Mexico" | Reads as an instruction to the client ("Recruit, Onboard & Pay"), so it sounds like the client does the work. | "Hirably \| We Recruit, Employ & Pay Your Team in Mexico" |
| Meta description: "Hirably is the most reliable way to recruit, onboard, and pay your team in Mexico. From headhunting to EOR and payroll, we handle everything. $0 upfront." | Banned "$0 upfront." Unprovable superlative ("most reliable"). "Headhunting" is agency language. Leads with EOR, not Complete. | "Hirably recruits, employs, pays, and equips your bilingual team in Mexico. From $11/hr all-inclusive. Zero recruitment fees. You approve, we do the rest." |
| og:description / twitter:description: "The most reliable way to recruit, onboard, and pay your team in Mexico. From headhunting to EOR and payroll — $0 upfront." | Em dash, "$0 upfront," same issues as above. | Same as the meta description above. |
| JSON-LD description: "The most reliable way to recruit, onboard, and pay your team in Mexico." | Unprovable superlative; client-as-doer phrasing. | "We recruit, employ, pay, and equip bilingual teams in Mexico for US and Canadian companies." |
| Alt: "Hirably" (navbar and footer logos) | | Keep |
| Alt: "Alakai Capital", "Buxton Consulting", "Ferrosource", "Novel Engineering", "Outlook Tax", "Young Basile" | All six are on the approved client list. | Keep |
| aria-label: "Go to top of page", "Toggle navigation menu" | | Keep |
| Get a Quote page image alt: "Request a custom quote" | Describes an action, not the image. The image is a stock photo, which the design rules drop. | Remove the image. If it stays, alt text should describe it. |

## 2. Navbar

| Current text | Issue | Proposed text |
|---|---|---|
| "How it works" · "Benefits" · "Why nearshore?" · "Pricing" | | Keep |
| "Start Hiring Today" (desktop) / "Start Hiring" (phone) | Inconsistent: the hero and pricing say "Start Hiring." | "Start Hiring" everywhere |

## 3. Hero

| Current text | Issue | Proposed text |
|---|---|---|
| "Hire Top 1% Talent in Mexico" | Pending: headline choice, and "Top 1%" vs "4% acceptance rate." | Pending |
| "You approve. We do the rest." | Pending: headline choice. The line itself is on-brief. | Pending |
| "Zero Recruitment Fees. Ever." | | Keep |
| "1000s of verified professionals across Mexico" | Pending. It also conflicts with "10,000+" on the Get a Quote page. | Pending |
| "Save up to 70% vs. local hires" | The approved fact says "vs. a US hire." "Local" is unclear for Canadian readers. | "Save up to 70% vs. a US hire" |
| Buttons: "Start Hiring" · "See your rate" | | Keep |

## 4. Calculator

| Current text | Issue | Proposed text |
|---|---|---|
| "What will your hire cost?" | | Keep |
| "Pick a role to see your rate next to a US hire." | | Keep |
| "Role" · "Choose a role" · "Search roles" · "{n} roles" · "No matching roles" · "Level" · "Entry" · "Mid" · "Senior" | | Keep |
| 48 role names and 10 categories (e.g., "Bookkeeper," "SDR / Appointment Setter," "Specialized Platforms") | Clear and specific. The categories differ from the footer's Roles list (see Footer). | Keep |
| "Specialized skills or industry experience" · "What specialty?" · placeholder "e.g., Admin with SaaS marketing experience" | | Keep |
| "Hourly" · "Monthly" · "Yearly" | | Keep |
| "Hirably" · "per hour, all-inclusive" (and "per month," "per year") | | Keep |
| "All included": "Recruitment & vetting," "Background checks," "Pay, benefits & payroll taxes," "Paid time off," "Equipment & setup," "HR support," "Lifetime replacement guarantee" | IT support is missing from an approved inclusion. The background check value is missing and the item is plural ("checks"); the pricing card says "Background Checks ($149 value)." | "Recruitment & vetting" · "Background check ($149 value)" · "Payroll, benefits & taxes" · "Paid time off" · "Equipment, setup & IT support" · "HR support" · "Lifetime replacement guarantee" |
| "US local hire" | "Local" is unclear for Canadian readers; the approved term is "a US hire." | "US hire" |
| "Base salary" · "Total cost per hour worked" · "Total monthly cost" · "Total yearly cost" · "See breakdown" / "Hide breakdown" | | Keep |
| "Payroll taxes +9.1%" · "Social Security, Medicare, unemployment, workers' comp" · "Health insurance, retirement & other benefits +21.4%" | The numbers are not on the approved list. They come from BLS and are cited on the card. | Keep, pending approval (see decisions) |
| "Includes about 5 weeks of paid holidays, vacation, and sick leave." | The number is not on the approved list. "About" hedges. | Keep, pending approval (see decisions) |
| "Choose a role to see your rate" (starting state) | | Keep |
| "Save up to $X per year" · "up to N%" | Capped at the approved 70%. | Keep |
| "See sample profiles for this role" · "Book a call" | | Keep |
| "Your exact rate is locked in on a free 30-minute call, before you interview anyone." | Long and passive. "Free 30-minute call" is not an approved fact, though it matches the real booking. | "We lock in your exact rate on a free 30-minute call, before any interviews." (needs "free 30-minute call" approved) |
| "US wages: U.S. Bureau of Labor Statistics, OEWS May 2025. US benefit costs: BLS Employer Costs for Employee Compensation, June 2026." | | Keep |

## 5. Sample profiles form (inside the calculator)

| Current text | Issue | Proposed text |
|---|---|---|
| "Work email" · placeholder "jane@acme.com" | | Keep |
| "Anything specific you need? (optional)" | | Keep |
| "Send me sample profiles" · "Sending..." | | Keep |
| "Please use your work email." · "Please enter a valid email." | | Keep |
| "Something went wrong. Please try again, or book a call below." | An error state. A negative is acceptable here. | Keep |
| "Sample profiles on their way within 5 business days." | "5 business days" is not an approved fact, and it is a delivery promise. | "Got it. Our team is pulling sample profiles for this role and will email them to you." (or keep the timeline once approved) |

## 6. Trust bar

| Current text | Issue | Proposed text |
|---|---|---|
| "Trusted by Engineering, Tax, Legal, and Health Firms in the US" | None of the six approved clients is a health firm, so "Health" is unsupported by the logos shown. Title Case reads like a heading. | "Trusted by engineering, tax, and legal firms across the US" (or keep "health" if a health client is confirmed) |

## 7. How it works (The Hirably Way)

The Done for you section already lists the tasks: screening, scheduling, contracts, equipment, benefits. The current step text repeats them. The brief's proposed text fixes that: the steps describe the client's three moments (send, meet, say yes), and Done for you describes the work.

| Current text | Issue | Proposed text |
|---|---|---|
| "The Hirably Way" | Short brand line; works as a section name. | Keep |
| "You define the vision. We handle the vetting, scheduling, and paperwork. A simple, guided path to your next great hire." | Repeats Done for you. "A simple, guided path" is generic and casts the client as the one walking the path. | Option 1: "You tell us who you need. We take it from there." Option 2: "Three steps. You show up for one of them." |
| 01 "We Scout & Screen" | | Keep |
| 01 "We take your requirements and go to market. We recruit and prescreen heavily, filtering out the noise so you only see the candidates worth your time." | Long. Repeats Done for you line 1. | "Send us the role. We recruit, screen, and verify, so you only meet candidates worth your time." (proposed in brief, not yet approved) |
| 02 "You Interview & Select" | | Keep |
| 02 "Skip the scheduling mess. We manage the calendars so you can focus on the candidate. You interview the finalists, test their skills, and make the final hire." | Opens on a negative ("Skip the scheduling mess"). Repeats Done for you line 1. | "We book every interview. You meet the finalists, test their skills, and choose your hire." (proposed in brief, not yet approved) |
| 03 "We Onboard in Days" | | Keep |
| 03 "Once you say "Yes," we handle the rest. We generate compliant contracts, handle equipment logistics, and set up benefits. Your new hire starts in days, not weeks." | Repeats Done for you lines 3 and 4. Ends on a negative ("not weeks"). | "Say yes and we take it from there. Your new hire starts in days, working your hours." (proposed in brief, not yet approved) |

## 8. Done for you (approved, voice benchmark)

| Current text | Issue | Proposed text |
|---|---|---|
| Eyebrow: "Done for you" | | Keep |
| "Platforms employ. Agencies find. Hirably does the whole job." | Approved. | Keep |
| 1. "We find and screen the talent, and schedule every interview." | Approved. | Keep |
| 2. "We run background and identity checks." | Approved. | Keep |
| 3. "We become the legal employer: contracts, payroll, taxes, benefits." | Approved. | Keep |
| 4. "We ship the laptop, set it up, and support it." | Approved. | Keep |
| 5. "We handle HR, check-ins, and time off." | Approved. | Keep |
| 6. "If someone leaves, we replace them. Free, for life." | Approved. | Keep |
| "Your portal shows everything. You never have to run it." | Pending (portal vs "One team handles all of it. You just approve."). The two briefs conflict on this line. | Pending |

## 9. Why you'll love Hirably

| Current text | Issue | Proposed text |
|---|---|---|
| "Why you'll love Hirably" | | Keep |
| "Most agencies charge upfront fees and lock you into contracts. We take on the risk so you don't have to." | Defines Hirably by what others do wrong. Two negatives. Sounds like an agency comparing itself to agencies. | Option 1: "Zero recruitment fees. Month-to-month terms. A lifetime guarantee. We carry the risk." Option 2: "We carry the risk, so every hire is an easy yes." |
| "Lifetime Protection" | Inconsistent: pricing and calculator say "Lifetime Replacement Guarantee." | "Lifetime Replacement Guarantee" |
| "If your employee leaves for any reason, at any time, we recruit their replacement for free. You never pay for the same role twice." | Specific and on-brief. | Keep |
| "Zero Recruitment Fees" | | Keep |
| "No recruitment fees. No setup fees. Nothing to pay until you approve a hire." | Repeats the title. "No setup fees" is not an approved fact. Two negatives. | "Nothing to pay until you approve a hire." |
| "Background-Checked & Verified" | | Keep |
| "Live interviews, verified identity and references. Every candidate, before you ever meet them." | Conflicts with the approved fact (checks happen before an offer, not before you meet them). "References" is not approved. | "Every candidate goes through background and identity checks before an offer." |
| "Month-to-Month" | | Keep |
| "No lock-ins, no fine print. Scale up, down, or out with 30 days' notice." | Two negatives. "Out" is vague. | "Scale up or down with 30 days' notice. Stay because it works." |
| "First Shortlist in 5-7 Days" | The approved fact is business days. | "First Shortlist in 5-7 Business Days" |
| "We move at the speed of your roadmap. A vetted shortlist in your inbox, ready to interview." | The first sentence is generic. | "A vetted shortlist in your inbox, ready to interview." |
| "North American Standards" | Overlaps Why Nearshore (time zones, culture). | Replace the card with "Day One in About Two Weeks" |
| "Same time zones. Same business culture. Your team integrates seamlessly into your workflow from Day 1. Not Day 90." | Banned "seamlessly." "Same business culture" is not approved. Ends on a negative. Repeats Why Nearshore. | "From your first call to your new hire's first day in about two weeks." |

## 10. Stats

| Current text | Issue | Proposed text |
|---|---|---|
| "97%" retention rate | Pending. | Pending |
| "5-7" days to first shortlist | The approved fact is business days. | "5-7" business days to first shortlist |
| "100%" compliance | Pending. | Pending |
| "Zero" recruitment fees | | Keep |

## 11. Why Nearshore

| Current text | Issue | Proposed text |
|---|---|---|
| "Why top companies are moving from offshore to nearshore." | 9 words. "Top companies" is vague. Generic category language. | Option 1: "Talent in Mexico, working your hours." Option 2: "Your team in Mexico. On your clock." |
| "Stop working the night shift to manage your team. Mexico offers the talent you need, in the time zone you live in." | Opens on a negative ("Stop"). | "Bilingual professionals in Mexico, in your meetings and on your schedule." |
| "No More "Async" Lag" | Negative. Jargon ("async"). | "Real Time, Your Hours" |
| "Forget waiting 24 hours for a reply. Your team works your hours: Pacific, Mountain, Central, or Eastern. Collaborate on Slack and Zoom in real time, like they're in the next room." | Opens on a negative. "24 hours" is an unapproved number. The rest is the approved fact. | "Your team works your hours: Pacific, Mountain, Central, or Eastern. Collaborate on Slack and Zoom in real time, like they're in the next room." |
| "Culture, Not Just Language" | "Not just" construction. | "Fluent in English and in Business" |
| "It's not just about speaking English; it's about speaking "Business." Mexican professionals share North American work ethic, urgency, and communication style." | Two negatives. The second sentence is not on the approved list, but it came from your earlier copy corrections. | "Mexican professionals share North American work ethic, urgency, and communication style." |
| "Senior Talent, Junior Prices" | "Junior prices" cheapens the offer. | "Senior Talent, Up to 70% Less" |
| "Don't settle for entry-level. Hire senior professionals and leaders in Mexico for the cost of a junior US employee. Up to 70% savings, zero quality drop." | Negative opener. "Cost of a junior US employee" is an unapproved comparison. "Zero quality drop" is hype. | "Hire senior professionals and leaders in Mexico and save up to 70% vs. a US hire." |

## 12. Pricing

| Current text | Issue | Proposed text |
|---|---|---|
| "Simple Pricing. No Surprises." | Ends on a negative. | Option 1: "One Rate. Everything Included." Option 2: "Simple, All-Inclusive Pricing" |
| Badge: "Most popular" | An unverified claim. | "Recommended" |
| "Complete Staffing" + "in Mexico." | The brief names the product "Hirably Complete." The subtitle is a fragment. | "Hirably Complete" + "Your team in Mexico, fully handled." |
| "Starting at $11 /hr all-inclusive" | The other cards say "From"; the brief says "from $11/hr." | "From $11/hr all-inclusive" |
| "Everything included" | | Keep |
| Hiring: "Vetted Talent (4% acceptance rate)" | Pending ("Top 1%" vs "4%"). | Pending |
| Hiring: "Sourcing & Screening" · "Bilingual Candidate Profiles" · "Technical & Cultural Vetting" · "Zero Recruitment Fees" | | Keep |
| Hiring: "Background Checks ($149 value)" | The approved fact is singular. | "Background Check ($149 value)" |
| Hiring: "Salary Benchmarking & Market Data" | Not an approved fact. | Remove, or approve (see decisions) |
| Employment: "Legal Employer (Mexican Entity)" · "Contracts & Labor Compliance" · "Full Payroll, Social Security & Benefits" · "Equipment, Setup & IT Support" · "Lifetime Replacement Guarantee" | | Keep |
| Employment: "Dedicated In-Country HR Support" | "Dedicated" implies one assigned person, which is not approved. | "In-Country HR Support" |
| Employment: "One Simple USD Invoice" | Not an approved fact. | Keep if approved, otherwise remove (see decisions) |
| Button: "Start Hiring" | | Keep |
| "Free 30-minute call · No lock-in" | Negative ("No lock-in"). "Free 30-minute call" is not approved yet. | "Free 30-minute call · Month-to-month" |
| EOR eyebrow: "HIRABLY EOR" · "Already have talent in Mexico?" · "We become their legal employer and handle payroll and compliance." | | Keep |
| EOR checklist: "Legal Employer (Mexican Entity)" · "Contracts & Labor Compliance" · "Tax Filing & Withholding" · "From $499/mo per employee" | | Keep |
| EOR button: "Get Started" | Sounds self-serve. It actually opens a form and a booked call. | "Book a Call" |
| Recruitment eyebrow: "HIRABLY RECRUITMENT" · "Want to hire directly?" | | Keep |
| "We find and vet the talent. You employ them in your own entity." | Describes the client doing the employment work. | "We find and vet the talent. Your hire joins your own Mexican entity." |
| Recruitment checklist: "Sourcing & Screening" · "Bilingual Candidate Profiles" · "Technical & Cultural Vetting" | Leaves out the approved 180-day replacement guarantee, the card's strongest fact. | "Sourcing & Screening" · "Technical & Cultural Vetting" · "180-Day Replacement Guarantee" |
| "From $3,999 per hire" · button "Get a Quote" | | Keep |
| "All prices in USD. No hidden fees. Cancel anytime with 30 days' notice." | Negative ("No hidden fees"). "Cancel anytime" competes with "30 days' notice." | "All prices in USD. Month-to-month, with 30 days' notice." |
| "Need a custom plan? Let's talk →" | | Keep |

## 13. Get a Quote form (/contact/get-a-quote, live page)

| Current text | Issue | Proposed text |
|---|---|---|
| Badge: "Get a Quote" · Form title: "Hirably Recruitment" | | Keep |
| "Find the Right People for Your Team in Mexico" | 9 words, generic. | Option 1: "We Find Your Next Hire in Mexico" Option 2: "Recruitment for Your Mexican Entity" |
| "You have the entity — we have the talent. Tell us what you need and we'll source, vet, and deliver bilingual candidates matched to your requirements." | Em dash. | "You have the entity. We bring the talent. Tell us the role and we source, vet, and deliver bilingual candidates who fit." |
| "Access 10,000+ pre-vetted candidates" | Pending ("1000s" vs "10,000+"). It conflicts with the hero. | Pending |
| "Average hire in 20 business days" | Conflicts with the approved timing (first shortlist in 5-7 business days). | "First shortlist in 5-7 business days" |
| "Bilingual candidate profiles included" | | Keep |
| "Background checks on every candidate" | Conflicts with the approved fact: for Recruitment, the background check is an optional $149 add-on. | "Background check available ($149 add-on)" |
| "60-day replacement guarantee" | Conflicts with the approved 180 days. | "180-day replacement guarantee" |
| "Don't have a Mexican entity? No problem — check out Hirably Complete where we handle recruitment AND employment under one all-inclusive rate." | Em dash, two negatives, all-caps "AND." | "Need us to be the employer too? Hirably Complete covers recruitment and employment in one all-inclusive rate, from $11/hr." |
| "Fill in your details and pick a time — we'll come prepared with a tailored quote." | Em dash. | "Share a few details and pick a time. We'll come prepared with your quote." |
| "Book My Call & Get a Quote" | | Keep |
| "Free 30-minute call. No commitment." | Negative. "Free 30-minute call" is not approved yet. | "Free 30-minute call with our team." |
| Labels: "Full Name" · "Company Name" · "Work Email" · "Phone Number" · "Hiring Details" · "Role(s) You Need to Fill" · "How Many Positions?" · "Seniority Level" · "Timeline" · "Do You Have a Mexican Entity?" · "Tell Us About Your Needs" · "Select" | | Keep |
| Placeholders: "Jane Smith" · "Acme Corp" · "jane@acme.com" · "+1 (555) 000-0000" · "e.g. Accountant, Operations Manager, QA Engineer" · "Role details, skills required, team structure, or anything that helps us prepare…" | Standard placeholders, not claims. | Keep |
| "Expected Salary Range (MXN/mo)" with options "$15,000 – $25,000" … "$60,000+" | "$" next to USD prices elsewhere reads as dollars, but the label says pesos. | Options as "MX$15,000 – MX$25,000" and so on |
| "I need salary benchmarks" | | Keep |
| "Yes — fully operational" · "Setting one up currently" · "No — I might need EOR too" | Em dashes. The last option points to EOR, not to Complete (the main offer). | "Yes, fully operational" · "Setting one up now" · "No, I need you to be the employer" |
| Seniority: "Junior (0–2 yrs)" · "Mid-Level (2–5 yrs)" · "Senior (5–8 yrs)" · "Lead / Staff (8+ yrs)"; Headcount: "1" · "2–3" · "4–10" · "10+"; Timeline: "ASAP" · "Within 2 weeks" · "Within a month" · "Flexible / Planning ahead" | En dashes in ranges are fine. | Keep |
| "Back to Home" | | Keep |

## 14. Footer

| Current text | Issue | Proposed text |
|---|---|---|
| "Your trusted partner for nearshore hiring in Mexico. From recruitment to payroll, we handle everything." | "Trusted partner" is generic agency language. | "We recruit, employ, pay, and equip your team in Mexico. You approve." |
| "US: Phoenix, AZ · MX: Hermosillo, Son." | Approved. | Keep |
| "Roles": "Technology & Engineering" · "Finance" · "Sales & Support" · "Marketing" · "Operations" | Different grouping from the calculator's 10 role categories. That's acceptable, since these link to department pages, but worth knowing. | Keep |
| "Contact us" · "info@hirablystaffing.com" · "Careers" · "LinkedIn" · "Instagram" · "Facebook" | | Keep |
| "+1 (909) 566-9759" | Not on the approved list. AGENTS.md still tracks the real phone number as a pending task. | Keep once confirmed (see decisions) |
| "© 2026 Hirably. All rights reserved." · "Privacy Policy" · "Terms of Service" (preproduction only) | | Keep |

---

## Needs Chrystian's decision

**From the brief (no rewrite proposed):**

1. **Hero headline:** "You approve. We do the rest." or "Hire Top 1% Talent in Mexico."
2. **"Top 1%" (hero) vs "4% acceptance rate" (pricing card):** pick one claim and use it everywhere.
3. **97% retention and 100% compliance stats:** keep, change, or remove.
4. **"1000s" (hero) vs "10,000+" (Get a Quote page):** pick one number for both.
5. **Done for you closing line:** "Your portal shows everything. You never have to run it." or "One team handles all of it. You just approve." (depends on portal access at launch). The two notes you sent conflict here: the brief lists this line as pending, while the second note includes it in the word-for-word approved block.
6. **Slogan "Simply hire, with Hirably.":** it appears nowhere on Draft A today. Natural spots are under the footer logo or as the line above the final pricing CTA.

**Found in the audit (facts used on the page that aren't on the approved list):**

7. **Calculator assumptions:** payroll taxes +9.1%, benefits +21.4%, and "about 5 weeks" of paid leave. They come from BLS and are cited on the card. Approve them as facts?
8. **"Free 30-minute call":** used in the calculator, the pricing card, and the forms. Add it to the approved facts?
9. **"Sample profiles on their way within 5 business days":** confirm the team can meet this turnaround, or drop the number.
10. **"Health" firms in the trust bar:** none of the six approved clients is a health firm. Keep it as an audience statement, or remove it?
11. **Pricing checklist items that aren't approved facts:** "Salary Benchmarking & Market Data," "One Simple USD Invoice," "Bilingual Candidate Profiles," "Technical & Cultural Vetting," "Tax Filing & Withholding." Approve them or cut them.
12. **Get a Quote page conflicts with the approved facts:** "Average hire in 20 business days," "60-day replacement guarantee," and "Background checks on every candidate." I assume the approved facts win; confirm before that live page is edited.
13. **Phone number +1 (909) 566-9759:** confirm it is the real line.
14. **"Most popular" badge:** keep it only if it's true. Otherwise use "Recommended."
15. **Stock photo on the Get a Quote page:** remove it, consistent with the drafts' no-stock-photo rule?
