import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";

const CodeBodyDropDown = ({ codeQuestion, difficultyColour }) => {
  return (
    <div>
      <Accordion className="bg-white/10 border-none">
        <AccordionPanel>
          <AccordionTitle className="bg-white/1 hover:bg-white/5 text-white fill-current focus:ring-0">
            <p className="text-4xl mb-4">{codeQuestion?.question_title}</p>
            <div className="flex flex-row space-x-2">
              <p
                className={`${difficultyColour} bg-white/20 rounded-full px-2 py-1 text-xs`}
              >
                {codeQuestion.difficulty}
              </p>
              {codeQuestion.topics.map((topic) => (
                <p
                  key={topic}
                  className="bg-white/20 rounded-full px-2 py-1 text-xs"
                >
                  {topic}
                </p>
              ))}
            </div>
          </AccordionTitle>
          <AccordionContent>
            <div className="mb-2 text-white">
              <div className="code-question-page">
                <div
                  dangerouslySetInnerHTML={{ __html: codeQuestion.body }}
                  className="py-5 px-5 text-red-"
                />
              </div>
              <div className="hints">
                <Accordion collapseAll className="border-none">
                  {codeQuestion.hints.map((hint, index) => (
                    <AccordionPanel key={index}>
                      <AccordionTitle className="hover:bg-white/10 text-white fill-current bg-white/5">
                        Hint {index + 1}
                      </AccordionTitle>
                      <AccordionContent>
                        <div dangerouslySetInnerHTML={{ __html: hint }} />
                      </AccordionContent>
                    </AccordionPanel>
                  ))}
                </Accordion>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  );
};

export default CodeBodyDropDown;
