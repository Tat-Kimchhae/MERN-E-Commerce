import {createContext, useState, useEffect} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const currency = '$';
    const deliveryFee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

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

    const updateQuantity = async (itemID, size, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemID][size] = quantity;

        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                }
            }
        }

        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/products`);
            if (!response.data.status) {
                toast.error(response.data.msg);
                return;
            }
            setProducts(response.data.products);
        } catch (e) {
            console.error(e);
            toast.error(e.response?.data?.msg || e.message || "Something went wrong");
        }
    }

    useEffect(() => {
        getProductsData();
    }, []);

    const value = {
        products, currency, deliveryFee, search, setSearch, showSearch,
        setShowSearch, cartItems, setCartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount, navigate, token, setToken, baseURL
    }

    return <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
}

export default ShopContextProvider;