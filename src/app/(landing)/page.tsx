import Hero from "@/components/landing/Hero";
import Loading from "../(quaiz-app)/documents/[documentSlug]/loading";
import LandingContent from "@/components/landing/LandingContent";

export default function Home() {
  return (
  <div className="">
    <Hero/>
    {/* <Loading/> */}
    <div className="mt-10  w-full">
        <LandingContent/>
      </div>
  </div>
  );
}
