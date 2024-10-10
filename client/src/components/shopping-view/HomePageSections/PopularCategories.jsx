import { Link } from "react-router-dom";


function PopularCategories({ListOfCategories } ) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-5">
      {ListOfCategories.map((item, index) => (
        <div key={index} className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] transition-opacity">
          <Link to={item.title}>
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded-lg shadow-lg hover:brightness-50 duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            
            {/* Title */}
            <h2 className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-white p-1 rounded-lg text-lg md:text-xl font-extrabold">
              {item.title}
            </h2>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PopularCategories;
