import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";

function BackHome() {
  return (
    <div className="absolute left-0 max-lg:top-10 px-4 py-2 rounded-lg lg:w-1/6 text-center">
      <Link
        to="/home"
        className="text-indigo-500 text-xl font-semibold flex items-center gap-x-3"
      >
        <ArrowLeftIcon className="size-10 lg:size-6" />
        <span className="max-lg:hidden">Quick Think</span>
      </Link>
    </div>
  );
}

export default BackHome;
