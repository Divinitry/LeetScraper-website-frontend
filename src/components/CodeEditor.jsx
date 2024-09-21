import CodeLeft from "./CodeLeft";

function CodeEditor({setCurrentCode, currentCode}) {
    return (
        <div>
            <div className="min-h-80 px-6 py-8">
                <CodeLeft setCurrentCode={setCurrentCode} currentCode={currentCode}/>
            </div>
        </div>
    )
}

export default CodeEditor