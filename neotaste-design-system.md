# NeoTaste Design System Reference

Extracted from the NeoTaste Base Design System Figma file (node 282:16858) on 2026-05-21.

---

## 1. Color Tokens

All colors are organised by semantic role. Tokens come in pairs: a `Default` value for most uses and a `Subtle` or `Strong` variant for lighter/heavier weight needs.

### Backgrounds

| Token | Hex | Usage |
|---|---|---|
| `Background/Default` | `#ffffff` | Default page/screen background |
| `Background/Neutral/Base` | `#fefefe` | Near-white neutral base, almost identical to white |
| `Background/Subtle` | `#f4f4f4` | Secondary areas, input fill on resting state |
| `Background/Neutral/Surface/Default` | `#f5f5f5` | Card surfaces, list item backgrounds |
| `Background/Neutral/Surface/Medium` | `#e5e5e5` | Medium-weight surface (progress tracks, skeleton loaders) |
| `Background/Neutral/Surface/Strong` | `#d4d4d4` | Strong neutral surface (filled chips, disabled badges) |

### Brand & Accent

| Token | Hex | Usage |
|---|---|---|
| `Background/Brand/Default` | `#53f293` | Primary CTA button fill, highlights, active states |
| `Background/Brand/Strong` | `#3ee380` | CTA pressed state |
| `Background/Brand/Subtle` | `#bafad4` | Brand tint for tags, labels, soft highlights |
| `Background/Accent/01/Default` | `#fff592` | Loyalty reward badges, mustard accent |
| `Background/Accent/01/Subtle` | `#fffbc2` | Subtle mustard tint for backgrounds |
| `Background/Accent/01/Strong` | `#ffe645` | Flash deal button pressed/active state |
| `Background/Accent/03` | `#24afff` | Blue accent (spirulina — Level 2 / verified checkmarks) |

### Inverse / Dark Surfaces

| Token | Hex | Usage |
|---|---|---|
| `Background/Inverse/Brand/Default` | `#11301d` | Deep forest green — default inverse background (dark cards, bottom sheets on dark mode) |
| `Background/Inverse/Brand/Strong` | `#08180f` | Darkest forest green — strongest inverse bg, used as content default on dark |
| `Background/Inverse/Neutral/Default` | `#262626` | Dark neutral background |
| `Background/Inverse/Neutral/Subtle` | `#404040` | Secondary dark neutral (hover on dark bg) |

### Overlays

| Token | Hex (+ opacity) | Usage |
|---|---|---|
| `Background/Overlay/White/Default` | `#fefefe` at 20% | Light overlay for frosted/modal effects |
| `Background/Overlay/White/Subtle` | `#fefefe` at 5% | Very subtle white overlay |
| `Background/Overlay/Black/Default` | `#000000` at 10% | Standard scrim / hover overlay on light surfaces |
| `Background/Overlay/Black/Subtle` | `#000000` at 5% | Very subtle dark overlay |
| `Background/Overlay/Brand/Default` | `#53f293` at 20% | Brand green overlay (active map pins, selected states) |
| `Background/Overlay/Brand/Strong` | `#53f293` at 30% | Stronger brand overlay (pressed map pins) |

### User Level Badges

Each level has a `Default` (solid badge fill) and `Subtle` (background tint) variant.

| Level | Default Hex | Subtle Hex | Colour |
|---|---|---|---|
| Level 1 | `#53f293` | `#bafad4` | Green |
| Level 2 | `#069af1` | `#b8e3ff` | Blue |
| Level 3 | `#f97607` | `#ffc86a` | Orange |
| Level 4 | `#a3a3a3` | `#e5e5e5` | Grey |
| Level 5 | `#ecbb06` | `#fff592` | Gold |

---

### Text / Foreground

| Token | Hex (+ opacity) | Usage |
|---|---|---|
| `Foreground/Primary` | `#0a0a0a` | Primary body text, headings |
| `Foreground/Secondary` | `#000000` at 70% | Supporting text, metadata, timestamps |
| `Foreground/Tertiary` | `#737373` | Placeholder text, captions, helper text |
| `Foreground/Disabled` | `#000000` at 50% | Disabled input labels, inactive tab labels |
| `Foreground/Brand` | `#53f293` | Brand-coloured icons, active nav icons, links on dark |
| `Foreground/Error` | `#f24141` | Error messages, validation text |
| `Foreground/Inverse` | `#fefefe` | White text on dark/inverse backgrounds |
| `Foreground/Inverse-Disabled` | `#fefefe` at 70% | Disabled text on dark backgrounds |
| `Foreground/Brand/Disabled` | `#53f293` at 50% | Disabled brand-coloured text |

---

### Borders

| Token | Hex (+ opacity) | Usage |
|---|---|---|
| `Border/Default` | `#1c1d28` at 10% | Default card outlines, input borders at rest |
| `Border/primary` | `#000000` at 10% | Primary dividers, most strokes |
| `Border/secondary` | `#000000` at 5% | Subtle separators |
| `Border/strong` | `#11301d` | Emphasised border — active/focused input fields, form focus rings |
| `Border/error` | `#f24141` | Error state on inputs and form elements |

---

### Base Palette (Raw Scale)

These are the raw colour ramps. Semantic tokens alias into these.

**Green** (brand)
`/50 #eefef4` · `/100 #d8ffe7` · `/200 #bafad4` · `/300 #79fcad` · `/400* #53f293` · `/500 #3ee380` · `/600 #28ce6a` · `/700 #219750` · `/800 #145b32` · `/900 #11301d` · `/950 #08180f`

**Mustard** (loyalty/rewards)
`/50 #fefde8` · `/100 #fffbc2` · `/200* #fff592` · `/300 #ffe645` · `/400 #fcd413` · `/500 #ecbb06` · `/600 #cc9102` · `/700 #a26706` · `/800 #86510d` · `/900 #724211` · `/950 #432205`

**Spirulina** (blue — levels, verified, info)
`/50 #eff8ff` · `/100 #dff0ff` · `/200 #b8e3ff` · `/300 #78cdff` · `/400* #24afff` · `/500 #069af1` · `/600 #007ace` · `/700 #0061a7` · `/800 #02528a` · `/900 #084572` · `/950 #062b4b`

**Strawberry** (error/destructive)
`/50 #fef2f2` · `/100 #fee2e2` · `/200 #ffc9c9` · `/300 #fda4a4` · `/400 #fa6f6f` · `/500* #f24141` · `/600 #df2323` · `/700 #bc1919` · `/800 #9b1919` · `/900 #811b1b` · `/950 #460909`

**Grey** (neutral)
`/50 #fafafa` · `/100 #f5f5f5` · `/200 #e5e5e5` · `/300 #d4d4d4` · `/400 #a3a3a3` · `/500 #737373` · `/600 #525252` · `/700 #404040` · `/800 #262626` · `/900 #171717` · `/950 #0a0a0a`

**Mango** (used for Level 3 subtle)
`Mango/200* #ffc86a`

**Opacity utilities** (Black & White)
Black opacity goes from `/05 #0000000d` up to `/100 #000000` in 10% steps.
White opacity goes from `/05 #fefefe0d` up to `/100 #fefefe` in 10% steps.

---

## 2. Typography Scale

Font family: **Poppins** throughout.

### Display

Used for hero text, splash screens, large feature numbers.

| Style | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| `Display/Large` | 52px | 700 Bold | 60px | -0.3px |
| `Display/Medium` | 44px | 700 Bold | 52px | -0.3px |
| `Display/Small` | 36px | 700 Bold | 44px | 0 |

### Heading

Used for section titles, screen titles, card headings.

| Style | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| `Heading/H1` | 32px | 700 Bold | 38px | 0 |
| `Heading/H3` | 24px | 700 Bold | 30px | 0 |
| `Heading/H4` | 20px | 700 Bold | 26px | 0 |
| `Heading/H5` | 16px | 700 Bold | 20px | +0.25px |

> H2 is not defined as a separate token — use H1 or H3 depending on context.

### Paragraph

Used for body copy, descriptions, restaurant bios.

| Style | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| `Paragraph/Large` | 18px | 500 Medium | 28px | 0 |
| `Paragraph/Medium` | 16px | 500 Medium | 24px | 0 |
| `Paragraph/Small` | 14px | 500 Medium | 20px | 0 |
| `Paragraph/Small/Bold` | 14px | 700 Bold | 20px | 0 |
| `Paragraph/XSmall` | 12px | 500 Medium | 18px | 0 |

### Label

Used for buttons, chips, tags, tabs, and any text that needs to stand out without being a heading.

| Style | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| `Label/Large` | 16px | 600 SemiBold | 20px | 0 |
| `Label/Medium` | 14px | 600 SemiBold | 18px | 0 |

> Note: There is no `Action` token defined in variables. Buttons use `Label/Large` or `Label/Medium` depending on button size.

---

## 3. Spacing Tokens

The spacing scale uses a base unit of **4px**. All spacing is named with a t-shirt size convention.

| Token | Value | Primary Use |
|---|---|---|
| `Space/XS` / `spacing-xS` | **4px** | Very tight gaps: text + leading icon, badge padding |
| `Space/S` / `spacing-S` | **8px** | Tight internal padding: icon-to-label, chip vertical padding |
| `Space/M` / `spacing-M` | **12px** | Standard inner padding for compact components |
| `Space/L` / `spacing-L` | **16px** | Standard horizontal screen padding, card inner padding |
| `spacing-XL` | **24px** | Section vertical spacing, gap between card groups |
| `spacing-2XL` | **32px** | Large section gaps, bottom sheet padding top |
| `spacing-3XL` | **48px** | Major section separation |
| `spacing-4XL` | **64px** | Full-bleed hero padding, very large vertical rhythm |

The **dominant screen rhythm** is 16px horizontal gutters with 24px between content sections. Cards typically have 12–16px internal padding.

---

## 4. Border Radius

| Token | Value | Visual feel |
|---|---|---|
| `radius-none` | **0px** | Sharp corners |
| `radius-xs` | **4px** | Subtle rounding (tags, chips, input corners) |
| `radius-S` | **8px** | Standard small element rounding (badges, small buttons) |
| `radius-M` | **12px** | Cards, bottom sheets, modals |
| `radius-L` | **16px** | Large cards, full-width content blocks |
| `radius-xl` | **24px** | Floating panels, pill-shaped elements |
| `radius-2xl` | **32px** | Very rounded elements |
| `radius-3xl` | **48px** | Near-pill shapes |
| `radius-4xl` | **64px** | Very large pill shapes |
| `radius-full` | **9999px** | Perfect pills — used on all primary buttons |

---

## 5. Border Width Tokens

| Token | Value | Usage |
|---|---|---|
| `border-S` | **1px** | Default border for cards, inputs at rest, dividers |
| `border-M` | **2px** | Active/focused input state, segmented control selection |
| `border-L` | **4px** | Strong emphasis — focus rings, special selection states |

---

## 6. Elevation

The elevation system is marked as a work-in-progress in Figma (labelled red). The defined shadow from variables:

```
M3/Elevation Light/3
  Drop shadow 1: color #0000004D (30%), offset (0, 1), blur 3, spread 0
  Drop shadow 2: color #00000026 (15%), offset (0, 4), blur 8, spread 3
```

Card shadow reference: `box-shadow: 0 1px 3px rgba(0,0,0,0.30), 0 4px 8px rgba(0,0,0,0.15);`

---

## 7. Visual Patterns

### Restaurant Cards
- Cards use `radius-M` (12px) or `radius-L` (16px) rounding
- Food photography fills a rectangular image area at the top of the card (16:9 or square crop)
- Images always have a subtle dark overlay (`Background/Overlay/Black/Default` at 10%) to ensure legibility of any text overlaid on the image
- Card body sits on `Background/Neutral/Surface/Default` (#f5f5f5) or white
- Title uses `Heading/H4` (20px Bold) or `Heading/H5` (16px Bold)
- Supporting metadata (cuisine, distance, rating) uses `Paragraph/Small` (14px Medium) in `Foreground/Tertiary` (#737373)
- **Occasion tags** appear as horizontal-scrolling context pills ("Great for dates", "Good for groups") — rounded pills using `radius-full`, `Background/Brand/Subtle` fill, `Paragraph/XSmall` (12px)
- **Behavioral signals** like "Last booked 2 days ago" appear on cards as small `Paragraph/XSmall` text in `Foreground/Secondary`
- Flash deal cards live specifically on `Background/Inverse/Brand/Default` (#11301d) dark backgrounds — never on white

### Buttons

Seven variants in two sizes (regular and small). All buttons use `radius-full` (pill shape).

| Variant | Fill | Text/Icon colour | Context |
|---|---|---|---|
| **Primary** | `#53f293` (Brand/Default) | `#08180f` (dark forest) | Main CTA — booking, confirm |
| **Primary Accent** | `#fff592` (Mustard/Accent) | `#08180f` | Secondary CTA on primary button — loyalty, rewards actions |
| **Primary Inverse** | `#08180f` (dark forest) | `#fefefe` | CTA on light backgrounds where brand green would clash |
| **Promo** | `#08180f` with green text | `#53f293` | Flash deal CTA — only used on dark/inverse backgrounds |
| **Secondary** | Transparent | `#0a0a0a` with `border-S` stroke | Supporting actions |
| **Tertiary** | Transparent / no border | `#0a0a0a` | Low-emphasis actions |
| **Ghost** | Transparent / no border | `#0a0a0a` | Destructive actions like "delete account" |

States: `default` → `hover` → `pressed` → `disabled`. Disabled uses 50% opacity on both fill and text.

Button text uses `Label/Large` (16px SemiBold) for regular size, `Label/Medium` (14px SemiBold) for small. Buttons always have a leading icon (left) and/or trailing icon (right).

### List Items (Settings / Menu rows)

- Full-width rows with `16px` horizontal padding (`Space/L`)
- Each row: left icon (24×24, dark) + `Heading/H5` title + `Paragraph/Small` subtitle stacked vertically + trailing control
- Trailing controls are: chevron (navigation), radio button, iOS toggle, or filled radio dot
- Rows separated by 1px hairline dividers (`Border/Default`)
- Vertical row height is approximately 72–80px

### Input Fields / Forms

Six states: `resting`, `active` (focused), `active-typing`, `filled`, `disabled`, `error`.

- **Resting**: `background/subtle` fill, `Border/Default` (1px) border, `radius-M` (12px)
- **Active/focused**: `Border/strong` (#11301d, 2px) border, label floats up as a `Paragraph/XSmall` label
- **Error**: `Border/error` (#f24141, 1px) border, error message below in `Foreground/Error`
- **Disabled**: Muted fill, `Foreground/Disabled` text at 50% opacity
- Phone input variant has a country code prefix selector on the left
- Numeric input has autocomplete dropdown behaviour

### Controls & Selection

- **Segmented control**: Horizontally scrolling tab strip, active segment gets `Background/Brand/Subtle` fill and `Border/strong` underline/stroke
- **Tabs**: 2-tab and 3-tab variants; active tab label `Label/Large` in `Foreground/Primary`, inactive in `Foreground/Tertiary`
- **Checkboxes**: Regular and large size; checked state uses `Background/Brand/Default` fill with white tick
- **Radio buttons**: Regular and large; selected = `Background/Inverse/Brand/Default` fill (#11301d) with white dot
- **Switch (iOS-style)**: Off = grey track, On = `Background/Brand/Default` green track

### Bottom Navigation / Tabs

- Built on `Background/Default` white or dark surface
- Tab items use icon + label stacked vertically
- Active icon and label both in `Foreground/Brand` (#53f293 green)
- Inactive icons in `Foreground/Tertiary` (#737373)
- Hairline top border using `Border/Default`
- Nav sits inside the iOS safe area — allow 34px bottom inset on iPhone X+

### Food Image Handling

- Images are always cropped (never letterboxed) — use `object-fit: cover`
- Overlay gradient for text legibility: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)`
- Brand-level image quality is editorial — no pixelation or low-res thumbnails

### Overall Spacing Rhythm

- Horizontal screen gutters: **16px** (`Space/L`) on both sides
- Vertical gap between cards in a list: **12px** (`Space/M`)
- Vertical gap between content sections: **24px** (`spacing-XL`)
- Top of screen content (below status bar): **16px**
- Between section header and first item: **8–12px** (`Space/S` to `Space/M`)
- The system reads as tight and information-dense at 16px gutters, never spacious — this is intentional for a discovery/booking context where users want to see more content.
