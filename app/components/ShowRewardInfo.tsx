function ShowRewardInfo({
  setIsModalOpen,
  reward,
}: {
  setIsModalOpen: () => void;
  reward: {
    reward: string;
    points: number;
    item: any;
  };
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-center">{reward.reward}</h2>
        <div className="flex justify-center gap-4">
          {/* Render multiple items if reward.item is an array */}
          {Array.isArray(reward.item) &&
            reward.item.map((el, index) => (
              <img
                key={index}
                src={`/${el}`}
                alt={el}
                className="w-32 h-32 rounded-lg object-cover shadow-md"
              />
            ))}

          {/* Apply special text styling for a reward with points === 200 */}
          {typeof reward.item === "string" && reward.points === 200 && (
            <p className={`${reward.item} text-xl font-bold text-indigo-500`}>
              Quick Think
            </p>
          )}

          {/* Apply special styling for an image showcase when points === 300 */}
          {typeof reward.item === "string" && reward.points === 300 && (
            <div className="relative">
              <div className={`relative ${reward.item} size-20`} />
            </div>
          )}
        </div>
        <button
          onClick={() => setIsModalOpen(false)}
          className="mt-4 w-full bg-indigo-400 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ShowRewardInfo;
