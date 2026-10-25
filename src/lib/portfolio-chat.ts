import { certifications } from '../data/certifications';
import { contactChannels } from '../data/contact-channels';
import { educationData } from '../data/education';
import { contactInfo, profile } from '../data/profile';
import { projects } from '../data/projects';
import { skillCategories } from '../data/skills';

export type ChatTopic = 'about' | 'education' | 'skills' | 'projects' | 'certifications' | 'internships' | 'achievements' | 'contact' | 'resume' | 'availability' | 'unknown';
export type ChatLink = { label: string; href: string; external?: boolean; download?: string };
export type ChatReply = { text: string; links: ChatLink[]; topic: ChatTopic };

export const chatSuggestions = [
  { label: 'About Amlesh', question: 'Tell me about Amlesh' },
  { label: 'Skills', question: 'What are his skills?' },
  { label: 'Projects', question: 'Tell me about his projects' },
  { label: 'Certificates', question: 'What certifications does he have?' },
  { label: 'Education', question: 'What is his education and CGPA?' },
  { label: 'Contact', question: 'How can I contact Amlesh?' },
];

export const welcomeReply: ChatReply = {
  text: "Hi! I'm Amlesh's portfolio assistant. Ask me about his skills, projects, education, or certificates. Aap Hindi mein bhi pooch sakte hain!",
  links: [], topic: 'about',
};

const normalize = (value: string) => value.normalize('NFKC').toLowerCase()
  .replace(/\./g, '').replace(/[^\p{L}\p{M}\p{N}+#]+/gu, ' ').replace(/\s+/g, ' ').trim();
const section = (label: string, id: string): ChatLink => ({ label, href: `#${id}` });
const email: ChatLink = { label: 'Email Amlesh', href: `mailto:${contactInfo.email}` };
const list = (items: string[]) => items.map((item) => `• ${item}`).join('\n');

/** Use the portfolio's public records; never invent missing personal details. */
export function getPortfolioReply(question: string, previousTopic?: ChatTopic): ChatReply {
  const text = normalize(question.slice(0, 500));
  const has = (...terms: string[]) => terms.some((term) => ` ${text} `.includes(` ${normalize(term)} `));
  const hindi = /[\u0900-\u097f]/.test(text) || has('kya', 'kaun', 'batao', 'btao', 'bataiye', 'hai', 'hain', 'kitna', 'kitni', 'kahan', 'padhai', 'kaise', 'bare', 'baare', 'chahiye', 'namaste');
  const choose = (english: string, hinglish: string) => hindi ? hinglish : english;
  const reply = (topic: ChatTopic, answer: string, links: ChatLink[] = []): ChatReply => ({ topic, text: answer, links });
  const followUp = text.split(' ').length <= 5 && has('more', 'details', 'aur', 'detail', 'continue');
  const follows = (topic: ChatTopic) => followUp && previousTopic === topic;
  const certificateIntent = has('certification', 'certifications', 'certificate', 'certificates', 'certified', 'credentials', 'certs', 'cirtificate', 'प्रमाणपत्र', 'सर्टिफिकेट') || follows('certifications');
  const skillsIntent = has('skill', 'skills', 'technology', 'technologies', 'tech', 'stack', 'language', 'languages', 'programming', 'coding', 'know', 'aata', 'aati', 'स्किल्स', 'कौशल') || follows('skills');
  const projectIntent = has('project', 'projects', 'cyberguard', 'airline', 'placement', 'e-commerce', 'ecommerce', 'nids', 'प्रोजेक्ट', 'प्रोजेक्ट्स');
  const requestedChannels = contactChannels.filter((channel) => has(channel.id, channel.name,
    ...(channel.id === 'instagram' ? ['insta'] : channel.id === 'phone' ? ['mobile', 'number', 'call', 'फोन'] : [])));

  if (has('resume', 'cv', 'résumé', 'biodata', 'रिज्यूमे', 'सीवी') || follows('resume')) {
    return reply('resume', choose("Download Amlesh's resume below. Explore this portfolio for his latest CGPA, projects, and certificates.", 'Amlesh ka resume neeche se download kar sakte hain. Latest CGPA, projects aur certificates portfolio mein bhi dekh sakte hain.'),
      [{ label: 'Download resume', href: profile.resumeUrl, download: 'Amlesh_Kumar_Resume.pdf' }]);
  }
  if ((has('contact', 'email', 'mail', 'connect', 'reach', 'linkedin', 'github', 'phone', 'mobile', 'whatsapp', 'number', 'संपर्क', 'ईमेल', 'फोन') || requestedChannels.length || follows('contact')) && !(projectIntent && has('github'))) {
    if (requestedChannels.length) {
      return reply('contact', choose("Here are Amlesh's contact details:", 'Amlesh ki contact details:') + `\n${list(requestedChannels.map((channel) => `${channel.name}: ${channel.handle}`))}`,
        [...requestedChannels.map((channel) => ({ label: channel.name, href: channel.href, external: channel.href.startsWith('https://') })), section('All contact channels', 'contact')]);
    }
    return reply('contact', choose(`Reach Amlesh at ${contactInfo.email}. He is based in ${contactInfo.location}.`, `Amlesh ko ${contactInfo.email} par contact karein. Woh ${contactInfo.location} mein hain.`),
      [email, { label: 'LinkedIn', href: contactInfo.linkedinHref, external: true }, { label: 'GitHub', href: contactInfo.githubHref, external: true }, section('All contact channels', 'contact')]);
  }
  if (has('hire', 'hiring', 'available', 'availability', 'freelance', 'collaborate', 'opportunity', 'opportunities', 'salary', 'fees', 'pricing', 'job', 'नौकरी') || follows('availability')) {
    return reply('availability', choose("Amlesh welcomes inquiries about internships, projects, and freelance work. Please contact him to confirm availability and discuss the role, scope, or fees; those details are not listed here.", 'Internships, projects aur freelance work ke liye Amlesh se baat kar sakte hain. Availability, role, scope aur fees confirm karne ke liye seedha unse contact karein; ye details portfolio mein listed nahi hain.'),
      [email, section('Contact Amlesh', 'contact')]);
  }
  if (has('education', 'cgpa', 'gpa', 'college', 'university', 'degree', 'graduation', 'graduate', 'study', 'studying', 'academic', 'marks', 'school', 'padhai', 'पढ़ाई', 'शिक्षा', 'सीजीपीए') || follows('education')) {
    const school = has('school', '10', '12', 'marks', 'स्कूल') ? `\n${educationData.school}\n${list(educationData.schoolResults.map((result) => `${result.level}: ${result.percentage}`))}` : '';
    const answer = choose(`${profile.name} is pursuing a ${educationData.degree} at ${educationData.university}, ${educationData.location} (${educationData.duration}). His current CGPA is ${educationData.cgpa} / 10.${school}`, `Amlesh ${educationData.university}, ${educationData.location} se ${educationData.degree} kar rahe hain (${educationData.duration}). Unka current CGPA ${educationData.cgpa} / 10 hai.${school}`);
    return reply('education', answer + (certificateIntent ? choose(`\nHis portfolio also includes ${certifications.length} credentials.`, `\nPortfolio mein ${certifications.length} credentials bhi hain.`) : ''),
      [section('View education', 'education'), ...(certificateIntent ? [section('View certificates', 'certifications')] : [])]);
  }
  if (has('achievement', 'achievements', 'accomplishments', 'awards', 'highlights', 'उपलब्धियां', 'उपलब्धियाँ') || follows('achievements')) {
    return reply('achievements', choose('His portfolio highlights:', 'Unki portfolio highlights:') + `\n${list(educationData.achievements)}`,
      [section('View achievements', 'education'), section('View certificates', 'certifications')]);
  }
  if (has('internship', 'internships', 'experience', 'intern', 'इंटर्नशिप', 'अनुभव') || follows('internships')) {
    const internships = certifications.filter((certificate) => certificate.kind === 'Internship');
    const named = internships.filter((certificate) => ['cisco', 'servicenow'].some((name) => has(name) && normalize(certificate.title).includes(name)));
    const selected = named.length ? named : internships;
    return reply('internships', choose('His completed virtual internships:', 'Unki completed virtual internships:') + `\n${list(selected.map((certificate) => `${certificate.title} (${certificate.date})`))}`,
      selected.map((certificate) => ({ label: certificate.title, href: certificate.credentialUrl, external: true })));
  }

  const projectAliases = [['cyberguard', 'cyberguard ai', 'nids', 'intrusion detection'], ['e-commerce', 'ecommerce', 'e commerce', 'shopping'], ['airline', 'airline management', 'flight'], ['placement', 'placement iq', 'placementiq']];
  const namedProjects = projects.filter((_, index) => has(...projectAliases[index]));
  if (namedProjects.length || has('project', 'projects', 'built', 'प्रोजेक्ट', 'प्रोजेक्ट्स') || follows('projects')) {
    const byTechnology = projects.filter((project) => project.technologies.some((technology) => has(technology)));
    const selected = namedProjects.length ? namedProjects : byTechnology.length ? byTechnology : projects;
    if (selected.length === 1) {
      const project = selected[0];
      const links: ChatLink[] = [section('View projects', 'projects')];
      if (project.githubUrl !== '#') links.push({ label: 'Source code', href: project.githubUrl, external: true });
      if (project.liveUrl !== '#') links.push({ label: 'Live project', href: project.liveUrl, external: true });
      return reply('projects', `${project.title.trim()} (${project.status})\n${project.description}\n\nTechnologies: ${project.technologies.join(', ')}`, links);
    }
    return reply('projects', choose('His portfolio projects:', 'Unke portfolio projects:') + `\n${list(selected.map((project) => `${project.title.trim()} — ${project.category} (${project.status})`))}`
      + choose('\nAsk about any project by name for details and links.', '\nKisi project ka naam poochhein, uski details aur links mil jayenge.'), [section('Explore projects', 'projects')]);
  }
  if (certificateIntent || (has('salesforce', 'copado', 'ccna', 'cisco', 'ibm', 'infosys', 'agentia') && !skillsIntent)) {
    const stop = new Set(['what', 'which', 'does', 'have', 'his', 'the', 'are', 'and', 'about', 'tell', 'show', 'certification', 'certifications', 'certificate', 'certificates', 'certified', 'credentials', 'amlesh', 'kumar', 'kya', 'hai', 'hain', 'batao', 'all', 'sab']);
    const terms = text.split(' ').filter((term) => (term.length >= 3 || term === 'ai') && !stop.has(term));
    const scored = certifications.map((certificate) => ({ certificate, score: terms.filter((term) => ` ${normalize(`${certificate.title} ${certificate.issuer}`)} `.includes(` ${term} `)).length }));
    const highest = Math.max(...scored.map(({ score }) => score));
    const selected = highest ? scored.filter(({ score }) => score === highest).map(({ certificate }) => certificate) : certifications;
    const displayed = has('all', 'sab', 'सभी') || highest ? selected : selected.slice(0, 5);
    const heading = highest ? choose('Matching certificates:', 'Ye certificates match karte hain:') : choose(`His portfolio includes ${certifications.length} credentials. Here are ${displayed.length === certifications.length ? 'all of them' : 'some highlights'}:`, `Portfolio mein ${certifications.length} credentials hain. Ye ${displayed.length === certifications.length ? 'sabhi certificates' : 'kuch highlights'} hain:`);
    return reply('certifications', heading + `\n${list(displayed.map((certificate) => `${certificate.title} (${certificate.date})`))}`,
      [...displayed.slice(0, 2).map((certificate) => ({ label: certificate.title, href: certificate.credentialUrl, external: true })), section(`View all ${certifications.length} certificates`, 'certifications')]);
  }
  const mentionedSkills = [...new Set([...skillCategories.flatMap((category) => category.skills.map((skill) => skill.name)), ...projects.flatMap((project) => project.technologies)])].filter((name) => has(name));
  if (skillsIntent || mentionedSkills.length) {
    return reply('skills', mentionedSkills.length ? choose(`${mentionedSkills.join(', ')} ${mentionedSkills.length === 1 ? 'is' : 'are'} listed in Amlesh's portfolio skills.`, `${mentionedSkills.join(', ')} Amlesh ki portfolio skills mein listed hain.`)
      : choose('His listed technical skills:', 'Unki listed technical skills:') + `\n${list(skillCategories.map((category) => `${category.title}: ${category.skills.map((skill) => skill.name).join(', ')}`))}`,
      [section('Explore skills', 'skills'), section('See projects', 'projects')]);
  }
  if (has('location', 'city', 'based', 'live', 'lives', 'kahan', 'कहाँ', 'लोकेशन')) {
    return reply('about', choose(`Amlesh is based in ${contactInfo.location}.`, `Amlesh ${contactInfo.location} mein hain.`), [section('About Amlesh', 'about')]);
  }
  if (has('about', 'who', 'introduction', 'introduce', 'bio', 'summary', 'yourself', 'kaun', 'bare', 'baare', 'karta', 'karte', 'कौन', 'बारे', 'परिचय') || /^(hi|hey|hello|namaste|नमस्ते|amlesh|amlesh kumar)[!]*$/.test(text) || follows('about')) {
    return reply('about', choose(`${profile.name} is a B.Tech Computer Science Engineering student at ${educationData.university}, ${educationData.location} (${educationData.duration}), with a CGPA of ${educationData.cgpa} / 10. His focus is ${profile.focus}. He builds projects with React, TypeScript, Python, Django, and Salesforce, and his portfolio includes ${certifications.length} credentials.`,
      `Amlesh Kumar ${educationData.university}, ${educationData.location} mein B.Tech CSE student hain (${educationData.duration}). Unka CGPA ${educationData.cgpa} / 10 hai. Woh software development aur cybersecurity par focus karte hain, aur React, TypeScript, Python, Django aur Salesforce se projects banate hain. Portfolio mein ${certifications.length} credentials hain.`),
      [section('About Amlesh', 'about'), section('Explore projects', 'projects')]);
  }
  if (has('thanks', 'thank you', 'shukriya', 'dhanyawad', 'धन्यवाद')) {
    return reply('about', choose("You're welcome! What else would you like to know about Amlesh?", 'Shukriya! Amlesh ke baare mein aur kya jaanna chahenge?'));
  }
  return reply('unknown', choose("I don't have that detail in Amlesh's portfolio. I can help with his education, skills, projects, certificates, internships, resume, and contact information. Please ask Amlesh directly for anything else.", 'Ye detail Amlesh ke portfolio mein listed nahi hai. Aap unki education, skills, projects, certificates, internships, resume ya contact ke baare mein pooch sakte hain. Baaki details ke liye unse seedha baat karein.'),
    [email, section('Contact Amlesh', 'contact')]);
}
