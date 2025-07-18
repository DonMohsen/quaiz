import Demo from "@/components/landing/Demo";
import Hero from "@/components/landing/Hero";
import Image from "next/image";

export default function Home() {
  return (
  <div className="min-h-[200vh]">
    <Hero/>
    <div className="md:px-[300px] px-5">

    <Demo/>
    </div>
  </div>
  );
}
