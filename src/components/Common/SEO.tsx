import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  structuredData?: object;
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonical, ogImage, structuredData }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
      const ogTitle = ensureMeta('property', 'og:title');
      ogTitle.setAttribute('content', title);
      const twitterTitle = ensureMeta('name', 'twitter:title');
      twitterTitle.setAttribute('content', title);
    }

    if (description) {
      const desc = ensureMeta('name', 'description');
      desc.setAttribute('content', description);
      const ogDesc = ensureMeta('property', 'og:description');
      ogDesc.setAttribute('content', description);
      const twitterDesc = ensureMeta('name', 'twitter:description');
      twitterDesc.setAttribute('content', description);
    }

    if (canonical) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    if (ogImage) {
      const ogImg = ensureMeta('property', 'og:image');
      ogImg.setAttribute('content', ogImage);
      const twitterImg = ensureMeta('name', 'twitter:image');
      twitterImg.setAttribute('content', ogImage);
    }

    let scriptEl: HTMLScriptElement | null = null;
    if (structuredData) {
      scriptEl = document.createElement('script');
      scriptEl.type = 'application/ld+json';
      scriptEl.text = JSON.stringify(structuredData);
      document.head.appendChild(scriptEl);
    }

    return () => {
      if (scriptEl && scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
    };
  }, [title, description, canonical, ogImage, structuredData]);

  return null;
};

function ensureMeta(attr: 'name' | 'property', value: string): HTMLMetaElement {
  let meta = document.querySelector<HTMLMetaElement>(`meta[${attr}='${value}']`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attr, value);
    document.head.appendChild(meta);
  }
  return meta;
}


