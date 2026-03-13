# How to install & run locally

```bash
git clone https://github.com/aloyrs/pet-marketplace.git
cd pet-marketplace
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

# Assumptions made

- Assumed that the primary user flow is for guests, allowing browsing and inquiries without an authorization barrier.

# Key tradeoffs

- Used modal views for the details page and inquiry page (for faster development) instead of URL-based routing (which would allow users to share link to a specific pet's details or inquiry form)

# Future improvements

- Migrate more of the data fetching to Next.js Server Components to improve initial page load and SEO.
- Include more complex data validation for inquiry form. Eg. Prevent usage of offensive language in message box.
- Include unit testing
- Optimise image loading by using NextJS Image component

# Deployed link

Click here -> [https://pet-market-place.vercel.app/](https://pet-market-place.vercel.app/)
