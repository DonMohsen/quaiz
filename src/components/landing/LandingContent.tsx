"use server";
import { Button } from "../ui/Button";
import Image from "next/image";
import {
  contactMe,
  whoCanBenefit,
  whyQuaizWorks,
} from "@/lib/consts/landingContent";
import { BookCheck, FileCheck, GraduationCap, MoveRight } from "lucide-react";
import Link from "next/link";

const LandingContent = () => {
  return (
    <div className="w-full relative">
      {/* //!.......................................................The 3 steps.............................................................. */}
      <p className="landing-padding text-[#12338b] z-20 text-[48px] relative max-md:text-[36px] font-bold text-center">
        How Quaiz Works?
      </p>
      <div className="w-full landing-padding flex flex-col gap-[60px] mt-[70px] relative z-20">
        <div className="w-full flex max-md:flex-col items-center justify-center gap-[100px]">
          <div className="w-full flex flex-col gap-5 items-start justify-center transition-colors duration-300">
            <div className="p-3 bg-gradient-to-bl from-[#13368a] to-[#0189ed] rounded-[10px]">
              <FileCheck className=" text-white" />
            </div>
            <p className="text-[30px] font-bold text-[#006fba]">
              Step 1-Create Or Select A Document
            </p>
            <p className="text-[18px] font-light">
              A document is the text given by you which is used to generate
              various ways to study it with AI
            </p>
            <Button
              redirect={"/dashboard"}
              className="bg-gradient-to-br  transition-all duration-300 from-[#763afb] to-[#a95ae6] font-bold text-[16px] z-20 text-white px-6 py-4 w-[180px]"
            >
              Get started Now
            </Button>
          </div>
          <div className="w-full bg-[#5a50ff] rounded-xl h-[300px] flex items-center justify-center">
            <Image
              alt="Steps"
              src={"/landing-document.png"}
              width={500}
              height={500}
              className="rounded-xl  w-[200px] h-[200px]"
            />
          </div>
        </div>
        <div className="w-full flex max-md:flex-col items-center justify-center gap-[100px]">
          <div className="w-full max-sm:hidden bg-[#5a50ff] rounded-xl h-[300px] flex items-center justify-center">
            <Image
              alt="Steps"
              src={"/studying.webp"}
              width={500}
              height={500}
              className="rounded-xl  w-[300px] h-[300px]"
            />
          </div>
          <div className="w-full flex flex-col gap-5 items-start justify-center">
            <div className="p-3 bg-gradient-to-bl from-[#13368a] to-[#0189ed] rounded-[10px]">
              <BookCheck className=" text-white" />
            </div>
            <p className="text-[30px] font-bold text-[#006fba]">
              Step 2-Study And Learn
            </p>
            <p className="text-[18px] font-light">
              With the great power of our AI, you can speed up the proccess of
              learning your document by generating flashcards or even chat with
              your own document
            </p>
            <Button
              redirect={"/dashboard"}
              className="bg-gradient-to-br from-[#763afb] to-[#a95ae6] font-bold text-[16px] z-20 text-white px-6 py-4 w-[180px]"
            >
              Get started Now
            </Button>
          </div>
          <div className="w-full sm:hidden bg-[#5a50ff] rounded-xl h-[300px] flex items-center justify-center">
            <Image
              alt="Steps"
              src={"/studying.webp"}
              width={500}
              height={500}
              className="rounded-xl  w-[300px] h-[300px]"
            />
          </div>
        </div>
        <div className="w-full flex max-md:flex-col items-center justify-center gap-[100px]">
          <div className="w-full flex flex-col gap-5 items-start justify-center">
            <div className="p-3 bg-gradient-to-bl from-[#13368a] to-[#0189ed] rounded-[10px]">
              <GraduationCap className=" text-white" />
            </div>
            <p className="text-[30px] font-bold text-[#006fba]">
              Step 3-Prove Yourself With Quaiz
            </p>
            <p className="text-[18px] font-light">
              Now that you&apos;re ready, joining the proving grounds of
              Quaizzes is the way to go
            </p>
            <Button
              redirect={"/dashboard"}
              className="bg-gradient-to-br from-[#763afb] to-[#a95ae6] font-bold text-[16px] z-20 text-white px-6 py-4 w-[180px]"
            >
              Get started Now
            </Button>{" "}
          </div>
          <div className="w-full bg-[#5a50ff] rounded-xl h-[300px] flex items-center justify-center">
            <Image
              alt="Steps"
              src={"/landing-quaiz.webp"}
              width={500}
              height={500}
              className="rounded-xl  w-[400px] h-[400px]"
            />
          </div>
        </div>
      </div>
      {/* //!.......................................................Why it works really???.............................................................. */}
      <div
      className="relative py-[150px] overflow-y-hidden">
        <div 

        className="absolute left-0 top-[50%] top-right-poly bg-[#0097fe]/[0.5] w-[100px] h-[100px] z-10" />
        <div
        
        className="absolute right-0 top-[20%] top-right-poly bg-[#0097fe] w-[200px] h-[100px] z-10" />

        {/* Background polygon */}
        <div
                      id="reasons"

        className="second-clipped second-clipped-md" />

        {/* Your content */}
        <p
        
        className="text-[48px] text-white landing-padding max-md:text-[36px] font-bold text-center my-[80px] z-10 relative">
          Why This Works?
        </p>

        <div className="w-full landing-padding grid grid-cols-5 max-sm:grid-cols-1 max-md:grid-cols-2 max-xl:grid-cols-3 gap-10 z-10 relative">
          {whyQuaizWorks.map((w) => (
            <div
              key={w.title}
              className="border rounded-2xl border-black/[0.1] bg-white"
            >
              <div className="h-[180px] p-1 bg-[#dcdffe] rounded-lg m-2 flex items-center justify-center">
                <Image
                  alt={w.title}
                  src={w.imageUrl}
                  width={70}
                  height={70}
                  className="w-[80px] h-[80px]"
                />
              </div>
              <div className="py-4 px-3">
                <p className="text-[18px] font-medium mb-1">{w.title}</p>
                <p className="text-[16px] font-light text-black/[0.6]">
                  {w.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center w-full relative">
          <Button
            redirect={"/dashboard"}
            className="bg-gradient-to-br my-[80px] from-[#763afb] to-[#a95ae6] font-bold text-[16px] z-20 text-white px-6 py-4 w-[180px]"
          >
            Get started Now
          </Button>
        </div>
      </div>

      {/* //!.......................................................who it even helps???.............................................................. */}

      <p className="text-[48px] text-[#12338b] landing-padding max-md:text-[36px] font-bold text-center mt-[80px]">
        Who can benefit?
      </p>

      <div className="flex landing-padding  max-lg:flex-col gap-7 w-full  my-[80px]">
        {whoCanBenefit.map((h) => (
          <div key={h.title} className="flex flex-col gap-3 w-full ">
            <div className="flex items-center justify-start gap-4">
              <Image
                alt={h.title}
                src={h.imageUrl}
                width={50}
                height={50}
                className="w-12 h-12 p-3 bg-[#c2c4fe] rounded-full "
              />
              <p className="font-bold">{h.title}</p>
            </div>
            <p className="text-black/[0.6]">{h.description}</p>
            <Button
              redirect={"/dashboard"}
              className="bg-gradient-to-br from-[#763afb] to-[#a95ae6] font-bold text-[16px] z-20 text-white px-6 py-4 w-[180px]"
            >
              Get started Now
            </Button>
          </div>
        ))}
      </div>
      {/* //!......................................The all poly shards in page independantly............................................... */}

      <div className="absolute left-0 top-0 top-right-poly bg-[#f7fcff] w-[200px] h-[100px] z-10" />

      {/* <div className="absolute left-0 top-[60px] top-right-poly bg-black w-[200px] h-[100px]" /> */}

      <div className="absolute top-[60px] left-0 w-[300px] h-[100px] -translate-x-4 z-10">
        <div className="absolute w-full h-full top-left-poly border-box bg-[#eaf7ff] z-10" />

        <div className=" absolute w-[calc(100%-4px)] h-[calc(100%-4px)] top-[2px] left-[2px] z-10 top-left-poly bg-white" />
      </div>
      {/* //!.......................................................The Footer Ninja........................................................... */}

      <div className="w-full  h-full mt-6 bg-[#eaf7ff]">
        <div className="landing-padding bg-transparent z-10">
          <p className="text-[48px] max-md:text-[36px] w-full text-center font-bold text-[#12338b] pt-20">
            Lets Start Growing Your Skills{" "}
          </p>
          <p className="w-full text-center text-black/[0.5] pt-5 pb-10">
            Begin your journey with us by creating an account to get acccess to
            all the free tier features, or maybe log into your previous One!
          </p>
          <div className="flex items-center justify-center gap-4 max-md:flex-col">
            <Button
              redirect={"/sign-up"}
              className="bg-gradient-to-br from-[#763afb] to-[#a95ae6] font-bold text-[16px] z-20 text-white px-6 py-4 w-[180px]"
            >
              Create Account
            </Button>
            <Button
              redirect={"/sign-in"}
              className=" font-bold text-[16px] px-6 py-4 text-[#a95ae6] border-[#a95ae6] z-20 border w-[180px]"
            >
              Signin
            </Button>
          </div>
        </div>
        <div className="relative h-full landing-padding">
          {/* //?The polygon on top left */}

          <div className="absolute -top-10 left-0 bottom-left-poly bg-gradient-to-r from-[#c0e2f9] to-[#eaf7ff] w-[200px] h-[100px] z-10" />
          {/* //?The empty polygon on right */}
          <div className="absolute top-[50%] right-0 w-[300px] max-sm:w-[200px] h-[100px]  z-10">
            <div className="absolute w-full h-full top-left-poly border-box bg-[#0097fe] z-10" />

            <div className=" absolute w-[calc(100%-4px)] h-[calc(100%-4px)] top-[2px] left-[2px] z-10 top-left-poly bg-[#1b2d99] " />
          </div>
          <div className="footer-clipped-md footer-clipped " />
          <div className="flex items-center gap-10 max-md:flex-col justify-center border-b border-white/[0.2] text-white relative py-[200px] max-md:py-[100px]">
            <div className="w-full max-md:text-center">
              <p className="font-bold text-[36px] w-full pb-2">Quaiz</p>
              <p>
                A self driven AI Agent personal project which is planned,
                designed, and fully created by Mohsen Khojasteh nezhad.
              </p>
              <p id="about-me">Here are the ways to contact me</p>
              <div className="w-full flex items-center justify-start max-md:justify-center pt-5 gap-4">
                {contactMe.map((c) => (
                  <Link
                    href={c.link}
                    key={c.name}
                    className="bg-[#4963ba] p-3 rounded-[10px] cursor-pointer hover:brightness-150 transition-all duration-300"
                  >
                    <Image
                      alt={c.name}
                      src={c.imageUrl}
                      width={100}
                      height={100}
                      className="w-5 h-5"
                    />
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-full z-20">
              <p className="font-bold text-[36px] pb-2">Pages</p>
              <ul className="flex flex-wrap gap-4 flex-col text-white/[0.7]">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/#features">Features</Link>
                </li>
                <li>
                  <Link href="/sign-in">Signin</Link>
                </li>
                <li>
                  <Link href="/sign-up">Signup</Link>
                </li>

                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/documents">Explore documents</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative py-10 w-full text-center text-white text-[12px] font-bold">
            Copyright Stairs | Designed by{" "}
            <a 
              target="_blank"
  rel="noopener noreferrer"
            className="text-[#0098fd]" href="https://donmohsen.ir">
              Mohsen
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingContent;
