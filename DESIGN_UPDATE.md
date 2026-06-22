# Portfolio Design Update - AgentiWise Inspired

## Changes Made

### 1. Color Scheme (AgentiWise Inspired)
Updated `/src/app/globals.css` with warm, modern color palette:

- **Background**: `#faf9f7` (warm off-white)
- **Page**: `#f5f3f0` (soft warm gray)
- **Accent Colors**:
  - **Cobalt**: `#5956d6` (purple-blue)
  - **Amber**: `#ff8c42` (warm orange)
  - **Coral**: `#ff6b6b` (vibrant red-orange)
  - **Violet**: `#8b5cf6` (purple)
  - **Lime**: `#a3d63c` (fresh green)

### 2. Animated Header (`/src/components/layout/navbar.tsx`)

**Two Motion States:**

#### State 1: Initial (Top of Page)
- Larger logo (48px)
- Wider container (90rem max-width)
- Transparent background
- More padding (py-5)

#### State 2: Scrolled
- Smaller logo (40px with 90% scale)
- Narrower container (7xl/80rem max-width)
- White background with blur
- Less padding (py-3)
- Shadow appears

**Smooth Transitions:**
- All changes animate over 500ms with ease-out timing
- Logo, container width, padding, and background all transition smoothly

### 3. Visual Improvements

#### Gradient Buttons
- CTA button now uses gradient: `amber` to `coral`
- Hover effect: lifts up with enhanced shadow

#### Animated Background (Hero Section)
- Three floating gradient orbs with different animation speeds
- Warm gradient background (background → page → surface-warm)
- Increased height to full viewport (100svh)
- More top padding to account for fixed header

#### Navigation Links
- Hover color changes to `amber` instead of `cobalt`
- Scale effect on hover (105%)
- Smoother transitions (300ms)

#### Social Icons
- Rounded corners increased (xl instead of lg)
- Larger size (40px instead of 36px)
- Enhanced hover effects with shadow

### 4. Animations Added

**Float Animations (in `globals.css`):**
```css
- animate-float: 20s smooth floating
- animate-float-delayed: 25s with delay
- animate-float-slow: 30s slow movement
```

Applied to background gradient blobs for subtle movement.

## How to Test

1. **Build and run locally:**
   ```bash
   npm run dev
   ```

2. **Test scroll behavior:**
   - Scroll down → header should shrink and get background
   - Scroll to top → header should expand and become transparent

3. **Test hover states:**
   - Navigation links turn amber on hover
   - Buttons lift up with shadow
   - Social icons animate

## Files Modified

1. `/src/app/globals.css` - Color variables and animations
2. `/src/components/layout/navbar.tsx` - Animated header
3. `/src/components/sections/hero-section.tsx` - Background and spacing

## Next Steps (Optional Enhancements)

1. **Image Design Improvements:**
   - Replace hero portrait with more dynamic composition
   - Add floating badges/tech stack icons
   - Implement parallax scroll effect on image

2. **Additional Polish:**
   - Add micro-interactions on button clicks
   - Implement smooth scroll with offset
   - Add loading screen animation

3. **Color Combinations to Try:**
   - Gradient backgrounds on section cards
   - Warm accent colors on project cards
   - Amber highlights on code blocks in blog posts

## Browser Compatibility

- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- Animations respect `prefers-reduced-motion`
- Fallbacks for older browsers (no animations)
