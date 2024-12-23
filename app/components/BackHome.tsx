import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";

function BackHome() {
  return (
    <div className="absolute left-0 top-0 px-4 py-2 rounded-lg w-1/12 text-center">
      <Link
        to="/home"
        className="text-indigo-500 text-xl font-semibold flex items-center gap-x-3"
      >
        <ArrowLeftIcon className="size-6" />
        Quick Think
      </Link>
    </div>
  );
}

export default BackHome;
