// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header    from "./components/Header";
import Footer    from "./components/Footer";
import Home      from "./pages/Home";
import About     from "./components/About";
import Branches  from "./components/Branches";
import Academics from "./components/Academics";
import Gallery   from "./components/Gallery";
import Achievements from "./components/Achievements";
import Academy   from "./components/Academy";
import Tenders   from "./components/Tenders";
import Recruitments from "./components/Recruitments";
import Donation  from "./components/Donation";
import Contact   from "./components/Contact";
import Teachers  from "./components/Teachers";
import Results   from "./components/Results";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/tenders" element={<Tenders />} />
            <Route path="/recruitments" element={<Recruitments />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
