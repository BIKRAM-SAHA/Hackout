import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BoxContainer, Input, Label, SubmitButton } from "./Login.styles";

function Signup() {
  return (
    <BoxContainer>
      <div className="header">Signup</div>
      <Label htmlFor="name">Name</Label>
      <Input type="text" id="name" name="name" />

      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" name="email" />

      <Label htmlFor="password">Password</Label>
      <Input type="password" id="password" name="password" />
      <SubmitButton type="submit">Submit</SubmitButton>
    </BoxContainer>
  );
}

export default Signup;
