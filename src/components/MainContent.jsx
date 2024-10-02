import { useNavigate } from "react-router-dom";;

const MainContent = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div className="flex flex-col text-center max-w-5xl mx-auto pt-52">
          <h1 className="animate-fade-in text-4xl font-bold sm:text-5xl md:text-8xl opacity-0 [animation-delay:200ms] -translate-y-4">
            Experience Leetcode the way you deserve.
          </h1>
          <p className="mt-10 text-lg text-gray-400 text-center max-w-3xl mx-auto animate-fade-in opacity-0 [animation-delay:400ms] -translate-y-4 pb-10">
            Your ultimate coding companion, featuring a powerful AI assistant,
            personalized notes and resources, and built-in code
            terminal—designed to help you conquer every challenge.
          </p>
          
          <button
            onClick={() => navigate("/search")}
            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none mx-auto"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
              Get Started
              <div className="pl-2 pr-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
            </span>
          </button>
        </div>
      </div>

      <div className="w-full md:w-5/6 lg:w-3/4 relative overflow-hidden rounded-xl border border-gray-800 p-[1px] my-36 mx-auto shadow-custom-purple">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <div className="inline-flex h-full w-full items-center justify-center rounded-xl bg-black px-3 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
          <div className="p-16 lg:w-1/2 flex flex-col justify-center text-start">
            <h1 className="text-4xl">Search for your Leetcode problem</h1>
            <p className="pt-10 text-xl text-gray-400">
              LeetScraper is designed to streamline your LeetCode journey by
              offering instant access to problem details, tailored AI guidance,
              and a seamless coding environment, all in one place.
            </p>
          </div>
          <div className="p-16 lg:w-1/2 flex flex-col justify-center text-center">
            Image of the search function goes here
          </div>
        </div>
      </div>

      <div className="w-full md:w-5/6 lg:w-3/4 relative overflow-hidden rounded-xl border border-gray-800 p-[1px] my-36 mx-auto shadow-custom-purple">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <div className="inline-flex h-full w-full items-center justify-center rounded-xl bg-black px-3 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
          <div className="p-16 lg:w-1/2 flex flex-col justify-center text-start">
            <h1 className="text-4xl">Code using our built in IDE.</h1>
            <p className="pt-10 text-xl text-gray-400">
              LeetScraper offers a fully integrated IDE that allows users to
              write, test, and debug their code right in the browser. With
              real-time feedback, syntax highlighting, and problem-specific
              insights, you can seamlessly tackle LeetCode problems without
              switching between platforms. Whether you're practicing algorithms
              or learning new concepts, our custom IDE is designed to optimize
              your coding experience.
            </p>
          </div>
          <div className="p-16 lg:w-1/2 flex flex-col justify-center text-center">
            Image of the code editor
          </div>
        </div>
      </div>

      <div className="w-full md:w-5/6 lg:w-3/4 relative overflow-hidden rounded-xl border border-gray-800 p-[1px] my-36 mx-auto shadow-custom-purple">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <div className="inline-flex h-full w-full items-center justify-center rounded-xl bg-black px-3 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
          <div className="p-16 lg:w-1/2 flex flex-col justify-center text-start">
            <h1 className="text-4xl">
              Track Your Progress and Get Instant Feedback
            </h1>
            <p className="pt-10 text-xl text-gray-400">
              With LeetScraper, you can write detailed notes for every problem
              you work on, track your progress, and view feedback tailored
              specifically to your code. Whether you're solving a problem for
              the first time or revisiting it, our platform provides a
              comprehensive view of your learning journey. Stay motivated by
              seeing how far you've come with progression tracking and build
              confidence with constructive feedback designed to help you
              improve.
            </p>
          </div>
          <div className="p-16 lg:w-1/2 flex flex-col justify-center text-center">
            Image of the notes and feedback go here
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
