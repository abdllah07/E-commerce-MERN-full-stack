import { Link } from "react-router-dom";

const PopularCategoriesItems = [
  { title: "SweatShirt", image: "https://img.freepik.com/premium-photo/stunning-colorful-hoodie-mockup-sweatshirt-with-pocket-isolated-color-background_670421-15997.jpg", link: "SweatShirt" },
  { title: "T-Shirt", image: "https://img.freepik.com/premium-photo/colorful-t-shirt-design-template-with-abstract-background-vector-illustration_994418-1427.jpg", link: "TShirt" },
  { title: "Trousers", image: "https://png.pngtree.com/background/20230427/original/pngtree-khakicolor-colored-cargo-pants-hung-up-and-ready-to-be-worn-picture-image_2494329.jpg", link: "Trousers" },
  { title: "Jacet", image: "https://img.freepik.com/premium-photo/collection-jackets-with-brand-s-logo-them_889227-23209.jpg", link: "Jacet" },
  { title: "Blouse", image: "https://www.uppstring.in/cdn/shop/products/mockup-of-the-back-of-a-men-s-t-shirt-on-a-hanger-and-against-a-plain-color-background-3672-el1_1.png?v=1676050002", link: "blouse" },
  { title: "Winter", image: "https://png.pngtree.com/background/20230610/original/pngtree-the-best-collection-of-winter-clothing-for-illustrators-and-designers-picture-image_3103646.jpg", link: "Winter" },
];

function PopularCategories() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-5">
      {PopularCategoriesItems.map((item, index) => (
        <div key={index} className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] transition-opacity">
          <Link to={item.link}>
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
