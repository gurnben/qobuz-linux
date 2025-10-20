// Preload script to bypass Qobuz minimum width restrictions

// Remove minimum width error messages containing "1024"
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Check if the node or its children contain "1024" text
        if (node.textContent && node.textContent.includes("1024")) {
          node.remove();
        }
        
        // Also check child nodes
        const elementsWithText = node.querySelectorAll && node.querySelectorAll("*");
        if (elementsWithText) {
          elementsWithText.forEach((element) => {
            if (element.textContent && element.textContent.includes("1024")) {
              element.remove();
            }
          });
        }
      }
    });
  });
});

// Start observing when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Also remove any existing elements with "1024" text
  const existingElements = document.querySelectorAll("*");
  existingElements.forEach((element) => {
    if (element.textContent && element.textContent.includes("1024")) {
      element.remove();
    }
  });
});

// Inject CSS to remove minimum width constraints
document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.textContent = `
    * {
      min-width: unset !important;
    }
    body {
      min-width: unset !important;
    }
    .min-width-restriction,
    .minimum-width-warning {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
});