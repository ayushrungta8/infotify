import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const Home = () => {
  const [active, setActive] = useState(false);
  const [emailField, setEmailField] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [emailId, setEmailId] = useState("");
  const [url, setUrl] = useState("");
  const endpoint = "https://infotify.herokuapp.com/get-comments";
  const handleValidation = (url) => {
    setUrl(url);
    var regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    var match = url.match(regExp);
    console.log(match);
    if (match && match[1].length === 11) {
      setVideoId(match[1]);
      console.log(url);
      setActive(true);
      setEmailField(true);
    } else {
      setActive(false);
      setEmailField(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(endpoint, { id: videoId, email: emailId });
      alert("Request Submitted Successfully");
      setEmailField(false);
      setActive(false);
      setEmailId("");
      setVideoId("");
      setUrl("");
    } catch (err) {
      alert("Request Failed");
    }
  };
  return (
    <Container
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Input
        value={url}
        type="text"
        onChange={(e) => handleValidation(e.target.value)}
        placeholder="Youtube URL"
      />
      {emailField && (
        <Input
          type="email"
          autoComplete
          placeholder="Your Email"
          onChange={(e) => setEmailId(e.target.value)}
          value={emailId}
        />
      )}
      <Button disabled={!active} type="submit">
        Submit
      </Button>
    </Container>
  );
};
const Container = styled.form`
  background-color: #9fd398;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  @media (max-width: 700px) {
    width: 80%;
    min-width: 300px;
  }
  padding: 10px;
  border: none;
  border-radius: 12px;
  width: 600px;
  margin: 20px;
  font-size: 20px;
  :focus {
    outline: none;
  }
`;
const Button = styled.button`
  @media (max-width: 700px) {
    width: 60%;
    min-width: 200px;
  }
  padding: 10px;
  border: none;
  border-radius: 12px;
  width: 400px;
  font-size: 20px;
  :disabled {
    background-color: #f2f2f2;
    color: #bcc5ba;
    cursor: not-allowed;
  }
  background-color: #434343;
  color: white;
  cursor: pointer;
`;
export default Home;
