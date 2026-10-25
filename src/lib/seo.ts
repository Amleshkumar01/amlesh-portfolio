import { certifications } from '../data/certifications';
import { contactInfo, profile } from '../data/profile';
import { educationData } from '../data/education';

export const siteMetadata = {
  name: profile.name,
  url: 'https://www.amleshkumar.tech/',
  title: 'Amlesh Kumar | Software Developer & Cybersecurity Portfolio',
  description: 'Amlesh Kumar, B.Tech CSE student at LNCT University, Bhopal. Explore Salesforce, Python, React and cybersecurity projects, certifications and contact details.',
  image: 'https://www.amleshkumar.tech/og-image.png',
  imageAlt: 'Amlesh Kumar, software development and cybersecurity portfolio',
  updated: '2026-10-26',
};

export function getPageMetadata(pathname: string) {
  const home = pathname === '/';
  return {
    title: home ? siteMetadata.title : 'Page Not Found | Amlesh Kumar',
    description: home ? siteMetadata.description : "This page could not be found. Return to Amlesh Kumar's portfolio to explore projects, skills, certifications and contact details.",
    robots: home ? 'index,follow,max-image-preview:large' : 'noindex,follow',
    canonical: home ? siteMetadata.url : null,
  };
}

export function getStructuredData() {
  const personId = `${siteMetadata.url}#person`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person', '@id': personId,
        name: profile.name, url: siteMetadata.url, image: siteMetadata.image,
        description: siteMetadata.description,
        jobTitle: 'B.Tech CSE Student and Aspiring Software Developer',
        email: contactInfo.email, telephone: contactInfo.phone,
        address: { '@type': 'PostalAddress', addressLocality: 'Bhopal', addressRegion: 'Madhya Pradesh', addressCountry: 'IN' },
        affiliation: { '@type': 'CollegeOrUniversity', name: educationData.university },
        sameAs: [contactInfo.linkedinHref, contactInfo.githubHref, contactInfo.leetcodeHref,
          contactInfo.hackerrankHref, contactInfo.instagramHref, contactInfo.facebookHref],
        knowsAbout: ['Software Development', 'Cybersecurity', 'Salesforce', 'Python', 'Django', 'React', 'TypeScript', 'Computer Networks'],
        hasCredential: certifications.filter((certificate) => certificate.kind === 'Certification').map((certificate) => ({
          '@type': 'EducationalOccupationalCredential', name: certificate.title,
          credentialCategory: certificate.kind,
          recognizedBy: { '@type': 'Organization', name: certificate.issuer },
          url: new URL(certificate.credentialUrl, siteMetadata.url).href,
        })),
      },
      {
        '@type': 'WebSite', '@id': `${siteMetadata.url}#website`,
        name: profile.name, url: siteMetadata.url, inLanguage: 'en-IN',
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage', '@id': `${siteMetadata.url}#webpage`,
        name: siteMetadata.title, description: siteMetadata.description,
        url: siteMetadata.url, inLanguage: 'en-IN', dateModified: siteMetadata.updated,
        isPartOf: { '@id': `${siteMetadata.url}#website` },
        mainEntity: { '@id': personId },
        primaryImageOfPage: { '@type': 'ImageObject', url: siteMetadata.image, width: 1024, height: 1024 },
      },
    ],
  };
}
