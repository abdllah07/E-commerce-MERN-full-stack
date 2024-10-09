const categories = [
    { id: "1", label: "in winter", imageUrl: "https://t3.ftcdn.net/jpg/02/71/77/56/360_F_271775672_yo8ZgraN2IHGbfqP2k0PsLjwvmatUNUJ.jpg" },
    { id: "2", label: "Women", imageUrl: "https://www.middletonshoppingcentre.co.uk/wp-content/uploads/2024/04/Mobile-Middleton-Slider-Image-3.jpg" },
    { id: "3", label: "Kids", imageUrl: "https://st3.depositphotos.com/5444644/15662/i/450/depositphotos_156628490-stock-photo-woman-holding-colorful-shopping-bags.jpg" },
    { id: "4", label: "Accessories", imageUrl: "https://st3.depositphotos.com/20363444/31956/i/450/depositphotos_319560848-stock-photo-excited-friends-having-fun-shopping.jpg" },
    { id: "5", label: "Footwear", imageUrl: "https://st3.depositphotos.com/12647580/15304/i/450/depositphotos_153047980-stock-photo-young-women-with-shopping-bags.jpg" },
    { id: "6", label: "Men", imageUrl: "https://t3.ftcdn.net/jpg/02/71/77/56/360_F_271775672_yo8ZgraN2IHGbfqP2k0PsLjwvmatUNUJ.jpg" },
    { id: "7", label: "Women", imageUrl: "https://www.middletonshoppingcentre.co.uk/wp-content/uploads/2024/04/Mobile-Middleton-Slider-Image-3.jpg" },
    { id: "8", label: "Kids", imageUrl: "https://st3.depositphotos.com/5444644/15662/i/450/depositphotos_156628490-stock-photo-woman-holding-colorful-shopping-bags.jpg" },
    { id: "9", label: "Accessories", imageUrl: "https://st3.depositphotos.com/20363444/31956/i/450/depositphotos_319560848-stock-photo-excited-friends-having-fun-shopping.jpg" },
    { id: "10", label: "Footwear", imageUrl: "https://st3.depositphotos.com/12647580/15304/i/450/depositphotos_153047980-stock-photo-young-women-with-shopping-bags.jpg" },
    { id: "11", label: "Accessories", imageUrl: "https://st3.depositphotos.com/20363444/31956/i/450/depositphotos_319560848-stock-photo-excited-friends-having-fun-shopping.jpg" },
    { id: "12", label: "Footwear", imageUrl: "https://st3.depositphotos.com/12647580/15304/i/450/depositphotos_153047980-stock-photo-young-women-with-shopping-bags.jpg" },
];

const bgColors = ['bg-black', 'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];

function getRandomBgColor() {
    return bgColors[Math.floor(Math.random() * bgColors.length)];
}

function AllCategory() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
                <div key={category.id} className="relative w-[500px] rounded-md overflow-hidden shadow-lg group">
                    <div>
                        <img
                            src={category.imageUrl}
                            alt=""
                            className="w-full h-[200px] object-cover rounded-md  transform group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <h2 className={`absolute top-0 right-0 h-full ${getRandomBgColor()} opacity-70 flex justify-center items-center w-[190px]`}>
                        <span className="text-white font-bold text-xl">Browse {category.label}</span>
                    </h2>
                </div>
            ))}
        </div>
    );
}

export default AllCategory;
