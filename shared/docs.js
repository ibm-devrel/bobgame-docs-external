// =============================================================
//  Deep Blue Drive Heist — Documentation Page Scripts
//  Used exclusively by the Eleventy docs site (layout.njk).
// =============================================================

document.addEventListener("DOMContentLoaded", function () {

  // -----------------------------------------------------------
  //  Home page — path-tree toggle  (docs/index.md)
  //  Toggles the .path-subtree panel inside a .path-node.
  // -----------------------------------------------------------

  window.togglePathNode = function (btn) {
    const subtree = btn.nextElementSibling;
    const arrow = btn.querySelector(".arrow");
    const isOpen = subtree.classList.toggle("open");
    arrow.style.transform = isOpen ? "rotate(90deg)" : "";
  };

  // -----------------------------------------------------------
  //  Callout copy button  (booth/player-guide.md)
  //  Copies the nearest .callout-text to the clipboard.
  // -----------------------------------------------------------

  window.copyCallout = function (btn) {
    const box = btn.closest(".callout");
    const text = box.querySelector(".callout-text");
    navigator.clipboard.writeText(text ? text.innerText.trim() : "").then(() => {
      btn.textContent = "Copied!";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = "Copy";
        btn.classList.remove("copied");
      }, 1800);
    });
  };

  // -----------------------------------------------------------
  //  OS tab switcher  (booth/laptop-setup.md via {% ostabs %})
  //  Activates the correct .os-panel when an .os-tab is clicked.
  // -----------------------------------------------------------

  const editor = document.getElementById("os-editor");
  if (editor) {
    const tabs = editor.querySelectorAll(".os-tab");
    for (const tab of tabs) {
      tab.addEventListener("click", function () {
        const os = tab.getAttribute("data-os");
        for (const t of tabs) t.classList.remove("active");
        for (const panel of editor.querySelectorAll(".os-panel")) panel.classList.remove("active");
        tab.classList.add("active");
        const panel = document.getElementById("os-panel-" + os);
        if (panel) panel.classList.add("active");
      });
    }
  }

});
