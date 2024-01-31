import React, { useEffect, useState, useContext } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useSelector } from "react-redux";
import { DarkMode } from "../../context/DarkMode";
import Button from "../Elements/Button/Index";
import { useTotalPrice } from "../../context/TotalPriceContext";

const NavBar = () => {
  const { username } = useLogin();
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  const [totalCart, setTotalCart] = useState(0);
  const cart = useSelector((state) => state.cart.data);
  const { total } = useTotalPrice();

  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + item.qty, 0);
    setTotalCart(sum);
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-end h-16 bg-blue-600 text-white items-center px-10">
      {username && <span className="mr-5">{username}</span>}
      <Button className="ml-5 bg-black" onClick={handleLogout}>
        Logout
      </Button>
      <div className="flex items-center bg-gray-800 p-2 rounded-md ml-7 mr-5">
        Item: {totalCart} | Price: ${total.toLocaleString()}
      </div>
      <Button className="bg-black p-2 mx-5 text-white rounded" onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? "Light" : "Dark"}
      </Button>
    </div>
  );
};

export default NavBar;
