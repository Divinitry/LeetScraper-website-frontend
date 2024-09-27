import { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import api from "../api";

const CodeLeft = ({ questionTitle, codeQuestion, setFeedback, setUserCode, id, userCode }) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("Select Language");
  const [languageStarterCode, setLanguageStarterCode] = useState(null);

  const codeLocalStorageKey = `code_${questionTitle}`; 
  const languageLocalStorageKey = `language_${questionTitle}`;
  const starterCodeLocalStorageKey = `starter_code_${questionTitle}`;

  useEffect(() => {
    const savedCode = localStorage.getItem(codeLocalStorageKey);
    if (savedCode) {
      setValue(savedCode);
    }
    const savedLanguage = localStorage.getItem(languageLocalStorageKey);
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, [questionTitle, codeLocalStorageKey, languageLocalStorageKey]);

  const onSelect = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem(languageLocalStorageKey, newLanguage);
    
    if (languageStarterCode && languageStarterCode[newLanguage]) {
      setValue(languageStarterCode[newLanguage]);
    }
  };

  const saveCodeToLocalStorage = (code) => {
    if (code) {
      localStorage.setItem(codeLocalStorageKey, code);
    }
  };

  useEffect(() => {
    const getStarterCode = async () => {
      try {
        const leetcode_body = { body: codeQuestion.body };
        const response = await api.post(`/leetscraper/api/chatgptapi/startercode`, leetcode_body);
        const data = response.data;

        const starterCode = {
          javascript: data.javascript_starter_code,
          typescript: data.typescript_starter_code,
          python: data.python_starter_code,
          java: data.java_starter_code,
          csharp: data.csharp_starter_code,
        };

        localStorage.setItem(starterCodeLocalStorageKey, JSON.stringify(starterCode));

        setLanguageStarterCode(starterCode);

        setValue(starterCode[language]);
      } catch (error) {
        console.log(error);
      }
    };

    const cachedStarterCode = localStorage.getItem(starterCodeLocalStorageKey);

    if (cachedStarterCode) {
      const parsedCode = JSON.parse(cachedStarterCode);
      setLanguageStarterCode(parsedCode);

      setValue(parsedCode[language]);
    } else if (codeQuestion) {
      getStarterCode();
    }
  }, [codeQuestion]);

  return (
    <div>
      <div className="flex flex-items-center space-x-4">
        <div className="w-1/2">
          <LanguageSelector language={language} onSelect={onSelect} questionTitle={questionTitle}/>
          <Editor
            height="72vh"
            theme="vs-dark"
            language={language}
            value={value || languageStarterCode?.[language] || ""} 
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
        <Output editorRef={editorRef} language={language} codeQuestion={codeQuestion} setFeedback={setFeedback} userCode={userCode} setUserCode={setUserCode} id={id}/>
      </div>
    </div>
  );
};

export default CodeLeft;
