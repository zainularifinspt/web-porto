export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  handle: string;
  iconName: string;
  description: string;
  isPrimary?: boolean;
}

export interface ContactChannel {
  id: string;
  title: string;
  description: string;
  value: string;
  actionLabel: string;
  actionUrl: string;
  iconName: string;
  badge?: string;
}

export interface ContactInfo {
  email: string;
  secondaryEmail?: string;
  location: string;
  timezone: string;
  availability: string;
  responseTime: string;
  channels: ContactChannel[];
  socialLinks: SocialLink[];
  pgpKeyId?: string;
  pgpFingerprint?: string;
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  category: "project" | "consultation" | "hire" | "general";
  message: string;
}
