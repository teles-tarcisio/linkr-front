import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Input,
  StyledLink,
} from "../../components/FormComponents";
import { api } from "../../services/api";
import { ClipLoader } from "react-spinners";
import UserContext from "../../contexts/userContext";
import { useEffect } from "react";

export default function SignIn() {
  const { userData, login } = useContext(UserContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.token) {
      const promise = api.validateSession(userData.token);
      promise.then(() => navigate("/timeline"));
      promise.catch(() => {
        login({});
        navigate("/");
      });
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (formData.email === "" || formData.password === "") {
      alert("Campos vazios, preencha-os");
    }

    try {
      const response = await api.login(formData);

      login({
        name: response.name,
        token: response.token,
        profilePic: response.profilePic,
      });

      setLoading(false);
      setFormData({});
      setLoading(false);
      navigate("/timeline");
    } catch (e) {
      setLoading(false);
      if (e.response.status === 401) {
        alert("Email ou senha incorretos.");
      }
    }
  }

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <Container>
      <main className="right">
        <div className="banner">
          <h1>linkr</h1>
          <h2>save, share and discover the best links on the web</h2>
        </div>
      </main>
      <aside className="left">
        <Form onSubmit={handleSubmit}>
          <Input
            name="email"
            placeholder="email"
            type="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            required
          />

          <Input
            name="password"
            placeholder="password"
            type="password"
            value={formData.password || ""}
            onChange={handleInputChange}
            required
          />

          <Button disabled={loading}>
            {loading ? <ClipLoader /> : "Log In"}
          </Button>
          <StyledLink to="/sign-up">
            <p>First time? Create an account!</p>
          </StyledLink>
        </Form>
      </aside>
    </Container>
  );
}
