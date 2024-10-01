import { useState, useEffect } from "react";

const VideoSuggestions = ({ codeQuestion }) => {
  const [videos, setVideos] = useState([]);
  const [apiFailed, setApiFailed] = useState(false);
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const searchTerm = `${codeQuestion.question_title} leetcode`;
  const maxResults = 2;

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    searchTerm
  )}&type=video&maxResults=${maxResults}&key=${apiKey}`;

  const defaultVideos = [
    {
      id: { videoId: "8hly31xKli0" },
      snippet: {
        title: "Introduction to Algorithms - Harvard Lecture",
        channelTitle: "Harvard University",
        description: "An introductory lecture on algorithms at Harvard.",
        thumbnails: {
          high: { url: "https://img.youtube.com/vi/8hly31xKli0/hqdefault.jpg" },
        },
      },
    },
    {
      id: { videoId: "CBYHwZcbD-s" },
      snippet: {
        title: "Data Structures: Crash Course Computer Science #14",
        channelTitle: "CrashCourse",
        description:
          "A crash course on data structures, part of the Computer Science series.",
        thumbnails: {
          high: { url: "https://img.youtube.com/vi/CBYHwZcbD-s/hqdefault.jpg" },
        },
      },
    },
  ];
  
  const getStoredVideos = (searchTerm) => {
    const storedData = localStorage.getItem(searchTerm);
    return storedData ? JSON.parse(storedData) : null;
  };

  const saveVideosToStorage = (searchTerm, videoData) => {
    localStorage.setItem(searchTerm, JSON.stringify(videoData));
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const storedVideos = getStoredVideos(searchTerm);
      if (storedVideos) {
        setVideos(storedVideos); 
        return;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setVideos(data.items);
          saveVideosToStorage(searchTerm, data.items); 
        } else {
          setVideos(defaultVideos);
          setApiFailed(true);
        }
      } catch (error) {
        console.log(error);
        setVideos(defaultVideos);
        setApiFailed(true);
      }
    };

    fetchVideos();
  }, [searchTerm]); 

  return (
    <div>
      <div className="flex flex-col justify-center items-center space-y-2"> 
        <h1 className="text-6xl font-bold mt-4">Feeling stuck with {codeQuestion.question_title}?</h1>
        {apiFailed ? (
          <p className="text-xl font-thin pb-10">
            Sorry, the YouTube Data API is not working at this time. But these videos should help you get back on track!
          </p>
        ) : (
          <p className="text-xl font-thin pb-10">
            Watch these two videos to get back on track!
          </p>
        )}
      </div>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 gap-2 justify-center">
          {videos.map((video, index) => (
            <div key={index} className="flex flex-col">
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="relative transform transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    className="w-full rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-40 transition-opacity duration-300 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 9v6l5-3-5-3z" />
                      <path fill="none" d="M0 0h24v24H0z" />
                    </svg>
                  </div>
                </div>
              </a>
              <h3 className="text-start mt-2 mb-2 text-2xl">
                {video.snippet.title}
              </h3>
              <p className="text-white/70 text-lg mb-2">
                {video.snippet.channelTitle}
              </p>
              <p className="text-white/50 text-sm">
                {video.snippet.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSuggestions;
