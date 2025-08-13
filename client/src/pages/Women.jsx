import CategoryHero from "../components/CategoryHero"
import CategoryProducts from "../components/CategoryProducts"
import CategoryDeals from "../components/CategoryDeals"
import BudgetBargains from "../components/BudgetBargains";
import CrazyDeals from "../components/CrazyDeals";

const Women = () => {
    // const heroData = {
    //     title: "Women's Fashion",
    //     subtitle: "Embrace Your Style",
    //     discount: "50-80% OFF",
    //     description: "From ethnic wear to western outfits, discover your perfect look",
    //     buttonText: "Explore Now",
    //     bgGradient: "from-pink-500 to-rose-600",
    //     image: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/10/7feef02b-0072-4c1b-b83d-4e46a5d93c6b1649530621162-Sangria_Desk_Banner.jpg",
    // }

    const heroData = [
        {
            title: "Summer Sale",
            subtitle: "Cool Deals",
            discount: "Up to 50% Off",
            description: "Check out the latest summer collections.",
            image: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/3f6d1e2a-5ef6-4921-be5d-443a11b11d801651599573985-Dresses_Desk.jpg",
            buttonText: "Shop Now"
        },
        {
            title: "Sarees",
            subtitle: "Cozy & Stylish",
            discount: "Flat 40% Off",
            description: "Stay update with our new arrivals.",
            image: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/17/f1874a9d-c423-44d3-a529-6c63521d6f991650181498608-Sarees_Desk.jpg",
            buttonText: "Explore"
        },
        {
            title: "New Arrivals",
            subtitle: "Trendy Picks",
            discount: "20% Off Today",
            description: "Fresh styles just for you.",
            image: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/10/38f37101-f335-44be-af8f-5d53de15c75e1649530843725-Casual---Sports-Shoes_Desk--1-.jpg",
            buttonText: "Discover"
        }
    ];
    const categories = [
        {
            id: 1,
            title: "Ethnic Wear",
            discount: "50-80% OFF",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/8d992d81-49e6-4dec-89a4-49a8af8beb5d1594222967220-Kurtas-_-Kurta-Sets.jpg",
            bgColor: "bg-pink-100",
        },
        {
            id: 2,
            title: "Sarees",
            discount: "50-85% OFF",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/a048cca8-7b5d-417e-9645-ca98f4b6e52c1594222967506-Sarees.jpg",
            bgColor: "bg-orange-100",
        },
        {
            id: 3,
            title: "Dresses",
            discount: "30-60% OFF",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/b0f459a0-9ef0-4392-a9ed-23892a36e79c1594222966859-Dresses.jpg",
            bgColor: "bg-rose-100",
        },


        {
            id: 4,
            title: "Shorts",
            discount: "40-70% OFF",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/18eb31db-8dcb-4efa-b92d-61c8ebe0ee811594222834368-Shorts.jpg",
            bgColor: "bg-purple-100",
        },

        {
            id: 5,
            title: "Footwear",
            discount: "40-80% OFF",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/a4dedaa4-3710-4061-b7d6-ca8c83ce9d021594222967117-Heels.jpg",
            bgColor: "bg-teal-100",
        },
        {
            id: 6,
            title: "Accessories",
            discount: "30-75% OFF",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/a352f908-57c8-4c66-b052-18137cf15e6c1594222967074-Handbags.jpg",
            bgColor: "bg-indigo-100",
        },
    ]

    const deals = [
        {
            id: 1,
            title: "Ethnic Elegance",
            subtitle: "LIBAS | W | AURELIA",
            discount: "MIN. 60% OFF",
            image: "/placeholder.svg?height=300&width=250",
            bgColor: "bg-pink-200",
        },
        {
            id: 2,
            title: "Western Chic",
            subtitle: "VERO MODA | ONLY | H&M",
            discount: "50-70% OFF",
            image: "/placeholder.svg?height=300&width=250",
            bgColor: "bg-purple-200",
        },
        {
            id: 3,
            title: "Designer Collection",
            subtitle: "BIBA | GLOBAL DESI | SANGRIA",
            discount: "40-80% OFF",
            image: "/placeholder.svg?height=300&width=250",
            bgColor: "bg-rose-200",
        },
        {
            id: 4,
            title: "Footwear Fiesta",
            subtitle: "METRO | BATA | STEVE MADDEN",
            discount: "30-70% OFF",
            image: "/placeholder.svg?height=300&width=250",
            bgColor: "bg-yellow-200",
        },
    ]

    return (
        <div>
            <CategoryHero data={heroData} />
            <BudgetBargains />
            <CrazyDeals deals={deals} />
            <CategoryProducts title="SHOP BY CATEGORY - WOMEN" categories={categories} />
        </div>
    )
}

export default Women
