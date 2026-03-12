export interface MetaTags {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
}

export function updateMetaTags(tags: MetaTags) {
  // Update title
  document.title = tags.title;

  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', tags.description);

  // Update Open Graph tags
  updateOrCreateMetaTag('og:title', tags.title);
  updateOrCreateMetaTag('og:description', tags.description);
  if (tags.image) updateOrCreateMetaTag('og:image', tags.image);
  if (tags.url) updateOrCreateMetaTag('og:url', tags.url);
  if (tags.type) updateOrCreateMetaTag('og:type', tags.type);

  // Update Twitter tags
  updateOrCreateMetaTag('twitter:title', tags.title);
  updateOrCreateMetaTag('twitter:description', tags.description);
  if (tags.image) updateOrCreateMetaTag('twitter:image', tags.image);
}

function updateOrCreateMetaTag(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    const isProperty = property.startsWith('og:');
    isProperty ? tag.setAttribute('property', property) : tag.setAttribute('name', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export function getJsonLd(data: Record<string, unknown>) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Tech Line',
  description: 'IT Support & ISO 27001 Compliance for Irish Businesses',
  url: 'https://tline.ie',
  telephone: '+353XXXXXXXXX',
  email: 'info@tline.ie',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IE',
    addressRegion: 'Ireland',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Ireland',
  },
  sameAs: [
    'https://www.linkedin.com/company/techline-ie',
    'https://www.facebook.com/tline.ie',
  ],
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Tech Line',
  image: 'https://tline.ie/logo.png',
  description: 'IT Support & ISO 27001 Compliance for Irish Businesses',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IE',
    addressRegion: 'Ireland',
  },
  telephone: '+353XXXXXXXXX',
  email: 'info@tline.ie',
  priceRange: '€€€',
};
