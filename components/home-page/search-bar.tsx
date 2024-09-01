"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import { BiSearch } from "react-icons/bi";
import NextImage from "../next-image";
import StyledRating from "../styled-rating";


interface Course {
  name: string;
  thumbnail?: string;
  ratings: number;
}

const SearchBar = () => {
  const [query, setQuery] = useState<string>('');
  const [selectedResult, setSelectedResult] = useState<string>(''); 
  const router = useRouter();

  const { data, error } = useSWR(
    query ? `${process.env.NEXT_PUBLIC_SERVER_URL}/get-key-search/${encodeURIComponent(query)}` : null,
    async (url: string) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data.courseSearch;
      } catch (error) {
        throw new Error("Failed to fetch data.");
      }
    }
  );

  const searchHandler = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      router.push(`/search/${query}`);
    } else {
      toast.error("Please enter at least one character!");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const handleResultSelection = (result: string) => {
    setSelectedResult(result);
    setQuery(result);
  };

  return (
    <>
      <form className="flex items-center h-[50px] mt-3" onSubmit={searchHandler}>
        <input
          type="search"
          placeholder={selectedResult || "Search Courses..."} 
          className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-l-[5px] px-2 h-full flex-1 outline-none font-josefin"
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className="w-[50px] main-gradient rounded-r-[5px] text-dark_text grid place-items-center h-full">
          <BiSearch size={30} />
        </button>
      </form>
      {data ? (
        <ul className="relative z-10 bg-white dark:bg-slate-700 dark:border-slate-100 shadow-md max-h-60 overflow-auto text-black dark:text-white">
          {data.length > 0 ? (
            data.map((course: Course, index: number) => (
              <li 
                key={index} 
                className="p-3 hover:bg-gray-100 cursor-pointer flex items-center" 
                onClick={() => handleResultSelection(course.name)}
              >
                {course.thumbnail ? (
                  <img 
                    src={course.thumbnail} 
                    alt={course.name} 
                    className="w-11 h-11 mr-2 object-cover rounded"
                  />
                ) : (
                  <div className="w-10 h-10 mr-2 bg-gray-200 flex items-center justify-center text-black">
                    <span>No Image</span>
                  </div>
                )}
                <div>
                <div>{course.name}</div>
                  <StyledRating
                    defaultValue={course.ratings || 0}
                    readOnly
                    size="small"
                    customClasses="mt-1" />
                </div>

              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
      ) : (<></>)}
    </>
  );
};

export default SearchBar;