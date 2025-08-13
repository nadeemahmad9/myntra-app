import CategoryHero from "../components/CategoryHero"
import CategoryProducts from "../components/CategoryProducts"
import CategoryDeals from "../components/CategoryDeals"
import CrazyDeals from "../components/CrazyDeals";
import LuxeDeals from "../components/LuxeDeals";

const Kids = () => {
    // const heroData = {
    //     title: "Kids Fashion",
    //     subtitle: "Cute & Comfortable",
    //     discount: "40-70% OFF",
    //     description: "Adorable outfits for your little ones",
    //     buttonText: "Shop Kids",
    //     bgGradient: "from-yellow-400 to-orange-500",
    //     image: "/placeholder.svg?height=400&width=600",
    // }


    const heroData = [
        {
            // title: "Summer Sale",
            // subtitle: "Cool Deals",
            // discount: "Up to 50% Off",
            // description: "Check out the latest summer collections.",
            image: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/12/a606c305-a23f-4fe3-a630-343ced4a10261649782019470-Kids-Wear_Desk_Banner.jpg?v1",
            // buttonText: "Shop Now"
        },
        {
            // title: "Top Brands",
            // subtitle: "Cozy & Stylish",
            // discount: "Min. 40% Off",
            // description: "Stay update with our new arrivals.",
            image: "https://assets.myntassets.com/f_webp,w_778,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/12/09f0df54-6f8f-4bb0-a4b9-3b374d4538561649782019495-Top-Brands-2_Desk_Banner.jpg",
            // buttonText: "Explore"
        },
        {
            // title: "T-shirts & Shorts",
            // subtitle: "Trendy Picks",
            // discount: "20% Off Today",
            // description: "Fresh styles just for you.",
            image: "https://assets.myntassets.com/f_webp,w_778,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/12/b97efc90-2359-48ea-bf74-9c72d552fdef1649782019503-T-Shirts-_-Shorts_Desk_Banner.jpg",
            // buttonText: "Discover"
        }
    ];

    // const categories = [
    //     {
    //         id: 1,
    //         title: "Boys Clothing",
    //         discount: "40-70% OFF",
    //         image: "/placeholder.svg?height=200&width=200",
    //         bgColor: "bg-blue-100",
    //     },
    //     {
    //         id: 2,
    //         title: "Girls Clothing",
    //         discount: "40-70% OFF",
    //         image: "/placeholder.svg?height=200&width=200",
    //         bgColor: "bg-pink-100",
    //     },
    //     {
    //         id: 3,
    //         title: "Baby Clothing",
    //         discount: "30-60% OFF",
    //         image: "/placeholder.svg?height=200&width=200",
    //         bgColor: "bg-yellow-100",
    //     },
    //     {
    //         id: 4,
    //         title: "Kids Footwear",
    //         discount: "40-65% OFF",
    //         image: "/placeholder.svg?height=200&width=200",
    //         bgColor: "bg-green-100",
    //     },
    //     {
    //         id: 5,
    //         title: "School Essentials",
    //         discount: "30-50% OFF",
    //         image: "/placeholder.svg?height=200&width=200",
    //         bgColor: "bg-purple-100",
    //     },
    //     {
    //         id: 6,
    //         title: "Party Wear",
    //         discount: "50-80% OFF",
    //         image: "/placeholder.svg?height=200&width=200",
    //         bgColor: "bg-red-100",
    //     },
    //     {
    //         id: 7,
    //         title: "Toys & Games",
    //         discount: "20-50% OFF",
    //         image: "/placeholder.svg?height=200&width=200",
    //         bgColor: "bg-orange-100",
    //     },
    //     {
    //         id: 8,
    //         title: "Kids Accessories",
    //         discount: "30-60% OFF",
    //         image: "/placeholder.svg?height=200&width=200",
    //         bgColor: "bg-teal-100",
    //     },
    // ]
    const categories = [
        {
            id: 1,
            title: "T-shirts",
            discount: "50-80% OFF",
            image: "https://assets.myntassets.com/f_webp,w_155,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/c75a2039-4199-4174-b1b9-fecd30f7d3f91604906586359-29-Essentials-Tshirts_Tops.jpg",
            bgColor: "bg-pink-100",
        },
        {
            id: 2,
            title: "Ethnic Wear",
            discount: "50-85% OFF",
            image: "https://assets.myntassets.com/f_webp,w_155,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/efc4b19d-179f-4437-961c-839df50299a51604906586690-36-Essentials-Night_innerwear.jpg",
            bgColor: "bg-orange-100",
        },
        {
            id: 3,
            title: "Baby Care",
            discount: "30-60% OFF",
            image: "https://assets.myntassets.com/f_webp,w_155,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/3df8a117-4db8-4cb6-ac0e-e60291d957241604906586646-35-Essentials-BabyCare.jpg",
            bgColor: "bg-rose-100",
        },


        {
            id: 4,
            title: "kids-Dresses",
            discount: "40-70% OFF",
            image: "https://assets.myntassets.com/f_webp,w_155,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/2ab2f5b3-441a-430c-a605-2ac9d06007c01604906586315-28-Essentials-Dresses.jpg",
            bgColor: "bg-purple-100",
        },

        {
            id: 5,
            title: "FLip-Flops",
            discount: "40-80% OFF",
            image: "https://assets.myntassets.com/f_webp,w_155,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/33368b8b-8702-4108-96a9-b8fa5b7ed36f1604906586455-31-Essentials-FlipFlop_sandals.jpg",
            bgColor: "bg-teal-100",
        },
        {
            id: 6,
            title: "Shorts",
            discount: "30-75% OFF",
            image: "https://assets.myntassets.com/f_webp,w_155,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/29baf945-9e5b-4f0e-bb05-0ce65c57f9c91604906586502-32-Essentials-Shorts.jpg",
            bgColor: "bg-indigo-100",
        },
        {
            id: 6,
            title: "Value Packs",
            discount: "30-75% OFF",
            image: "https://assets.myntassets.com/f_webp,w_155,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/353fd453-6a17-45b9-b3da-a3dfd88121a31604906586547-33-Essentials-Valuepacks.jpg",
            bgColor: "bg-indigo-100",
        },
    ]


    // const deals = [
    //     {
    //         id: 1,
    //         title: "Boys Collection",
    //         subtitle: "MOTHERCARE | GINI & JONY | UNITED COLORS OF BENETTON",
    //         discount: "MIN. 50% OFF",
    //         image: "/placeholder.svg?height=300&width=250",
    //         bgColor: "bg-blue-200",
    //     },
    //     {
    //         id: 2,
    //         title: "Girls Collection",
    //         subtitle: "PEPPERMINT | CUTECUMBER | TINY GIRL",
    //         discount: "40-70% OFF",
    //         image: "/placeholder.svg?height=300&width=250",
    //         bgColor: "bg-pink-200",
    //     },
    //     {
    //         id: 3,
    //         title: "Baby Essentials",
    //         subtitle: "CHICCO | FISHER PRICE | JOHNSON'S",
    //         discount: "30-60% OFF",
    //         image: "/placeholder.svg?height=300&width=250",
    //         bgColor: "bg-yellow-200",
    //     },
    //     {
    //         id: 4,
    //         title: "Kids Footwear",
    //         subtitle: "CROCS | SKETCHERS | ADIDAS",
    //         discount: "40-70% OFF",
    //         image: "/placeholder.svg?height=300&width=250",
    //         bgColor: "bg-green-200",
    //     },
    // ]

    return (
        <div>
            <CategoryHero data={heroData} />
            <LuxeDeals />

            <CategoryProducts title="SHOP BY CATEGORY - KIDS" categories={categories} />

            {/* <CategoryDeals title="TRENDING BRANDS FOR KIDS" deals={deals} /> */}
        </div>
    )
}

export default Kids
