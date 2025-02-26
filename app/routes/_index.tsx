import {
  BanknotesIcon,
  FaceSmileIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import { type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import lightbulb from "public/images/lightbulb.png";
import logo from "public/images/quick-think-logo-removebg.png";

import Footer from "~/components/Footer";
import IndexButtons from "~/components/IndexButtons";
import { getUser } from "~/utils/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Quick Think - Earn Thinkies with your knowledge!" },
    {
      name: "description",
      content:
        "Quick Think is the ultimate platform to challenge your mind with daily questions, climb leaderboards, and connect with like-minded thinkers!",
    },
    {
      name: "keywords",
      content:
        "Quick Think, daily questions, trivia, earn Thinkies, leaderboards, knowledge challenge, problem-solving, fun learning, quiz, education, games",
    },
    { name: "robots", content: "index, follow" },

    {
      property: "og:title",
      content: "Quick Think - Earn Thinkies with your knowledge!",
    },
    {
      property: "og:description",
      content:
        "Quick Think is the ultimate platform to challenge your mind with daily questions, climb leaderboards, and connect with like-minded thinkers!",
    },
    {
      property: "og:image",
      content: "https://yourwebsite.com/images/quick-think-logo-removebg.png",
    },
    { property: "og:url", content: "https://quick-think.grifonekio.site/" },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "en_US" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },

    { name: "apple-mobile-web-app-title", content: "Quick Think" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  // checking if user is authenticated
  const user = await getUser(request);

  return Response.json({ user });
};

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col min-h-screen items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white">
      <img src={logo} alt="logo" className="w-32 mt-10 animate-bounce" />

      <header className="text-center mb-12 mt-8">
        <h1 className="text-5xl font-extrabold text-indigo-400">
          Welcome to Quick Think!
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Challenge yourself with thought-provoking questions every day, track
          your progress on leaderboards, and grow your knowledge while having
          fun!
        </p>
      </header>

      <IndexButtons user={user} />

      <section className="mt-24 px-6 max-w-7xl flex flex-col lg:flex-row items-center lg:items-start gap-12">
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-indigo-400 mb-6">
            Why Quick Think?
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Quick Think is designed to spark your curiosity and sharpen your
            mind. Each day, you&apos;ll receive a carefully crafted question to
            stimulate your thinking, encourage discussions, and enhance your
            knowledge.
          </p>
          <p className="mt-6 text-gray-300 text-lg leading-relaxed">
            Compete with friends on the leaderboards and see how you rank
            against the best thinkers globally. Whether you have a competitive
            streak or just love learning, Quick Think has something for
            everyone.
          </p>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={lightbulb}
            alt="lightbulb"
            className="w-full max-w-md shadow-lg rounded-xl"
          />
        </div>
      </section>

      <section className="mt-32 w-full px-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center items-center bg-gray-800 p-12 rounded-3xl shadow-2xl max-w-7xl mx-auto">
          <div className="flex flex-col items-center space-y-6">
            <h1 className="text-2xl font-bold text-indigo-400">
              Earn Thinkies by solving questions of different difficulties
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Challenge your problem-solving skills and earn valuable Thinkies
              for every question you solve. Compete to be the fastest and claim
              your rewards!
            </p>
            <BanknotesIcon className="w-12 h-12 text-indigo-500" />
          </div>
          <div className="flex flex-col items-center space-y-6">
            <h1 className="text-2xl font-bold text-indigo-400">
              Defeat others and dominate leaderboards
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Compete with other users, climb the leaderboards, and prove your
              brilliance. Show everyone who the real problem-solver is!
            </p>
            <PresentationChartLineIcon className="w-12 h-12 text-indigo-500" />
          </div>
          <div className="flex flex-col items-center space-y-6">
            <h1 className="text-2xl font-bold text-indigo-400">
              Invite your friends and share happiness together
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Bring your friends along for the journey! Solve problems together,
              share Thinkies, and make learning more fun and rewarding.
            </p>
            <FaceSmileIcon className="w-12 h-12 text-indigo-500" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
