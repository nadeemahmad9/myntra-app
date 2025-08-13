import HeroBanner from "../components/HeroBanner"
import BudgetBargains from "../components/BudgetBargains"
import ShopByCategory from "../components/ShopByCategory"
import CrazyDeals from "../components/CrazyDeals"
import LuxeDeals from "../components/LuxeDeals"

const Home = () => {
    return (
        <div>
            <HeroBanner />
            <BudgetBargains />
            <CrazyDeals />
            <ShopByCategory />

        </div>
    )
}

export default Home
