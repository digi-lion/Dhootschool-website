import Hero from "../components/Hero";
import LinkedChain from "../components/LinkedChain";
import Notices from "../components/Notices";
import MissionNotice from "../components/MissionNotice";
import About from "../components/About";
import Academics from "../components/Academics";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <LinkedChain />
      <MissionNotice />
      <Notices />
      <Academics />
    </>
  );
}
