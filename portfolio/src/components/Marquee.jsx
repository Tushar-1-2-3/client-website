import { Icon } from "@iconify/react/dist/iconify.js";

const Marquee = ({
  items,
  className = "text-white bg-black",
  icon = "mdi:star-four-points",
  iconClassName = "",
  reverse = false,
}) => {
  const repeatedItems = [...items, ...items];

  return (
    <div
      className={`overflow-hidden w-full h-20 md:h-[100px] flex items-center marquee-text-responsive font-light uppercase whitespace-nowrap ${className}`}
    >
      <div
        className={`flex w-max ${
          reverse ? "marquee-track-reverse" : "marquee-track"
        }`}
      >
        {repeatedItems.map((text, index) => (
          <span
            key={`${text}-${index}`}
            className="flex items-center px-8 sm:px-16 gap-x-12 sm:gap-x-32"
          >
            {text} <Icon icon={icon} className={iconClassName} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
