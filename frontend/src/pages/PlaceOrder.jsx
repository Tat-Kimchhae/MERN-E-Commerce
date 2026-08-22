import React, {useContext, useState} from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import {assets} from '../assets/assets'
import {ShopContext} from '../context/ShopContext'
import {toast} from "react-toastify";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const PlaceOrder = () => {
    const [method, setMethod] = useState("cod");
    const {navigate, cartItems, products, setCartItems, getCartAmount, deliveryFee, token} = useContext(ShopContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(prevState => ({...prevState, [name]: value}));
    }

    const onSubmitHandler = async () => {
        // e.preventDefault();
        try {
            let orderItems = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (items) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            const orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + deliveryFee,
            }

            switch (method) {
                case 'cod': {
                    const response = await axios.post(`${baseURL}/api/orders/place`, orderData, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (!response.data.status) {
                        toast.error(response.data.msg)
                        return;
                    }

                    setCartItems({});
                    navigate(`/orders`);

                    break;
                }
                default:
                    break
            }
        } catch (e) {
            console.log(e);
            toast.error(e?.response?.data?.msg || "Something went wrong");
        }
    }


    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* Left side */}
            <div className="flex flex-col gap-4 w-full sm:max-w-120">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={'DELIVERY'} text2={'INFOMATION'}/>
                </div>
                <div className="flex gap-3">
                    <input
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text"
                        name="firstName"
                        placeholder='First Name'
                        value={formData.firstName}
                        onChange={onChangeHandler}
                    />
                    <input
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text"
                        name="lastName"
                        placeholder='Last Name'
                        value={formData.lastName}
                        onChange={onChangeHandler}
                    />
                </div>

                <input
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    type="email"
                    name="email"
                    placeholder='Email'
                    value={formData.email}
                    onChange={onChangeHandler}
                />

                <input
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    type="text"
                    name="street"
                    placeholder='Street'
                    value={formData.street}
                    onChange={onChangeHandler}
                />

                <div className="flex gap-3">
                    <input
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text"
                        name="city"
                        placeholder='City'
                        value={formData.city}
                        onChange={onChangeHandler}
                    />
                    <input
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text"
                        name="state"
                        placeholder='State'
                        value={formData.state}
                        onChange={onChangeHandler}
                    />
                </div>

                <div className="flex gap-3">
                    <input
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="number"
                        name="zipcode"
                        placeholder='Zipcode'
                        value={formData.zipcode}
                        onChange={onChangeHandler}
                    />
                    <input
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text"
                        name="country"
                        placeholder='Country'
                        value={formData.country}
                        onChange={onChangeHandler}
                    />
                </div>

                <input
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    type="number"
                    name="phone"
                    placeholder='Phone'
                    value={formData.phone}
                    onChange={onChangeHandler}
                />
            </div>
            {/* Right side */}
            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <CartTotal/>
                </div>
                <div className="mt-12">
                    <Title text1={'PAYMENT'} text2={'METHOD'}/>
                    {/* Payment methods selection */}
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div onClick={() => setMethod("aba")} className="flex items-center gap-3 border p-2 px-3 opacity-50 cursor-not-allowed">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'aba' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.aba_logo}/> ABA
                        </div>
                        <div onClick={() => setMethod("acleda")} className="flex items-center gap-3 border p-2 px-3 opacity-50 cursor-not-allowed">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'acleda' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.acleda}/> Acleda
                        </div>
                        <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'> CASH ON DELIVERY </p>
                        </div>
                    </div>
                </div>
                <div className="w-full text-end mt-8">
                    <button onClick={onSubmitHandler} className="bg-black text-white px-16 py-3 text-sm cursor-pointer"> PLACE ORDER </button>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder