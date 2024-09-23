import CodeLeft from "./CodeLeft";

function CodeEditor({questionTitle, codeQuestion, setFeedback}) {
    return (
        <div>
            <div className="min-h-80 px-6 py-8">
                <CodeLeft questionTitle={questionTitle} codeQuestion={codeQuestion} setFeedback={setFeedback}/>
            </div>
        </div>
    )
}

export default CodeEditor