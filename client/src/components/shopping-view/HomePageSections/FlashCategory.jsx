import { Link } from "react-router-dom";

function FlashCategory({ label, Icon, link }) {
  return (
            <Link
          to={link}
          className="flex flex-col mb-5 justify-center items-center cursor-pointer w-full sm:w-auto"
        >
          {/* Icon Wrapper */}
          <div className="p-4 bg-[#15b39125] rounded-2xl hover:bg-[#15b3916e] duration-500">
            <Icon className="w-10 h-10 text-black py-1" />
          </div>

          {/* Label */}
          <span className="font-bold text-lg text-center line-clamp-1 w-[200px]">
            {label}
          </span>
        </Link>
  );
}

export default FlashCategory;
