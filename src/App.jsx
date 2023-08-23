import "regenerator-runtime";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const { listening, transcript } = useSpeechRecognition();
  const API_KEY = "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"; // Replace with your ChatGPT API key
  const API_URL = "https://api.openai.com/v1/chat/completions";

  const callApi = async (message) => {
    const data = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: message }],
        model: "gpt-3.5-turbo",
      }),
    }).then((res) => res.json());

    // return data.choices[0].message.content;
    console.log(data);
  };

  useEffect(() => {
    if (!listening && transcript.length > 0) {
      callApi(transcript).then((res) => {
        setMessage(res);
      });
    }
  }, [transcript, listening]);
  return (
    <>
      <button>Ask me something</button>
      <div>
        <p>Microphone: {listening ? "listening to you" : "off"}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        {/* <button onClick={resetTranscript}>Reset</button> */}
        <p>{transcript}</p>

        <span>Answer</span>
        <p>{message}</p>
      </div>
    </>
  );
}

export default App;
