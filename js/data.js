/* KG Dev Studio — content data (edit packages and projects here) */
window.KG = {
  packages: [
    /* ---------- Websites ---------- */
    {
      k: 'landing', g: 'site', ic: 'web', n: 'Landing Page Website', tag: 'ESSENTIAL',
      who: 'Perfect for startups, single-page portfolios and simple showcases.',
      t: '3–5 business days', s: 'Free hosting setup assistance',
      f: [['1-page responsive website', 'Home, About, Services, Contact'], ['Mobile-friendly design', 'Looks great on phones, tablets and desktops'], ['Social media integration', 'Facebook page link included'], ['Contact form or direct button', 'WhatsApp or Messenger'], ['Free hosting setup assistance']]
    },
    {
      k: 'basic', g: 'site', ic: 'web', n: 'Basic Website Package', tag: 'BASIC',
      who: 'Perfect for freelancers, personal brands and small startups that want a fully loaded professional site.',
      t: '5–12 business days', s: 'Daily backups, 30 days free support',
      f: [['Up to 5 pages', 'With a content management system (CMS)'], ['Mobile-responsive design', 'Plus social media integration'], ['Free 1-year domain and hosting'], ['SEO and speed optimization', 'Google Search Optimization'], ['Malware scanner and security', 'Plus free SSL certificate'], ['Migration support and free global CDN', 'Faster website loading'], ['Daily backups, 30 days free support'], ['Training and support included', 'How to manage your content']]
    },
    {
      k: 'event', g: 'site', ic: 'web', n: 'Event & Business Package', tag: 'STANDARD',
      who: 'Ideal for event coordinators, caterers, service providers and growing local brands.',
      t: '10–15 business days', s: 'Daily backups, 30 days free support',
      f: [['Up to 8 pages', 'Home, About, Services, Gallery, Contact and more'], ['Filterable photo gallery', 'Showcase your past works or setups'], ['Interactive contact form', 'With inquiry booking section'], ['Google Maps and advanced on-page SEO'], ['Mobile-responsive design', 'Plus social media integration'], ['SEO and speed optimization'], ['Free 1-year domain and hosting'], ['Malware scanner and security', 'Plus free SSL certificate'], ['Migration support and free global CDN'], ['Daily backups, 30 days free support']]
    },
    {
      k: 'ecom', g: 'site', ic: 'cart', n: 'Business E-Commerce Package', tag: 'BUSINESS',
      who: 'A complete website solution for small businesses ready to sell products online.',
      t: '1–2 weeks', s: 'Daily backups, 60 days free support',
      f: [['Up to 10 pages', 'With custom website design'], ['Full e-commerce features', 'WooCommerce setup, up to 20 product listings, shopping cart and checkout'], ['Payment gateway integration', 'PayPal, Stripe, GCash, Maya, bank transfer'], ['Free 1-year domain and hosting'], ['SEO and speed optimization'], ['Malware scanner and security', 'Plus free SSL certificate'], ['Migration support and free global CDN'], ['Daily backups, 60 days free support']],
      add: ['Extra page or section', 'Logo and branding touch-up', 'Monthly maintenance and content updates: text changes, image swaps and security checks']
    },

    /* ---------- Tech services ---------- */
    {
      k: 'automation', g: 'tech', ic: 'gear', n: 'Business Automation', tag: 'AUTOMATION',
      who: 'For businesses tired of repetitive manual work. Let your forms, emails, spreadsheets and apps talk to each other automatically.',
      t: '3–10 business days', s: 'Testing, documentation and 30 days support',
      f: [['Workflow automation', 'Connect forms, email, chat, spreadsheets and apps'], ['Lead and inquiry capture', 'Auto-save to Google Sheets and notify you instantly'], ['Auto-replies and follow-ups', 'Confirmation, reminder and thank-you messages'], ['Booking and invoice automation', 'Less manual encoding, fewer errors'], ['Scheduled reports', 'Daily or weekly summaries sent to you'], ['Chatbot and messaging integration', 'Messenger, WhatsApp or website chat'], ['API and webhook integration'], ['Documentation and handover', 'So you know exactly how it works']],
      add: ['Extra workflow', 'Custom API integration', 'Monthly workflow monitoring and adjustments']
    },
    {
      k: 'monitoring', g: 'tech', ic: 'pulse', n: 'Monitoring System', tag: 'MONITORING',
      who: 'Know when something breaks before your customers do. Website, server and business monitoring with instant alerts.',
      t: '2–7 business days', s: 'Automated checks and alert setup included',
      f: [['Website uptime monitoring', 'Automatic checks around the clock'], ['Instant alerts', 'Email, SMS, Telegram or Messenger'], ['Speed and performance tracking', 'Page load and response-time trends'], ['SSL and domain expiry reminders', 'Never miss a renewal'], ['Server resource monitoring', 'CPU, memory, disk and network usage'], ['Live status dashboard', 'A clean overview you can share'], ['Monthly health report', 'Uptime and incident summary'], ['Security and malware scan alerts']],
      add: ['Extra monitored site or server', 'Public status page', 'Incident response support']
    },
    {
      k: 'webapp', g: 'tech', ic: 'dash', n: 'Web App & Dashboard', tag: 'CUSTOM BUILD',
      who: 'Custom tools built around your process: booking systems, inventory, admin panels and reporting dashboards.',
      t: '2–6 weeks', s: 'Testing, deployment and 60 days support',
      f: [['Custom web application', 'Built around your workflow'], ['Admin dashboard', 'Manage data, users and content'], ['User login and roles', 'Secure access levels'], ['Database and API setup'], ['Charts and reports', 'Live numbers at a glance'], ['Booking, inventory or ordering modules'], ['Mobile-responsive interface'], ['Deployment and security hardening']]
    },
    {
      k: 'care', g: 'tech', ic: 'shield', n: 'Care & Maintenance Plan', tag: 'SUPPORT',
      who: 'Keep your website secure, updated and fast so you can focus on running your business.',
      t: 'Monthly plan', s: 'Priority response',
      f: [['Monthly updates', 'Core, plugins and themes'], ['Daily backups and restore'], ['Security checks and malware cleanup'], ['Content updates', 'Text, images and small edits'], ['Speed and SEO checkups'], ['Uptime monitoring included'], ['Monthly report']]
    }
  ],

  /* v = animated visual for cards without a screenshot ('flow' | 'pulse'); s = sample build (no live link yet) */
  projects: [
    { c: 'basic', n: 'K&amp;L EcoFeed', k: 'BUSINESS WEBSITE', u: 'https://kandlecofeedbfs.kgdevst.com/', d: 'Multi-page website for a black soldier fly producer, presenting circular-agriculture solutions, sustainability and insights.', g: ['WordPress', 'Multi-page', 'Responsive'], a: '#0d4a3a', b: '#3fb983', m: 'K&amp;L' },
    { c: 'landing', n: 'Judiza Chua', k: 'PERSONAL PORTFOLIO', u: 'https://judiza-chua.kgdevst.com/', d: 'One-page professional portfolio for an accounting professional, with an experience timeline, skills, CV download and contact form.', g: ['One page', 'CV download', 'Contact form'], a: '#2a2160', b: '#a77bff', m: 'JC' },
    { c: 'ecom', n: 'Estudio La Fuerza', k: 'E-COMMERCE', u: 'https://estudiolafuerza.kgdevst.com/', d: 'Luxury furniture and interiors website with an online shop, custom orders, project showcase and checkout.', g: ['WooCommerce', 'Online shop', 'Custom orders'], a: '#4a2f1c', b: '#d49a5c', m: 'LF' },
    { c: 'other', n: 'Aileen Lacson · Hamana Homes', k: 'DIGITAL BUSINESS CARD', u: 'https://aileen-lacson.vercel.app/', d: 'Mobile-first digital business card for a real-estate sales manager, with featured houses, video tours, a vicinity map and one-tap call, SMS, email and Messenger actions.', g: ['Digital card', 'Video tours', 'Quick actions'], a: '#0b3b3c', b: '#3fc1b0', m: 'AL' },
    { c: 'automation', n: 'Lead Capture Automation', k: 'AUTOMATION · SAMPLE BUILD', s: 1, v: 'flow', d: 'Sample workflow: a website inquiry is saved to a spreadsheet, you are alerted instantly, and the customer gets an automatic reply.', g: ['Webhooks', 'Spreadsheet sync', 'Auto-reply'], a: '#0a1d47', b: '#1a6bff' },
    { c: 'monitoring', n: 'Uptime & Alert Monitor', k: 'MONITORING · SAMPLE BUILD', s: 1, v: 'pulse', d: 'Sample setup: automatic uptime and speed checks, instant alerts and a live status dashboard so problems are fixed before customers notice.', g: ['Uptime', 'Alerts', 'Dashboard'], a: '#062b3a', b: '#0aa8d8' }
  ],

  /* automation case studies (real workflows) — s = animated flow steps */
  cases: [
    { k: 'POWER BI \u2022 REPORTING AUTOMATION', n: 'Training Compliance Dashboard', y: '2026', b: 1, t: ['Power BI', 'KPI reporting', 'Data visualization'],
      s: ['Training data', 'Consolidate', 'Dashboard', 'Follow-up'],
      p: 'Team leads were chasing employees with pending or incomplete trainings by hand, which was slow and easy to miss.',
      r: 'One Power BI dashboard that shows who is still pending, which teams are behind, overall compliance status and who needs a follow-up.',
      i: ['Real-time visibility', 'Less manual tracking', 'Overdue and certification tracking'] },
    { k: 'POWER AUTOMATE \u2022 WORKFLOW AUTOMATION', n: 'Automated Cyber Security Quiz Records', y: '2026', w: 'quiz', t: ['Power Automate', 'Excel', 'SharePoint'],
      s: ['Quiz email', 'Validate', 'Excel log', 'SharePoint sync', 'Auto cleanup'],
      p: 'Quiz responses were scattered across email and spreadsheets, so records were missed, duplicated or inconsistent.',
      r: 'A flow that catches each new response email, validates it, records it in Excel and syncs it to SharePoint. Duplicate checks block repeat records and a scheduled job tidies old rows.',
      i: ['Captured in real time', 'No duplicate records', 'Scheduled cleanup and archiving'] },
    { k: 'SHELL SCRIPTING \u2022 INCIDENT AUTOMATION', n: 'Automated Anon-Pool Recovery', y: '2025', w: 'anon', t: ['Shell scripting', 'Cron jobs', 'Log monitoring'],
      s: ['Read hardware log', 'Detect error', 'Restart WEB', 'Verify and log'],
      p: 'Anon pool errors in the hardware log could break the WEB service and needed a manual check or server restart.',
      r: 'A scheduled script that detects the error, restarts the WEB service, verifies it came back, and keeps an error log with log rotation.',
      i: ['Better service availability', 'Less manual intervention', 'Clear error tracking'] },
    { k: 'SHELL SCRIPTING \u2022 INCIDENT AUTOMATION', n: 'Automated Server Component Restart', y: '2025', w: 'srv', t: ['Shell scripting', 'Cron jobs', 'Log monitoring'],
      s: ['Check task usage', 'Find maxed-out', 'Kill and start', 'Log and rotate'],
      p: 'Siebel components could max out their running tasks and needed someone to notice and restart them.',
      r: 'A monitor that reads task usage with srvrmgr, skips excluded components, restarts any that are maxed out, and keeps only the 10 newest log files.',
      i: ['Faster incident response', 'Less manual intervention', 'Improved system availability'] }
  ],

  hero: ['fast websites', 'smart automation', 'monitoring systems', 'online stores', 'custom web apps'],
  stack: ['Responsive design', 'WordPress', 'WooCommerce', 'Workflow automation', 'APIs & webhooks', 'Uptime monitoring', 'Instant alerts', 'Dashboards', 'SEO & speed', 'SSL security', 'Daily backups', 'Global CDN', 'Payment gateways']
};
