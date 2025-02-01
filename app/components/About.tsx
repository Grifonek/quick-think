import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";

function About() {
  return (
    <div className="absolute right-16 max-lg:top-10 top-5 px-4 py-2 rounded-lg w-1/12 text-center">
      <Link
        to="/about"
        className="text-indigo-500 text-xl font-semibold flex items-center gap-x-3"
      >
        <InformationCircleIcon className="size-6" />
        About
      </Link>
    </div>
  );
}

export default About;
