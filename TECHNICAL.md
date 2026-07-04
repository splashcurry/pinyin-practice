# Technical Notes

This document contains maintainer-facing notes for Pinyin Practice.

## Tech Stack

- React 19
- Vite 7
- TypeScript
- React Router
- Tailwind CSS
- PostCSS
- GitHub Pages static deployment

## Local Development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Build the static site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## GitHub Pages Configuration

The project is deployed under the repository path `pinyin-practice`.

`vite.config.ts` uses:

```ts
base: "/pinyin-practice/"
```

`src/main.tsx` uses:

```tsx
<BrowserRouter basename="/pinyin-practice">
```

If the repository name changes, update both values together.

## Routes

- `/`: Home page
- `/single`: Single pinyin practice
- `/tones`: Tone practice
- `/spell`: Initial-final spelling practice
- `/lesson/:id`: Lesson-based practice
- `/daily/:date`: Daily practice page
- `/daily-history`: Daily practice history
- `/random`: Random practice

## Source Layout

- `src/App.tsx`: route definitions
- `src/main.tsx`: React entry point and router basename
- `src/pages/`: page-level components
- `src/components/`: shared UI components
- `src/data/`: pinyin, lesson, syllable, and daily-assignment data
- `src/types/`: shared TypeScript types
- `src/utils/`: shared utility functions
- `public/audio/`: static audio files
- `public/images/`: static image files

## Practice Data

The main data files are:

- `src/data/singleItems.ts`: initials, finals, and whole-syllable recognition items
- `src/data/finals.ts`: finals used by tone practice
- `src/data/syllables.ts`: legal spelling combinations and tone variants
- `src/data/lessons.ts`: lesson-based practice groups
- `src/data/assignments.json`: daily practice configuration
- `src/data/dailyAssignments.ts`: resolver for daily practice entries

## Audio Naming Rules

Audio files are stored under `public/audio`.

- Single pinyin audio: `public/audio/single/{id}.mp3`
  - Examples: `a.mp3`, `b.mp3`, `zhi.mp3`, `v.mp3`
- Tone practice audio: `public/audio/tone/{finalId}{tone}.mp3`
  - Examples: `a1.mp3`, `v4.mp3`, `ve2.mp3`, `vn3.mp3`
- Spelling practice audio: `public/audio/spell/{initial}{finalId}{tone}.mp3`
  - Examples: `ba1.mp3`, `zha4.mp3`, `xve2.mp3`

The file id `v` represents the displayed character `ü`. For example, `qvan` and `xve` are used as audio file ids, while the UI can display `qüan` and `xüe`.

## Image Naming Rules

Images are stored under `public/images`.

Use the pinyin id as the filename when possible:

- `a.png`
- `b.png`
- `zhi.png`
- `v.png`

If an image is missing, the page displays a placeholder instead of breaking the practice flow.

## Adding New Single Pinyin Items

1. Add the data entry in `src/data/singleItems.ts`.
2. Add the matching image to `public/images`.
3. Add the matching audio file to `public/audio/single`.

## Adding New Tone Practice Finals

1. Add or update the final in `src/data/finals.ts`.
2. Add four tone audio files to `public/audio/tone`.
3. Keep the id consistent with the existing `v` convention for `ü`.

## Adding New Spelling Combinations

1. Add legal initial-final bases in `src/data/syllables.ts`.
2. The system generates four tone variants from each legal base.
3. Add audio files under `public/audio/spell`.
4. Add `exampleWords` only when the example word is reliable.

Do not add invalid combinations just to make the table look complete. For example, avoid nonexistent combinations such as `be`.

## Adding New Lessons

Add a lesson entry in `src/data/lessons.ts`.

- `singles` should reference ids from `src/data/singleItems.ts`.
- `syllables` should reference ids generated in `src/data/syllables.ts`.
- If an item has no reliable audio yet, leave it out until the asset is ready.

## Current Non-Goals

The current version intentionally does not include:

- user accounts
- login or registration
- backend services
- database storage
- teacher or student management
- parent dashboards
- student data collection
- rankings
- payment
- ads
- third-party analytics
- speech recognition
- AI pronunciation correction
- audio upload
