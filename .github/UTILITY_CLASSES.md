# Buttons

Adding `has-small-size` or `has-x-small-size` to a Buttons block will reduce its padding and border-radius.

Padding can be controlled in the editor but only with the preset variable. To match our Newspack UI buttons, we need better control.

Note: The font size still needs to be changed to x-small if we're recreating a Newspack UI button-like appearance.

| CLASS NAME       | DESCRIPTION                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| has-small-size   | The buttons will have a top and bottom padding of 8px and a left and right padding of 16px.                          |
| has-x-small-size | The buttons will have a top and bottom padding of 6px, a left and right padding of 12px, and a border-radius of 4px. |

# Position

## Fixed

Adding `is-position-fixed` to a block will make it fixed at the top of the screen. (Note: the location on the screen can be customized via the [CSS property `inset`](https://developer.mozilla.org/en-US/docs/Web/CSS/position).)

Additionally, `is-position-fixed--mobile-only` and `is-position-fixed--desktop-only` can be applied to blocks to fix their position based on the screen size.

| CLASS NAME                      | DESCRIPTION                                                                 |
| ------------------------------- | --------------------------------------------------------------------------- |
| is-position-fixed               | Class required to enable the fixed position.                                |
| is-position-fixed--mobile-only  | The block will be fixed on the screen if it is 781px wide or less.          |
| is-position-fixed--desktop-only | The block will be fixed on the screen if the screen is at least 782px wide. |

## Sticky

Adding `is-position-sticky` to a block will ensure it stays within the viewport and sticks to the top of the page when the content is scrolled. (Note: This can also be added in the Editor via the "Position" panel.)

Additionally, `is-position-sticky--mobile-only` and `is-position-sticky--desktop-only` can be applied to blocks to make them sticky based on the screen size.

| CLASS NAME                       | DESCRIPTION                                                                  |
| -------------------------------- | ---------------------------------------------------------------------------- |
| is-position-sticky               | Class required to enable the sticky position.                                |
| is-position-sticky--mobile-only  | The block will be sticky on the screen if it is 781px wide or less.          |
| is-position-sticky--desktop-only | The block will be sticky on the screen if the screen is at least 782px wide. |

# Overlay

The class `overlay-contents` needs to be applied along with a position class: `overlay-contents--position--left`, `overlay-contents--position--right`, or `overlay-contents--position--full-width`.

When the overlay contents are included via a template-part (e.g. mobile menu), the **parent** template-part wrapper can set a **force** position class (e.g. `overlay-contents--position--right--force` on the wrapper) to override the contents’ own position in JavaScript, without changing editor/front-end CSS. This lets patterns control slide direction without editing the shared template part.

When using the right or left position, you can also control the width; by default it uses `overlay-contents--width--medium`, where the content will expand to a maximum of 632px.

| CLASS NAME                                    | DESCRIPTION                                                                                |
| --------------------------------------------- | ------------------------------------------------------------------------------------------ |
| overlay-contents                              | Class required to enable the overlay.                                                      |
| overlay-contents--position--left              | This is the default behavior, where the content will appear from the left.                 |
| overlay-contents--position--right             | In this case, the content will slide in from the right.                                    |
| overlay-contents--position--full-width        | The content will take over the full screen.                                                |
| overlay-contents--position--left--force       | Use on the parent template-part wrapper to force the content to slide in from the left.    |
| overlay-contents--position--right--force      | Use on the parent template-part wrapper to force the content to slide in from the right.   |
| overlay-contents--position--full-width--force | Use on the parent template-part wrapper to force the content to take over the full screen. |
| overlay-contents--width--x-small              | The content will expand to a maximum of 300px.                                             |
| overlay-contents--width--small                | The content will expand to a maximum of 410px.                                             |
| overlay-contents--width--medium               | The content will expand to a maximum of 632px.                                             |
| overlay-contents--width--large                | The content will expand to a maximum of 964px.                                             |
| overlay-contents--width--x-large              | The content will expand to a maximum of 1296px.                                            |
