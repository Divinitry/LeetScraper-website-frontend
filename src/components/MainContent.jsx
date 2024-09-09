const MainContent = () => {
  return (
    <div>
      <div className="flex flex-col text-center max-w-5xl mx-auto pt-40">
        <h1 className="animate-fade-in text-4xl font-extrabold sm:text-5xl md:text-7xl opacity-0 [animation-delay:200ms] -translate-y-4">
          Experience Leetcode the way you deserve.
        </h1>
        <p className="mt-6 text-lg text-gray-200 text-center max-w-3xl mx-auto animate-fade-in opacity-0 [animation-delay:400ms] -translate-y-4">
          Your ultimate coding companion, featuring a powerful AI assistant,
          personalized notes and resources, and built-in code terminal—designed
          to help you conquer every challenge.
        </p>
      </div>

      <div className="w-full md:w-5/6 lg:w-3/4 relative overflow-hidden rounded-xl border border-gray-800 p-[1px] backdrop-blur-3xl my-36 mx-auto">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <div className="inline-flex h-full w-full items-center justify-center rounded-xl bg-black px-3 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
          <div className="p-16 lg:w-1/2 flex flex-col justify-center text-start">
            <h1 className="text-4xl">Search for your Leetcode problem</h1>
            <p className="pt-10">
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
    </div>
  );
};

export default MainContent;
