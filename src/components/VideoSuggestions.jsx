import { useState, useEffect } from "react";

const VideoSuggestions = ({ codeQuestion }) => {
  const [videos, setVideos] = useState([]);
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const searchTerm = `${codeQuestion.question_title} leetcode`;
  const maxResults = 2;

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    searchTerm
  )}&type=video&maxResults=${maxResults}&key=${apiKey}`;

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setVideos(data.items || []);
      } catch (error) {
        console.log(error);
      }
    };
    getVideos();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center space-y-2"> 
        <h1 className="text-3xl font-bold">Feeling stuck with {codeQuestion.question_title}?</h1>
        <p className="font-thin">Watch these two videos to get back on track!</p>
      </div>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 gap-2 justify-center">
          {videos.map((video, index) => (
            <div key={index} className="flex flex-col items-center">
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  className="w-full h-auto"
                />
              </a>
              <h3 className="text-center mb-2 flex items-center justify-center text-xl">
                {video.snippet.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSuggestions;
