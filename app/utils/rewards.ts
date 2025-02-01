const rewards = [
  {
    points: 100,
    reward: "Exclusive Avatars",
    item: ["images/profilePics/first.jpeg", "images/profilePics/second.jpeg"],
  },
  {
    points: 200,
    reward: "Name Rainbow Effect",
    item: "text-2xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient",
  },
  { points: 250, reward: "Secret Reward: Special Chat Emotes 🎁" },
  {
    points: 300,
    reward: "Profile Image Effect",
    item: "absolute inset-0 rounded-full border-4 border-transparent before:absolute before:inset-0 before:rounded-full before:border-[6px] before:border-transparent before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:animate-neon-glow before:blur-md",
  },
  {
    points: 400,
    reward: "Exclusive Avatars",
    item: [
      "public/images/profilePics/third.jpeg",
      "public/images/profilePics/fourth.jpeg",
    ],
  },
  { points: 500, reward: "Profile Themes" },
  {
    points: 600,
    reward: "Exclusive Avatars",
    item: [
      "public/images/profilePics/fifth.jpeg",
      "public/images/profilePics/sixth.jpeg",
    ],
  },
  { points: 700, reward: "Chat Golden Crown Badge 👑" },
  { points: 750, reward: "Secret Reward: Special Profile Title" },
  {
    points: 800,
    reward: "Highlight Comments",
    item: "bg-pink-500 animate-pulse",
  },
  {
    points: 900,
    reward: "Exclusive Avatars",
    item: [
      "public/images/profilePics/seventh.jpeg",
      "public/images/profilePics/eighth.jpeg",
    ],
  },
  {
    points: 1000,
    reward: "Quick Think Master Avatar",
    item: ["public/images/profilePics/ninth.jpeg"],
  },
];

export const maxPoints = 1000;

export default rewards;
