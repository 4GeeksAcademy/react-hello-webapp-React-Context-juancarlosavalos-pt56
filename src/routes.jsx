import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";

import { Home } from "./pages/Home.jsx";
import { AddContact } from "./pages/AddContact.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";

import injectContext from "./hooks/useGlobalReducer.jsx";

const Layout = () => {
    return (
        <div>
            <BrowserRouter>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/add" element={<AddContact />} />
                        <Route path="/edit/:id" element={<AddContact />} />
                        <Route path="*" element={<h1 className="text-center mt-5">Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);