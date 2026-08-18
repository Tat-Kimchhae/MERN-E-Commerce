import React, {useState} from 'react';
import {assets} from "../assets/assets.js";
import {toast} from "react-toastify";
import axios from "axios";
import {baseURL} from "../App.jsx";

const Add = ({token}) => {
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestSeller, setBestSeller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestSeller", bestSeller);
            formData.append("sizes", JSON.stringify(sizes));

            const images = [image1, image2, image3, image4];
            images.forEach((img) => {
                if (img) {
                    formData.append("images", img);
                }
            });

            const response = await axios.post(`${baseURL}/api/products`, formData, {
                headers: {Authorization: `Bearer ${token}`}
            });

            if (response.data.status) {
                toast.success(response.data.msg);
                setName('');
                setDescription('');
                setPrice('');
                setCategory('');
                setSubCategory('');
                setBestSeller(false);
                setSizes([]);
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                return;
            }

            toast.warning(response.data.msg);

        } catch (e) {
            console.log(e);
            toast.error(e.response?.data?.msg || e.message || "Something went wrong");
        }
    }

    return (
        <div>
            <form className={'flex flex-col w-full items-start gap-3'} onSubmit={onSubmitHandler}>
                <div>
                    <p className='mb-2'> Upload Image </p>
                    <div className={'flex gap-3'}>
                        <div>
                            <label htmlFor="image-1" className={'cursor-pointer'}>
                                <img className={'w-20'} src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt=""/>
                                <input onChange={(e) => setImage1(e.target.files[0])} type="file" name="files" id="image-1" hidden/>
                            </label>
                        </div>

                        <div>
                            <label htmlFor="image-2" className={'cursor-pointer'}>
                                <img className={'w-20'} src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt=""/>
                                <input onChange={(e) => setImage2(e.target.files[0])} type="file" name="files" id="image-2" hidden/>
                            </label>
                        </div>

                        <div>
                            <label htmlFor="image-3" className={'cursor-pointer'}>
                                <img className={'w-20'} src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt=""/>
                                <input onChange={(e) => setImage3(e.target.files[0])} type="file" name="files" id="image-3" hidden/>
                            </label>
                        </div>

                        <div>
                            <label htmlFor="image-4" className={'cursor-pointer'}>
                                <img className={'w-20'} src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt=""/>
                                <input onChange={(e) => setImage4(e.target.files[0])} type="file" name="files" id="image-4" hidden/>
                            </label>
                        </div>
                    </div>
                </div>

                <div className={'w-full mb-2'}>
                    <p> Product Name </p>
                    <input onChange={(e) => setName(e.target.value)} value={name} className={'w-full max-w-[500px] px-3 py-2'} type="text" name="productName" id="productName" placeholder="Enter Product Name" required/>
                </div>

                <div className={'w-full mb-2'}>
                    <p> Product Description </p>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} className={'w-full max-w-[500px] px-3 py-2'} name="productDescription" id="productDescription" placeholder="Enter Product Description"></textarea>
                </div>

                <div className={'flex flex-col sm:flex-row gap-2 sm:gap-8 w-full mb-2'}>

                    <div className={'mb-2'}>
                        <p> Product Category </p>
                        <select onChange={(e) => setCategory(e.target.value)} value={category} className={'w-full px-3 py-2'} name="category" id="product-category-select">
                            <option value="Men"> Men</option>
                            <option value="Women"> Women</option>
                            <option value="Kids"> Kids</option>
                        </select>
                    </div>

                    <div className={'mb-2'}>
                        <p> Sub Category </p>
                        <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className={'w-full px-3 py-2'} name="category" id="product-category-select">
                            <option value="Topwear"> Topwear</option>
                            <option value="Bottomwear"> Bottomwear</option>
                            <option value="Winterwear"> Winterwear</option>
                        </select>
                    </div>

                    <div>
                        <p> Product Price </p>
                        <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" className={'w-full px-3 py-2 sm:w-[120px]'} placeholder={'Price'}/>
                    </div>

                </div>

                <div className='mb-2'>
                    <p> Product Sizes </p>
                    <div className='flex gap-3'>
                        {["S", "M", "L", "XL", "XXL"].map(size => (
                            <div
                                key={size}
                                onClick={() =>
                                    setSizes(prevState =>
                                        prevState.includes(size) ? prevState.filter(item => item !== size) : [...prevState, size]
                                    )
                                }
                            >
                                <p className={`${sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>{size}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='flex gap-2 mb-2'>
                    <input onChange={() => setBestSeller(prevState => !prevState)} checked={bestSeller} type="checkbox" id='best-seller'/>
                    <label htmlFor="best-seller" className='cursor-pointer'> Add to best seller </label>
                </div>

                <button type='submit' className='w-28 py-3 mt-4 bg-black text-white cursor-pointer'> ADD</button>
            </form>
        </div>
    );
}

export default Add;