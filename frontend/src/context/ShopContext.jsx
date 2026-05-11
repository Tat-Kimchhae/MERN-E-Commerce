import { createContext, useContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const deliveryFee = '10';
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemID, size) => {
        if (!size) {
            toast.error('Please select product size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemID]) {
            if (cartData[itemID][size]) {
                cartData[itemID][size] += 1;
            } else {
                cartData[itemID][size] = 1;
            }
        } else {
            cartData[itemID] = {};
            cartData[itemID][size] = 1;
        }
        setCartItems(cartData);
    }

    const getCartCount = () => {
        let totalCount = 0;

        for (let items in cartItems) {
            for (let item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }

        return totalCount;
    }

    const value = {
        products, currency, deliveryFee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount
    }

    useEffect(() => {

    }, [cartItems]);

    return <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
}

export default ShopContextProvider;