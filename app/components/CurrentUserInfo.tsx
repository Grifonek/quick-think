import { AcademicCapIcon } from "@heroicons/react/24/outline";

function CurrentUserInfo({ data }) {
  const formattedDate = new Date(data.user.createdAt).toLocaleDateString(
    "de-DE"
  );

  return (
    <div className="flex flex-col items-center justify-center space-y-10 mt-12 md:space-x-10 md:flex-row-reverse">
      <div className="flex-shrink-0">
        <div className="h-40 w-40 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-4xl">
          {data.user.username[0]}
        </div>
      </div>
      <div className="space-y-6 text-center md:text-left">
        <h1 className="font-extrabold text-4xl text-white">
          {data.user.username}
        </h1>
        <h3 className="font-medium text-lg text-indigo-300">
          {data.user.email}
        </h3>
        <p className="text-lg text-gray-300">{data.user.points} points</p>
        <p className="flex items-center justify-center md:justify-start gap-x-2 text-lg text-gray-300">
          {data.user.coins}
          <AcademicCapIcon
            className="size-5 text-indigo-500"
            title="Coins earned"
          />
        </p>
        <h2 className="text-gray-400 text-lg">
          Member of the community since{" "}
          <span className="font-semibold text-white">{formattedDate}</span>
        </h2>
      </div>
    </div>
  );
}

export default CurrentUserInfo;
