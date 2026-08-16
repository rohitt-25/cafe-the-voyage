/**
 * Design tokens and shared content for Cafe — The Voyage.
 *
 * The style direction is "Exaggerated Minimalism" from the design database:
 * oversized type on a clamp scale, tight tracking, one accent colour, and a
 * lot of empty space doing the work instead of decoration.
 *
 * The photography is the business's own Google listing set — eight images shot
 * on different phones in different light. A shared filter grade is what makes
 * them read as one commissioned shoot rather than a camera roll.
 */

export const TOKENS = {
  bg: '#FAFAF9',
  ink: '#0C0A09',
  inkSoft: '#57534E',
  line: '#E7E5E4',
  accent: '#A16207',
  accentDeep: '#855206',
  dark: '#0C0A09',
};

/** One grade across every photo so the set looks art-directed, not scraped. */
export const PHOTO_GRADE = 'saturate(0.86) contrast(1.06) brightness(1.02)';

export const PHOTOS = [
  'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWm0GGfVOmB2bHxYNi-AYZyBTbtVSWyJ9HyP_-QjJbcrpX5DOXVVAUAgpQLwobtkivEtWHY4ERNPJn1eLosheSTUgL-yDrzrStg7C7J1CB5Rjsbnayn2vio4bApNYCzrthwwEwgerngC9zm4=w1920-h1080-k-no',
  'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWn19jT9PySmtgYS3BMvw8ox18bqxJkJL9JwY9QcyMfHA680ND4yAao5F_ZR5cMVVLMZrj-LzJGo7vEArFk3kcKcYaDs14e966vg6o6Dy831ErtS9X5bKmSaprkOf11w2gsuBRtBSRCUVxlb=w1920-h1080-k-no',
  'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlruEBH5KnECx5xhOuYPyGlYPK1KDhnYZg3YoUiQXp4TJX6oA8etAN_xzR5jQWreJu4-ulvS9xQ2Ifr31Lg-yJTQpouUiYcmPmcRfCEuzMgbl7P8hdbCLtPiHNplngUWVguXqIz=w1920-h1080-k-no',
  'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWksle9BOpnUz_H4nvGcYZUhVDCQfmWZjWusY-MM6D2Y76SD4v8ru4FWsgf_7tHyJ5VAeaGHXVPFjwCcC3b3mZYW-tR4Fg9fmVevEugVRhwVbF0eZ_233jVvOGfwDR3JwBByEqrFkM47mPnX=w1920-h1080-k-no',
  'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWm5CoSaO2UANmn0P-GEZ47MKK_w4IUlXLGvLw0vN1qJ47DqygRHKz3Tx2lJJsAg5VH_gtoz8Wq-bqtrqWYGARaMjRzkhprAi45epOBVzF9bA85nl3erIst7Fk0WpzbkKTqMXHRaA2ZV3QU=w1920-h1080-k-no',
];

/** Google serves any size from the same URL — ask for what the slot needs. */
export function sized(url, w, h) {
  if (typeof url !== 'string' || !url) return '';
  return url.replace(/w\d+-h\d+/, `w${w}-h${h}`);
}

export function srcSetFor(url, heights = [600, 900, 1400]) {
  if (typeof url !== 'string' || !url) return undefined;
  return heights.map((h) => `${sized(url, Math.round(h * 1.5), h)} ${Math.round(h * 1.5)}w`).join(', ');
}

export const WHATSAPP =
  'https://wa.me/918596950267?text=Hi!%20I%27d%20like%20to%20book%20a%20table%20at%20Cafe%20-%20The%20Voyage&utm_source=website&utm_medium=cta&utm_campaign=book_table';

export const PHONE = '+91 85969 50267';
export const PHONE_HREF = 'tel:+918596950267';

/** Numbered like waypoints — the "voyage" runs through the whole page. */
export const MENU = [
  { no: '01', name: 'Artisanal Brews', note: 'Single-origin pours, cold brew, and the flat white regulars come back for.', photo: PHOTOS[1] },
  { no: '02', name: 'Global Comfort Food', note: 'A curated menu spanning gourmet continental favourites.', photo: PHOTOS[2] },
  { no: '03', name: 'Weekend Brunching', note: 'The perfect lively atmosphere for social gatherings.', photo: PHOTOS[3] },
  { no: '04', name: 'Bespoke Desserts', note: 'Handcrafted pastries and treats to end your journey.', photo: PHOTOS[4] },
];

export const REVIEWS = [
  { text: 'Luved the entire space. Food was incredible. Must visit.', author: 'Adrika Gupta' },
  { text: 'A perfect place for me and my friends to meet after a long time. The warm atmosphere made it easy to stay for hours.', author: 'Krishna' },
  { text: 'Had a great time at The Voyage! The food was delicious and the staff were incredibly welcoming.', author: 'Hiral Rani' },
];

export const FAQS = [
  { q: 'Do you take walk-ins or only bookings?', a: 'Both. Walk-ins are welcome all week, but weekend evenings fill up — message us on WhatsApp and we will hold a table.' },
  { q: 'Is outdoor seating available?', a: 'Yes. The garden seating is our most requested spot, especially after sunset.' },
  { q: 'Do you cater to dietary preferences?', a: 'We have vegan and gluten-free options across the menu. Tell us when you book and the kitchen will plan around it.' },
  { q: 'Is parking available near Lane 5?', a: 'Street parking is available along Lane 5, and there is additional space a short walk away on the main road.' },
  { q: 'Can I order online or only dine in?', a: 'Dine-in is where the experience lives, but message us on WhatsApp for takeaway and we will pack it for you.' },
];
