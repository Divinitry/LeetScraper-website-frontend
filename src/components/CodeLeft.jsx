import { useState, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";

const CodeLeft = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div>
      <LanguageSelector />
      <Editor
        height="60vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        value={value}
        onMount={onMount}
        onChange={(value) => setValue(value)}
      />
    </div>
  );
};

export default CodeLeft;
