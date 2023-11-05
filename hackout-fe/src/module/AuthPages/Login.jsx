import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { BoxContainer, Input, Label, SubmitButton } from "./Login.styles";
import { useAuth } from "../common/hooks/useAuth";

function Login() {
  const { login } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <BoxContainer>
      <div className="header">Login</div>

      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" name="email" ref={emailRef} />

      <Label htmlFor="password">Password</Label>
      <Input type="password" id="password" name="password" ref={passwordRef} />
      <SubmitButton
        type="submit"
        onClick={() =>
          login({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          })
        }
      >
        Submit
      </SubmitButton>
    </BoxContainer>
  );
}

export default Login;
