# UI Redesign Plan

## Summary

The next UI pass should keep the current learning flow, but make the site feel more polished and modern for young parents while staying clear enough for children to use.

## Visual Direction

- Direction: youthful, modern, and energetic.
- Keep the app child-friendly, but avoid making it overly childish.
- Use brighter accents, stronger card hierarchy, softer backgrounds, and more polished buttons.

## Proposed Style

- Primary color: coral orange, close to `#FF6B35`.
- Supporting colors: teal `#2EC4B6`, violet `#6C63FF`, and yellow `#FFD166`.
- Background: warm off-white or a very soft peach gradient.
- Cards: larger radius, stronger spacing, and layered shadows.
- Buttons: pill-like or soft rounded buttons with clear selected states.
- Main pinyin card: keep very large pinyin text and prioritize tone marks and `ü` readability.

## Scope

- Keep the existing routes and data model.
- Keep the current card practice interaction.
- Improve global colors, cards, buttons, the home page modules, and practice-page hierarchy.
- Do not add login, backend, analytics, ads, ranking, recording, or AI correction.

## Validation

- Run `npm.cmd run build`.
- Check `/`, `/single`, `/tones`, `/spell`, `/lesson/1`, `/lesson/2`, `/lesson/3`, and `/random`.
- Verify mobile width around 375px has no horizontal overflow.
- Verify `qüan/qüān`, `xüe/xüé`, tone marks, and `ü` remain clearly visible.

## Release Rule

After the UI redesign is implemented:

1. Run `npm.cmd run build`.
2. Push the finished UI changes to `main`.
3. Wait for GitHub Actions to pass and GitHub Pages to update.
4. Verify `https://splashcurry.github.io/pinyin-practice/` manually.
5. Publish release `v1.1.0` with title `v1.1.0 - UI 改版版`.
