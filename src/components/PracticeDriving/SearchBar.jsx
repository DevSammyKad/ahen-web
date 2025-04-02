import React from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineAdjustments } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setPracticeDrivingSearchText } from "../../redux/slices/practiceDrivingSlice";

const SearchBar = () => {
  const dispatch = useDispatch();

  const practiceDrivingSearchText = useSelector(
    (state) => state.practiceDriving.practiceDrivingSearchText
  );

  const handleChange = (e) => {
    dispatch(setPracticeDrivingSearchText(e.target.value));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
      <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 w-full sm:w-[300px]">
        <CiSearch className="text-gray-500 text-2xl" />
        <input
          type="text"
          className="ml-2 flex-grow text-gray-700 text-sm bg-transparent outline-none placeholder-gray-400"
          placeholder="Search for vehicles"
          value={practiceDrivingSearchText}
          onChange={handleChange}
        />
      </div>
      {/* <button
        className="flex items-center gap-2 px-4 py-2 text-sm bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition-all duration-200"
        aria-label="Filter options">
        <HiOutlineAdjustments className="text-xl" />
        Filters
      </button> */}
    </div>
  );
};

export default SearchBar;
