// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import { Outlet } from "react-router-dom";

// const Layout=()=>{
//     return(
//         <>
//          <Header/>

//         a
//          <Outlet/>


//          <Footer/>
        
//         </>
//     )
// }

// export default Layout;


import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { motion } from "framer-motion";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header />
            
            <motion.main
                className="flex-1 pt-20 pb-12 px-4 md:px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Outlet />
            </motion.main>
            
            <Footer />
        </div>
    );
};

export default Layout;