# Syntax Highlighting Guide

Code Journal now supports syntax highlighting for code snippets in your entries!

## How to Add Code Blocks

### Basic Syntax

Wrap your code in triple backticks with the language name:

````markdown
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```
````

### Result

When you view your entry, the code will be displayed with beautiful syntax highlighting specific to the language.

## Supported Languages

Code Journal supports syntax highlighting for:

- **JavaScript** - `javascript` or `js`
- **TypeScript** - `typescript` or `ts`
- **JSX** - `jsx`
- **TSX** - `tsx`
- **Python** - `python` or `py`
- **Java** - `java`
- **CSS** - `css`
- **JSON** - `json`
- **Bash/Shell** - `bash` or `sh`
- **SQL** - `sql`
- **Markdown** - `markdown` or `md`

## Examples

### JavaScript Example

````markdown
```javascript
const entries = await entriesAPI.getAll();
console.log(entries);
```
````

### Python Example

````markdown
```python
def calculate_fibonacci(n):
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

print(calculate_fibonacci(10))
```
````

### SQL Example

````markdown
```sql
SELECT * FROM entries
WHERE created_at > '2025-01-01'
ORDER BY created_at DESC
LIMIT 10;
```
````

### CSS Example

````markdown
```css
.button {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
```
````

## Mixed Content

You can mix regular text and code blocks in the same entry:

````markdown
I learned how to use async/await in JavaScript today!

Here's the basic syntax:

```javascript
async function fetchData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
}
```

The `await` keyword can only be used inside `async` functions.

You can also handle errors:

```javascript
try {
  const data = await fetchData();
  console.log(data);
} catch (error) {
  console.error('Error:', error);
}
```

This makes working with promises much cleaner!
````

## Features

### Automatic Language Detection
If you don't specify a language, JavaScript is used as the default:

````markdown
```
// This will be highlighted as JavaScript
const greeting = "Hello!";
```
````

### Code Block Headers
Each code block displays the language name in the header for easy reference.

### Scrollable Code
Long lines of code are horizontally scrollable so they don't break your layout.

### Theme
Code blocks use a dark theme optimized for readability, with syntax colors that match popular code editors.

## Tips

### 1. Always Specify the Language
For best results, always specify the language:

````markdown
✅ GOOD:
```python
print("Hello, World!")
```

❌ LESS IDEAL:
```
print("Hello, World!")
```
````

### 2. Code Blocks Work Anywhere
You can add multiple code blocks in a single entry:

````markdown
First, install the package:

```bash
npm install express
```

Then create your server:

```javascript
const express = require('express');
const app = express();

app.listen(3000);
```
````

### 3. Proper Indentation
Your code's indentation is preserved exactly as you type it:

````markdown
```javascript
function example() {
  if (condition) {
    doSomething();
  }
}
```
````

### 4. Special Characters
Special characters in code are handled correctly:

````markdown
```javascript
const html = '<div class="container">Hello & goodbye</div>';
const regex = /\d{3}-\d{3}-\d{4}/;
```
````

## Common Issues

### Code Not Highlighting?

**Problem:** Code appears as plain text without colors.

**Solutions:**
1. Make sure you're using triple backticks: ` ``` `
2. Check the language name is spelled correctly
3. Ensure there's a newline after the opening backticks
4. Make sure the backticks are on their own lines

**Example:**
````markdown
✅ CORRECT:
```python
print("Hello")
```

❌ INCORRECT (no newlines):
```python print("Hello") ```
````

### Backticks Not Showing Correctly?

If you need to show backticks in your code (like in markdown examples), escape them or use a different number of backticks.

### Language Not Supported?

If you need a language that's not listed, the code will still be displayed in a code block format, just without syntax highlighting. Open an issue to request new language support!

## Behind the Scenes

Code Journal uses **Prism.js** for syntax highlighting:
- Lightweight and fast
- Industry-standard highlighting
- Supports 200+ languages (we've enabled the most common ones)
- Works great with light and dark modes

## Examples in Action

### Document a Bug Fix

````markdown
**Bug:** User authentication was failing on mobile

**Fix:** Updated the token validation logic

```javascript
// Before
if (token) {
  validateToken(token);
}

// After
if (token && token.length > 0) {
  validateToken(token.trim());
}
```

**Result:** Authentication now works on all devices! ✅
````

### Document API Usage

````markdown
**Learning:** How to use the Fetch API

```javascript
// GET request
const response = await fetch('/api/entries');
const data = await response.json();

// POST request
const newEntry = await fetch('/api/entries', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Test', content: 'Content' })
});
```

Remember to always handle errors!
````

### Document Database Queries

````markdown
**Task:** Find all entries created in the last week

```sql
SELECT id, title, created_at
FROM entries
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

This returns 42 entries from this week.
````

---

## Quick Reference

| Language   | Code                        |
|------------|-----------------------------|
| JavaScript | ` ```javascript `           |
| Python     | ` ```python `               |
| Java       | ` ```java `                 |
| CSS        | ` ```css `                  |
| SQL        | ` ```sql `                  |
| Bash       | ` ```bash `                 |
| JSON       | ` ```json `                 |
| TypeScript | ` ```typescript `           |
| Markdown   | ` ```markdown `             |

---

**Happy coding!** 🎨 Your code snippets will now look beautiful and professional in your journal entries.

For more information, see the main [README](README.md).
