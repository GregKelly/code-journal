import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-markdown';
import styles from './ContentDisplay.module.css';

/**
 * Parses content and identifies code blocks in markdown-style format
 * Example: ```javascript\ncode here\n```
 */
function parseContent(content) {
  const blocks = [];
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      const textContent = content.slice(lastIndex, match.index);
      if (textContent.trim()) {
        blocks.push({
          type: 'text',
          content: textContent,
        });
      }
    }

    // Add code block
    blocks.push({
      type: 'code',
      language: match[1] || 'javascript', // Default to JavaScript
      content: match[2].trim(),
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    const textContent = content.slice(lastIndex);
    if (textContent.trim()) {
      blocks.push({
        type: 'text',
        content: textContent,
      });
    }
  }

  return blocks;
}

function ContentDisplay({ content }) {
  useEffect(() => {
    // Highlight all code blocks after rendering
    Prism.highlightAll();
  }, [content]);

  const blocks = parseContent(content);

  // If no code blocks found, render as plain text
  if (blocks.length === 0 || (blocks.length === 1 && blocks[0].type === 'text')) {
    return (
      <div className={styles.content}>
        {content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.content}>
      {blocks.map((block, index) => {
        if (block.type === 'text') {
          return (
            <div key={index} className={styles.textBlock}>
              {block.content.split('\n').map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          );
        }

        // Code block
        return (
          <div key={index} className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.language}>{block.language}</span>
            </div>
            <pre className={styles.pre}>
              <code className={`language-${block.language}`}>
                {block.content}
              </code>
            </pre>
          </div>
        );
      })}
    </div>
  );
}

export default ContentDisplay;
