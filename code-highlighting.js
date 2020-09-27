const codeReplacements = [
  { from: /&/g, to: "&amp;" },
  { from: /</g, to: "&lt;" },
  { from: />/g, to: "&gt;" },
  { from: /"/g, to: "&quot;" },
  { from: /'/g, to: "&#039;" },
]

async function run() {
  let example = 1;

  while (true) {
    const markup = await fetch(`examples/example${example}/markup.html`);
    const styles = await fetch(`examples/example${example}/styles.css`);

    if (!markup.ok || !styles.ok) {
      break;
    }

    const htmlContent = await markup.text();
    const cssContent = await styles.text();

    const htmlCode = document.createElement('code');
    htmlCode.innerHTML = htmlContent;

    const cssCode = document.createElement('code');
    cssCode.innerHTML = cssContent;

    const htmlCodeWrapper = document.createElement('pre');
    htmlCodeWrapper.classList.add('language-html');
    htmlCodeWrapper.appendChild(htmlCode);

    const cssCodeWrapper = document.createElement('pre');
    cssCodeWrapper.classList.add('language-css');
    cssCodeWrapper.appendChild(cssCode);

    const leftColumn = document.createElement('div');
    leftColumn.classList.add('left');
    leftColumn.appendChild(htmlCodeWrapper);
    leftColumn.appendChild(cssCodeWrapper);

    const style = document.createElement('style');
    style.innerText = cssContent;

    const rightColumn = document.createElement('div');
    rightColumn.classList.add('right');
    rightColumn.innerHTML = htmlContent;
    rightColumn.appendChild(style);

    const sample = document.createElement('div');
    sample.classList.add('sample');
    sample.appendChild(leftColumn);
    sample.appendChild(rightColumn);

    document.querySelector('.content').appendChild(sample);

    codeReplacements.forEach(replacement => {
      htmlCode.innerHTML = htmlCode.innerHTML.replace(replacement.from, replacement.to);
      cssCode.innerHTML = cssCode.innerHTML.replace(replacement.from, replacement.to);
    })

    hljs.highlightBlock(htmlCodeWrapper);
    hljs.highlightBlock(cssCodeWrapper);

    example++;
  }
}

run();
