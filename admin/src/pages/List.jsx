import React, {useState, useEffect} from "react";
import {baseURL, currency} from "../App.jsx";
import {toast} from "react-toastify";
import axios from "axios";

const List = () => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/products`);
            if (!response.data.status) {
                toast.warning(response.data.msg);
                return;
            }
            setList(response.data.products);
        } catch (e) {
            console.error(e);
            toast.error(e.response?.data?.msg || e.message || "Something went wrong");
        }
    }

    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`${baseURL}/api/products/${id}`);
            if (!response.data.status) {
                toast.warning(response.data.msg);
                return;
            }
            await fetchList();
            toast.success(response.data.msg);
        } catch (e) {
            console.error(e);
            toast.error(e.response?.data?.msg || e.message || "Something went wrong");
        }
    }

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div>
            <p className={'mb-2'}> All Products List </p>

            <div className={'flex flex-col gap-2'}>
                <div className={'hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-100 text-sm'}>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className={'text-center'}>Action</b>
                </div>
            </div>

            {list.map((item, index) => (
                <div key={index} className={'grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-sm'}>
                    <img className={'w-12'} src={item.image[0]} alt={item.name}/>
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{currency}{item.price}</p>
                    <p onClick={() => deleteProduct(item._id)} className={'text-right md:text-center cursor-pointer text-lg'}>X</p>
                </div>
            ))}


        </div>
    )
}

export default List