import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

export const LastestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLastestProducts] = useState([]);

    useEffect(() => {
        setLastestProducts(products.slice(0, 10));
    }, []);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'LASTEST'} text2={'COLLECTION'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae tenetur minima illum odio magnam.
                </p>
            </div>

            {/* Rendering products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    latestProducts.map((item, index) => {
                        return (
                            <ProductItem
                                key={index}
                                id={item._id}
                                image={item.image}
                                price={item.price}
                            />
                        )
                    })
                }
            </div>


        </div>
    )
}
