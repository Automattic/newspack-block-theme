# Newspack Grid

Adding `newspack-grid` or `newspack-grid-small` to a Columns block ensures the columns fit on the grid on large screens.

`newspack-grid` is designed for use with a wide Columns block. It supports the following layouts:

- 25% / 50% / 25%
- 33.33% / 33.33% / 33.33%
- 15% / 70% / 15%
- 66.66% / 33.33% or 33.33% / 66.66%

`newspack-grid-small` is for narrow columns (e.g., at 632px) and currently supports only one layout type: 66.66% / 33.33% or 33.33% / 66.66%.

For a single sidebar layout, you need to apply both the `newspack-grid` and `newspack-grid--sidebar` classes. The `newspack-grid` class sets up the primary grid structure, while the `newspack-grid--sidebar` class ensures that the single sidebar layout is correctly formatted and displayed. Without these two classes, the layout may not appear as intended, particularly on larger screens.

| CLASS NAME             | DESCRIPTION                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| newspack-grid          | The Columns block will use a 12-column grid.                                                      |
| newspack-grid--sidebar | For single sidebar layouts only. Requires a Columns block with 2 columns: 66.66% and 33.33% wide. |
| newspack-grid-small    | The Columns block will use a 6-column grid.                                                       |

# Responsive Elements

`mobile-only` and `desktop-only` can be applied to blocks to display them based on the screen size.

| CLASS NAME   | DESCRIPTION                                                                     |
| -------------| ------------------------------------------------------------------------------- |
| mobile-only  | The block will be displayed on the screen if it is 781px wide or less.          |
| desktop-only | The block will be displayed on the screen if the screen is at least 782px wide. |

# Position

## Fixed

Adding `is-position-fixed` to a block will make it fixed at the top of the screen. (Note: the location on the screen can be customized via the [CSS property `inset`](https://developer.mozilla.org/en-US/docs/Web/CSS/position).)

Additionally, `is-position-fixed--mobile-only` and `is-position-fixed--desktop-only` can be applied to blocks to fix their position based on the screen size.

| CLASS NAME                      | DESCRIPTION                                                                 |
| --------------------------------| --------------------------------------------------------------------------- |
| is-position-fixed               | Class required to enable the fixed position.                                |
| is-position-fixed--mobile-only  | The block will be fixed on the screen if it is 781px wide or less.          |
| is-position-fixed--desktop-only | The block will be fixed on the screen if the screen is at least 782px wide. |

## Sticky

Adding `is-position-sticky` to a block will ensure it stays within the viewport and sticks to the top of the page when the content is scrolled. (Note: This can also be added in the Editor via the "Position" panel.)

Additionally, `is-position-sticky--mobile-only` and `is-position-sticky--desktop-only` can be applied to blocks to make them sticky based on the screen size.

| CLASS NAME                       | DESCRIPTION                                                                  |
| ---------------------------------| ---------------------------------------------------------------------------- |
| is-position-sticky               | Class required to enable the sticky position.                                |
| is-position-sticky--mobile-only  | The block will be sticky on the screen if it is 781px wide or less.          |
| is-position-sticky--desktop-only | The block will be sticky on the screen if the screen is at least 782px wide. |

# Overlay

The class `overlay-contents` needs to be applied in addition to:

| CLASS NAME                   | DESCRIPTION                                                                |
| ---------------------------- | -------------------------------------------------------------------------- |
| overlay-contents             | Class required to enable the overlay.                                      |
| overlay-contents--left       | This is the default behavior, where the content will appear from the left. |
| overlay-contents--right      | In this case, the content will slide in from the right.                    |
| overlay-contents--full-width | The content will take over the full screen.                                |
