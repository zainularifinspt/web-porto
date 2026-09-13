import { SocialLink, ContactChannel, ContactInfo } from "@/types/contact";
import { MOCK_CONTACT } from "@/data/mockContact";

// In-memory runtime store for development
let memorySocialLinks: SocialLink[] = [...MOCK_CONTACT.socialLinks];
let memoryChannels: ContactChannel[] = [...MOCK_CONTACT.channels];
let memoryContactMeta = {
  email: MOCK_CONTACT.email,
  secondaryEmail: MOCK_CONTACT.secondaryEmail,
  location: MOCK_CONTACT.location,
  timezone: MOCK_CONTACT.timezone,
  availability: MOCK_CONTACT.availability,
  responseTime: MOCK_CONTACT.responseTime,
  pgpKeyId: MOCK_CONTACT.pgpKeyId,
  pgpFingerprint: MOCK_CONTACT.pgpFingerprint,
};

/**
 * Get all configured social media links
 */
export async function getSocialLinks(): Promise<SocialLink[]> {
  if (process.env.DATABASE_URL) {
    try {
      // Future: SELECT * FROM social_links ORDER BY sort_order ASC
    } catch (err) {
      console.warn("Database query failed, using in-memory social links:", err);
    }
  }

  // Primary links first, then order
  return [...memorySocialLinks].sort((a, b) => {
    if (a.isPrimary !== b.isPrimary) {
      return a.isPrimary ? -1 : 1;
    }
    return 0;
  });
}

/**
 * Get single social media link by ID
 */
export async function getSocialLinkById(id: string): Promise<SocialLink | null> {
  const links = await getSocialLinks();
  return links.find((l) => l.id.toLowerCase() === id.toLowerCase()) || null;
}

/**
 * Create or add a new social media link
 */
export async function createSocialLink(
  data: Omit<SocialLink, "id"> & { id?: string }
): Promise<SocialLink> {
  const newId =
    data.id?.toLowerCase().trim() ||
    data.platform.toLowerCase().replace(/[^a-z0-9]/g, "-");

  const newLink: SocialLink = {
    id: newId,
    platform: data.platform.trim(),
    url: data.url.trim(),
    handle: data.handle.trim(),
    iconName: data.iconName || "Globe",
    description: data.description.trim(),
    isPrimary: Boolean(data.isPrimary),
  };

  memorySocialLinks = memorySocialLinks.filter((l) => l.id !== newId);
  memorySocialLinks.push(newLink);

  return newLink;
}

/**
 * Update existing social media link
 */
export async function updateSocialLink(
  id: string,
  updates: Partial<SocialLink>
): Promise<SocialLink | null> {
  const index = memorySocialLinks.findIndex((l) => l.id.toLowerCase() === id.toLowerCase());
  if (index === -1) return null;

  const current = memorySocialLinks[index];
  const updated: SocialLink = {
    ...current,
    ...updates,
    id: current.id, // preserve ID
  };

  memorySocialLinks[index] = updated;
  return updated;
}

/**
 * Delete social media link by ID
 */
export async function deleteSocialLink(id: string): Promise<boolean> {
  const initialLength = memorySocialLinks.length;
  memorySocialLinks = memorySocialLinks.filter((l) => l.id.toLowerCase() !== id.toLowerCase());
  return memorySocialLinks.length < initialLength;
}

/**
 * Get all contact channels
 */
export async function getContactChannels(): Promise<ContactChannel[]> {
  return [...memoryChannels];
}

/**
 * Get aggregated contact configuration (social links, channels, meta)
 */
export async function getContactConfig(): Promise<ContactInfo> {
  const socialLinks = await getSocialLinks();
  const channels = await getContactChannels();

  return {
    ...memoryContactMeta,
    channels,
    socialLinks,
  };
}

/**
 * Update contact configuration metadata
 */
export async function updateContactConfig(
  updates: Partial<typeof memoryContactMeta>
): Promise<ContactInfo> {
  memoryContactMeta = {
    ...memoryContactMeta,
    ...updates,
  };
  return getContactConfig();
}
