import { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import api from "../api";
import './CodeLeft.css';

const CodeLeft = ({ questionTitle, codeQuestion, setFeedback, setUserCode, id, userCode }) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("Select Language");
  const [languageStarterCode, setLanguageStarterCode] = useState(null);
  const [isFetching, setIsFetching] = useState(false); 

  const javascriptCodeLocalStorageKey = `javascriptcode_${questionTitle}`;
  const typescriptCodeLocalStorageKey = `typescriptcode_${questionTitle}`;
  const pythonCodeLocalStorageKey = `pythoncode_${questionTitle}`;
  const javaCodeLocalStorageKey = `javacode_${questionTitle}`;
  const csharpCodeLocalStorageKey = `csharpcode_${questionTitle}`;

  const languageLocalStorageKey = `language_${questionTitle}`;
  const starterCodeLocalStorageKey = `starter_code_${questionTitle}`;

  const languagesHashMap = {
    javascript: javascriptCodeLocalStorageKey,
    typescript: typescriptCodeLocalStorageKey,
    python: pythonCodeLocalStorageKey,
    java: javaCodeLocalStorageKey,
    csharp: csharpCodeLocalStorageKey,
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem(languageLocalStorageKey);
    const cachedStarterCode = localStorage.getItem(starterCodeLocalStorageKey);
    const starterCodeFetchedFlag = localStorage.getItem(`starter_code_fetched_${questionTitle}`);

    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const savedCode = localStorage.getItem(languagesHashMap[savedLanguage]);

    if (savedCode && savedCode.trim() !== "") {
      setValue(savedCode);
    } else if (cachedStarterCode) {
      const starterCode = JSON.parse(cachedStarterCode);
      setLanguageStarterCode(starterCode);
      setValue(starterCode[savedLanguage] || "");
    } else if (codeQuestion && !starterCodeFetchedFlag) {
      setIsFetching(true);
      getStarterCode(savedLanguage || language);
      localStorage.setItem(`starter_code_fetched_${questionTitle}`, "true");
    }
  }, [questionTitle]);

  const onSelect = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem(languageLocalStorageKey, newLanguage);

    const currentLanguageKey = languagesHashMap[newLanguage];
    const savedCode = localStorage.getItem(currentLanguageKey);

    if (savedCode) {
      setValue(savedCode);
    } else if (languageStarterCode && languageStarterCode[newLanguage]) {
      setValue(languageStarterCode[newLanguage]);
    }
  };

  const saveCodeToLocalStorage = (code) => {
    if (code) {
      const currentLanguageKey = languagesHashMap[language];
      localStorage.setItem(currentLanguageKey, code);
    }
  };

  const getStarterCode = async (lang) => {
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

      const savedCode = localStorage.getItem(languagesHashMap[lang]);
      if (!savedCode || savedCode.trim() === "") {
        setValue(starterCode[lang]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false); 
    }
  };

  return (
    <div>
      <div className="flex flex-items-center space-x-4">
        <div className="w-1/2">
          <LanguageSelector
            language={language}
            onSelect={onSelect}
            questionTitle={questionTitle}
            isFetching={isFetching}
          />
          <div className="editor-wrapper outline outline-white/20 rounded-md">
            <Editor
              height="72vh"
              className="rounded-sm"
              theme="vs-dark"
              language={language}
              value={value || ""}
              onMount={(editor) => {
                editorRef.current = editor;
                editor.focus();
              }}
              onChange={(newValue) => {
                setValue(newValue);
                saveCodeToLocalStorage(newValue);
              }}
              options={{
                minimap: { enabled: false },
              }}
            />
          </div>
        </div>
        <Output
          editorRef={editorRef}
          language={language}
          codeQuestion={codeQuestion}
          setFeedback={setFeedback}
          setUserCode={setUserCode}
          id={id}
        />
      </div>
    </div>
  );
};

export default CodeLeft;
