import { SocialLink, ContactChannel, ContactInfo } from "@/types/contact";
import { MOCK_CONTACT } from "@/data/mockContact";
import { dbQuery, dbQueryOne } from "./client";

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

function mapSocialLinkRow(row: any): SocialLink {
  return {
    id: row.id,
    platform: row.platform,
    url: row.url,
    handle: row.handle,
    iconName: row.icon_name || "Globe",
    description: row.description || "",
    isPrimary: Boolean(row.is_primary),
  };
}

function mapChannelRow(row: any): ContactChannel {
  return {
    id: row.id,
    title: row.title,
    description: row.description || "",
    value: row.value,
    actionLabel: row.action_label,
    actionUrl: row.action_url,
    iconName: row.icon_name || "Mail",
    badge: row.badge || undefined,
  };
}

/**
 * Get all configured social media links
 */
export async function getSocialLinks(): Promise<SocialLink[]> {
  if (process.env.DATABASE_URL) {
    try {
      const rows = await dbQuery(
        `SELECT * FROM social_links ORDER BY is_primary DESC, sort_order ASC`
      );
      if (rows && rows.length > 0) {
        return rows.map(mapSocialLinkRow);
      }
    } catch (err) {
      console.warn("Database query failed, using in-memory social links:", err);
    }
  }

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
  if (process.env.DATABASE_URL) {
    try {
      const row = await dbQueryOne(
        `SELECT * FROM social_links WHERE LOWER(id) = LOWER($1) LIMIT 1`,
        [id]
      );
      if (row) return mapSocialLinkRow(row);
    } catch (err) {
      console.warn("Database getSocialLinkById failed:", err);
    }
  }

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

  if (process.env.DATABASE_URL) {
    try {
      const row = await dbQueryOne(
        `INSERT INTO social_links (
          id, platform, url, handle, icon_name, description, is_primary
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7
        ) ON CONFLICT (id) DO UPDATE SET
          platform = EXCLUDED.platform,
          url = EXCLUDED.url,
          handle = EXCLUDED.handle,
          icon_name = EXCLUDED.icon_name,
          description = EXCLUDED.description,
          is_primary = EXCLUDED.is_primary,
          updated_at = NOW()
        RETURNING *`,
        [
          newId,
          data.platform.trim(),
          data.url.trim(),
          data.handle.trim(),
          data.iconName || "Globe",
          data.description.trim(),
          Boolean(data.isPrimary),
        ]
      );
      if (row) {
        const saved = mapSocialLinkRow(row);
        memorySocialLinks = memorySocialLinks.filter((l) => l.id !== newId);
        memorySocialLinks.push(saved);
        return saved;
      }
    } catch (err) {
      console.warn("Database createSocialLink failed:", err);
    }
  }

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
  if (process.env.DATABASE_URL) {
    try {
      const row = await dbQueryOne(
        `UPDATE social_links SET
          platform = COALESCE($1, platform),
          url = COALESCE($2, url),
          handle = COALESCE($3, handle),
          icon_name = COALESCE($4, icon_name),
          description = COALESCE($5, description),
          is_primary = COALESCE($6, is_primary),
          updated_at = NOW()
        WHERE LOWER(id) = LOWER($7)
        RETURNING *`,
        [
          updates.platform?.trim() ?? null,
          updates.url?.trim() ?? null,
          updates.handle?.trim() ?? null,
          updates.iconName ?? null,
          updates.description?.trim() ?? null,
          updates.isPrimary !== undefined ? updates.isPrimary : null,
          id,
        ]
      );
      if (row) {
        const updated = mapSocialLinkRow(row);
        const idx = memorySocialLinks.findIndex((l) => l.id.toLowerCase() === id.toLowerCase());
        if (idx !== -1) memorySocialLinks[idx] = updated;
        return updated;
      }
    } catch (err) {
      console.warn("Database updateSocialLink failed:", err);
    }
  }

  const index = memorySocialLinks.findIndex((l) => l.id.toLowerCase() === id.toLowerCase());
  if (index === -1) return null;

  const current = memorySocialLinks[index];
  const updated: SocialLink = {
    ...current,
    ...updates,
    id: current.id,
  };

  memorySocialLinks[index] = updated;
  return updated;
}

/**
 * Delete social media link by ID
 */
export async function deleteSocialLink(id: string): Promise<boolean> {
  if (process.env.DATABASE_URL) {
    try {
      const res = await dbQuery(
        `DELETE FROM social_links WHERE LOWER(id) = LOWER($1) RETURNING id`,
        [id]
      );
      if (res && res.length > 0) {
        memorySocialLinks = memorySocialLinks.filter((l) => l.id.toLowerCase() !== id.toLowerCase());
        return true;
      }
    } catch (err) {
      console.warn("Database deleteSocialLink failed:", err);
    }
  }

  const initialLength = memorySocialLinks.length;
  memorySocialLinks = memorySocialLinks.filter((l) => l.id.toLowerCase() !== id.toLowerCase());
  return memorySocialLinks.length < initialLength;
}

/**
 * Get all contact channels
 */
export async function getContactChannels(): Promise<ContactChannel[]> {
  if (process.env.DATABASE_URL) {
    try {
      const rows = await dbQuery(`SELECT * FROM contact_channels ORDER BY sort_order ASC`);
      if (rows && rows.length > 0) {
        return rows.map(mapChannelRow);
      }
    } catch (err) {
      console.warn("Database query failed for contact channels:", err);
    }
  }
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
