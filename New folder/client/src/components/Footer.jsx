import React from 'react';

const Footer = () => {
    return (
      <div style={{position:'relative', bottom:"0px"}}>

      
        <footer className="bg-gray-800 text-white p-6 md:p-12 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                    <h5 className="font-bold mb-2">Product</h5>
                    <ul>
                        <li><a href="#" className="hover:underline">Feature 1</a></li>
                        <li><a href="#" className="hover:underline">Feature 2</a></li>
                        <li><a href="#" className="hover:underline">Feature 3</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold mb-2">Company</h5>
                    <ul>
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Contact</a></li>
                        <li><a href="#" className="hover:underline">Careers</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold mb-2">Resources</h5>
                    <ul>
                        <li><a href="#" className="hover:underline">Blog</a></li>
                        <li><a href="#" className="hover:underline">Help Center</a></li>
                        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold mb-2">Follow Us</h5>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:scale-110 transition-transform">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="hover:scale-110 transition-transform">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="hover:scale-110 transition-transform">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center mt-6">
                <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
        </footer>
        </div>
    );
};

export default Footer;