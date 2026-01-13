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
  missingLang: missingLangHtml,
  emptyButtonsAndLinks: emptyButtonsAndLinksHtml,
  duplicateIds: duplicateIdsHtml,
  headingOrder: headingOrderHtml,
  missingLandmarks: missingLandmarksHtml,
  ariaIssues: ariaIssuesHtml,
  tableIssues: tableIssuesHtml,
  multipleIssues: multipleIssuesHtml,
};
