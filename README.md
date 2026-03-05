# IVY SPA STUDIO

A modern, elegant, responsive website for a premium nail spa brand.

## Features

- **6 Pages**: Home, About, Services, Gallery, Booking, Contact
- **Design**: Instagram-inspired gradient (orange → pink → yellow), Playfair Display + Poppins typography
- **Responsive**: Mobile-first, works on all devices
- **Animations**: Smooth fade-in on scroll, hover effects, gradient CTAs
- **Extras**: Instagram feed section, WhatsApp floating button, lightbox gallery, newsletter signup

## Running the Site

Open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve
```

Then visit `http://localhost:8000`

## Customization

Update these values for your studio:

1. **Phone & WhatsApp**: Replace `1234567890` in `https://wa.me/1234567890` and phone links (use international format without +)
2. **Instagram**: Update `@ivyspastudio` and links in contact.html and footer
3. **Location**: Edit the address in contact.html and replace the Google Maps embed URL with your location
4. **Images**: Replace placeholder Unsplash URLs with your own nail art photos

## Structure

```
IVYSPA/
├── index.html      # Home
├── about.html      # About
├── services.html   # Services
├── gallery.html    # Gallery
├── booking.html    # Booking form
├── contact.html    # Contact + map
├── css/
│   └── styles.css  # All styles
└── js/
    └── main.js     # Nav, animations, lightbox, gallery filter
```
