import CategoryHero from "../components/CategoryHero"
import CategoryProducts from "../components/CategoryProducts"
import CategoryDeals from "../components/CategoryDeals"

const HomeCategory = () => {
    const heroData = [{

        image: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/banners/2018/6/8/eff01060-f706-468d-b97c-95cdf43174f91528443826867-Desktop-Home-Banner.jpg",
    }]

    const categories = [
        {
            id: 1,
            title: "Bed Linen",
            discount: "50-80% OFF",
            image: "https://assets.myntassets.com/f_webp,w_350,c_limit,fl_progressive,dpr_2.0/assets/images/banners/2018/2/2/11517563660020-bed.jpg",
            bgColor: "bg-blue-100",
        },
        {
            id: 2,
            title: "Furnishing",
            discount: "40-70% OFF",
            image: "https://assets.myntassets.com/f_webp,w_350,c_limit,fl_progressive,dpr_2.0/assets/images/banners/2018/2/2/11517563782565-furnishings.jpg",
            bgColor: "bg-green-100",
        },
        {
            id: 3,
            title: "Art-Decor",
            discount: "30-60% OFF",
            image: "https://assets.myntassets.com/w_350,c_limit,fl_progressive,dpr_2.0/assets/images/banners/2018/2/2/11517563810789-art-n-decor.jpg",
            bgColor: "bg-yellow-100",
        },
        {
            id: 4,
            title: "Lamp-Lighting",
            discount: "40-75% OFF",
            image: "https://assets.myntassets.com/f_webp,w_350,c_limit,fl_progressive,dpr_2.0/assets/images/banners/2018/2/2/11517563866590-lamps.jpg",
            bgColor: "bg-pink-100",
        },
        {
            id: 5,
            title: "Kitchen-Dining",
            discount: "30-70% OFF",
            image: "https://assets.myntassets.com/f_webp,w_350,c_limit,fl_progressive,dpr_2.0/assets/images/banners/2018/2/2/11517563925069-kitchen.jpg",
            bgColor: "bg-orange-100",
        },
        {
            id: 6,
            title: "Bath",
            discount: "40-65% OFF",
            image: "https://assets.myntassets.com/f_webp,w_350,c_limit,fl_progressive,dpr_2.0/assets/images/banners/2018/2/2/11517563958962-bath.jpg",
            bgColor: "bg-purple-100",
        },

    ]

    const deals = [
        {
            id: 1,
            title: "Swayam",

            image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/26/13606c4a-14e9-48e4-a56a-a9c3979e7db21650971940091-swayam_logo_new_1980_x_1280.jpg",
        },
        {
            id: 2,
            title: "H&M",

            image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/17/ff6b8a0b-83fa-4f9f-bbb3-0fc51fd9454a1647517771374-updated-logo.jpg",
        },
        {
            id: 3,
            title: "Spaces",

            image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/17/9830dff5-9056-402f-9bf0-ba3ead0abcaf1647499996169-SPACES---LOGO-01--BEDBATHRUGS-.jpg",
        },
        {
            id: 4,
            title: "Marks-Spencer",

            image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/17/06f9e39d-a4d4-4ba4-b4cb-960c87ff5d511647499996189-M-S-Logo.jpg",
        },
        {
            id: 5,
            title: "D-Decor",

            image: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/banners/2019/3/1/a38e440e-1ff7-4092-acbe-46d74b38384a1551443106457-Home-page-Desktop-Brands_13.jpg",
        },
    ]

    return (
        <div>
            <CategoryHero data={heroData} />
            <CategoryProducts title="SHOP BY CATEGORY - HOME & LIVING" categories={categories} />
            <CategoryDeals title="TRENDING BRANDS FOR HOME" deals={deals} />
        </div>
    )
}

export default HomeCategory