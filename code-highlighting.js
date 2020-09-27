hljs.initHighlightingOnLoad();

const codeReplacements = [
  { from: /&/g, to: "&amp;" },
  { from: /</g, to: "&lt;" },
  { from: />/g, to: "&gt;" },
  { from: /"/g, to: "&quot;" },
  { from: /'/g, to: "&#039;" },
]

document.querySelectorAll("code")
  .forEach(code => {
    codeReplacements.forEach(replacement => {
      code.innerHTML = code.innerHTML.replace(replacement.from, replacement.to);
    })
});
