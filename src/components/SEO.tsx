import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
  image?: string;
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonical = window.location.href, 
  type = 'website',
  image = 'https://vatikapureveg.com/og-image.jpg', // Placeholder for now
  schema 
}) => {
  const siteTitle = 'Vatika Pure Veg';
  const fullTitle = `${title} | ${siteTitle}`;

  // Default Restaurant Schema
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Vatika Pure Veg",
    "image": [
      "https://vatikapureveg.com/images/exterior.jpg",
      "https://vatikapureveg.com/images/interior.jpg"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "7R46+J2W, Vasmat Road",
      "addressLocality": "Parbhani",
      "addressRegion": "Maharashtra",
      "postalCode": "431402",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.2683, // Approximate coordinates for Parbhani
      "longitude": 76.7750
    },
    "url": "https://vatikapureveg.com",
    "telephone": "+919022960646",
    "servesCuisine": "Vegetarian, Indian, Chinese",
    "priceRange": "₹₹",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "23:00"
      }
    ],
    "menu": "https://vatikapureveg.com/vatika",
    "acceptsReservations": "True"
  };

  const jsonLd = schema ? { ...defaultSchema, ...schema } : defaultSchema;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;
