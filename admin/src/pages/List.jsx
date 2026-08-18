import React from "react";
import {baseURL} from "../App.jsx";
import {toast} from "react-toastify";

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

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div>
            <p className={'mb-2'}> All Products List </p>
            <div>
                <div>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
            </div>

        </div>
    )
}

export default List