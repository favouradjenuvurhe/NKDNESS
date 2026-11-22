# NKDNESS®

**Nothing but yourself.** The storefront for NKDNESS, a contemporary fashion label.
Live store: https://wearnkdness.store

A static website: plain HTML, CSS and JavaScript (Tailwind via CDN). No build step.

## Folder structure

```
nkdness/
├── index.html            All the page markup: hero, gallery, product page, checkout, drawers
├── css/
│   └── styles.css        Colours (:root variables), layout, gallery, cart and checkout styles
├── js/                   Loaded in this order by index.html
│   ├── config.js         Store settings: WhatsApp number / email that receive orders
│   ├── data.js           Products, prices, colours, sizes, gallery order, artwork helper
│   ├── gallery.js        3D curved gallery room: scrolling, dragging, zoom into a piece
│   ├── shop.js           Product page, cart, saved items, search, checkout and order text
│   └── ui.js             Gallery/List views, side panels, navigation, hero, logo
├── assets/
│   ├── images/           Product pictures used by the site (polo x3, cap x2, .webp)
│   └── source/           Your original photos (not used by the site, kept for editing)
├── .nojekyll             Tells GitHub Pages to serve the files as they are
├── .gitignore
└── README.md
```

## Pages (views) inside the site

| View | Where it lives |
| --- | --- |
| Hero (landing) | `index.html` section `#hero` |
| Gallery (3D room) | `#stage`, driven by `js/gallery.js` |
| List view with filters | `#list`, built in `js/ui.js` and `js/shop.js` |
| Product page | `#detail`, built by `fill()` in `js/shop.js` |
| Cart, Saved, Search, Story, Philosophy, Contact, Size guide | the side panel `#drawer`, content in `DR` in `js/ui.js` |
| Checkout and order confirmation | `#co`, logic in `js/shop.js` |

## Run it on your computer

Open a terminal in the project folder and run:

```
python3 -m http.server 8000
```

Then open http://localhost:8000

(Opening `index.html` by double-click also works, but a local server matches GitHub Pages best.)

## Deploy to GitHub Pages

1. Create a new repository on GitHub (for example `nkdness`).
2. Upload everything in this folder, or from the terminal:
   ```
   git init
   git add .
   git commit -m "NKDNESS website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/nkdness.git
   git push -u origin main
   ```
3. In the repository go to **Settings > Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
5. After a minute your site is live at `https://YOUR-USERNAME.github.io/nkdness/`.

To use your own domain, add it under **Settings > Pages > Custom domain** and point your DNS at GitHub Pages.

## Things you will edit most

- **Prices:** `js/data.js`, in the `PR` object (`price` and `was`, in Naira. Use `was:0` for no sale).
- **Add a colour or product:** add its image to `assets/images/`, then add it to `IMG` and `PR` in `js/data.js`, and to `SEQ` for the gallery order.
- **Receive orders:** `js/config.js`. Add your WhatsApp number or email.
- **Brand text:** hero text in `index.html`, story and FAQ text in `DR` inside `js/ui.js`.
- **Colours and fonts:** top of `css/styles.css`.

## Good to know

- Checkout is a front-end flow. It does not take payment or send data to a server. With a WhatsApp number or email in `js/config.js`, the buyer gets a button that sends the full order to you. For card payments, connect a provider such as Paystack or Flutterwave.
- The cart and saved items are kept in the visitor's browser (localStorage).
- Tailwind is loaded from its CDN, which is fine for this size of site. Fonts load from Google Fonts.
