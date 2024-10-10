
export const registerFormControls = [
    {
        name : 'userName',
        label : 'User Name',
        placeholder : 'Enter Your User Name',
        componentType : 'input',
        type : 'text',
    },
    {
        name : 'email',
        label : 'Email',
        placeholder : 'Enter Your Email',
        componentType : 'input',
        type : 'email'
    },
    {
        name : 'password',
        label : 'Password',
        placeholder : 'Enter Your Password',
        componentType : 'input',
        type : 'password'
    }
]



export const loginFormControls = [
    
    {
        name : 'email',
        label : 'Email',
        placeholder : 'Enter Your Email',
        componentType : 'input',
        type : 'email'
    },
    {
        name : 'password',
        label : 'Password',
        placeholder : 'Enter Your Password',
        componentType : 'input',
        type : 'password'
    }
];

export const addProductFormElements = [
    {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
    },
    {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
    },
    {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "accessories", label: "Accessories" },
        { id: "footwear", label: "Footwear" },
    ],
    },
    {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
        { id: "nike", label: "Nike" },
        { id: "adidas", label: "Adidas" },
        { id: "puma", label: "Puma" },
        { id: "levi", label: "Levi's" },
        { id: "zara", label: "Zara" },
        { id: "h&m", label: "H&M" },
    ],
    },
    {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
    },
    {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
    },
    {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
    },
    {
      label: "IsBestSelling",
      name: "isBestSelling",
      componentType: "select",
      options: [
          { id: "true", label: "Yes" },
          { id: "false", label: "No" },
      ],
    }, 
    {
        label: "IsAdvantageous",
        name: "isAdvantageous",
        componentType: "select",
        options: [
            { id: "true", label: "Yes" },
            { id: "false", label: "No" },
        ],
    },
];
export const addClothesCategoryFormElements = [
  {
  label: "Title",
  name: "title",
  componentType: "input",
  type: "text",
  placeholder: "Enter product title",
  },
];

export const shoppingViewHeaderMenuItems = [
{
    id: "home",
    label: "Home",
    path: "/shopping/home",
},
{
    id: "products",
    label: "Products",
    path: "/shopping/listing",
},
{
    id: "men",
    label: "Men",
    path: "/shopping/listing",
},
{
    id: "women",
    label: "Women",
    path: "/shopping/listing",
},
{
    id: "kids",
    label: "Kids",
    path: "/shopping/listing",
},
{
    id: "footwear",
    label: "Footwear",
    path: "/shopping/listing",
},
{
    id: "accessories",
    label: "Accessories",
    path: "/shopping/listing",
},
{
    id: "search",
    label: "Search",
    path: "/shopping/search",
},
];

export const categoryOptionsMap = {
men: "Men",
women: "Women",
kids: "Kids",
accessories: "Accessories",
footwear: "Footwear",
};

export const brandOptionsMap = {
nike: "Nike",
adidas: "Adidas",
puma: "Puma",
levi: "Levi",
zara: "Zara",
"h&m": "H&M",
};

export const filterOptions = {
category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
    { id: "electronics", label: "Electronics" },
    { id: "home", label: "Home" },
    { id: "sports", label: "Sports" },
    { id: "furniture", label: "Furniture" },
    { id: "groceries", label: "Groceries" },
],
brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
    { id: "gucci", label: "Gucci" },
    { id: "prada", label: "Prada"},
    { id: "versace", label: "Versace" },
    { id: "ralph-lauren", label: "Ralph Lauren" },
    { id: "uniqlo", label: "Uniqlo" },
    { id: "under-armour", label: "Under Armour" },
    { id: "new-balance", label: "New Balance"  },
    { id: "tommy-hilfiger", label: "Tommy Hilfiger" },
    { id: "burberry", label: "Burberry" },
    { id: "calvin-klein", label: "Calvin Klein" }
],
};

export const sortOptions = [
{ id: "price-lowtohigh", label: "Price: Low to High" },
{ id: "price-hightolow", label: "Price: High to Low" },
{ id: "title-atoz", label: "Title: A to Z" },
{ id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
{
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
},
{
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
},
{
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
},
{
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
},
{
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
},
];

export const BestSellingProductsItems = [
    {
      id: 1,
      name: "Apple Watch",
      description:
        "The Apple Watch is a sleek, feature-packed smartwatch designed by Apple.",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      price: 199.99,
      originalPrice: 399.99,
      rating: 4.5,
      badge: "super product",
      offer: "Buy 2 pay 1",
    },
    {
      id: 2,
      name: "Sony Headphones",
      description:
        "Experience superior sound quality with noise-canceling Sony headphones.",
      image:
        "https://d1ncau8tqf99kp.cloudfront.net/converted/108740_original_local_1200x1050_v3_converted.webp",
      price: 149.99,
      originalPrice: 299.99,
      rating: 4.2,
      badge: "Best Value",
      offer: "20% off",
    },
    {
      id: 3,
      name: "MacBook Pro",
      description: "Powerful performance with the M1 chip for professionals.",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      price: 1199.99,
      originalPrice: 1499.99,
      rating: 4.8,
      badge: "Top Choice",
      offer: "Save $300",
    },
    {
      id: 4,
      name: "GoPro HERO9",
      description: "Capture every moment with crystal clear 5K video resolution.",
      image:
        "https://productimages.hepsiburada.net/s/121/375-375/110000071506669.jpg",
      price: 349.99,
      originalPrice: 499.99,
      rating: 4.6,
      badge: "Adventure",
      offer: "accessories",
    },
    {
      id: 5,
      name: "Samsung Galaxy S21",
      description:
        "The latest Samsung smartphone with an amazing display and performance.",
      image:
        "https://cdn.dxomark.com/wp-content/uploads/medias/post-74826/SamsungGalaxys215g.jpg",
      price: 799.99,
      originalPrice: 999.99,
      rating: 4.3,
      badge: "Limited Offer",
      offer: "Save $200",
    },
    {
      id: 6,
      name: "Fitbit Charge 4",
      description:
        "Track your fitness with the advanced features of Fitbit Charge 4.",
      image:
        "https://m.media-amazon.com/images/I/71pt3VmYV1L.jpg",
      price: 99.99,
      originalPrice: 149.99,
      rating: 4.1,
      badge: "Best Seller",
      offer: "30% off",
    },
    {
      id: 7,
      name: "DJI Mavic Air 2",
      description: "Take flight and capture stunning aerial shots with this drone.",
      image:
        "https://cdn.cimri.io/image/860x860/dji-mavic-air-2-fly-more-combo-drone_389771647.jpg",
      price: 799.99,
      originalPrice: 999.99,
      rating: 4.7,
      badge: "Aerial Expert",
      offer: "Save $200",
    },
    {
      id: 8,
      name: "Nintendo Switch",
      description:
        "Play your favorite games at home or on the go with the Nintendo Switch.",
      image:
        "https://m.media-amazon.com/images/I/714mELI+eGL.jpg",
      price: 299.99,
      originalPrice: 349.99,
      rating: 4.9,
      badge: "Best Gaming Console",
      offer: "Bundle offer",
    },
    {
      id: 9,
      name: "Amazon Echo Dot",
      description:
        "Control your smart home with voice commands using the Amazon Echo Dot.",
      image:
        "https://smarterhome.sk/5235-superlarge_default_2x/amazon-echo-dot-5th-generation-with-clock-cloud-blue.jpg",
      price: 49.99,
      originalPrice: 79.99,
      rating: 4.0,
      badge: "Smart Home Essential",
      offer: "40% off",
    },
    {
      id: 10,
      name: "Sony PlayStation 5",
      description:
        "Immerse yourself in next-gen gaming with the powerful PlayStation 5.",
      image:
        "https://cdn.vatanbilgisayar.com/Upload/PRODUCT/sony/thumb/ps719709190_large.jpg",
      price: 499.99,
      originalPrice: 599.99,
      rating: 4.9,
      badge: "Ultimate Gaming",
      offer: "Save $100",
    },
];

export const AdvantageousProductsItems = [
    {
      id: 1,
      name: "Apple iPhone 13",
      description:
        "The Apple iPhone 13 features advanced performance and the latest technology for seamless experiences.",
      image:
        "https://cdn.cimri.io/image/860x860/apple-iphone-13-5g-128gb-4gb-ram-61-inc-12mp-akilli-cep-telefonu_467012495.jpg",
      price: 999.99,
      originalPrice: 1099.99,
      rating: 4.7,
      badge: "New Arrival",
      offer: "Save $100",
    },
    {
      id: 2,
      name: "Bose QuietComfort 45",
      description:
        "Experience premium sound and noise cancellation with the Bose QuietComfort 45 headphones.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJaShwrwwCQX9GBh8uKh21Zfin_IzqBcIa0Q&s",
      price: 279.99,
      originalPrice: 349.99,
      rating: 4.8,
      badge: "Top Choice",
      offer: "20% off",
    },
    {
      id: 3,
      name: "Dell XPS 13",
      description:
        "The Dell XPS 13 offers incredible performance in a sleek and portable design.",
      image:
        "https://www.notebookcheck-tr.com/uploads/tx_nbc2/xps.jpg",
      price: 1199.99,
      originalPrice: 1399.99,
      rating: 4.6,
      badge: "Best Seller",
      offer: "Save $200",
    },
    {
      id: 4,
      name: "Sony Alpha A7 IV",
      description:
        "Capture stunning photos and videos with the Sony Alpha A7 IV mirrorless camera.",
      image:
        "https://cdn.vatanbilgisayar.com/Upload/PRODUCT/sony/thumb/135693-1_large.jpg",
      price: 2499.99,
      originalPrice: 2799.99,
      rating: 4.9,
      badge: "Photography Expert",
      offer: "Save $300",
    },
    {
      id: 5,
      name: "Samsung Galaxy Tab S8",
      description:
        "The Samsung Galaxy Tab S8 is your go-to device for productivity and entertainment on the go.",
      image:
        "https://movicenter.com.pa/wp-content/uploads/2022/03/image.webp",
      price: 699.99,
      originalPrice: 799.99,
      rating: 4.5,
      badge: "Productivity Booster",
      offer: "Save $100",
    },
    {
      id: 6,
      name: "Garmin Fenix 6 Pro",
      description:
        "Track your fitness and outdoor adventures with the Garmin Fenix 6 Pro multisport GPS watch.",
      image:
        "https://www.garmin.com.tr/images/thumbs/0005455_fenix-6-pro-solar-slate-gri-siyah-kayis.png",
      price: 549.99,
      originalPrice: 649.99,
      rating: 4.7,
      badge: "Outdoor Essential",
      offer: "Save $100",
    },
    {
      id: 7,
      name: "DJI Air 2S",
      description:
        "Capture stunning 5.4K video with the DJI Air 2S drone, perfect for aerial enthusiasts.",
      image:
        "https://cdn.mos.cms.futurecdn.net/g6WeU3dcndtfeagj97q2JW.jpg",
      price: 999.99,
      originalPrice: 1199.99,
      rating: 4.8,
      badge: "Aerial Expert",
      offer: "Save $200",
    },
    {
      id: 8,
      name: "Nintendo Switch OLED",
      description:
        "Enjoy vibrant gaming with the new OLED screen on the Nintendo Switch.",
      image:
        "https://f-a101-l.mncdn.com/mnresize/480/480/livephotos/8/26051327BEYAZ/1.jpg",
      price: 349.99,
      originalPrice: 399.99,
      rating: 4.9,
      badge: "Gaming Must-Have",
      offer: "Bundle deal",
    },
    {
      id: 9,
      name: "Amazon Fire TV Stick 4K",
      description:
        "Stream your favorite shows in stunning 4K with the Amazon Fire TV Stick.",
      image:
        "https://cdn-iibnp.nitrocdn.com/VjyilAmBtWmZaLojjwWFayaMdinRRPlg/assets/images/optimized/rev-f0d6867/www.ourfriday.co.uk/image/cache/catalog/products_2023/Fire-TV-Stick-4K-1-800x800.png",
      price: 39.99,
      originalPrice: 49.99,
      rating: 4.3,
      badge: "Entertainment Essential",
      offer: "20% off",
    },
    {
      id: 10,
      name: "Logitech G Pro Wireless Mouse",
      description:
        "Gain the competitive edge with the Logitech G Pro Wireless gaming mouse.",
      image:
        "https://www.incehesap.com/resim/urun/202306/6481cc343b0407.53442015_hofmjipeqlgkn_500.webp",
      price: 129.99,
      originalPrice: 149.99,
      rating: 4.8,
      badge: "Pro Gamer",
      offer: "Save $20",
    },
];
  