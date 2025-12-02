# Using Images in Content

Guide for adding responsive, optimized images to portfolio projects and blog posts.

## Authoring Limits

**Hard constraints for image assets:**

| Constraint | Limit | Rationale |
|------------|-------|-----------|
| **Maximum width** | 1200px | Sufficient for retina displays at 600px rendered width |
| **Maximum file size** | 500KB per image | Balance quality and page load performance |
| **Required formats** | WebP + JPEG fallback | Modern browsers get WebP, older browsers get JPEG |
| **Recommended quality** | 85 (JPEG/WebP) | Optimal quality-to-size ratio for most content |

**Enforcement:**
- These limits ensure fast page loads on mobile networks
- Images exceeding 500KB should be resized or compressed before committing
- Use the optimization workflow below to meet these constraints

## Quick reference

**Basic usage:**
```markdown
{{< img src="/pfp-optimized" alt="Profile picture" width="250" height="250" >}}
```

**With custom styling:**
```markdown
{{< img src="/pfp-optimized" alt="Profile picture" width="250" height="250" style="border-radius: 12px;" >}}
```

**With responsive sizes:**
```markdown
{{< img src="/image-name" alt="Description" width="800" height="600" sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px" >}}
```

**Quick optimization command:**
```bash
# Generate both WebP and JPEG from source image
magick input.jpg -resize 800x800 -quality 85 output.jpg
magick input.jpg -resize 800x800 -quality 85 -define webp:method=6 output.webp

# Or for quick JPEG-only optimization
magick input.jpg -resize 500x500 -quality 85 output-optimized.jpg
```

## The `img` shortcode

The `img` shortcode provides:
- **WebP format with JPEG fallback** for optimal file sizes
- **Responsive images** with `srcset` and `sizes` attributes
- **Lazy loading** by default to improve page load performance
- **Layout stability** with explicit width/height to prevent content shifts

### Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `src` | Yes | - | Base path to image without extension (e.g., `/pfp-optimized`) |
| `alt` | Yes | - | Alt text for accessibility |
| `width` | Optional | - | Image width in pixels (recommended for layout stability) |
| `height` | Optional | - | Image height in pixels (recommended for layout stability) |
| `sizes` | Optional | Auto-generated | Responsive sizes attribute |
| `class` | Optional | - | CSS classes to apply |
| `style` | Optional | - | Inline styles (e.g., `border-radius: 12px;`) |
| `loading` | Optional | `lazy` | Loading strategy: `lazy` or `eager` |

### How it works

The shortcode expects **pre-optimized images** in the `static/` directory:
- `{src}.webp` - WebP version for modern browsers
- `{src}.jpg` - JPEG fallback for older browsers

It generates a `<picture>` element with:
```html
<picture>
  <source srcset="/pfp-optimized.webp" type="image/webp" sizes="...">
  <img src="/pfp-optimized.jpg" alt="Profile picture" width="250" height="250" loading="lazy">
</picture>
```

Modern browsers load the WebP version (smallest file size), while older browsers fall back to JPEG.

## Image optimization workflow

### 1. Prepare your source image

Start with a high-quality source image (JPEG or PNG).

### 2. Generate optimized versions

Use ImageMagick to create WebP and JPEG versions:

```bash
cd static

# Generate WebP (modern browsers)
# Note: Keep width ≤ 1200px to meet authoring limits
magick source-image.jpg -resize 800x800 -quality 85 -define webp:method=6 my-image.webp

# Generate JPEG fallback (older browsers)
magick source-image.jpg -resize 800x800 -quality 85 my-image.jpg

# Verify file sizes are under 500KB
ls -lh my-image.webp my-image.jpg
```

**Quality settings:**
- **85** - Good balance of quality and file size (recommended for most images)
- **75-80** - More aggressive compression for non-critical images
- **90-95** - Higher quality for images where detail matters

**Size guidelines:**
- **Profile pictures:** 500×500 or smaller
- **Portfolio thumbnails:** 400×400 to 600×600
- **Portfolio hero images:** 800×600 to 1200×900
- **Full-width images:** Up to 1200px wide (hard limit)

**Note:** All images must be ≤ 1200px wide and ≤ 500KB per the authoring limits above.

### 3. Use the shortcode

Reference the base path (without extension) in your content:

```markdown
{{< img src="/my-image" alt="Description" width="800" height="600" >}}
```

## Examples

### Profile picture

```markdown
{{< img src="/pfp-optimized" alt="Diego's profile picture" width="250" height="250" style="border-radius: 12px;" >}}
```

### Portfolio hero image

```markdown
{{< img src="/portfolio/project-hero" alt="Project screenshot" width="1200" height="800" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px" >}}
```

### Thumbnail in list view

```markdown
{{< img src="/portfolio/project-thumb" alt="Project thumbnail" width="400" height="300" >}}
```

### Eager loading (above the fold)

For images that appear immediately when the page loads:

```markdown
{{< img src="/hero-image" alt="Hero image" width="1200" height="600" loading="eager" >}}
```

## Responsive sizes attribute

The `sizes` attribute tells the browser how large the image will be at different viewport widths.

**Default behavior:**
If you don't provide `sizes`, the shortcode generates:
```
sizes="(max-width: {width}px) 100vw, {width}px"
```

**Custom sizes examples:**

**Full width on mobile, half width on desktop:**
```markdown
sizes="(max-width: 768px) 100vw, 50vw"
```

**Stepped responsive:**
```markdown
sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
```

**Fixed size:**
```markdown
sizes="400px"
```

## Accessibility

Always provide meaningful `alt` text:

**Good alt text:**
- "Project screenshot showing the dashboard interface"
- "Graph comparing model accuracy across different datasets"
- "Team photo at the project kickoff meeting"

**Poor alt text:**
- "image1"
- "screenshot"
- "photo"

For decorative images that don't add information, use empty alt text:
```markdown
{{< img src="/decorative-border" alt="" width="100" height="10" >}}
```

## Performance tips

1. **Always specify width and height** - Prevents layout shift during page load
2. **Use lazy loading** (default) for images below the fold
3. **Use eager loading** only for above-the-fold images
4. **Optimize aggressively** - Most images can use quality 75-85 without noticeable quality loss
5. **Use appropriate sizes** - Don't serve 3000×3000 images when 800×800 is sufficient

## File organization

Keep optimized images in `static/`:

```
static/
├── pfp-optimized.webp
├── pfp-optimized.jpg
├── portfolio/
│   ├── project1-hero.webp
│   ├── project1-hero.jpg
│   ├── project1-thumb.webp
│   └── project1-thumb.jpg
```

## Troubleshooting

### Image not appearing

1. Check both WebP and JPEG files exist in `static/`
2. Verify path starts with `/` (e.g., `/pfp-optimized` not `pfp-optimized`)
3. Check file extensions match (`.jpg` not `.jpeg`)
4. Rebuild: `hugo --cleanDestinationDir`

### Wrong image displaying

Clear browser cache with hard refresh:
- macOS: `Cmd+Shift+R`
- Windows/Linux: `Ctrl+Shift+R`

### Image exceeds size limit (>500KB)

First check dimensions, then adjust compression:
```bash
# Check current size
identify -format "%f: %wx%h %b\n" input.jpg

# If width > 1200px, resize to meet limit
magick input.jpg -resize 1200x1200\> -quality 85 output.jpg

# If still >500KB after resize, reduce quality
magick input.jpg -resize 1200x1200\> -quality 80 output.jpg
magick input.jpg -resize 1200x1200\> -quality 75 output.jpg

# For WebP (usually smaller)
magick input.jpg -resize 1200x1200\> -quality 85 -define webp:method=6 output.webp
```

**Note:** The `\>` operator only shrinks images larger than the specified dimensions, leaving smaller images unchanged.

## See also

- [static/README.md](../../static/README.md) - Static assets management
- [portfolio-formatting.md](portfolio-formatting.md) - Portfolio content guidelines
