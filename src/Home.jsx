import React, { useState } from "react";
import styled from "styled-components";

const Home = () => {
  const [active, setActive] = useState(false);
  const [emailField, setEmailField] = useState(false);
  const handleValidation = (url) => {
    var regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    var match = url.match(regExp);
    console.log(match);
    if (match && match[1].length === 11) {
      console.log(url);
      setActive(true);
      setEmailField(true);
    } else {
      setActive(false);
      setEmailField(false);
    }
  };
  return (
    <Container>
      <Input
        type="text"
        onChange={(e) => handleValidation(e.target.value)}
        placeholder="Youtube URL"
      />
      {emailField && <Input type="text" placeholder="Your Email" />}
      <Button
        disabled={!active}
        onClick={() => {
          alert("Request Submitted Successfully");
        }}
      >
        Submit
      </Button>
    </Container>
  );
};
const Container = styled.div`
  background-color: #9fd398;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
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
