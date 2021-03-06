**Hainis Art Direction - Portfolio**

================================

Thanks for checking out my work.

Feel free to contact me anytime.
(3 am can be tricky but you never know...)


======================================================

**Webpack Development build works.**

**Webpack Production build works.**

- Added scripts to package.json: 
  - "preinstall" script adds `.metadata_never_index` file to `node_modules` directory
  - "build" script adds `.metadata_never_index` file to `dist` directory

======================================================

**Note not all sections and modals have images**

Only the following modals have slideshow images: 
- print/advil
- print/amex
- print/bayer
- Work in progress...

======================================================

In the (not so) early stages of setting up:

**Webpack 2 config with various features, including:**
- Updated Config 7/2/17 - running the latest versions of all packages.
- Hot Module Reloading
- Image/Fonts/etc. Processing
- Path Aliases
- dev-server
- Vendor library code splitting
- etc. 


**Vue 2 project:**

GSAP Animation (only modal-slideshow has GSAP animations applied but not in a Vue way - using jquery):
- Tweenlite
- CSSPlugin
- ScrollToPlugin

Simplifying the Build:
Todo:
- Cleaning up the CSS.
  - Cleaned up CSS grid. **DONE**
- Cleaning up the HTML.

Nav Buttons Component:
Todo:
- Vue-Router with routes for Print, Video, Outdoor and Online. **DONE**

Nav Small Screen Menu:
Todo:
- Create small screen nav menu. **DONE**
- CSS style and set media queries. **DONE**
- Animate in or out based on queries (from small screen nav to medium-up screen nav).

Section and Hero Image Component:
- Todo:
  - repeatable/small background texture for the each section. **DONE**
  - Set hero-image animated gif to fade out when buttons animate into frame.
  - Animate modal-buttons in from bottom.

Modal Password:
Todo:
- Added a modal to enter a password to view certain content. **DONE**
- CSS styles, including media queries applied. **DONE**
- Added vue functionality for wrong password message. **DONE**
- Pass props to modal-slideshow when the correct password is entered.
- Add animation to selected modal-button/slideshow.

Modal Slideshow Overlay Component:
Todo:
- Need to recreate slideshow with Vue vs jQuery.

Preference & Contact Tab:
Todo:
- Added, CSS styles including media queries applied. **DONE**
- Visibility set with v-if directive (bound to showTab prop). **DONE**
- Added open and close animation. **DONE**
- Tab hides completely when slideshow modal is open. **DONE**
- Update tab background image with repeating texture. **DONE**
- Style Select All and Default checkboxes to look like buttons. **DONE**
- Add localStorage for cross page load persistence of the selected industries. **DONE**
- Add Filtering based on sector/selected idustry. **DONE** 
- Add transition-group animation for filtered results. **DONE**

General Todo:
- Add linting for Vue files. **DONE**
- Code Cleanup.
