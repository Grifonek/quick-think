import {
  BanknotesIcon,
  FaceSmileIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import { type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Footer from "~/components/Footer";
import { getUser } from "~/utils/auth.server";
import lightbulb from "../images/lightbulb.png";
import logo from "../images/quick-think-logo-removebg.png";

export const meta: MetaFunction = () => {
  return [
    { title: "Quick Think - Earn Thinkies with your knowledge!" },
    {
      name: "description",
      content:
        "Quick Think is the ultimate platform to challenge your mind with daily questions, climb leaderboards, and connect with like-minded thinkers!",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  return Response.json({ user });
};

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col min-h-screen items-center justify-start">
      <img src={logo} alt="logo" className="size-52" />

      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-500">
          Welcome to Quick Think!
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-4xl">
          Challenge yourself with thought-provoking questions every day, track
          your progress on leaderboards, and grow your knowledge while having
          fun!
        </p>
      </header>

      <div className="flex gap-4">
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg">
          {user ? (
            <Link to="/home">Go home</Link>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </button>
        <button className="bg-white border border-indigo-500 hover:bg-indigo-50 text-indigo-500 px-6 py-3 rounded-lg shadow-lg text-lg">
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>

      <section className="mt-36 max-w-4xl text-center px-6 flex">
        <div className="w-1/2">
          <h1 className="text-2xl font-semibold text-indigo-500 mb-4">
            Why Quick Think?
          </h1>
          <p className="text-gray-700 text-lg leading-7">
            Quick Think is designed to spark your curiosity and sharpen your
            mind. Each day, you&apos;ll receive a carefully crafted question to
            stimulate your thinking, encourage discussions, and enhance your
            knowledge.
          </p>
          <p className="mt-4 text-gray-700 text-lg leading-7">
            Compete with friends on the leaderboards and see how you rank
            against the best thinkers globally. Whether you have a competitive
            streak or just love learning, Quick Think has something for
            everyone.
          </p>
        </div>
        <div className="w-1/2 ml-6">
          <img src={lightbulb} alt="lightbulb" className="size-96" />
        </div>
      </section>

      <section className="mb-10">
        <div className="grid grid-cols-3 mt-28 text-center items-center px-6 max-w-7xl shadow-xl rounded-xl border-t border-t-indigo-50">
          <div className="flex flex-col items-center py-7">
            <h1 className="text-2xl font-semibold text-indigo-500 mb-4">
              Earn Thinkies by solving questions of different difficulties
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-4xl">
              Challenge your problem-solving skills and earn valuable Thinkies
              for every question you solve. Compete to be the fastest and claim
              your rewards!
            </p>
            <BanknotesIcon className="size-20 mt-10 text-indigo-500" />
          </div>
          <div className="flex flex-col items-center py-7">
            <h1 className="text-2xl font-semibold text-indigo-500 mb-4">
              Defeat others and dominate leaderboards
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-4xl">
              Compete with other users, climb the leaderboards, and prove your
              brilliance. Show everyone who the real problem-solver is!
            </p>
            <PresentationChartLineIcon className="size-20 mt-10 text-indigo-500" />
          </div>
          <div className="flex flex-col items-center py-7">
            <h1 className="text-2xl font-semibold text-indigo-500 mb-4">
              Invite your friends and share happiness together
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-4xl">
              Bring your friends along for the journey! Solve problems together,
              share Thinkies, and make learning more fun and rewarding.
            </p>
            <FaceSmileIcon className="size-20 mt-10 text-indigo-500" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
