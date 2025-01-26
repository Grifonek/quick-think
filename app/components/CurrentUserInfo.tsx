import { AcademicCapIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SelectProfilePic from "./SelectProfilePic";

function CurrentUserInfo({ data }: { data: any }) {
  const [selectedPicture, setSelectedPicture] = useState(data.profileImg);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedDate = new Date(data.user.createdAt).toLocaleDateString(
    "de-DE"
  );

  const handleSelect = async (picture: string) => {
    setSelectedPicture(picture);

    try {
      const response = await fetch("/api/profile-img", {
        method: "POST",
        body: new URLSearchParams({ profileImg: picture }),
      });

      if (!response.ok) {
        console.error("Failed to upload profile image!");
        return;
      }

      console.log("successfully updated profile image!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-10 mt-12 md:space-x-10 md:flex-row-reverse">
      <div className="relative flex-shrink-0">
        {/* Neon Ring */}
        {data.user.unlockedRewards >= 3 && (
          <div className="absolute inset-0 rounded-full border-4 border-transparent before:absolute before:inset-0 before:rounded-full before:border-[6px] before:border-transparent before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:animate-neon-glow before:blur-md" />
        )}

        <img
          src={selectedPicture}
          alt={data.user.username[0]}
          className={`relative h-52 w-52 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-4xl ${
            data.user.unlockedRewards >= 3 ? "z-10" : ""
          }`}
        />

        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-4 right-4 z-20 bg-indigo-600 p-2 rounded-full text-white shadow-md hover:bg-indigo-700 transition duration-200"
        >
          <PencilIcon className="h-6 w-6" />
        </button>
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

      <SelectProfilePic
        selectedPicture={selectedPicture}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelect}
      />
    </div>
  );
}

export default CurrentUserInfo;
