import { useState } from "react";
import { Link } from "react-router-dom";

const ProfileDropdown = ({ isLoggedIn = false }) => {
    const [show, setShow] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            <div className="cursor-pointer">Profile</div>

            {show && (
                <div className="absolute top-10 right-0 w-64 bg-white shadow-xl z-50 p-4 rounded">
                    <h3 className="font-semibold text-lg">Welcome</h3>
                    <p className="text-sm text-gray-600 mb-2">
                        To access account and manage orders
                    </p>

                    {!isLoggedIn ? (
                        <Link
                            to="/login"
                            className="inline-block w-full text-center bg-pink-600 text-white py-1.5 rounded text-sm font-medium mb-3"
                        >
                            Login / Signup
                        </Link>
                    ) : (
                        <div>
                            <p className="text-sm text-green-600 mb-3">You're logged in</p>
                            <Link to="/logout" className="text-sm text-red-600 mb-3">logout</Link>
                        </div>
                    )}

                    <ul className="text-sm space-y-2">
                        <li>
                            <Link to="/orders" className="hover:underline">Orders</Link>
                        </li>
                        <li>
                            <Link to="/wishlist" className="hover:underline">Wishlist</Link>
                        </li>
                        <li>
                            <Link to="/gift-cards" className="hover:underline">Gift Cards</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:underline">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/insider" className="hover:underline text-pink-600 font-semibold">Myntra Insider <span className="text-xs bg-yellow-300 px-1 py-0.5 rounded">New</span></Link>
                        </li>
                        <li>
                            <Link to="/credit" className="hover:underline">Myntra Credit</Link>
                        </li>
                        <li>
                            <Link to="/coupons" className="hover:underline">Coupons</Link>
                        </li>
                        <li>
                            <Link to="/saved-cards" className="hover:underline">Saved Cards</Link>
                        </li>
                        <li>
                            <Link to="/vpa" className="hover:underline">Saved VPA</Link>
                        </li>
                        <li>
                            <Link to="/addresses" className="hover:underline">Saved Addresses</Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
