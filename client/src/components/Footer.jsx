// import { motion } from "framer-motion"
// import { Facebook, Twitter, Youtube, Instagram } from "lucide-react"

// const Footer = () => {
//     return (
//         <footer className="bg-gray-100 pt-12 pb-6">
//             <div className="container mx-auto px-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                     {/* Online Shopping */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 50 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <h3 className="font-bold text-gray-800 mb-4">ONLINE SHOPPING</h3>
//                         <ul className="space-y-2 text-sm text-gray-600">
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Men
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Women
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Kids
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Home
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Beauty
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Genz
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Gift Cards
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Myntra Insider
//                                 </a>
//                             </li>
//                         </ul>

//                         <h4 className="font-bold text-gray-800 mt-6 mb-4">USEFUL LINKS</h4>
//                         <ul className="space-y-2 text-sm text-gray-600">
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Blog
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Careers
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Site Map
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Corporate Information
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Whitehat
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Cleartrip
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Myntra Global
//                                 </a>
//                             </li>
//                         </ul>
//                     </motion.div>

//                     {/* Customer Policies */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 50 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.1, duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <h3 className="font-bold text-gray-800 mb-4">CUSTOMER POLICIES</h3>
//                         <ul className="space-y-2 text-sm text-gray-600">
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Contact Us
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     FAQ
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     T&C
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Terms Of Use
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Track Orders
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Shipping
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Cancellation
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Returns
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Privacy policy
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="hover:text-pink-500">
//                                     Grievance Redressal
//                                 </a>
//                             </li>
//                         </ul>
//                     </motion.div>

//                     {/* Experience Myntra App */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 50 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.2, duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <h3 className="font-bold text-gray-800 mb-4">EXPERIENCE MYNTRA APP ON MOBILE</h3>
//                         <div className="flex space-x-4 mb-6">
//                             <img src="https://constant.myntassets.com/web/assets/img/80cc455a-92d2-4b5c-a038-7da0d92af33f1539674178924-google_play.png" alt="Google Play" className="h-10" />
//                             <img src="https://constant.myntassets.com/web/assets/img/bc5e11ad-0250-420a-ac71-115a57ca35d51539674178941-apple_store.png" alt="App Store" className="h-10" />
//                         </div>

//                         <h4 className="font-bold text-gray-800 mb-4">KEEP IN TOUCH</h4>
//                         <div className="flex space-x-4">
//                             <Facebook className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
//                             <Twitter className="w-6 h-6 text-gray-600 hover:text-blue-400 cursor-pointer" />
//                             <Youtube className="w-6 h-6 text-gray-600 hover:text-red-600 cursor-pointer" />
//                             <Instagram className="w-6 h-6 text-gray-600 hover:text-pink-600 cursor-pointer" />
//                         </div>
//                     </motion.div>

//                     {/* Guarantees */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 50 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.3, duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <div className="flex items-center mb-4">
//                             <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
//                                 <span className="text-2xl">
//                                     <img src="https://constant.myntassets.com/web/assets/img/6c3306ca-1efa-4a27-8769-3b69d16948741574602902452-original.png" alt="" />
//                                 </span>
//                             </div>
//                             <div>
//                                 <h4 className="font-bold text-gray-800">100% ORIGINAL</h4>
//                                 <p className="text-sm text-gray-600">guarantee for all products at myntra.com</p>
//                             </div>
//                         </div>

//                         <div className="flex items-center">
//                             <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
//                                 <span className="text-2xl">
//                                     <img src="https://assets.myntassets.com/assets/images/retaillabs/2023/5/22/becb1b16-86cc-4e78-bdc7-7801c17947831684737106127-Return-Window-image.png" alt="" />
//                                 </span>
//                             </div>
//                             <div>
//                                 <h4 className="font-bold text-gray-800">Return within 14days</h4>
//                                 <p className="text-sm text-gray-600">of receiving your order</p>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </div>

//                 {/* Popular Searches */}
//                 <motion.div
//                     className="mt-12 pt-8 border-t border-gray-300"
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ delay: 0.4, duration: 0.6 }}
//                     viewport={{ once: true }}
//                 >
//                     <h3 className="font-bold text-gray-800 mb-4">POPULAR SEARCHES</h3>
//                     <div className="text-sm text-gray-600 leading-relaxed">
//                         <span className="mr-4">Makeup</span>
//                         <span className="mr-4">Dresses For Girls</span>
//                         <span className="mr-4">T-Shirts</span>
//                         <span className="mr-4">Sandals</span>
//                         <span className="mr-4">Headphones</span>
//                         <span className="mr-4">Babydolls</span>
//                         <span className="mr-4">Blazers For Men</span>
//                         <span className="mr-4">Handbags</span>
//                         <span className="mr-4">Ladies Watches</span>
//                         <span className="mr-4">Bags</span>
//                         <span className="mr-4">Sport Shoes</span>
//                         <span className="mr-4">Reebok Shoes</span>
//                         <span className="mr-4">Puma Shoes</span>
//                         <span className="mr-4">Boxers</span>
//                         <span className="mr-4">Wallets</span>
//                         <span className="mr-4">Tops</span>
//                         <span className="mr-4">Earrings</span>
//                         <span className="mr-4">Fastrack Watches</span>
//                         <span className="mr-4">Kurtis</span>
//                         <span className="mr-4">Nike</span>
//                         <span className="mr-4">Smart Watches</span>
//                         <span className="mr-4">Titan Watches</span>
//                         <span className="mr-4">Designer Blouse</span>
//                         <span className="mr-4">Gowns</span>
//                         <span className="mr-4">Rings</span>
//                         <span className="mr-4">Cricket Shoes</span>
//                         <span className="mr-4">Forever 21</span>
//                         <span className="mr-4">Eye Makeup</span>
//                         <span className="mr-4">Photo Frames</span>
//                         <span className="mr-4">Punjabi Suits</span>
//                         <span className="mr-4">Bikini</span>
//                         <span className="mr-4">Myntra Fashion Show</span>
//                         <span className="mr-4">Lipstick</span>
//                         <span className="mr-4">Saree</span>
//                         <span className="mr-4">Watches</span>
//                         <span className="mr-4">Dresses</span>
//                         <span className="mr-4">Lehenga</span>
//                         <span className="mr-4">Nike Shoes</span>
//                         <span className="mr-4">Goggles</span>
//                         <span className="mr-4">Bras</span>
//                         <span className="mr-4">Suit</span>
//                         <span className="mr-4">Chinos</span>
//                         <span className="mr-4">Shoes</span>
//                         <span className="mr-4">Adidas Shoes</span>
//                         <span className="mr-4">Woodland Shoes</span>
//                         <span className="mr-4">Jewellery</span>
//                         <span className="mr-4">Designers Sarees</span>
//                     </div>
//                 </motion.div>

//                 {/* Bottom */}
//                 <div className="mt-8 pt-6 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
//                     <p>
//                         In case of any concern,{" "}
//                         <a href="#" className="text-pink-500 hover:underline">
//                             Contact Us
//                         </a>
//                     </p>
//                     <div className="mt-4 md:mt-0">
//                         <p>© 2026 www.myntra.com. All rights reserved.</p>
//                         <p className="text-right mt-1">A Flipkart company</p>
//                         <p>"Disclaimer: This is NOT a real store. It is a student portfolio project."</p>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     )
// }

// export default Footer


import { motion } from "framer-motion"
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-gray-100 pt-12 pb-8 border-t border-gray-200">
            <div className="container mx-auto px-4 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Online Shopping */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="font-bold text-gray-800 mb-4 text-xs tracking-widest">ONLINE SHOPPING</h3>
                        <ul className="space-y-1.5 text-[13px] text-gray-500">
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Men</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Women</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Kids</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Home & Living</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Beauty</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Gift Cards</a></li>
                        </ul>
                    </motion.div>

                    {/* Customer Policies */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="font-bold text-gray-800 mb-4 text-xs tracking-widest">CUSTOMER POLICIES</h3>
                        <ul className="space-y-1.5 text-[13px] text-gray-500">
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">T&C</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Terms Of Use</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Track Orders</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Shipping</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Cancellation</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Returns</a></li>
                        </ul>
                    </motion.div>

                    {/* App Experience */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="font-bold text-gray-800 mb-4 text-xs tracking-widest uppercase">Experience Zyntra App</h3>
                        <div className="flex flex-col space-y-4 mb-6">
                            <div className="flex space-x-3">
                                <img src="https://constant.myntassets.com/web/assets/img/80cc455a-92d2-4b5c-a038-7da0d92af33f1539674178924-google_play.png" alt="Google Play" className="h-10 cursor-pointer" />
                                <img src="https://constant.myntassets.com/web/assets/img/bc5e11ad-0250-420a-ac71-115a57ca35d51539674178941-apple_store.png" alt="App Store" className="h-10 cursor-pointer" />
                            </div>
                        </div>

                        <h4 className="font-bold text-gray-800 mb-3 text-xs tracking-widest">KEEP IN TOUCH</h4>
                        <div className="flex space-x-5">
                            <Facebook className="w-5 h-5 text-gray-500 hover:text-blue-600 cursor-pointer transition-colors" />
                            <Twitter className="w-5 h-5 text-gray-500 hover:text-blue-400 cursor-pointer transition-colors" />
                            <Youtube className="w-5 h-5 text-gray-500 hover:text-red-600 cursor-pointer transition-colors" />
                            <Instagram className="w-5 h-5 text-gray-500 hover:text-pink-600 cursor-pointer transition-colors" />
                        </div>
                    </motion.div>

                    {/* Guarantees */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="flex items-start gap-4">
                            <img src="https://constant.myntassets.com/web/assets/img/6c3306ca-1efa-4a27-8769-3b69d16948741574602902452-original.png" alt="Original" className="w-12" />
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">100% ORIGINAL</h4>
                                <p className="text-xs text-gray-500 leading-tight mt-1">guarantee for all products at zyntrashop.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <img src="https://assets.myntassets.com/assets/images/retaillabs/2023/5/22/becb1b16-86cc-4e78-bdc7-7801c17947831684737106127-Return-Window-image.png" alt="Return" className="w-12" />
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">Return within 14 days</h4>
                                <p className="text-xs text-gray-500 leading-tight mt-1">of receiving your order</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        
                        {/* Left Side: Policy Info */}
                        <div className="text-[13px] text-gray-500 space-y-1">
                            <p>© 2026 www.zyntrashop.com. All rights reserved.</p>
                            <p>In case of any concern, <a href="#" className="text-blue-600 font-bold hover:underline">Contact Us</a></p>
                        </div>

                        {/* Right Side: Disclaimer (Centered Align in its own block) */}
                        <div className="bg-white border border-red-100 rounded-lg p-4 max-w-md shadow-sm">
                            <p className="text-[11px] font-bold text-red-500 uppercase tracking-tighter mb-1">
                                ⚠️ Portfolio Disclaimer
                            </p>
                            <p className="text-[12px] text-gray-600 leading-snug italic">
                                "This is NOT a real store. It is a student portfolio project created for educational purposes. No actual payments or orders are processed."
                            </p>
                            <p className="text-[10px] text-gray-400 mt-2 text-right">— Developed by Naushad Ahmad</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
