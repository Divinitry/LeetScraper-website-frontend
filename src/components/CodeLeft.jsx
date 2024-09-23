import { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";

const CodeLeft = ({ questionTitle, codeQuestion, setFeedback, setUserCode }) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const codeLocalStorageKey = `code_${questionTitle}`; 
  const languageLocalStorageKey = `language_${questionTitle}`

  useEffect(() => {
    const savedCode = localStorage.getItem(codeLocalStorageKey);
    if (savedCode) {
      setValue(savedCode);
    }
    const savedLanguage = localStorage.getItem(languageLocalStorageKey)
    setLanguage(savedLanguage)
  }, [questionTitle, language, codeLocalStorageKey, languageLocalStorageKey]);

  const onSelect = (language) => {
    setLanguage(language);
    localStorage.setItem(languageLocalStorageKey, language)
  };

  const saveCodeToLocalStorage = (code) => {
    if (code) {
      localStorage.setItem(codeLocalStorageKey, code);
    }
  };

  return (
    <div>
      <div className="flex flex-items-center space-x-4">
        <div className="w-1/2">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            height="72vh"
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
        <Output editorRef={editorRef} language={language} codeQuestion={codeQuestion} setFeedback={setFeedback} setUserCode={setUserCode}/>
      </div>
    </div>
  );
};

export default CodeLeft;
