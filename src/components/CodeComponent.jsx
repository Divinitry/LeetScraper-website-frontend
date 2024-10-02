import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";
import { Tooltip } from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";
import HistoryIcon from "@mui/icons-material/History";
import NoteIcon from "@mui/icons-material/Note";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import DrawIcon from "@mui/icons-material/Draw";
import api from "../api";
import CodeEditor from "./CodeEditor";
import Notes from "./Notes";
import VideoSuggestions from "./VideoSuggestions";
import Feedback from "./Feedback";
import CodeHistory from "./CodeHistory";
import CodeBodyDropDown from "./CodeBodyDropDown";
import WhiteBoard from "./WhiteBoard";

const CodeComponent = () => {
  const [codeQuestion, setCodeQuestion] = useState(null);
  const [difficultyColour, setDifficultyColour] = useState("text-green-400");
  const [tabValue, setTabValue] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [userCode, setUserCode] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const showPage = async () => {
      try {
        const response = await api.get(
          `/leetscraper/todolist/questions/${id}/`
        );
        setCodeQuestion(response.data);

        if (response.data.difficulty.toLowerCase() === "medium") {
          setDifficultyColour("text-yellow-500");
        } else if (response.data.difficulty.toLowerCase() === "hard") {
          setDifficultyColour("text-red-600");
        }
      } catch (error) {
        console.log("Error fetching the question:", error);
      }
    };

    showPage();
  }, [id]);

  if (!codeQuestion) {
    return <p>Loading...</p>;
  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="min-h-screen flex flex-col pt-24">
      <CodeBodyDropDown
        codeQuestion={codeQuestion}
        difficultyColour={difficultyColour}
      />
      <CodeEditor
        questionTitle={codeQuestion.question_title}
        codeQuestion={codeQuestion}
        setFeedback={setFeedback}
        userCode={userCode}
        setUserCode={setUserCode}
        id={id}
      />

      <Box>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          centered
          aria-label="Code Component Tabs"
          sx={{
            "& .MuiTab-root": {
              color: "white",
              backgroundColor: "#1c1c1c",
              borderRadius: "5px",
              margin: "0 10px",
              transition: "background-color 0.3s ease, color 0.3s ease",
              padding: "0px",
            },
            "& .MuiTab-root:hover": {
              backgroundColor: "#333333",
            },
            "& .MuiTab-root.Mui-selected": {
              color: "grey",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Tooltip title="Feedback" placement="bottom" arrow>
            <Tab icon={<FeedbackIcon />} label="" />
          </Tooltip>
          <Tooltip title="History" placement="bottom" arrow>
            <Tab icon={<HistoryIcon />} label="" />
          </Tooltip>
          <Tooltip title="White Board" placement="bottom" arrow>
            <Tab icon={<DrawIcon />} label="" />
          </Tooltip>
          <Tooltip title="Notes" placement="bottom" arrow>
            <Tab icon={<NoteIcon />} label="" />
          </Tooltip>
          <Tooltip title="Additional Resources" placement="bottom" arrow>
            <Tab icon={<VideoLibraryIcon />} label="" />
          </Tooltip>
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Feedback feedback={feedback} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <CodeHistory
            codeQuestion={codeQuestion}
            feedback={feedback}
            id={id}
            userCode={userCode}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <WhiteBoard />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Notes id={id} />
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          <VideoSuggestions codeQuestion={codeQuestion} />
        </TabPanel>
      </Box>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default CodeComponent;
