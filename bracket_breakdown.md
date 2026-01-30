# Technical Detail: Building a Tournament Bracket UI

Implementing a bracket UI involves visualizing hierarchical, often recursive, data in a linear or grid-like layout. Here is a deep dive into how the BattleVault bracket was achieved.

## 1. Data Structure Design
The foundation of a good bracket is the data structure. Our API returns a `TournamentBracket` object containing:
- **Stages (Rounds)**: An array of stages (e.g., Round of 16, Quarter-Finals).
- **Games**: Each stage contains multiple games.
- **Players**: Each game tracks its participants and their current status.

By sorting stages by their `index`, we ensure the rounds flow logically from left to right.

## 2. Modular Component Architecture
We broke the UI down into three distinct layers:
- **`BracketGame`**: Represents a single match with player details and live status.
- **`BracketStage`**: Groups all games for a specific round.
- **`TournamentBracketView`**: Orchestrates the stages in a scrollable horizontal flow.

---

## 3. CSS Implementation Breakdown

The "BattleVault" look was achieved using a combination of Tailwind CSS utilities, modern CSS features like Glassmorphism, and Flexbox for layout logic.

### A. Layout: The "Converging" Flow
Brackets look like they "converge" towards a final match. We achieved this using **Flexbox**:
- **Container**: The stages are laid out in a `flex-row` (using `inline-flex` to allow horizontal scrolling).
- **Stages**: Each stage is a `flex-col`.
- **Vertical Spacing**: Inside each stage, we use `justify-around` and `flex-grow`. As stages progress, they might have fewer games, and `justify-around` ensures they stay vertically centered relative to the previous round, creating the bracket convergence effect.

```tsx
// Inside BracketStage.tsx
<div className="flex flex-col justify-around flex-grow gap-6 w-full">
    {stage.games.map(game => <BracketGame game={game} />)}
</div>
```

### B. Visual Style: Glassmorphism
To create a premium, high-tech "Vault" feel, we used **Glassmorphism**:
- **Backgrounds**: `bg-black/40` (translucent black).
- **Blur**: `backdrop-blur-md` (frosted glass effect).
- **Borders**: Thin `border-white/5` borders to define edges without being heavy.
- **Gradients**: `bg-gradient-to-r from-amber-500 to-orange-600` for primary actions.

### C. Live Indicators (Micro-animations)
Live games feature a pulsing emerald indicator to draw attention:
- `animate-pulse`: A standard Tailwind animation that creates an opacity "heartbeat."
- `bg-emerald-500`: A vibrant green that pops against the dark theme.

### D. Custom Scrollbars
Standard scrollbars are bulky and ugly. We used a custom CSS utility class `custom-scrollbar` (configured in Global CSS) to make the horizontal scroll subtle and themed:
- **Track**: `bg-transparent`.
- **Thumb**: `bg-white/10` with `rounded-full`.
- **Hover**: Transitions to `bg-amber-500/20`.

### E. Directional Flow
On larger screens, we explicitly show the direction of progress using the `ChevronRight` icon from `lucide-react`:
- Inter-stage spacing is managed with large `gap-12 md:gap-24`.
- The chevrons are styled with `text-white/10` to keep them subtle but helpful for guiding the eye.

## 4. Responsive Design
- **Mobile**: The bracket uses `overflow-x-auto`, allowing users to swipe left/right to see later rounds.
- **Desktop**: Increased spacing and larger font sizes ensure the bracket feels expansive and epic.
