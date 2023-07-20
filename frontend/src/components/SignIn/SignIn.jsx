import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import { TextField, Button, Box, Typography } from "@mui/material";
import api from "../../api/api";

import { styled } from "@mui/material/styles";

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  padding: "1rem",
  backgroundColor: "#f5f5f5",
  borderRadius: "10px",
  margin: "auto",
  marginTop: "20vh",
  maxWidth: "400px",
  width: "100%",
  color: "#333",
});

const SignInComponent = () => {
  const signIn = useSignIn();
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/secure");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    api.post("/login", formData).then((res) => {
      if (res.status === 200) {
        if (
          signIn({
            token: res.data.token,
            expiresIn: res.data.expiresIn,
            tokenType: "Bearer",
            authState: { user: res.data.user },
          })
        ) {
          console.log("success");
          navigate("/secure");
        } else {
          alert("error");
        }
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <FormContainer onSubmit={onSubmit}>
        <Typography variant="h5" component="h1">
          Sign In
        </Typography>
        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Typography>
      </FormContainer>
    </Box>
  );
};

export default SignInComponent;
