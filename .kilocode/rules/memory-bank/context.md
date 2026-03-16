# Active Context: Serrurier Urgence Toulouse — Site SEO Local

## Current State

**Status**: ✅ Site complet déployable sur Netlify

Application Next.js 16 complète pour un service de serrurier d'urgence à Toulouse, orientée SEO local et génération de leads qualifiés en trafic 100% gratuit.

## Recently Completed

- [x] Landing page principale (`/`) — hero mobile-first, CTA appel, services, zones, avis, FAQ
- [x] 4 pages services dynamiques (`/services/[slug]`) — contenu SEO complet par service
- [x] 14 pages géographiques (`/serrurier/[slug]`) — contenu localisé par ville/zone
- [x] Chatbot de qualification leads (`LeadChatbot.tsx`) — étapes problem/adresse/téléphone/confirm + webhook n8n
- [x] Composants UI : Header, Footer, PhoneButton, TrustBadges, ReviewsSection, FAQSection
- [x] Schema.org LocalBusiness + Service sur toutes les pages
- [x] Sitemap.xml + robots.txt générés automatiquement
- [x] Config centrale (`src/lib/config.ts`) — un seul fichier à modifier pour personnaliser
- [x] 3 workflows n8n JSON exportables (leads, avis, relance)
- [x] Page mentions légales
- [x] Build production : 25 pages statiques générées ✓

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/lib/config.ts` | Config centrale (nom, tel, zones, services) | ✅ À personnaliser |
| `src/app/page.tsx` | Landing page principale | ✅ Ready |
| `src/app/layout.tsx` | Layout global + schema.org + Header/Footer/Chatbot | ✅ Ready |
| `src/app/services/[slug]/page.tsx` | Pages services (4 services) | ✅ Ready |
| `src/app/serrurier/[slug]/page.tsx` | Pages géographiques (14 zones) | ✅ Ready |
| `src/app/sitemap.ts` | Sitemap XML auto-généré | ✅ Ready |
| `src/app/robots.ts` | Robots.txt | ✅ Ready |
| `src/components/` | Tous les composants UI | ✅ Ready |
| `n8n-workflows/` | 3 workflows n8n JSON | ✅ Ready |
| `src/types/global.d.ts` | Types globaux (window.gtag) | ✅ Ready |

## Business Context

- **Activité** : Serrurier dépannage urgence Toulouse
- **Objectif** : 2 appels qualifiés/jour en trafic 100% gratuit
- **Canaux** : SEO local, Google Maps, contenu, annuaires
- **Stack** : Next.js 16 + Tailwind CSS 4 + TypeScript + Netlify

## Personalisation requise

Avant déploiement, mettre à jour `src/lib/config.ts` :
- `phone` et `phoneHref` → vrai numéro du serrurier
- `name` → nom réel de l'entreprise
- `email` → email réel
- `googleReviewLink` → lien avis Google (récupérer depuis GBP)
- `n8nWebhookUrl` → URL webhook n8n (via variable env NEXT_PUBLIC_N8N_WEBHOOK_URL)

## Variables d'environnement n8n requises

```
SERRURIER_PHONE=+336XXXXXXXX
AIRTABLE_BASE_ID=appXXXXX
GOOGLE_REVIEW_LINK=https://g.page/r/XXX/review
```

## Session History

| Date | Changes |
|------|---------|
| Initial | Template Next.js créé |
| 2026-03-16 | Site serrurier complet : landing, services, zones géo, chatbot leads, workflows n8n |
