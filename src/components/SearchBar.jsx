import React, { useState, useRef, useEffect } from 'react';

const SearchBar = ({setSearchValue, handleSearch}) => {
   
    return (
        <div className="mb-3 md:w-96 mx-auto">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                    type="search"
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border-[1.8px] border-solid border-blue-600 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-sm font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-blue-800 focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none "
                    placeholder="Search by Template Name"
                    aria-label="Search"
                    aria-describedby="button-addon3" />

                {/* <!--Search button--> */}
                
                <button
                    onClick={() => handleSearch()}
                    className="relative z-[2] text-white border-blue-800 bg-blue-800 rounded-r border-2 px-6 py-2 font-medium uppercase text-sm transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-0"
                    type="button"
                    id="button-addon3">
                    Search
                </button>
                
            </div>
        </div>
);
}

export default SearchBar