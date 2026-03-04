# Logic Arena

Game otak kompetitif berbasis React + Firebase. Uji logika, pengenalan pola, dan berpikir kritis dengan tekanan waktu.

## Teknologi

- React + Vite + Tailwind CSS + Framer Motion
- Firebase Auth, Firestore
- React Router

## Fitur

- Login dengan Email/Password dan Google
- 3 kategori: Logika Matematika, Pengenalan Pola, Berpikir Kritis
- 10 soal per pertandingan dengan timer 20 detik
- Sistem XP dan level (10 level)
- Papan skor global real-time
- Riwayat pertandingan
- Komunitas feedback dengan rating dan likes
- Multi-bahasa: Indonesia, English, Español

## Menjalankan Project

```bash
npm install
cp .env.example .env   # isi dengan Firebase config kamu
npm run dev
```

## Setup Firebase

1. Aktifkan **Authentication** — Email/Password dan Google
2. Buat **Firestore Database** dalam production mode
3. Paste isi `firestore.rules` ke tab Rules di Firestore lalu publish
4. Deploy indexes dari `firestore.indexes.json`

## Environment Variables

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Deploy

```bash
npm run build
firebase deploy
```