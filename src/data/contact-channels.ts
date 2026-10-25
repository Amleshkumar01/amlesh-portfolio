import { contactInfo } from './profile';

const profileHandle = (href: string) => `@${new URL(href).pathname.split('/').filter(Boolean).pop()}`;

export const contactCategories = ['Direct', 'Code', 'Social'] as const;
export type ContactCategory = (typeof contactCategories)[number];
export type ContactChannel = {
  id: string;
  name: string;
  category: ContactCategory;
  handle: string;
  description: string;
  href: string;
  icon: 'email' | 'phone' | 'whatsapp' | 'github' | 'linkedin' | 'leetcode' | 'hackerrank' | 'instagram' | 'facebook';
  copyValue?: string;
};

export const contactChannels: ContactChannel[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    category: 'Social',
    handle: profileHandle(contactInfo.linkedinHref),
    description: 'Professional network and career opportunities',
    href: contactInfo.linkedinHref,
    icon: 'linkedin',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Code',
    handle: profileHandle(contactInfo.githubHref),
    description: 'Source code, projects, and development work',
    href: contactInfo.githubHref,
    icon: 'github',
  },
  {
    id: 'email',
    name: 'Email',
    category: 'Direct',
    handle: contactInfo.email,
    description: 'Project inquiries and conversations',
    href: `mailto:${contactInfo.email}`,
    icon: 'email',
    copyValue: contactInfo.email,
  },
  {
    id: 'phone',
    name: 'Phone',
    category: 'Direct',
    handle: contactInfo.phone,
    description: 'Call to discuss a project or opportunity',
    href: contactInfo.phoneHref,
    icon: 'phone',
    copyValue: contactInfo.phone,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    category: 'Direct',
    handle: contactInfo.phone,
    description: 'Start a conversation on WhatsApp',
    href: contactInfo.whatsappHref,
    icon: 'whatsapp',
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    category: 'Code',
    handle: profileHandle(contactInfo.leetcodeHref),
    description: 'Coding practice and problem solving',
    href: contactInfo.leetcodeHref,
    icon: 'leetcode',
  },
  {
    id: 'hackerrank',
    name: 'HackerRank',
    category: 'Code',
    handle: profileHandle(contactInfo.hackerrankHref),
    description: 'Programming practice and technical skills',
    href: contactInfo.hackerrankHref,
    icon: 'hackerrank',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'Social',
    handle: profileHandle(contactInfo.instagramHref),
    description: 'Follow along and stay connected',
    href: contactInfo.instagramHref,
    icon: 'instagram',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    category: 'Social',
    handle: 'Amlesh Kumar',
    description: 'Connect with me on Facebook',
    href: contactInfo.facebookHref,
    icon: 'facebook',
  },
];
