# Dr. Jamshid Rasa

Pashto-first, RTL, mobile-first React + Vite + Tailwind prototype. Includes the full homepage and a separate contact view at `/#/contact`. The reference’s burnt orange, amber, charcoal and cream palette is used throughout.

## Run

Requires Node.js 20.19+ (or 22.12+).

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Edit content

- `src/data/i18n.js`: all visitor-facing content, Pashto (`ps`), Dari (`prs`) and English (`en`). The language choice is stored locally; the document language and direction update automatically. Supplied copy was adapted lightly for spelling and layout. A fluent editor should review both RTL translations before public launch.
- `src/data/videos.js`: replace `youtubeId: null` with a verified YouTube ID. Replace the matching placeholder title/description in each translation. YouTube iframes load only after a visitor clicks a card. Null IDs open an explanatory demo dialog.
- `src/data/contact.js`: supplied social handles, alternate YouTube channel, Maps query, and `whatsappNumber`. Verify handles before launch, especially the Telegram spelling. Add a verified E.164 number (digits only) to activate WhatsApp. No phone number was invented.
- `src/components/Consultation.jsx`: replace `submitConsultation()` with your backend integration. Both forms currently validate locally and explicitly report that no message was sent and no appointment was booked. Form values are not stored or transmitted.
- `src/styles.css`: palette, typography and responsive layouts. Tailwind is enabled through its Vite plugin; reusable editorial layout styles are in this file.

## Portrait and typography

The hero portrait was created with the built-in image generation tool using the supplied Jamshid image as the identity/clothing reference and the other man's image as a pose reference. It is an AI-created portrait, not an original photograph. The full prompt is in `docs/portrait-prompt.md`.

- Source: `assets/jamshid-portrait-original.png`
- Responsive WebP files: `public/images/jamshid-hero-{480,960,1440}.webp`
- Transparent hero cutout: `assets/jamshid-cutout.png`, with responsive `public/images/jamshid-cutout-{480,960,1440}.webp` variants. Its built-in imagegen prompt is in `docs/hero-cutout-prompt.md`.
- `src/components/Hero.css` controls the reference-matched hero composition: orange on the left, oversized portrait across the center, white panel on the right, navigation inside the frame, two compact action cards and outlined social buttons. The composition stays in this physical order in all languages while individual text regions retain native reading direction.
- Regenerate WebP sizes and download the font: `node scripts/assets.mjs`
- Self-hosted Noto Sans Arabic variable font: `public/fonts/noto-arabic.woff2`, with the SIL Open Font License alongside it.

The original portrait is around 21 KB / 62 KB / 105 KB for its three responsive sizes; the transparent hero cutout is around 43 KB / 128 KB / 215 KB. No third-party scripts, map iframe, video iframe, remote fonts or thumbnail requests run on initial page load with the sample data.

## Verification

With the dev server running, `npm run test:browser` uses Playwright and installed Chrome. Set `BROWSER_CHANNEL=msedge` to use Edge. The checks cover all three languages at 360, 390, 430, 768, 1024 and 1440 px, both homepage/contact views, document overflow, broken images, font loading, menu navigation, filters, dialog close, required/invalid phone fields, prototype submission and navigation from contact to consultation. Screenshots and the layout report are written to ignored `test-results/`.

Verified on 2026-10-28: all 36 layouts and interaction checks passed. After the hero revision, a local mobile Lighthouse run on the production build scored 94 performance, 100 accessibility, 100 best practices and 100 SEO. The contact page previously scored 100 accessibility. Scores vary with device, hosting and network conditions. `npm audit` reported zero vulnerabilities.

## Assumptions and remaining content

The contact reference is expressed as an oversized rust heading, line-based form, generous spacing and an orange footer. The hero follows the supplied reference's left/center/right composition and stacks on mobile. Its two bottom cards are useful video/consultation links, and the right-hand card uses the supplied site tagline. No statistics, testimonials or extra credentials were invented. School/foundation details and the personal story remain bracketed placeholders. Featured-media names and biography come from the supplied brief.

The map opens an address search, not a verified location pin. The site has no backend and no confirmed booking schedule. Social addresses need verification. Lighthouse scoring depends on deployed conditions; browser layout checks do not constitute a measured Lighthouse score.

Hosting configuration is in `.openai/hosting.json`; production assets are in `dist/` after build.

## Seminar and admin demo

Open `#/seminars` for attendee registration and simulated HesabPay/Visa checkout. `#/admin` opens directly to seminar registrations, with confirmation/cancellation, search, filters, attendee details, and payment outcomes. `#/admin/students` counts unique confirmed attendees. `#/admin/videos` creates series and uploads local videos to IndexedDB with a playback preview.

This is a browser-local prototype with English, Pashto, and Dari interface translations with an illustrative seminar, date, price, and capacity. It has no authentication, shared backend, real payments, notifications, or public video publishing. Do not enter real personal or financial information. Clearing browser storage removes demo data. A production release needs protected admin access, a database, hosted video storage, and verified payment integrations.

With the dev server running, set `PREVIEW_URL` to its URL and run `npm run test:portal`. This verifies declined/successful payments, admin confirmation, student counts, persistent video storage, and responsive layouts. The video test uses a synthetic file to verify storage and player wiring, not codec decoding.

The portal seeds 24 fictional registrations (10 waiting, 10 confirmed, 2 failed payments, and 2 cancellations), 10 series, and 20 sample lesson records. Confirmed registrations supply the 10 student records. The one-time migration preserves existing records and later edits; sample lessons are metadata only and are labeled separately from playable uploads.

The portal header includes the shared language selector. It changes interface labels and reading direction immediately, persists with the website’s `rasa-language` preference, and applies to cards, dialogs, forms, and notices. Names, contact details, and user-created series or lesson content keep their original text.

Dropdowns throughout the site use the shared `CustomSelect` component, with cream panels, warm hover states, rust selection accents, keyboard navigation, typeahead, and viewport-aware positioning. A hidden native select preserves form submission, validation, and reset behavior. Run `npm run test:menus` with `PREVIEW_URL` set to the running app to verify menus in all three languages.

# jamshid_rasa_v1
