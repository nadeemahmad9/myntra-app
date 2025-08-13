import CategoryHero from "../components/CategoryHero"
import CategoryProducts from "../components/CategoryProducts"
// import CategoryDeals from "../components/CategoryDeals"
import CrazyDeals from "../components/CrazyDeals"
import BudgetBargains from "../components/BudgetBargains"

const Men = () => {
    // const heroData = {
    //     title: "Men's Fashion",
    //     subtitle: "Discover the Latest Trends",
    //     discount: "40-80% OFF",
    //     description: "From casual wear to formal attire, find everything you need",
    //     buttonText: "Shop Now",
    //     bgGradient: "from-blue-600 to-indigo-700",
    //     image: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/17/eb6408d8-b413-49f7-8525-317fddba53821650180659351-Casual---Sports-Shoes_Desk.jpg",
    // }
    const heroData = [
        {
            title: "Summer Sale",
            subtitle: "Cool Deals",
            discount: "Up to 50% Off",
            description: "Check out the latest Perfumes.",
            image: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/b54399f0-6ed5-44b3-84b0-e9d5c1657aaa1651599573991-CR7_Desk_Baner.jpg",
            buttonText: "Shop Now"
        },
        {
            title: "Shoes",
            subtitle: "Stylish",
            discount: "Flat 40% Off",
            description: "Stay update with our new arrivals.",
            image: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/17/eb6408d8-b413-49f7-8525-317fddba53821650180659351-Casual---Sports-Shoes_Desk.jpg",
            buttonText: "Explore"
        },
        {
            title: "New Arrivals Backpacks & Luggage",
            subtitle: "Trendy",
            discount: "20% Off Today",
            description: "Fresh styles just for you.",
            image: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/17/abd2b07f-954c-43ad-ba39-bfa50527d0641650180659364-Backpacks---Luggage_Desk.jpg",
            buttonText: "Discover"
        }
    ];

    const categories = [
        {
            id: 1,
            title: "Casual Shirts",
            discount: "50-70% OFF",
            image: "/menCat1.png",
            bgColor: "bg-blue-100",
            subcategory: "casual-shirts",
        },
        {
            id: 2,
            title: "Sports Shoes",
            discount: "40-60% OFF",
            image: "/menCat6.png",
            bgColor: "bg-gray-100",
            subcategory: "sports-shoes",
        },
        {
            id: 3,
            title: "T-Shirts & Polos",
            discount: "30-50% OFF",
            image: "/menCat2.png",
            bgColor: "bg-green-100",
            subcategory: "t-shirts",
        },
        {
            id: 4,
            title: "Jeans",
            discount: "40-70% OFF",
            image: "/menCat3.png",
            bgColor: "bg-yellow-100",
            subcategory: "jeans",
        },
        {
            id: 5,
            title: "Festive Wear",
            discount: "50-80% OFF",
            image: "/menCat4.png",
            bgColor: "bg-orange-100",
            subcategory: "kurtas",
        },
        {
            id: 6,
            title: "Activewear",
            discount: "30-60% OFF",
            image: "/menCat5.png",
            bgColor: "bg-purple-100",
            subcategory: "sportswear",
        },
        {
            id: 7,
            title: "Shoes",
            discount: "40-80% OFF",
            image: "/menCat7.png",
            bgColor: "bg-red-100",
            subcategory: "casual-shoes",
        },
        {
            id: 8,
            title: "Accessories",
            discount: "30-70% OFF",
            image: "/menCat8.png",
            bgColor: "bg-teal-100",
            subcategory: "accessories",
        },
    ]

    const deals = [
        {
            id: 1,
            title: "Premium Brands",
            subtitle: "ARROW | VAN HEUSEN | PETER ENGLAND",
            discount: "MIN. 50% OFF",
            image: "/placeholder.svg?height=300&width=250",
            bgColor: "bg-blue-200",
        },
        {
            id: 2,
            title: "Casual Collection",
            subtitle: "ROADSTER | HERE&NOW | HRITHIK",
            discount: "40-70% OFF",
            image: "/placeholder.svg?height=300&width=250",
            bgColor: "bg-green-200",
        },
        {
            id: 3,
            title: "Sports & Fitness",
            subtitle: "NIKE | ADIDAS | PUMA",
            discount: "30-60% OFF",
            image: "/placeholder.svg?height=300&width=250",
            bgColor: "bg-orange-200",
        },
        {
            id: 4,
            title: "Ethnic Specials",
            subtitle: "MANYAVAR | SOJANYA | VASTRAMAY",
            discount: "50-80% OFF",
            image: "/placeholder.svg?height=300&width=250",
            bgColor: "bg-yellow-200",
        },
    ]

    return (
        <div>
            <CategoryHero data={heroData} />
            <BudgetBargains />
            <CrazyDeals deals={deals} />

            <CategoryProducts title="SHOP BY CATEGORY - MEN" categories={categories} />
        </div>
    )
}

export default Men
