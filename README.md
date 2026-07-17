# TheraSpace

> **Run Your Therapy Practice. Not Your Paperwork.**

TheraSpace is a premium, all-in-one practice management platform for therapists, counselors, psychologists, and mental health clinics. Built with Next.js 15, TypeScript, Tailwind CSS, and powered by Groq AI.

![TheraSpace](https://mytherapist.christech.co.ke/og-image.jpg)

## Live Site

**[https://mytherapist.christech.co.ke](https://mytherapist.christech.co.ke)**

## Features

- **Client Management** — Comprehensive profiles, intake forms, treatment history
- **Smart Calendar** — Intelligent scheduling with automated reminders
- **AI Assistant (Groq)** — Generate SOAP/DAP/BIRP notes, summarize sessions, draft treatment plans
- **Secure Messaging** — HIPAA-compliant, end-to-end encrypted
- **Mood Tracking** — Real-time tracking with beautiful charts
- **Journals** — Guided journaling with AI reflection prompts
- **Treatment Plans** — Evidence-based with measurable goals
- **Video Sessions** — Built-in secure conferencing
- **Analytics** — Deep practice insights and reporting
- **Multi-Tenant** — Each therapist has their own secure workspace
- **Role Management** — Granular permissions for clinics

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 15 (App Router) | React framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Supabase | Backend, Auth, Database |
| Groq AI | AI note generation |
| Paystack | Payments (KES) |
| Resend | Email delivery |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/theraspace.git
cd theraspace

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase, Paystack, and Resend credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
```

The static export will be in the `out/` directory, ready for deployment.

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Paystack
PAYSTACK_SECRET_KEY=your_paystack_secret
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public

# Resend
RESEND_API_KEY=your_resend_key
```

## Project Structure

```
theraspace/
├── app/
│   ├── sections/          # Homepage sections
│   ├── components/        # Shared components
│   ├── lib/               # Utilities
│   ├── login/             # Auth pages
│   ├── signup/
│   ├── pricing/
│   ├── about/
│   ├── contact/
│   ├── help/
│   └── blog/
├── public/                # Static assets
├── tailwind.config.ts     # Theme config
└── next.config.js         # Next.js config
```

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag the `out/` folder to Netlify deploy
```

### Static Hosting

The project is configured for static export (`output: 'export'`). Simply upload the `out/` directory to any static hosting provider.

## Pricing

**KES 1,000/month** — One plan, everything included.

- Unlimited Clients
- Unlimited Notes
- Unlimited Appointments
- Unlimited AI Features
- Unlimited Storage
- Unlimited Messaging
- Unlimited Reports
- Unlimited Clinics
- Email Support
- Updates Included

## License

MIT License — see [LICENSE](LICENSE) for details.

## Support

- Email: hello@theraspace.co.ke
- Help Center: [https://mytherapist.christech.co.ke/help](https://mytherapist.christech.co.ke/help)
- Documentation: [https://mytherapist.christech.co.ke/help](https://mytherapist.christech.co.ke/help)

---

Made with ❤️ in Kenya
