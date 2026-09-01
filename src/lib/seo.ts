import type { Metadata } from 'next';
import { siteConfig, absoluteUrl } from '@/data/site-config';

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Set for blog posts so Open Graph reports an article rather than a website. */
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

/**
 * Builds a complete metadata object: unique title, description, canonical,
 * Open Graph and X/Twitter cards. Every page must call this.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  modifiedTime,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: 'tr_TR',
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Structured data builders                                            */
/* ------------------------------------------------------------------ */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: `+${siteConfig.contact.whatsapp}`,
      availableLanguage: ['tr'],
    },
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.locale,
  };
}

export function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${siteConfig.name} IPTV Abonelik Hizmeti`,
    serviceType: 'IPTV abonelik ve kurulum desteği',
    provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    areaServed: { '@type': 'Country', name: 'Türkiye' },
    url: absoluteUrl('/paketler/'),
  };
}

export function breadcrumbSchema(trail: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

/**
 * Only call this when the questions and answers are visibly rendered on the
 * same page — that is a requirement of the FAQPage specification.
 */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function blogPostingSchema(a: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.title,
    description: a.description,
    inLanguage: siteConfig.locale,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt,
    author: { '@type': 'Organization', name: a.author },
    publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/blog/${a.slug}/`) },
  };
}
