# NeoTaste — Sprint Context
*Briefing document for prototype build. Last updated: May 2026.*

---

## 1. The Challenge

NeoTaste is a restaurant discovery and deals app operating in Germany, the UK, Netherlands, and Austria (Berlin and London are the primary markets). The core experience is transactional: users filter by location, cuisine, and deal type, then book. It works, but users browse in isolation — there's no sense of what friends or other people think. Reviews are weak (mostly 5-star, no photos, not useful), and users regularly leave the app to cross-check on Google Maps before committing, revealing a clear trust gap. The challenge is to design a lightweight social discovery layer that helps users find restaurants through other people — improving confidence in choosing, increasing bookings per subscriber, and giving users reasons to open the app even when they're not actively hunting a deal. The primary user is "The Explorer": Gen Z / younger millennial, foodie-minded, curious, social, open to new places. A secondary user — "The Deal Hunter" — is value-driven and should not be harmed by the social layer, but it won't change their behaviour much.

---

## 2. Concept Direction

**Friends and Food Legends** — a social map filter built natively into the existing Discover page.

**Concept statement:** When NeoTaste users can see where their friends and trusted food legends have been eating, they stop browsing and start booking.

The social layer is not a new section of the app. It is a new filter chip ("Friends & Food Legends") added to the existing filter row on the Discover map, alongside Now · Cuisine · Sort. Tapping it opens a bottom sheet with three views: **Friends** (places your friends have visited or saved), **Top Food Legends** (places bookmarked or reviewed by high-activity badge holders), and **My List** (your saved places, with a share toggle). The map redraws with socially-filtered pins. Everything else — deals, booking flow, navigation — stays exactly as it is.

---

## 3. Core User Flow

1. **Entry:** User opens Discover map (default state, all restaurants visible).
2. **Filter activation:** User taps the "Friends & Food Legends" chip in the filter row.
3. **Bottom sheet:** Sheet slides up with three tabs — Friends / Top Food Legends / My List — plus a distance radius control (500m / 1km / 2km / No limit). User selects a view and taps Show (or sheet auto-applies).
4. **Social map:** Map redraws with socially-filtered pins. Friend pins (visited vs. saved) are visually distinct from standard pins. Standard pins de-emphasise but remain visible.
5. **Pin tap:** User taps a friend pin. A map card snaps up showing: restaurant name, cuisine, deal, distance, and a social signal line ("Steve and 1 other visited").
6. **Restaurant detail:** User taps card to open detail page. A **friend proof block** appears below the deal (above reviews): avatar, name, action ("visited last week"), and optional occasion tag. On cold start, a **food legend proof block** appears instead: badge avatar, username, and action.
7. **Booking:** User books. Booking confirmation includes a subtle 2-for-1 invite nudge ("Bring a friend — share your code").
8. **Exit / loop:** User returns to Discover map. The Friends chip remembers last-used view. A dot on the chip signals new friend activity since last visit.

**My List sub-flow:** User opens My List tab → sees saved places as pins → toggles "Share with friends" → friends can now see these saves on their Friends map view.

---

## 4. Key Design Decisions

**Social signals live on the Discover map, not a new tab.** The Discover page gets the most traffic. Adding a new "Social" tab would split the experience and require users to change their browsing habit. A filter chip adds zero navigation overhead — it's one tap from where they already are.

**Three views in one chip, not three features.** Friends, Top Food Legends, and My List are surfaced from a single entry point. This keeps the filter row from getting cluttered and communicates that they're related lenses on the same map — not separate social features.

**Friend proof block sits below the deal, above reviews.** The deal is why the user opened the page. The friend signal is why they commit. Generic reviews come after. Visual hierarchy reflects trust hierarchy.

**Visited vs. saved pins are visually distinct.** A visited pin (solid) carries stronger signal than a saved pin (outlined/lighter). Both appear on the map, but the user can read the difference at a glance.

**Occasion tags are attributed when possible.** If a friend left "Great for dates" after their visit, it shows as "Steve — Great for dates." If it's from anonymous community data, it appears as an unattributed pill. Attribution increases trust; the distinction should be handled through visual weight, not separate sections.

**Chip carries ambient awareness.** A small dot or count on the Friends chip indicates new friend activity since last visit — presence without pressure. Spotify Friend Activity sidebar is the reference pattern.

**Last-used view persists across sessions.** If the user selected Top Food Legends last time, the bottom sheet opens to Top Food Legends next time. Don't reset to default on every session.

**Privacy defaults to private.** Friend activity is opt-in to share, not opt-out. Users should actively choose to make their visits visible. This is the Venmo lesson — no one should discover their activity is public through a friend mentioning it.

---

## 5. Cold Start Approach

Cold start is solved by **Top Food Legends**, not by waiting for a friend graph to build.

When a user has zero friends on the platform (or friends with no activity), the bottom sheet defaults to **Top Food Legends** view instead of Friends. Top Food Legends are high-activity badge holders — users who have redeemed many deals, written reviews with photos, and left occasion tags. Their behaviour is the trust proxy. The badge functions like a Google Maps Local Guide level: earned credibility, not a personal relationship.

On the map, Food Legend pins have a distinct visual treatment (badge/star marker). In a dense city like Berlin, there may be 30+ Food Legend pins in a 2km radius — clustering is essential.

On the restaurant detail page, the Food Legend proof block shows: "Lena M. [Food Legend badge] — reviewed this: Great for dates, food was fresh."

At the bottom of the Top Food Legends view (and on the Friends empty state), a non-intrusive nudge: "See where your friends eat — invite them to NeoTaste." One-tap send, pre-written message. The growth mechanic is built into the cold start experience, not bolted on separately.

The map is **never empty**. If there are no Friend or Food Legend pins in a panned area, the standard NeoTaste pins remain visible and a subtle banner reads "No friend activity in this area."

---

## 6. Constraints and Things to Avoid

**Hard constraints from NeoTaste:**
- Do not replace or restructure the existing navigation, deal flow, or booking experience
- No video feed (explicitly ruled out by the product team)
- No full social network mechanics: no complex friend management, no heavy profile pages, no Instagram/Facebook patterns
- No features requiring a moderation team or a 6-month recommendation algorithm
- Must function usefully for users with 0 friends on the platform
- Mobile-first, iOS patterns throughout (~70% of users are on iPhone): tab bar at bottom, modal sheets from bottom with grabber handle, 44pt minimum touch targets

**Design things to avoid:**
- Social signals that displace deal information — the deal is always primary
- Vague social labels ("Trending 🔥", "People love this!") with no specificity or attribution
- Showing a social signal with insufficient data behind it — no signal is better than a misleading one (set minimum thresholds)
- Auto-sharing activity without explicit user consent
- Back-to-back social signals that compete with each other on the same screen
- Designing only for the connected/high-friend-count state — every screen needs a cold start variant

**Screens required (build priority order):**
1. Discover map — Friends & Food Legends chip + active state
2. Friends & Food Legends bottom sheet (three tabs + distance control)
3. Discover map — Friends view (friend pin types, visited vs. saved)
4. Discover map — Top Food Legends view (Food Legend pin type, badge treatment, clustering)
5. Map card — social signal line added to existing card component
6. Restaurant detail — friend proof block (avatar, name, action, sentiment)
7. Restaurant detail — food legend proof block (badge avatar, username, action)
8. Empty state: no friends (invite prompt)
9. Booking confirmation — 2-for-1 invite nudge
10. My List view — personal saved pins + share toggle
