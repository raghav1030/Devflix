import React, { useState } from "react";
import {
  NavLink,
  matchPath,
  matchRoutes,
  useLocation,
  useParams,
} from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from "../core/auth/ProfileDropdown";
import { useEffect } from "react";
import { apiConnector } from "../../services/ApiConnector";
import { categories } from "../../services/ApiEndpoints";
import { FiChevronDown } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { ACCOUNT_TYPE } from "../../utils/constants";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();

  const [subLinks, setSubLinks] = useState([""]);

  const [loading, setLoading] = useState(false);

  async function fetchApi() {
    setLoading(true);

    try {
      console.log("Category api ", categories.CATEGORIES_API);

      const result = await apiConnector("get", categories.CATEGORIES_API);
      console.log("Printing sublinks data : ", result);
      console.log("Category api result", result.data);
      setSubLinks(result.data.data);
    } catch (e) {
      console.log("Something went wrong while fetching API");
      console.error(e);
    }

    setLoading(false);
  }

  console.log(subLinks);

  useEffect(() => {
    fetchApi();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <NavLink to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </NavLink>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 hover:text-yellow-25  transition-colors duration-200 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks.map((subLink, i) => (
                              <NavLink
                                to={`/catalog/${subLink.name}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50  transition-colors duration-200"
                                key={i}
                              >
                                <p className="capitalize">{subLink.name}</p>
                              </NavLink>
                            ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <NavLink to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      } hover:text-yellow-25 transition-colors duration-200`}
                    >
                      {link.title}
                    </p>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <NavLink to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100 hover:text-richblack-25 transition-colors duration-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </NavLink>
          )}
          {token === null && (
            <NavLink to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </NavLink>
          )}
          {token === null && (
            <NavLink to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </NavLink>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
