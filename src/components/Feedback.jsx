import { useState, useEffect } from "react";
import CodeIcon from "@mui/icons-material/Code";
import CircleIcon from "@mui/icons-material/Circle";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

const Feedback = ({ codeQuestion, feedback }) => {
  const [storedFeedback, setStoredFeedback] = useState(null);

  useEffect(() => {
    if (feedback) {
      setStoredFeedback(feedback);
    }
  }, [codeQuestion, feedback]);

  return (
    <div className="min-h-40 flex flex-col justify-center items-center">
      <div className="min-w-[400px] w-full max-w-2xl bg-white/20 text-white p-2 rounded-t-md flex space-x-2 items-center border-l border-r border-t border-b border-white/20">
        <CircleIcon
          className="text-red-500 cursor-pointer ml-1"
          style={{ fontSize: "14px" }}
        />
        <CircleIcon
          className="text-yellow-300 cursor-pointer"
          style={{ fontSize: "14px" }}
        />
        <CircleIcon
          className="text-emerald-500 cursor-pointer"
          style={{ fontSize: "14px" }}
        />

        <div className="px-2 py-1 flex flex-row items-center space-x-3 bg-white/10 rounded-md">
          <LightbulbCircleIcon style={{ color: "white" }} />
          <p className="pr-4">ChatGPT</p>
          <CloseIcon
            className="text-neutral-200 cursor-pointer ml-auto"
            style={{ fontSize: "20px" }}
          />
        </div>
        <div className="flex items-center">
          <AddIcon className="text-white/50 cursor-pointer" />
        </div>
      </div>

      <div className="min-w-[400px] w-full max-w-2xl bg-white/20 h-8 flex items-center p-2">
        <div className="flex items-center space-x-2">
          <ArrowBackIosNewIcon
            className="text-white cursor-pointer"
            style={{ fontSize: "15px" }}
          />
          <ArrowForwardIosIcon
            className="text-white/70 cursor-pointer"
            style={{ fontSize: "15px" }}
          />
        </div>

        <div className="flex flex-row w-full justify-center space-x-3 pr-5">
          <div className="flex items-center justify-center">
            <BookmarkBorderOutlinedIcon
              className="cursor-pointer"
              style={{ fontSize: "20px" }}
            />
          </div>

          <div className="w-2/3 h-6 flex items-center justify-center">
            <div className="w-full bg-black/30 h-full rounded-md flex items-center p-2">
              <TuneIcon style={{ fontSize: "15px" }} />
              <p className="pl-3">chatgpt.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 flex flex-row min-w-[400px] w-full max-w-2xl align-middle rounded-b-md border-l border-r border-b border-white/20">
        <div className="flex-1 bg-white/5 p-4 max-h-64 overflow-scroll">
          {feedback ? (
            <p className="px-4 leading-7">{feedback.feedback}</p>
          ) : storedFeedback ? (
            <p className="px-4 leading-7">{storedFeedback.feedback}</p>
          ) : (
            <p className="flex justify-center items-center h-full text-xl text-stone-500">
              Feedback
            </p>
          )}
        </div>

        <div className="flex-2 bg-white/5 flex justify-center items-center border-l-4 border-white/10">
          {feedback ? (
            <p
              className="flex justify-center items-center h-full p-5 text-2xl font-thin"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              {feedback.rating}/10
            </p>
          ) : storedFeedback ? (
            <p
              className="flex justify-center items-center h-full p-5 text-2xl font-thin"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              {storedFeedback.rating}/10
            </p>
          ) : (
            <p
              className="flex h-64 justify-center items-center p-5 text-lg font-thin text-stone-500"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Rating
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
