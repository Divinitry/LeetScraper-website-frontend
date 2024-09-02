const MainContent = () => {
  return (
    <div>
      <div className="flex flex-col text-center max-w-5xl mx-auto pt-60">
        <h1 className="animate-fade-in text-4xl font-extrabold text-black sm:text-5xl md:text-7xl opacity-0 [animation-delay:200ms] -translate-y-4">
          Experience Leetcode the way you deserve.
        </h1>
        <p className="mt-6 text-lg text-gray-600 text-center max-w-3xl mx-auto animate-fade-in opacity-0 [animation-delay:400ms] -translate-y-4">
          Your ultimate coding companion, featuring a powerful AI assistant,
          personalized notes and resources, and built-in code terminal—designed
          to help you conquer every challenge.
        </p>
      </div>

      <div className="w-full md:w-5/6 lg:w-3/4 flex flex-col lg:flex-row md:rounded-md mx-auto bg-transparent backdrop-blur-md mt-36 shadow">
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
  );
};

export default MainContent;
