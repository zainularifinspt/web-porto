-- Seed: 002_project_details_seed.sql
-- Description: Populate project details, metrics, architecture notes, and key feature highlights

-- 1. Update Projects with Stats and Architecture Notes
UPDATE projects 
SET 
    stars = 320,
    status = 'Live',
    views = '12.4k',
    architecture_notes = 'Arsitektur terdistribusi berbasis Go worker pools dan WebSocket serverless gateway. Metrik time-series diproses dalam ring buffers sebelum diagregasi ke partisi PostgreSQL berkala.',
    challenges = 'Tantangan utama adalah menangani latensi lonjakan hingga 50.000 req/sec tanpa membebani thread pool frontend. Diselesaikan dengan decoupled worker queues dan debounced metric broadcasts.'
WHERE slug = 'devpulse-cloud-metrics';

UPDATE projects 
SET 
    stars = 540,
    status = 'Open Source',
    views = '24.8k',
    architecture_notes = 'Pipeline analisis statis berbasis AST parser yang terhubung ke webhook GitHub App. Saran kontekstual dieksekusi secara asinkron menggunakan FastAPI dan model fine-tuned OpenAI dengan token budgeting ketat.',
    challenges = 'Mengurangi durasi feedback loop analisis pull request berukuran besar. Dioptimalkan dengan caching hash AST diff dan pemrosesan chunked parallel analysis.'
WHERE slug = 'codescribe-ai-reviewer';

UPDATE projects 
SET 
    stars = 890,
    status = 'Live',
    views = '31.2k',
    architecture_notes = 'Canvas engine rendering berbasis WebGL dan HTML5 Canvas API dengan state synchronization bebas konflik menggunakan Yjs CRDT melalui secure WebSockets.',
    challenges = 'Mencegah screen tearing dan frame drops pada resolusi 4K saat 20 kolaborator menggambar serentak. Diatasi dengan offscreen canvas rendering dan dirty-rect redraws.'
WHERE slug = 'nexus-collaborative-canvas';

UPDATE projects 
SET 
    stars = 210,
    status = 'Live',
    views = '8.9k',
    architecture_notes = 'Headless e-commerce storefront yang memadukan Next.js App Router, edge caching incremental static regeneration (ISR), dan checkout PCI-compliant Stripe.',
    challenges = 'Menjaga First Contentful Paint di bawah 0.8 detik di koneksi seluler 3G. Diatasi dengan dynamic bundle splitting, font subsetting, dan AVIF image compression.'
WHERE slug = 'omnicart-headless-storefront';

UPDATE projects 
SET 
    stars = 430,
    status = 'Beta',
    views = '15.1k',
    architecture_notes = 'Distributed in-memory key-value cache engine ditulis dalam Go dengan konsensus Raft dan interface gRPC streaming untuk interoperabilitas mikroservis.',
    challenges = 'Menjaga konsistensi data selama node split-brain atau network partition. Diselesaikan melalui majority quorum checks dan auto-healing cluster heartbeats.'
WHERE slug = 'echocache-distributed-store';

UPDATE projects 
SET 
    stars = 670,
    status = 'Live',
    views = '19.5k',
    architecture_notes = 'Sistem manajemen identitas dan otentikasi enterprise dengan dukungan OAuth 2.0 PKCE, WebAuthn passkeys, dan multi-tenant RBAC token issuing.',
    challenges = 'Mitigasi brute force dan token replay attack pada endpoint otentikasi sensitif. Diatasi dengan sliding window rate limiting berbasis Redis dan rotating asymmetric signing keys.'
WHERE slug = 'sentinelauth-iam-platform';

-- 2. Insert Key Features for Detailed Project Views
INSERT INTO project_features (project_id, title, description, sort_order)
SELECT 
    p.id,
    f.title,
    f.description,
    f.sort_order
FROM projects p
JOIN (
    VALUES 
    ('devpulse-cloud-metrics', 'Real-time WebSocket Streaming', 'Pengiriman throughput metrik server dengan latensi sub-100ms.', 1),
    ('devpulse-cloud-metrics', 'Automated Webhook Alerts', 'Pemicu notifikasi instan ke Slack dan Telegram ketika threshold terlampaui.', 2),
    ('devpulse-cloud-metrics', 'Interactive Metric Dashboard', 'Visualisasi visual interaktif latensi p99, memory leaks, dan CPU throttle.', 3),
    ('codescribe-ai-reviewer', 'PR Context Diff Analysis', 'Parsing file diff dan mendeteksi dependensi rentan secara otomatis.', 1),
    ('codescribe-ai-reviewer', 'Security & Best Practice Linting', 'Rekomendasi perbaikan clean code langsung sebagai review comment.', 2),
    ('codescribe-ai-reviewer', 'Zero-Code Setup GitHub App', 'Instalasi 1-klik ke repository GitHub publik maupun privat.', 3)
) AS f(slug, title, description, sort_order) ON p.slug = f.slug
ON CONFLICT DO NOTHING;
