import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection') && showSearch) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location, showSearch]);

    if (!showSearch || !visible) return null;

    return (
        <div className='border-b border-t border-gray-200 border-b-gray-200 bg-gray-50 text-center'>
            <div className="inline-flex items-center justify-between border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-none outline-none bg-inherit text-sm' type="text" placeholder='Search' />
                <img src={assets.search_icon} className='w-4' />
            </div>
            <img onClick={() => setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} />
        </div>
    );
}

export default SearchBar