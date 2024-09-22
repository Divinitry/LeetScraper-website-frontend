import { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeLeft = ({ questionTitle }) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const localStorageKey = `code_${questionTitle}`; 

  useEffect(() => {
    const savedCode = localStorage.getItem(localStorageKey);
    if (savedCode) {
      setValue(savedCode);
    } else {
      setValue(CODE_SNIPPETS[language]); 
    }
  }, [questionTitle, language, localStorageKey]);

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const saveCodeToLocalStorage = (code) => {
    if (code) {
      localStorage.setItem(localStorageKey, code);
    }
  };

  return (
    <div>
      <div className="flex flex-items-center space-x-4">
        <div className="w-1/2">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            height="60vh"
            theme="vs-dark"
            language={language}
            value={value}
            onMount={(editor) => {
              editorRef.current = editor;
              editor.focus();
            }}
            onChange={(value) => {
              setValue(value);
              saveCodeToLocalStorage(value);
            }}
          />
        </div>
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};

export default CodeLeft;
