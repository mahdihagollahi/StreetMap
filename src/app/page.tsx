'use client'
import React ,{useState , useEffect} from "react";
import Footer from "@/component/Footer";
import LeafletMap from "@/component/LeafletMap";
import Navbar from "@/component/Navbar";
import { Fragment } from "react";

export default function Home() {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("theme", theme);
      document.querySelector("html")?.setAttribute("data-theme", theme);
    }
  }, [theme])
  return (
    <Fragment>
      <Navbar handleToggle = {handleToggle}/>
      <div className="flex justify-center items-center h-screen">
        <LeafletMap />
      </div>
      <Footer/>
    </Fragment>
  );
}
