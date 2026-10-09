
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import "./App.css";

function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend request failed");
        }

        return response.json();
      })
      .then((data: { message?: string }) => {
        setMessage(data.message ?? "");
      })
      .catch((error: unknown) => {
        console.error("Backend connection failed:", error);
      });
  }, []);

  return (
    <main className="about-hero">
      <span className="eyebrow">WELCOME TO DISHAAI</span>

      <h1>
        Find your direction.
        <br />
        <span>Build your future.</span>
      </h1>

      <p>
        Your AI-powered companion for exploring career
        opportunities and navigating your job search.
      </p>

      {message && <p>{message}</p>}
    </main>
  );
}

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;