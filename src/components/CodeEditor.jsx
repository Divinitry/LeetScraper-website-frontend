import CodeLeft from "./CodeLeft";

function CodeEditor({questionTitle}) {
    return (
        <div>
            <div className="min-h-80 px-6 py-8">
                <CodeLeft questionTitle={questionTitle}/>
            </div>
        </div>
    )
}

export default CodeEditor