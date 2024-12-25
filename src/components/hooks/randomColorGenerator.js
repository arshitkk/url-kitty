const lightColors = [
  "border-yellow-400",
  "border-blue-400",
  "border-pink-400",
  "border-green-400",
  "border-purple-400",
  "border-indigo-400",
  "border-red-400",
  "border-teal-400",
  "border-orange-400",
  "border-lime-400",
  "border-rose-400",
];

export const randomColorGenerator = () => {
  let randomIndex = Math.floor(Math.random() * lightColors.length);
  let color = `${lightColors[randomIndex]}`;
  // console.log('dekh', color)
  return color;
};
