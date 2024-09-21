import { useState, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeLeft = ({setCurrentCode, currentCode}) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    if(localStorage.getItem("code")){
      setValue(localStorage.getItem("code"))
    } else{
      setValue("")
    }
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const saveCodeToLocalStorage = (code) => {
    if (code) {
      localStorage.setItem("code", code);
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
            defaultValue={CODE_SNIPPETS[language]}
            value={value}
            onMount={onMount}
            onChange={(value) => {setValue(value); saveCodeToLocalStorage(value)}}
          />
        </div>
        <Output editorRef={editorRef} language={language} setCurrentCode={setCurrentCode} currentCode={currentCode}/>
      </div>
    </div>
  );
};

export default CodeLeft;
