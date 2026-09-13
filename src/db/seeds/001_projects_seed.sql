-- Seed: 001_projects_seed.sql
-- Description: Initial project sample data

-- 1. Insert Technologies
INSERT INTO technologies (id, name) VALUES
('b1000000-0000-0000-0000-000000000001', 'Next.js'),
('b1000000-0000-0000-0000-000000000002', 'TypeScript'),
('b1000000-0000-0000-0000-000000000003', 'Tailwind CSS'),
('b1000000-0000-0000-0000-000000000004', 'Go'),
('b1000000-0000-0000-0000-000000000005', 'PostgreSQL'),
('b1000000-0000-0000-0000-000000000006', 'Docker'),
('b1000000-0000-0000-0000-000000000007', 'Python'),
('b1000000-0000-0000-0000-000000000008', 'FastAPI'),
('b1000000-0000-0000-0000-000000000009', 'OpenAI'),
('b1000000-0000-0000-0000-000000000010', 'React'),
('b1000000-0000-0000-0000-000000000011', 'WebSockets'),
('b1000000-0000-0000-0000-000000000012', 'Zustand'),
('b1000000-0000-0000-0000-000000000013', 'Node.js'),
('b1000000-0000-0000-0000-000000000014', 'GraphQL'),
('b1000000-0000-0000-0000-000000000015', 'Stripe API'),
('b1000000-0000-0000-0000-000000000016', 'Redis'),
('b1000000-0000-0000-0000-000000000017', 'Rust'),
('b1000000-0000-0000-0000-000000000018', 'Shell / Bash'),
('b1000000-0000-0000-0000-000000000019', 'MDX'),
('b1000000-0000-0000-0000-000000000020', 'Canvas API')
ON CONFLICT (name) DO NOTHING;

-- 2. Insert Projects
INSERT INTO projects (id, title, slug, summary, story, role, demo_url, repo_url, thumbnail_url, is_featured, sort_order, created_at) VALUES
(
    'a1000000-0000-0000-0000-000000000001',
    'DevPulse Cloud Metrics',
    'devpulse-cloud-metrics',
    'Platform pemantauan kinerja server real-time dengan visualisasi metrik latensi, CPU, dan utilisasi memori berbasis WebSocket.',
    'DevPulse dibangun untuk memecahkan masalah pemantauan mikroservis yang terfragmentasi. Memadukan dashboard interaktif, sistem alerting instan berbasis webhooks, dan visualisasi throughput tinggi hingga 50.000 req/sec.',
    'Lead Full-Stack Engineer',
    'https://devpulse-demo.dev',
    'https://github.com/developer/devpulse-cloud',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    true,
    1,
    '2026-01-15 10:00:00+00'
),
(
    'a1000000-0000-0000-0000-000000000002',
    'CodeScribe AI Reviewer',
    'codescribe-ai-reviewer',
    'Asisten code review otomatis berbasis LLM yang mendeteksi kerentanan keamanan, optimasi performa, dan smell code langsung di pull request.',
    'Dibuat untuk mempercepat alur review tim engineering. CodeScribe mengintegrasikan GitHub App API dengan pipeline analisis statis dan model AI untuk memberikan saran kontekstual dalam hitungan detik.',
    'Full-Stack & AI Engineer',
    'https://codescribe-ai.dev',
    'https://github.com/developer/codescribe-reviewer',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    true,
    2,
    '2026-02-01 08:30:00+00'
),
(
    'a1000000-0000-0000-0000-000000000003',
    'Nexus Collaborative Canvas',
    'nexus-collaborative-canvas',
    'Aplikasi papan gambar dan arsitektur sistem multiplayer secara real-time dengan sinkronisasi CRDT tanpa konflik.',
    'Dirancang untuk remote-first software teams agar dapat melakukan sprint planning dan diagramming sistem bersama-sama. Mendukung ekspor format SVG, Mermaid.js, dan enkripsi end-to-end pada workspace.',
    'Frontend Architect',
    'https://nexus-canvas.dev',
    'https://github.com/developer/nexus-canvas',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    true,
    3,
    '2025-11-20 14:10:00+00'
),
(
    'a1000000-0000-0000-0000-000000000004',
    'OmniCart Headless Storefront',
    'omnicart-headless-storefront',
    'E-Commerce storefront berkecepatan tinggi dengan integrasi Stripe, optimasi Web Vitals 100/100, dan pencarian instan Algolia.',
    'Platform e-commerce modern dengan arsitektur headless yang dirancang untuk performa ekstrem dan konversi tinggi. Menghadirkan checkout tanpa hambatan, optimasi cache edge di Vercel, dan manajemen state cart yang fleksibel.',
    'Frontend Developer',
    'https://omnicart-store.dev',
    'https://github.com/developer/omnicart-headless',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    false,
    4,
    '2025-09-10 12:00:00+00'
),
(
    'a1000000-0000-0000-0000-000000000005',
    'Terminal CLI Suite & Dotfiles',
    'terminal-cli-suite',
    'Kumpulan tool baris perintah (CLI) untuk otomatisasi alur kerja Git, scaffolding microservices, dan manajemen konfigurasi server.',
    'Dibuat untuk mempercepat alur setup harian developer. Dilengkapi generator proyek interaktif, auto-commit formatter berbasis semantic conventional commits, dan integrasi linting pre-commit otomatis.',
    'Open Source Contributor',
    'https://cli-suite.dev',
    'https://github.com/developer/cli-developer-suite',
    'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80',
    false,
    5,
    '2025-08-04 09:00:00+00'
),
(
    'a1000000-0000-0000-0000-000000000006',
    'DocuFlow Markdown Engine',
    'docuflow-markdown-engine',
    'Static site documentation generator dengan dukungan Mermaid diagrams, live search interaktif, dan dark mode otomatis.',
    'Alternatif modern untuk dokumentasi teknis API. Mengubah file Markdown dan MDX menjadi situs dokumentasi elegan dengan indeks pencarian fuzzy offline dan rendering komponen React interaktif.',
    'Full-Stack Developer',
    'https://docuflow-engine.dev',
    'https://github.com/developer/docuflow-docs',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    false,
    6,
    '2025-06-18 16:20:00+00'
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    story = EXCLUDED.story,
    role = EXCLUDED.role,
    demo_url = EXCLUDED.demo_url,
    repo_url = EXCLUDED.repo_url,
    thumbnail_url = EXCLUDED.thumbnail_url,
    is_featured = EXCLUDED.is_featured,
    sort_order = EXCLUDED.sort_order;

-- 3. Link Project Technologies
-- Project 1 (DevPulse)
INSERT INTO project_technologies (project_id, technology_id) VALUES
('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001'),
('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002'),
('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000003'),
('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000004'),
('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000005'),
('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000006')
ON CONFLICT DO NOTHING;

-- Project 2 (CodeScribe)
INSERT INTO project_technologies (project_id, technology_id) VALUES
('a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001'),
('a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000002'),
('a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000003'),
('a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000007'),
('a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000008'),
('a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000009')
ON CONFLICT DO NOTHING;

-- Project 3 (Nexus Canvas)
INSERT INTO project_technologies (project_id, technology_id) VALUES
('a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000010'),
('a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000002'),
('a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000020'),
('a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000011'),
('a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000012'),
('a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000013')
ON CONFLICT DO NOTHING;

-- 4. Insert Project Screenshots
INSERT INTO project_images (id, project_id, image_url, caption, sort_order) VALUES
('c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', 'Tampilan Dashboard Utama Metrik Server', 1),
('c1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80', 'Konfigurasi Rule Alerting dan Webhook', 2),
('c1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80', 'Inline Code Review & Security Analysis', 1),
('c1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', 'Multi-user Canvas Workspace Collaboration', 1)
ON CONFLICT DO NOTHING;
