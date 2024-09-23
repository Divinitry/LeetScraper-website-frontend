import { useState } from "react"

const Feedback = ({codeQuestion, feedback}) => {
    return (
        <div>
            <p>
                {feedback && feedback.feedback}
            </p>
            <p>
                {feedback ? `Rating: ${feedback.rating}` : 'rating goes here'}
            </p>
        </div>  
    )
}

export default Feedback