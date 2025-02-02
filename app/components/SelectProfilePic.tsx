import pictures from "~/utils/pictures";
import first from "public/static/first1.png";

function SelectProfilePic({
  selectedPicture,
  isOpen,
  onClose,
  onSelect,
  unlocked,
}: {
  selectedPicture: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selectedPicture: string) => void;
  unlocked: number;
}) {
  if (!isOpen) return null;

  // Unlock logic based on levels
  const isUnlocked = (index: number) => {
    if (index < 2 && unlocked >= 1) return true;
    if (index < 4 && unlocked >= 4) return true;
    if (index < 6 && unlocked >= 6) return true;
    if (index < 8 && unlocked >= 9) return true;
    if (index < 9 && unlocked >= 10) return true;
    return false;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-center">
          Select Your Profile Picture
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {pictures.map((picture, index) => (
            <button
              key={index}
              disabled={picture === selectedPicture || !isUnlocked(index)}
              onClick={() => {
                onSelect(picture);
                onClose();
              }}
              className={`focus:outline-none border-2 border-transparent rounded-lg transition duration-200 ${
                isUnlocked(index)
                  ? "hover:border-indigo-500"
                  : "cursor-not-allowed opacity-50"
              }`}
            >
              <img
                src={`${picture}`}
                alt={`Profile ${index + 1}`}
                className="rounded-lg"
              />
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-indigo-400 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default SelectProfilePic;
