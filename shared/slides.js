// =============================================================
//  Deep Blue Heist Workshop — Reveal.js bootstrapping
//  Initialises every deck emitted by the {% slides %} shortcode.
//  Reveal + plugins are vendored at /vendor/reveal/ (see .eleventy.js).
//
//  Config mirrors the JPMC keynote deck (talks/jpmc-keynote/index.html):
//  no margin, no transition, no controls/progress bar, click to advance.
//  The only differences are for decks embedded in a docs page: they don't
//  touch the URL hash and only take arrow keys once clicked into.
// =============================================================

// Initialize after window 'load', not DOMContentLoaded: reveal.js registers its
// own load -> layout() listener in initialize(), and if that fires before the
// async markdown plugin finishes, a narrow viewport (<= scrollActivationWidth)
// throws in backgrounds.create. Same fix as the keynote.
window.addEventListener("load", function () {
  document.querySelectorAll(".reveal[data-deck]").forEach(function (el) {
    const present = el.dataset.mode === "present";
    const deck = new Reveal(el, {
      width: 1280,
      height: 720,
      margin: 0,
      center: false,
      // Slides are flex columns (see shared/slides.css). Reveal applies this
      // to the visible slides itself, so hidden ones stay display:none.
      display: "flex",
      hash: present,
      controls: false,
      progress: false,
      slideNumber: true,
      transition: "none",
      embedded: !present,
      keyboardCondition: present ? null : "focused",
      plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
    });
    deck.initialize();

    // Click to advance (shift-click goes back); links and media still work normally.
    el.addEventListener("click", function (e) {
      if (e.target.closest("a, button, video, audio, input, textarea")) return;
      e.shiftKey ? deck.prev() : deck.next();
    });
  });
});
