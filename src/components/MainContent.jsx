import { useNavigate } from "react-router-dom";
import searchPic from "../assets/finalSearchpicture.png";
import codeEditorPic from "../assets/finalcodeeditor.png";
import feedbackPic from "../assets/finalstatspic.png";

const MainContent = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div className="flex flex-col text-center max-w-5xl mx-auto pt-36 md:pt-52">
          <h1 className="animate-fade-in text-3xl font-bold sm:text-5xl md:text-6xl lg:text-8xl opacity-0 [animation-delay:200ms] -translate-y-4">
            Experience Leetcode the way you deserve.
          </h1>
          <p className="mt-6 sm:mt-10 text-base sm:text-lg md:text-xl text-gray-400 text-center max-w-3xl mx-auto animate-fade-in opacity-0 [animation-delay:400ms] -translate-y-4 pb-6 sm:pb-10">
            Your ultimate coding companion, featuring a powerful AI assistant,
            personalized notes and resources, and built-in code
            terminal—designed to help you conquer every challenge.
          </p>

          <button
            onClick={() => navigate("/search")}
            className="relative inline-flex h-10 sm:h-12 overflow-hidden rounded-full p-[1px] focus:outline-none mx-auto opacity-0 animate-fade-up [animation-delay:500ms]"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full items-center justify-center rounded-full bg-gray-950 px-6 sm:px-8 py-1 text-xs sm:text-sm font-medium text-gray-50 backdrop-blur-3xl">
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

      {/* Search Section */}
      <div className="w-full md:w-5/6 lg:w-3/4 relative overflow-hidden rounded-xl border border-gray-800 p-[1px] my-16 sm:my-36 mx-auto shadow-custom-purple">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <div className="flex flex-col md:flex-row h-auto sm:h-[500px] w-full items-center justify-center rounded-xl bg-black px-3 py-6 sm:py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
          <div className="p-6 sm:p-16 lg:w-1/2 flex flex-col justify-center text-start overflow-y-auto">
            <h1 className="text-2xl sm:text-4xl md:text-3xl lg:text-4xl">Search for your Leetcode problem</h1>
            <p className="pt-6 sm:pt-10 text-sm sm:text-xl text-gray-400">
              LeetScraper is designed to streamline your LeetCode journey by
              offering instant access to problem details, tailored AI guidance,
              and a seamless coding environment, all in one place.
            </p>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={searchPic}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Code IDE Section */}
      <div className="w-full md:w-5/6 lg:w-3/4 relative overflow-hidden rounded-xl border border-gray-800 p-[1px] my-16 sm:my-36 mx-auto shadow-custom-purple">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <div className="flex flex-col md:flex-row h-auto sm:h-[500px] w-full items-center justify-center rounded-xl bg-black px-3 py-6 sm:py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
          <div className="p-6 sm:p-16 lg:w-1/2 flex flex-col justify-center text-start overflow-y-auto">
            <h1 className="text-2xl sm:text-4xl md:text-3xl lg:text-4xl">Code using our built-in IDE.</h1>
            <p className="pt-6 sm:pt-10 text-sm sm:text-xl text-gray-400">
              LeetScraper offers a fully integrated IDE, allowing users to
              write, test, and debug their code in the browser. With real-time
              feedback, syntax highlighting, and insights, you can tackle
              LeetCode problems without switching platforms. Whether practicing
              algorithms or learning new concepts, our IDE optimizes your coding
              experience.
            </p>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={codeEditorPic}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="w-full md:w-5/6 lg:w-3/4 relative overflow-hidden rounded-xl border border-gray-800 p-[1px] my-16 sm:my-36 mx-auto shadow-custom-purple">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <div className="flex flex-col md:flex-row h-auto sm:h-[500px] w-full items-center justify-center rounded-xl bg-black px-3 py-6 sm:py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
          <div className="p-6 sm:p-16 lg:w-1/2 flex flex-col justify-center text-start overflow-y-auto">
            <h1 className="text-2xl sm:text-4xl md:text-3xl lg:text-4xl">Instant feedback with statistics</h1>
            <p className="pt-6 sm:pt-10 text-sm sm:text-xl text-gray-400">
              LeetScraper lets you write detailed notes for each problem, track
              your progress, and get feedback specific to your code. Whether
              it's your first time solving a problem or revisiting it, our
              platform gives a comprehensive view of your journey. Stay
              motivated with progression tracking and build confidence through
              constructive feedback to help you improve.
            </p>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={feedbackPic}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
