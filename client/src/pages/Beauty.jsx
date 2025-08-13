import CategoryDeals from "../components/CategoryDeals"
import CategoryHero from "../components/CategoryHero"
import CategoryProducts from "../components/CategoryProducts"
import ProductListing from "./ProductListing"


const Beauty = () => {
    const heroData = {
        // title: "Beauty & Personal Care",
        // subtitle: "Glow Up Your Look",
        // discount: "30-70% OFF",
        // description: "Discover premium beauty products and skincare essentials",
        // buttonText: "Shop Beauty",
        // bgGradient: "from-purple-500 to-pink-600",
        image: "/placeholder.svg?height=400&width=600",
    }

    const categories = [
        {
            id: 1,
            title: "Makeup",
            discount: "30-70% OFF",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/v71rThtc_b32754de3bf4409fb711f67d5d499704.png",
            bgColor: "bg-pink-100",
        },
        {
            id: 2,
            title: "Skincare",
            discount: "40-60% OFF",
            image: "https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/HEBEpBvk_da7f846c48f84b93a191eaa02fe77fee.png",
            bgColor: "bg-green-100",
        },
        {
            id: 3,
            title: "Haircare",
            discount: "30-50% OFF",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/Ufal2Ig7_631fbb7b36a64c4dbde81dad54098845.png",
            bgColor: "bg-blue-100",
        },
        {
            id: 4,
            title: "Sunscreens",
            discount: "40-80% OFF",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/CZMRvXJe_2ca89fb05f014160b7b006be83d53d90.png",
            bgColor: "bg-purple-100",
        },
        {
            id: 5,
            title: "Sunscreens",
            discount: "30-60% OFF",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/CZMRvXJe_2ca89fb05f014160b7b006be83d53d90.png",
            bgColor: "bg-gray-100",
        },
        {
            id: 6,
            title: "Hair-oils",
            discount: "40-70% OFF",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/TUv4kOZE_29ebd43e415e4f648b9661b59e9a008e.png",
            bgColor: "bg-yellow-100",
        },
        {
            id: 7,
            title: "day-creams",
            discount: "30-65% OFF",
            image: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/GoVfjjmo_03c7ea3d8f28405396bd02f73182a3d2.png",
            bgColor: "bg-red-100",
        },

    ]

    const deals = [
        {
            id: 1,
            title: "Premium Makeup",
            subtitle: "LAKME | MAYBELLINE | L'OREAL",
            discount: "MIN. 40% OFF",
            image: "/placeholder.svg?height=300&width=250",
            bgColor: "bg-pink-200",
        },
        {
            id: 2,
            title: "Skincare Essentials",
            subtitle: "OLAY | NEUTROGENA | GARNIER",
            discount: "30-60% OFF",
            image: "/placeholder.svg?height=300&width=250",
            bgColor: "bg-green-200",
        },
        {
            id: 3,
            title: "Luxury Fragrances",
            subtitle: "DAVIDOFF | CALVIN KLEIN | HUGO BOSS",
            discount: "40-70% OFF",
            image: "/placeholder.svg?height=300&width=250",
            bgColor: "bg-purple-200",
        },
        {
            id: 4,
            title: "Men's Grooming",
            subtitle: "GILLETTE | OLD SPICE | AXE",
            discount: "30-50% OFF",
            image: "/placeholder.svg?height=300&width=250",
            bgColor: "bg-blue-200",
        },
    ]

    return (
        <div>
            <CategoryHero data={heroData} />
            <CategoryProducts title="SHOP BY CATEGORY - BEAUTY" categories={categories} />
            {/* <CategoryDeals title="TRENDING BEAUTY BRANDS" deals={deals} /> */}
            {/* <CategoryDeals deals={deals} /> */}
            {/* <ProductListing categoryProp="beauty" /> */}

        </div>
    )
}

export default Beauty
