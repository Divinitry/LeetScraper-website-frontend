import CodeLeft from "./CodeLeft";

function CodeEditor({questionTitle, codeQuestion, setFeedback, setUserCode, id, userCode}) {
    return (
        <div>
            <div className="min-h-80 px-6 py-8">
                <CodeLeft questionTitle={questionTitle} codeQuestion={codeQuestion} setFeedback={setFeedback} userCode={userCode} setUserCode={setUserCode} id={id}/>
            </div>
        </div>
    )
}

export default CodeEditor