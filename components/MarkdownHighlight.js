import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
  materialLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function MarkdownHighlight({ darkMode, language, value }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={darkMode ? materialLight : materialDark}
    >
      {value}
    </SyntaxHighlighter>
  );
}
