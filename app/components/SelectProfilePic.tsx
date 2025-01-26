import pictures from "~/utils/pictures";

function SelectProfilePic({
  selectedPicture,
  isOpen,
  onClose,
  onSelect,
}: {
  selectedPicture: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selectedPicture: string) => void;
}) {
  if (!isOpen) return null;

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
              disabled={picture === selectedPicture}
              onClick={() => {
                onSelect(picture);
                onClose();
              }}
              className="focus:outline-none cursor-pointer border-2 border-transparent rounded-lg hover:border-indigo-500 transition duration-200"
            >
              <img
                src={picture}
                alt={`Profile ${index + 1}`}
                className={`rounded-lg ${
                  picture === selectedPicture && "cursor-not-allowed opacity-50"
                }`}
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
