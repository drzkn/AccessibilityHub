export const validHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessible Page</title>
</head>
<body>
  <header>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <h1>Welcome to Our Site</h1>
    <p>This is an accessible page.</p>
    <img src="logo.png" alt="Company logo">
    <button type="button">Click me</button>
  </main>
  <footer>
    <p>&copy; 2024 Company</p>
  </footer>
</body>
</html>
`;

export const missingAltTextHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Missing Alt Text</title>
</head>
<body>
  <main>
    <h1>Images Without Alt</h1>
    <img src="photo1.jpg">
    <img src="photo2.jpg">
    <img src="photo3.jpg">
  </main>
</body>
</html>
`;

export const missingFormLabelsHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Missing Form Labels</title>
</head>
<body>
  <main>
    <h1>Contact Form</h1>
    <form>
      <input type="text" name="name" placeholder="Name">
      <input type="email" name="email" placeholder="Email">
      <textarea name="message" placeholder="Message"></textarea>
      <select name="topic">
        <option value="general">General</option>
        <option value="support">Support</option>
      </select>
      <button type="submit">Send</button>
    </form>
  </main>
</body>
</html>
`;

export const lowContrastHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Low Contrast</title>
  <style>
    .low-contrast {
      color: #aaa;
      background-color: #ccc;
    }
  </style>
</head>
<body>
  <main>
    <h1>Contrast Issues</h1>
    <p class="low-contrast">This text has very low contrast and is hard to read.</p>
  </main>
</body>
</html>
`;

export const veryLowContrastHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Very Low Contrast</title>
  <style>
    .very-low { color: #ccc; background-color: #ddd; }
    .normal { color: #333; background-color: #fff; }
    .large-text { font-size: 24px; color: #888; background-color: #fff; }
    .bold-large { font-size: 18.5px; font-weight: 700; color: #888; background-color: #fff; }
  </style>
</head>
<body>
  <main>
    <p class="very-low">This text has very low contrast</p>
    <p class="normal">This text has good contrast</p>
    <p class="large-text">This is large text with moderate contrast</p>
    <p class="bold-large">This is bold large text</p>
  </main>
</body>
</html>
`;

export const moderateContrastHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Moderate Contrast</title>
  <style>
    .moderate { color: #595959; background-color: #fff; }
  </style>
</head>
<body>
  <main>
    <p class="moderate">This text has moderate contrast (around 5:1)</p>
  </main>
</body>
</html>
`;

export const contrastWithInheritedBackgroundHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Inherited Background</title>
  <style>
    .parent { background-color: #333; padding: 20px; }
    .child-low { color: #555; }
    .child-good { color: #fff; }
  </style>
</head>
<body>
  <main>
    <div class="parent">
      <p class="child-low">This text inherits dark background but has low contrast</p>
      <p class="child-good">This text inherits dark background and has good contrast</p>
    </div>
  </main>
</body>
</html>
`;

export const contrastWithTransparentBackgroundHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Transparent Background</title>
  <style>
    body { background-color: #f0f0f0; }
    .transparent-bg { background-color: transparent; color: #ccc; }
    .rgba-bg { background-color: rgba(0, 0, 0, 0.1); color: #bbb; }
  </style>
</head>
<body>
  <main>
    <p class="transparent-bg">Text with transparent background</p>
    <p class="rgba-bg">Text with semi-transparent background</p>
  </main>
</body>
</html>
`;

export const contrastMultipleFormatsHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Multiple Color Formats</title>
  <style>
    .hex-colors { color: #999; background-color: #bbb; }
    .rgb-colors { color: rgb(150, 150, 150); background-color: rgb(180, 180, 180); }
    .hsl-colors { color: hsl(0, 0%, 60%); background-color: hsl(0, 0%, 75%); }
    .named-colors { color: gray; background-color: silver; }
    .rgba-colors { color: rgba(100, 100, 100, 1); background-color: rgba(200, 200, 200, 1); }
  </style>
</head>
<body>
  <main>
    <p class="hex-colors">Hex format low contrast</p>
    <p class="rgb-colors">RGB format low contrast</p>
    <p class="hsl-colors">HSL format low contrast</p>
    <p class="named-colors">Named colors low contrast</p>
    <p class="rgba-colors">RGBA format low contrast</p>
  </main>
</body>
</html>
`;

export const contrastLargeTextHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Large Text Contrast</title>
  <style>
    .large-normal { font-size: 24px; color: #767676; background-color: #fff; }
    .large-bold { font-size: 18.5px; font-weight: 700; color: #767676; background-color: #fff; }
    .large-pass { font-size: 24px; color: #666; background-color: #fff; }
    .small-fail { font-size: 16px; color: #767676; background-color: #fff; }
  </style>
</head>
<body>
  <main>
    <p class="large-normal">Large text (24px) with 4.54:1 ratio - passes AA</p>
    <p class="large-bold">Bold large text (18.5px bold) with 4.54:1 ratio - passes AA</p>
    <p class="large-pass">Large text with better contrast - passes AA</p>
    <p class="small-fail">Small text with same color - fails AA</p>
  </main>
</body>
</html>
`;

export const contrastAAALevelHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AAA Level Contrast</title>
  <style>
    .passes-aa-fails-aaa { color: #595959; background-color: #fff; }
    .passes-aaa { color: #333; background-color: #fff; }
    .fails-both { color: #888; background-color: #aaa; }
  </style>
</head>
<body>
  <main>
    <p class="passes-aa-fails-aaa">Passes AA (4.5+:1) but fails AAA (7:1)</p>
    <p class="passes-aaa">Passes both AA and AAA levels</p>
    <p class="fails-both">Fails both AA and AAA levels</p>
  </main>
</body>
</html>
`;

export const contrastNestedElementsHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Nested Elements Contrast</title>
  <style>
    .outer { background-color: #eee; padding: 20px; }
    .middle { background-color: #ddd; padding: 15px; }
    .inner-low { color: #aaa; }
    .inner-good { color: #333; }
    a.link-low { color: #999; }
    strong.emphasis { color: #bbb; }
  </style>
</head>
<body>
  <main>
    <div class="outer">
      <div class="middle">
        <p class="inner-low">Nested element with low contrast</p>
        <p class="inner-good">Nested element with good contrast</p>
        <p>Text with <a href="#" class="link-low">low contrast link</a> inside</p>
        <p>Text with <strong class="emphasis">low contrast emphasis</strong> inside</p>
      </div>
    </div>
  </main>
</body>
</html>
`;

export const contrastUIComponentsHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>UI Components Contrast</title>
  <style>
    .btn-low {
      background-color: #ddd;
      color: #aaa;
      border: 1px solid #ccc;
      padding: 10px 20px;
    }
    .input-low {
      border: 1px solid #ddd;
      color: #aaa;
      padding: 8px;
    }
    .input-low::placeholder {
      color: #ccc;
    }
    .label-low {
      color: #999;
      background-color: #eee;
    }
    .icon-text {
      color: #bbb;
      background-color: #ddd;
    }
  </style>
</head>
<body>
  <main>
    <form>
      <label class="label-low">Low contrast label</label>
      <input type="text" class="input-low" placeholder="Low contrast placeholder">
      <button class="btn-low">Low contrast button</button>
    </form>
    <p class="icon-text">Icon or decorative text with low contrast</p>
  </main>
</body>
</html>
`;

export const missingLangHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Missing Language</title>
</head>
<body>
  <main>
    <h1>No Language Attribute</h1>
    <p>This page is missing the lang attribute on the html element.</p>
  </main>
</body>
</html>
`;

export const emptyButtonsAndLinksHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Empty Buttons and Links</title>
</head>
<body>
  <main>
    <h1>Interactive Elements</h1>
    <button></button>
    <button>   </button>
    <a href="/page1"></a>
    <a href="/page2"><img src="icon.png"></a>
  </main>
</body>
</html>
`;

export const duplicateIdsHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Duplicate IDs</title>
</head>
<body>
  <main>
    <h1>Duplicate ID Problem</h1>
    <div id="content">First content</div>
    <div id="content">Second content</div>
    <span id="label">Label 1</span>
    <span id="label">Label 2</span>
  </main>
</body>
</html>
`;

export const headingOrderHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Heading Order Issues</title>
</head>
<body>
  <main>
    <h1>Main Title</h1>
    <h3>Skipped to H3</h3>
    <h5>Skipped to H5</h5>
    <h2>Back to H2</h2>
  </main>
</body>
</html>
`;

export const missingLandmarksHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Missing Landmarks</title>
</head>
<body>
  <div class="header">
    <div class="nav">Navigation</div>
  </div>
  <div class="content">
    <h1>Main Content</h1>
    <p>This page uses divs instead of semantic landmarks.</p>
  </div>
  <div class="footer">Footer</div>
</body>
</html>
`;

export const ariaIssuesHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ARIA Issues</title>
</head>
<body>
  <main>
    <h1>ARIA Problems</h1>
    <div role="button">Not a real button</div>
    <div aria-labelledby="nonexistent">Missing reference</div>
    <input type="text" aria-describedby="missing-id">
    <div role="invalid-role">Invalid role</div>
  </main>
</body>
</html>
`;

export const tableIssuesHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Table Issues</title>
</head>
<body>
  <main>
    <h1>Data Table</h1>
    <table>
      <tr>
        <td>Name</td>
        <td>Age</td>
        <td>City</td>
      </tr>
      <tr>
        <td>John</td>
        <td>30</td>
        <td>NYC</td>
      </tr>
    </table>
  </main>
</body>
</html>
`;

export const multipleIssuesHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Multiple Issues</title>
</head>
<body>
  <div class="header">
    <img src="logo.png">
    <a href="/home"></a>
  </div>
  <div class="main">
    <h3>Welcome</h3>
    <form>
      <input type="text" name="search">
      <button></button>
    </form>
    <div id="content">
      <p style="color: #999; background: #aaa;">Low contrast text</p>
    </div>
    <div id="content">Duplicate ID</div>
  </div>
</body>
</html>
`;

export const fixtures = {
  valid: validHtml,
  missingAltText: missingAltTextHtml,
  missingFormLabels: missingFormLabelsHtml,
  lowContrast: lowContrastHtml,
  veryLowContrast: veryLowContrastHtml,
  moderateContrast: moderateContrastHtml,
  contrastWithInheritedBackground: contrastWithInheritedBackgroundHtml,
  contrastWithTransparentBackground: contrastWithTransparentBackgroundHtml,
  contrastMultipleFormats: contrastMultipleFormatsHtml,
  contrastLargeText: contrastLargeTextHtml,
  contrastAAALevel: contrastAAALevelHtml,
  contrastNestedElements: contrastNestedElementsHtml,
  contrastUIComponents: contrastUIComponentsHtml,
  missingLang: missingLangHtml,
  emptyButtonsAndLinks: emptyButtonsAndLinksHtml,
  duplicateIds: duplicateIdsHtml,
  headingOrder: headingOrderHtml,
  missingLandmarks: missingLandmarksHtml,
  ariaIssues: ariaIssuesHtml,
  tableIssues: tableIssuesHtml,
  multipleIssues: multipleIssuesHtml,
};
