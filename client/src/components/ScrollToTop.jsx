// components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Smooth effect ke liye hum behavior: "smooth" use kar sakte hain
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // "instant" Myntra jaisa feel dega, "smooth" thoda slow lagega
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;