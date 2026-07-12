# Design QA

## Comparison target

- Source visual truth: `C:\Users\Wanguang\Downloads\已生成图像 1 (1).png`
- Homepage implementation screenshot: `C:\Users\Wanguang\.codex\visualizations\2026\07\12\019f540d-fdde-7d43-ac52-37488d04825a\pinyin-home-mobile.png`
- Dark-mode homepage screenshot: `C:\Users\Wanguang\.codex\visualizations\2026\07\12\019f540d-fdde-7d43-ac52-37488d04825a\pinyin-home-dark-mobile.png`
- Theme-picker screenshot: `C:\Users\Wanguang\.codex\visualizations\2026\07\12\019f540d-fdde-7d43-ac52-37488d04825a\pinyin-theme-menu-dark-mobile.png`
- Full-view homepage comparison: `C:\Users\Wanguang\.codex\visualizations\2026\07\12\019f540d-fdde-7d43-ac52-37488d04825a\pinyin-home-comparison.png`
- Practice captures: `pinyin-single-mobile.png`, `pinyin-tone-mobile.png`, `pinyin-spell-mobile.png`, and `pinyin-random-mobile.png` in the same visualization folder. Daily history, daily practice, and lesson routes were also inspected at the same viewport.
- Viewport: 390 x 844.

## Comparison history

1. The homepage hero was reduced from 525px to 338px and its transparent illustration was regenerated to match the reference screen's mobile rhythm.
2. The first spell-page capture exposed an ordering defect: the initial selector appeared before the page heading. Its CSS ordering rule was removed; the corrected page now follows heading, hint, initial selector, practice card, then tone selector.
3. Daily, history, and lesson routes were converted to the same route-intro, warm-white card, coral heading marker, and fixed-bottom-navigation system. Course, daily, free-practice, and history routes now each expose one appropriate active navigation item.
4. Dark mode initially left the free-practice cards light and applied a dark blend to the transparent hero illustration. The final dark pass uses deep navy cards and a normal illustration blend.

## Findings

No actionable P0, P1, or P2 findings remain.

- Fonts and typography: all four practice routes use the same heavy dark display title, coral pinyin character, muted support copy, and compact section headings as the homepage.
- Spacing and layout rhythm: white practice cards, peach borders, rounded controls, orange progress bars, five-column item indexes, and fixed bottom safe area are shared across routes. Spell practice intentionally keeps the complete initial selector before the practice card.
- Colors and tokens: warm off-white canvas, coral selected and primary states, teal audio action, and neutral unselected controls are consistent with the first reference. Navigation retains the approved raised active pill.
- Image quality: no missing-image placeholder remains on the single-pinyin screen; its card uses the available keyword/rhyme content rather than a broken raster slot.
- Copy and content: existing data sets and learning actions are preserved.
- Remaining routes: history cards, daily-assignment metadata, and lesson sections now use the same border, radius, shadow, typography, and action hierarchy as the practice routes.
- Dark mode: the selected theme persists in local storage; all primary surfaces, text, controls, navigation, and the homepage illustration were checked at 390px.

## Interaction check

- Single-pinyin category switch: `韵母` correctly became selected.
- Four-tone switch: `二声` correctly became selected.
- Random-practice next action changed the current pinyin from `fǎ` to `má`.
- Lesson random practice changed from `开始` to `下一个` after its first selection.
- Bottom navigation remained visible with no console errors across all routes; daily practice, free practice, course, and history each produced exactly one matching active item.
- Theme toggle changed the document theme to `dark`, updated its accessible pressed state, persisted after reload, and produced no browser-console errors.
- The theme picker exposes `浅色模式`, `深色模式`, and `跟随系统`; each is keyboard-accessible and reports its selected state. Follow-system correctly selected the browser's current light system preference.

## Final result

passed
