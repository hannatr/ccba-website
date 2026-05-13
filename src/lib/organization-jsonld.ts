import { absoluteUrl, site, siteLogoPath, siteUrl } from '@/content/site'

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: site.name,
    logo: absoluteUrl(siteLogoPath),
    description: `${site.name} — attorneys and legal resources in Cayuga County, New York.`,
    url: siteUrl(),
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Cayuga County',
        containedInPlace: {
          '@type': 'State',
          name: 'New York',
        },
      },
      {
        '@type': 'City',
        name: 'Auburn',
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Cayuga County' },
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: site.email,
        areaServed: 'US',
        availableLanguage: ['English'],
      },
    ],
  }
}
