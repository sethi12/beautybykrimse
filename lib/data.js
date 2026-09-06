export const siteConfig = {
  name: "Beauty By Krimse",
  shortName: "Beauty By Krimse",
  tagline: "Luxury Hair & Makeup Artist",
  subheading: "Luxury Hair & Makeup Services for Weddings, Special Events, Photoshoots & Celebrations",
  supportingText: "Timeless, elevated beauty tailored to your unique vision.",
  email: "info@beautybykrimse.com",
  instagram: "https://instagram.com/beautybykrimse",
  instagramHandle: "@beautybykrimse",
  serviceArea: "Canada, GTA & Beyond (Destination Events)",
  whatsappNumber: "14379876427",
  displayPhone: "+1 (437) 987-6427",
  googleReviewUrl:
    process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
    "https://www.google.com/search?hl=en-IN&gl=in&q=Beauty+By+Krimse,+33+University+Ave,+Toronto,+ON+M5J+2S7,+Canada&ludocid=1235993586447773071&lsig=AB86z5ULn1qWRLMoB9lqGPVyCTLA#lrd=0x89d4d323d79786f1:0x1127219e48e16d8f,3",
};

export const heroMedia = {
  primaryImage: "/mainimages/IMG_7657.jpg",
  secondaryImage: "/mainimages/IMG_7314.jpg",
};

export const trustPoints = [
  "5-Star Client Experience",
  "Toronto & GTA Mobile Services",
  "South Asian & Western Bridal Expertise",
  "Premium Products",
  "Team Available for Larger Bookings",
  "Client Reviews",
];

export const meetKrimse = {
  heading: "Meet Your Artist",
  subheading: "Hi, I'm Krimse.",
  body: "I specialize in creating timeless, elevated hair and makeup looks that enhance natural beauty while ensuring clients feel confident and comfortable.",
  image: "/IMG_6670.jpg",
};

/**
 * Categorized featured brides gallery object.
 * To add or remove featured photos, simply add/remove image paths in the category arrays below.
 * Supports string URLs ("/image.jpg") or objects ({ image: "/image.jpg", aspect: "landscape" }).
 */
export const featuredBridesByCategory = {
  "south-asian-brides": {
    name: "South Asian Brides",
    images: [
      "/mainimages/A8D59D07-30DA-4F20-A79E-0904251ACDAE.jpg",
      "/mainimages/IMG_3497.jpg",
    ],
  },
  "western-bride": {
    name: "Western Bride",
    images: [
      { image: "/mainimages/IMG_6893.jpg", aspect: "landscape" },
    ],
  },
  "reception-glam": {
    name: "Reception Glam",
    images: [
      "/rimages/r11.jpg",
    ],
  },
  "engagement-glam": {
    name: "Engagement Glam",
    images: [
      "/mainimages/24369B4D-0152-49D3-96B9-4540C7029359.jpg",
    ],
  },
  "bridal-party": {
    name: "Bridal Party",
    images: [
      { image: "/mainimages/07A02717-D5C4-4459-8687-3341A6D9CB72.jpg", aspect: "landscape" },
    ],
  },
};

// Automatically builds the full featured gallery array from featuredBridesByCategory
export const featuredBridesGallery = Object.entries(featuredBridesByCategory).flatMap(
  ([categoryId, categoryData]) =>
    (categoryData.images || []).map((img, idx) => {
      const isString = typeof img === "string";
      const imageSrc = isString ? img : img.image;
      const aspect = isString ? "portrait" : img.aspect || "portrait";
      return {
        id: `fb-${categoryId}-${idx + 1}`,
        category: categoryData.name,
        categoryId,
        image: imageSrc,
        aspect,
      };
    })
);

export const services = [
  {
    id: "bridal-hair-makeup",
    number: "01",
    title: "Bridal Hair & Makeup",
    description: "For your wedding day.",
    featuredImage: "/mainimages/IMG_7661.jpg",
    gallery: [
      "/mainimages/IMG_1303.jpg",
      "/mainimages/IMG_2466.jpg",
      "/mainimages/IMG_8185.png",
    ],
    bullets: [
      "Hair Styling",
      "Luxury Makeup Application",
      "Skin Preparation",
      "Lashes Included",
      "Dupatta / Veil Setting",
      "Jewelry Assistance",
      "Touch-Up Kit",
    ],
  },
  {
    id: "semi-bridal-hair-makeup",
    number: "02",
    title: "Semi-Bridal Hair & Makeup",
    description: "Perfect for engagement parties, sangeets, showers and special events.",
    featuredImage: "/mainimages/IMG_6895.jpg",
    gallery: [
      "/mainimages/IMG_5358.jpg",
      "/mainimages/IMG_6901.jpg",
      "/mainimages/IMG_1619.png",
    ],
    bullets: [
      "Hair Styling",
      "Makeup Application",
      "Skin Preparation",
      "Lashes Included",
      "Light Jewelry Assistance",
    ],
  },
  {
    id: "non-bridal-hair-makeup",
    number: "03",
    title: "Non-Bridal Hair & Makeup",
    description: "Soft glam for guests, family members, corporate events and celebrations.",
    featuredImage: "/rimages/r16.jpg",
    gallery: [
      "/mainimages/IMG_1135.png",
      "/mainimages/IMG_1266.png",
      "/mainimages/IMG_1640.png",
    ],
    bullets: [
      "Hair Styling",
      "Makeup Application",
      "Skin Preparation",
      "Lashes Included",
    ],
  },
  {
    id: "bridal-party-services",
    number: "04",
    title: "Bridal Party Services",
    description: "Hair & makeup services for bridesmaids, mothers and wedding guests.",
    featuredImage: "/mainimages/4C53E8BE-3FEB-4DCC-B288-C89C02CD6EF5.jpg",
    gallery: [
      "/mainimages/IMG_7144.jpg",
      "/mainimages/IMG_7359.jpg",
      "/mainimages/IMG_9045.png",
    ],
    bullets: [
      "Individual Services",
      "Large Group Bookings",
      "Multiple Artists Available",
    ],
  },
];

export const serviceDropdownOptions = [
  { id: "south-asian-bridal", label: "South Asian Bridal Hair & Makeup" },
  { id: "western-bridal", label: "Western Bridal Hair & Makeup" },
  { id: "semi-bridal", label: "Semi-Bridal Hair & Makeup" },
  { id: "non-bridal", label: "Non-Bridal Hair & Makeup" },
  { id: "bridal-party", label: "Bridal Party Services" },
  { id: "makeup-only", label: "Makeup Only" },
  { id: "hair-only", label: "Hair Only" },
  { id: "trial-appointment", label: "Trial Appointment" },
];

export const whyBookWithUs = [
  "Luxury Hair & Makeup Services",
  "Toronto & GTA Mobile Services",
  "South Asian & Western Expertise",
  "Premium Products",
  "Team Available for Larger Bookings",
  "5-Star Client Experience",
];

export const serviceAreas = {
  heading: "Where We Travel",
  items: [
    {
      title: "Toronto & GTA",
      desc: "Mobile services throughout the Greater Toronto Area.",
    },
    {
      title: "Across Canada",
      desc: "Travel available across Canada.",
    },
    {
      title: "Destination Events",
      desc: "Available for destination weddings and special events.",
    },
  ],
};

export const videos = [
  {
    id: "vid-1",
    title: "Bridal Artistry & Detail",
    subtitle: "Behind the Artistry",
    src: "/mainimages/IMG_6637.mp4",
    poster: "/mainimages/IMG_7613.jpg",
    description: "Signature bridal transformation showcasing delicate skin radiance and royal jewelry placement.",
  },
  {
    id: "vid-2",
    title: "Bridal Radiance in Motion",
    subtitle: "Cinematic Glow",
    src: "/mainimages/IMG_7806.mp4",
    poster: "/mainimages/IMG_7792.jpg",
    description: "Luminous complexion work that moves naturally under 4K camera lenses and outdoor sunlight.",
  },
  {
    id: "vid-3",
    title: "Dupatta Drapery & Crown Styling",
    subtitle: "Precision Styling",
    src: "/mainimages/IMG_2318.mp4",
    poster: "/mainimages/IMG_7788.jpg",
    description: "Meticulous dupatta setting and crown pinning engineered for comfort and all-day stability.",
  },
  {
    id: "vid-4",
    title: "Celebration & Movement",
    subtitle: "Event Ready",
    src: "/mainimages/IMG_2333.mp4",
    poster: "/mainimages/IMG_6900.jpg",
    description: "Dynamic pre-wedding glam and waves crafted to stay flawless through hours of celebration.",
  },
];

export const perfectLook = {
  heading: "Say Yes to the Perfect Look",
  body: "From weddings and special events to editorial shoots and everyday glamour, Beauty By Krimse is your trusted partner for achieving unparalleled elegance and confidence through makeup artistry. Elevate your beauty experience with Krimse – where professionalism meets perfection. Schedule your consultation today to embark on a journey of timeless beauty and sophistication.",
  primaryCta: {
    label: "Discover More",
    href: "/portfolio",
  },
  secondaryCta: {
    label: "Schedule Consultation",
    href: "/inquire",
  },
};

export const faqList = [
  {
    question: "Do you travel to my location?",
    answer: "Yes, we provide on-location mobile services throughout Toronto & the GTA, across Canada, and for destination events worldwide.",
  },
  {
    question: "Do you offer trials?",
    answer: "Yes, bridal trial appointments are available to preview and customize your hair and makeup vision ahead of your wedding day.",
  },
  {
    question: "Do you accommodate large bridal parties?",
    answer: "Yes, we have a qualified team available to accommodate large bridal parties and group bookings with organized timelines.",
  },
  {
    question: "Do you schedule consultation calls?",
    answer: "Yes, we are happy to schedule a consultation to discuss your event timeline, vision, and custom services.",
  },
  {
    question: "How quickly will I receive a response?",
    answer: "We review all inquiries promptly and will get back to you within 24–48 hours.",
  },
];

export const portfolioCategories = [
  { id: "all", name: "All Works" },
  { id: "south-asian-brides", name: "South Asian Brides" },
  { id: "western-brides", name: "Western Brides" },
  { id: "reception-glam", name: "Reception Glam" },
  { id: "engagement-glam", name: "Engagement Glam" },
  { id: "bridal-party", name: "Bridal Party" },
];

/**
 * Categorized portfolio images object.
 * To add or remove photos, simply add/remove image paths in the category arrays below.
 * Supports string URLs ("/image.jpg") or objects ({ image: "/image.jpg", aspect: "landscape" }).
 */
export const portfolioByCategory = {
  "south-asian-brides": {
    name: "South Asian Brides",
    images: "/assets/southasianbrides/*",
  },
  "western-brides": {
    name: "Western Brides",
    images: "/assets/westernbrides/*",
  },
  "reception-glam": {
    name: "Reception Glam",
    images: [
      "/mainimages/IMG_9615.jpg",
      "/mainimages/IMG_9921.jpg",
      "/mainimages/3692F341-7746-40D4-889E-8425E4C28A90.jpg",
      "/mainimages/736D5BCC-8384-4AF5-B57D-853BC2F3788F.jpg",
      // "/mainimages/8F9A0309-E710-4DBD-8492-E850CC71DB17.jpg",
    ],
  },
  "engagement-glam": {
    name: "Engagement Glam",
    images: [
      "/mainimages/IMG_7987.jpg",
      "/rimages/r12.jpg",
      "/mainimages/IMG_9614.jpg",
      "/mainimages/8021F2E8-BFC4-46E8-B2BD-CFB54131EA6C.jpg",
    ],
  },
  "bridal-party": {
    name: "Bridal Party",
    images: [
      { image: "/mainimages/6C97FAFC-1D46-4443-A55C-AF1E41B96391.jpg", aspect: "landscape" },
    ],
  },
};

// Automatically builds the interleaved fallback portfolio array from portfolioByCategory
export const portfolioItems = (() => {
  const categoryQueues = Object.entries(portfolioByCategory).map(
    ([categoryId, categoryData]) => {
      const rawImages = Array.isArray(categoryData.images)
        ? categoryData.images
        : typeof categoryData.images === "string"
          ? [categoryData.images]
          : [];

      return rawImages
        .filter((img) => typeof img !== "string" || !img.includes("*"))
        .map((img, idx) => {
          const isString = typeof img === "string";
          const imageSrc = isString ? img : img.image;
          const aspect = isString ? "portrait" : img.aspect || "portrait";
          return {
            id: `port-${categoryId}-${idx + 1}`,
            category: categoryId,
            categoryName: categoryData.name,
            image: imageSrc,
            aspect,
          };
        });
    }
  );

  const mixed = [];
  let hasMore = true;
  while (hasMore) {
    hasMore = false;
    for (const queue of categoryQueues) {
      if (queue.length > 0) {
        mixed.push(queue.shift());
        if (queue.length > 0) hasMore = true;
      }
    }
  }
  return mixed;
})();

export const reviewMakeupImageMap = {
  "Sargam": "/reviewimages/sargam.png",
  "Janushi": "/reviewimages/janushi.png",
  "Sapriya": "/reviewimages/sapriya.png",
  "Madhumita": "/reviewimages/Madhumita.png",
  "Preeti": "/reviewimages/Preeti.png",
  "Raajvi": "/reviewimages/Raajvi.png",
  "Rajvi Nayak": "/reviewimages/RajviNayak.png",
};

export const loveNotes = [
  {
    id: "g-rev-1",
    authorName: "Sargam",
    role: "Bride & Mom",
    location: "Burlington, Ontario",
    reviewText: "Hi cutie, I wanted to thank you for making me look extra beautiful on each day, every look was so different but still felt like me! And most importantly you made my mom feel beautiful, I couldn’t have asked for a bigger blessing that she was happy!! I’m so glad I trusted you with the most important week of my life! ♥️♥️♥️",
    rating: 5,
    profilePhoto: null,
    makeupImage: "/reviewimages/sargam.png",
    relativeTime: "Google Review",
    source: "Google",
    googleReviewUrl: siteConfig.googleReviewUrl,
  },
  {
    id: "g-rev-2",
    authorName: "Janushi",
    role: "Gujarati Bride",
    location: "Caledon, Ontario",
    reviewText: "Thank you so so much Krimse for everything!! I felt so beautiful and looked like myself too!! You’re the best!!!!",
    rating: 5,
    profilePhoto: null,
    makeupImage: "/reviewimages/janushi.png",
    relativeTime: "Google Review",
    source: "Google",
    googleReviewUrl: siteConfig.googleReviewUrl,
  },
  {
    id: "g-rev-3",
    authorName: "Sapriya",
    role: "Anand Karaj Bride",
    location: "London, ON",
    reviewText: "Krimse did my bridal hair and makeup as well as my bridal party. She did a fantastic job. We were all so thrilled with how we looked. I would highly recommend her services, she was so lovely to work with!",
    rating: 5,
    profilePhoto: null,
    makeupImage: "/reviewimages/sapriya.png",
    relativeTime: "Google Review",
    source: "Google",
    googleReviewUrl: siteConfig.googleReviewUrl,
  },
  {
    id: "g-rev-4",
    authorName: "Madhumita",
    role: "South Indian Bride",
    location: "Scarborough, ON",
    reviewText: "I'm so glad Krimse did my makeup for my wedding and reception!! She's so kind and patient, and I got so many compliments on my look!",
    rating: 5,
    profilePhoto: null,
    makeupImage: "/reviewimages/Madhumita.png",
    relativeTime: "Google Review",
    source: "Google",
    googleReviewUrl: siteConfig.googleReviewUrl,
  },
  {
    id: "g-rev-5",
    authorName: "Preeti",
    role: "Bride + Bridal Party (Western and Indian Wedding)",
    location: "Brampton, ON",
    reviewText: "Krimse was amazing to work with! She was very friendly, responsive, professional, open to feedback, and gave great suggestions for my bridal hair and makeup. She was also very accommodating when I had to change my getting-ready location at the last minute. She took the time to ensure the perfect bridal look for my Hindu and Christian weddings, and with my skin type, also made sure it lasted the whole day (and it did!). I received many compliments from friends, family, and of course my husband!\n\nI highly recommend her bridal and non-bridal services, and will definitely consider her for future events.",
    rating: 5,
    profilePhoto: null,
    makeupImage: "/reviewimages/Preeti.png",
    relativeTime: "Google Review",
    source: "Google",
    googleReviewUrl: siteConfig.googleReviewUrl,
  },
  {
    id: "g-rev-6",
    authorName: "Raajvi",
    role: "Gujarati Wedding Bride",
    location: "Newmarket, ON",
    reviewText: "It was an absolute pleasure working with Krimse and her team for my wedding and reception! Krimse understood my vision for both the events and the final looks were better than my expectations! I also booked her team for my bridal party and everyone in my bridal party loved their makeup and hair! I would definitely book her again for future events!",
    rating: 5,
    profilePhoto: null,
    makeupImage: "/reviewimages/Raajvi.png",
    relativeTime: "Google Review",
    source: "Google",
    googleReviewUrl: siteConfig.googleReviewUrl,
  },
  {
    id: "g-rev-7",
    authorName: "Rajvi Nayak",
    role: "Special Event Glam",
    location: "Ontario",
    reviewText: "I can’t recommend Krimse enough! She did both my mom’s and my makeup for my special event, and we were both beyond happy with the results. She took the time to understand exactly what each of us wanted and created looks that suited us perfectly. Our makeup looked absolutely flawless, lasted all day. We received so many compliments throughout the event! She is incredibly talented, she’s so kind, professional, and made the whole experience so enjoyable. If you’re looking for a makeup artist who truly cares about her clients and delivers amazing results, Krimse is the one. We will definitely be booking with her again! 🥰✨",
    rating: 5,
    profilePhoto: null,
    makeupImage: "/reviewimages/RajviNayak.png",
    relativeTime: "Google Review",
    source: "Google",
    googleReviewUrl: siteConfig.googleReviewUrl,
  },
  {
    id: "g-rev-8",
    authorName: "Ritika",
    role: "Wedding Bride & Bridal Party",
    location: "Ontario",
    reviewText: "I can’t thank Krimse enough for the incredible job she did on my wedding day! She is so sweet, kind, and was genuinely attentive to my vision. She took the time to really understand the kind of bridal look I wanted—and delivered it so beautifully. I felt like the best version of myself, and my makeup lasted all day flawlessly.\n\nNot only did she create my dream bridal look, but she also worked her magic on my mother, mother-in-law, groom, and groomsmen. Everyone looked polished and glowing without being overdone—just perfect for the occasion. She made us all feel so comfortable and at ease during the process, which was such a gift on a busy and emotional day.\n\nKrimse is truly talented, professional, and has the warmest presence. I’m so grateful she was a part of my wedding. Highly, highly recommend her to any bride or bridal party looking for someone who listens, cares, and delivers stunning results. Thank you, Krimse!",
    rating: 5,
    profilePhoto: null,
    makeupImage: null,
    relativeTime: "Google Review",
    source: "Google",
    googleReviewUrl: siteConfig.googleReviewUrl,
  },
];

// Alias for backwards compatibility
export const clientReviews = loveNotes;
