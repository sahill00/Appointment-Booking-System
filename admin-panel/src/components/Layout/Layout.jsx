import React from "react";
import Menus from "./Menus";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-2">
          <Menus />
        </div>
        <div className="col-md-10">
          <div className="" style={{ minHeight: "80vh" }}>
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
