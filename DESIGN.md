# Echovel Workspace Design System

This document outlines the core design language, theme variables, and UI patterns for the Echovel Workspace ecosystem. Any new products built within the Echovel ecosystem should adhere to these guidelines to ensure a consistent, premium, and seamless user experience.

## Design Philosophy

- **Silent & Distraction-Free:** The UI should fade into the background. Content is king.
- **Google Workspace Vibe:** Clean, lots of whitespace, rounded corners, and soft interactive states.
- **Monochrome Foundation:** Rely heavily on black/white and grays (`--background`, `--text`, `--surface`). Only use brand/primary colors for critical actions or highlights.
- **High-End Typography:** Generous line heights, tight tracking for headings, and clear visual hierarchy.

---

## 1. Theme Variables (CSS Custom Properties)

These variables are defined in the global stylesheet (`index.css`) and automatically adapt based on the user's OS or app preference (via the `useTheme` hook). **Always use these variables instead of hardcoded Hex/RGB values.**

### Light Theme (Default)
```css
:root {
  --background: #ffffff;
  --text: #1f1f1f;
  --text-muted: #5f6368;
  --border: #e0e0e0;
  --surface: #f8f9fa;
  --surface-2: #f1f3f4;
  --primary: #0b57d0;       /* Google Blue */
  --selection: #e8f0fe;
  
  /* App Specific */
  --explorer-bg: #f8f9fa;
  --editor-bg: #ffffff;
}
```

### Dark Theme (`.dark`)
```css
.dark {
  --background: #000000;    /* True black for OLED/premium feel */
  --text: #e3e3e3;
  --text-muted: #9aa0a6;
  --border: #202020;
  --surface: #121212;
  --surface-2: #1e1e1e;
  --primary: #a8c7fa;       /* Softened blue for dark mode */
  --selection: #0d293e;
  
  /* App Specific */
  --explorer-bg: #111111;
  --editor-bg: #000000;
}
```

---

## 2. Typography

We use two primary font families for contrast and hierarchy.

- **Sans-serif (UI & Headings):** `Inter`, system-ui, sans-serif
  - Usage: Navbars, sidebars, buttons, hero headings.
  - Variable: `var(--font-sans)`
  - Tailwind: `font-sans` (assuming configured in project)
- **Serif (Content & Editor):** `Lora`, Georgia, serif
  - Usage: Long-form writing, document bodies, story drafts.
  - Variable: `var(--font-serif)`
  - Tailwind: `font-serif`

---

## 3. UI Components & Patterns

### Buttons & CTAs
- **Primary Marketing CTAs:** Fully rounded (`rounded-full`), padded (`px-6 py-2.5`), high contrast (`bg-text text-background`). Often paired with a subtle scale on hover (`hover:scale-105 transition-transform`).
- **Dashboard/App Buttons:** Softly rounded (`rounded-md` or `rounded-lg`).
- **Secondary Actions:** Transparent background with subtle hover state:
  ```jsx
  className="transition-colors hover:bg-black/5 dark:hover:bg-white/5 rounded-md/full"
  ```
- **Icon Buttons (e.g. Theme Toggle, Grip):** Circular (`rounded-full`, `w-10 h-10`), soft hover (`hover:bg-black/5 dark:hover:bg-white/5`).

### Layout & Containers
- **Border Radius:**
  - Standard cards/panels: `rounded-xl` or `rounded-2xl`
  - Inner items (list items, small buttons): `rounded-md` or `rounded-lg`
- **Shadows:** 
  - Standard items: `shadow-sm`
  - Floating premium windows (like the Hero UI preview): `shadow-2xl` paired with `border border-border`.
- **Modals/Dropdowns:** Always use a combination of `--surface` background, `--border`, and a heavy shadow (`shadow-xl` or `shadow-2xl`).

### Navbars (The Echovel Standard)
- **Positioning:** Use `fixed` at the top with `z-50`.
- **Background:** Semi-transparent with a backdrop blur for a glassmorphism effect.
  ```css
  background-color: color-mix(in srgb, var(--background) 90%, transparent);
  backdrop-filter: blur(12px);
  ```
- **App Launcher:** Use the 9-dots `Grip` icon from Lucide React to denote the Echovel Workspace app switcher.

### Forms & Inputs
- Minimal borders (`border-border`), background `bg-background` or `bg-surface`.
- Focus states should be sharp and use the `--primary` color or simply invert the border to `--text`.

---

## 4. Tailwind Integration Tips (Without tailwind.config.js)

Since this project avoids complex `tailwind.config.js` setups (aligning with newer CSS-first approaches), apply design tokens directly using inline styles mapped to CSS variables where Tailwind utility classes fall short.

**Good Example:**
```jsx
<div 
  className="rounded-2xl border p-4 shadow-sm" 
  style={{ 
    backgroundColor: 'var(--surface)', 
    borderColor: 'var(--border)' 
  }}
>
  <h2 style={{ color: 'var(--text)' }}>Title</h2>
  <p style={{ color: 'var(--text-muted)' }}>Description</p>
</div>
```

## 5. The "Premium" Floating Window Pattern

For landing pages, when showcasing an app UI, use the floating window pattern:
- Wrapper: `relative z-10 flex justify-center`
- Window Container: `rounded-2xl overflow-hidden border shadow-2xl bg-white dark:bg-black`
- Height constraints: Limit height (e.g., `h-[420px]`) and width (e.g., `max-w-[460px]`).
- Backdrop Glow (Optional): A radial gradient positioned behind the window to make it pop.

```jsx
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-10 blur-[80px]" style={{ background: 'radial-gradient(circle, var(--text) 0%, transparent 70%)' }}></div>
```
