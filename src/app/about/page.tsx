import { FaGithub } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { NextPage } from "next";
const FAQ = dynamic(() => import("@/components/sections/About/FAQ"));

export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
};

const AboutPage: NextPage = () => {
  return (
    <div className="flex w-full justify-center px-4 py-8">
      <div className="flex w-full max-w-4xl flex-col gap-12">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-4xl font-black text-transparent md:text-6xl">
            ⇋MG⇌ TV
          </h1>
          <p className="max-w-xl text-lg text-gray-400 md:text-xl">
            Redefining your entertainment experience with a sleek, ad-free, and premium streaming platform.
          </p>
        </div>

        {/* Mission / Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="glass-panel flex flex-col gap-3 p-6">
            <h3 className="text-xl font-bold text-white">Our Mission</h3>
            <p className="text-gray-400">
              To provide a seamless, high-quality streaming service that puts the user first. No clutter, just content.
            </p>
          </div>
          <div className="glass-panel flex flex-col gap-3 p-6">
            <h3 className="text-xl font-bold text-white">Crystal Clear</h3>
            <p className="text-gray-400">
              Experience movies and TV shows in stunning HD quality. We optimize for the best visual fidelity.
            </p>
          </div>
          <div className="glass-panel flex flex-col gap-3 p-6">
            <h3 className="text-xl font-bold text-white">Ad-Free</h3>
            <p className="text-gray-400">
              Enjoy uninterrupted viewing. We believe entertainment should never be broken by annoying ads.
            </p>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white/5 p-6 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-white">Legal Disclaimer</h2>
          <p className="text-sm text-gray-400">
            This website does not host any files on its server. All contents are provided by non-affiliated third parties.
            This site does not accept responsibility for content hosted on third-party websites and does not have any involvement in the downloading/uploading of movies.
            We just act as a search engine that indexes content available on the internet.
          </p>
        </div>

        <Suspense>
          <FAQ />
        </Suspense>

        <div className="flex justify-center pt-8">
          <Link
            target="_blank"
            href={siteConfig.socials.github}
            className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
          >
            <FaGithub size={30} />
            <span className="text-sm font-medium">Open Source Project</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
