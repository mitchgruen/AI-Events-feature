import React, { useState, useEffect } from "react";
import Chatbox from "../Chatbox/Chatbox.js";
import NewActivity from "../NewActivity/NewActivity.js";
import axios from "axios";

export const ChatGPTForm = (props) => {
  const [input, setInput] = useState("");
  const [activity, setActivity] = useState([
    {
      Event: "",
      Location: "",
      Time: "",
      Summary: "",
    },
    {
      Event: "",
      Location: "",
      Time: "",
      Summary: "",
    },
    {
      Event: "",
      Location: "",
      Time: "",
      Summary: "",
    },
  ]);

  // make a get request to chatgbt to display response.
  useEffect(() => {
    console.log("User: ", props);
  }, []);

  //handle click
  async function handleClick(e) {
    try {
      console.log("handle");
      e.preventDefault();
      // const prompt = e.target.value;
      // if (!input) return;
      const response = await axios.post("http://localhost:8000/api", {
        prompt: input,
      });
      
      console.log(response);
      const data = JSON.parse(response.data);
      console.log(data);
      setActivity(data.Events);
      // setCompletedSentence(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  return (
    <div>
      <div className="h1-container">
        <h2>Need Weekend Plans?</h2>
      </div>
      {/* <div className="generate-button-container">
        <Button onClick={ (e)=> buttonHandler(e) } className="generate-button" size="lg" variant="warning">Generate Event Ideas</Button>{' '}
      </div> */}
      <Chatbox
        handleClick={handleClick}
        input={input}
        handleChange={handleChange}
      />
      <h1 className="form-content">New Ideas</h1>
      <NewActivity user={props.user} activity={activity[0]} />
      <NewActivity user={props.user} activity={activity[1]} />
      <NewActivity user={props.user} activity={activity[2]} />
    </div>
  );
};
