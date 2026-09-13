import { ContactInfo } from "@/types/contact";

export const MOCK_CONTACT: ContactInfo = {
  email: "zainul@developer.dev",
  secondaryEmail: "m.zainul.arifin@pm.me",
  location: "Indonesia (WIB / UTC+7)",
  timezone: "Asia/Jakarta (GMT+7)",
  availability: "Terbuka untuk Kontrak, Full-time, & Konsultasi Arsitektur",
  responseTime: "< 24 jam kerja",
  pgpKeyId: "0x8F9C24B7",
  pgpFingerprint: "4A21 8B7C 90DF 12E4 56AB  C87D 09FE 3412 8F9C 24B7",
  channels: [
    {
      id: "email",
      title: "Surel Resmi / Email",
      description: "Untuk penawaran proyek resmi, inquiry teknis, atau dokumen NDA.",
      value: "zainul@developer.dev",
      actionLabel: "Kirim Surel",
      actionUrl: "mailto:zainul@developer.dev?subject=Halo%20Zainul%20-%20Diskusi%20Proyek",
      iconName: "Mail",
      badge: "Utama"
    },
    {
      id: "telegram",
      title: "Pesan Instan (Telegram)",
      description: "Diskusi kilat, tanya-jawab cepat seputar teknologi, atau kolaborasi open source.",
      value: "@zainularifin_dev",
      actionLabel: "Buka Telegram",
      actionUrl: "https://t.me/developer",
      iconName: "Send",
      badge: "Respon Cepat"
    },
    {
      id: "consultation",
      title: "Sesi Diskusi & Konsultasi 1-on-1",
      description: "Jadwalkan sesi meeting online 30 menit via Google Meet untuk review arsitektur.",
      value: "cal.com/zainul-dev/30min",
      actionLabel: "Jadwalkan Kalender",
      actionUrl: "https://cal.com",
      iconName: "Calendar",
      badge: "Meet Online"
    }
  ],
  socialLinks: [
    {
      id: "github",
      platform: "GitHub",
      url: "https://github.com/developer",
      handle: "@developer",
      iconName: "Github",
      description: "Repositori kode open-source, kontribusi, dan eksperimen teknologi terbaru.",
      isPrimary: true
    },
    {
      id: "linkedin",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/developer",
      handle: "in/developer",
      iconName: "Linkedin",
      description: "Jaringan profesional, riwayat karir, dan rekomendasi kerja engineering.",
      isPrimary: true
    },
    {
      id: "twitter",
      platform: "X / Twitter",
      url: "https://x.com/developer",
      handle: "@developer_id",
      iconName: "Twitter",
      description: "Catatan harian rekayasa perangkat lunak, thread arsitektur web, dan tips dev."
    },
    {
      id: "discord",
      platform: "Discord Community",
      url: "https://discord.gg/developer",
      handle: "zainul#0001",
      iconName: "MessageSquare",
      description: "Berbagi insight, diskusi coding komunitas dev Indonesia, dan troubleshooting."
    }
  ]
};
