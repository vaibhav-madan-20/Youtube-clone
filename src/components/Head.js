import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import hamburger_icon from "../assets/hamburger.png"
import logo_icon from "../assets/logo.png";
import search_icon from "../assets/search.png"
import user_icon from "../assets/user.png"
import { YOUTUBE_SUGGESTIONS_API_URL } from '../utils/constants';

import { toggleMenu } from '../utils/appSlice';
import { Link, useNavigate } from 'react-router-dom';
import { cacheResults } from '../utils/searchSlice';

const Head = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cache = useSelector(store => store.search);
    function toggleMenuHandler() {
        dispatch(toggleMenu());
    }

    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const timerRef = useRef(null);

    const handleYoutubeSuggestions = async (value) => {
        value = value.trim();
        if (!value.length) return;

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        if (cache[value]) {
            setSuggestions(cache[value]);
        } else {
            timerRef.current = setTimeout(() => getYoutubeSuggestions(value), 200);
        }
    };

    const getYoutubeSuggestions = async (value) => {
        setShowSuggestions(true);
        try {
            const p = await fetch(YOUTUBE_SUGGESTIONS_API_URL + value);
            const json = await p.json();
            // console.log(json);
            setSuggestions(json[1]);
            dispatch(cacheResults({
                [value]: json[1]
            }))
        }
        catch (e) {
            console.log(e);
        }
    }

    /* 
    key - i
        -render the component
        - start timer-> make the api call after 200ms
    
    key - ip
        - destroy previous timer
        - start timer-> ma,e the api call after 200ms
    */
    return (
        <div className="grid grid-flow-col py-6">
            <div className="flex items-center col-span-1">
                <img onClick={toggleMenuHandler}
                    className="h-8 cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-all"
                    src={hamburger_icon} alt="Hamburger button" />

                <Link to="/" className="ml-4">
                    <img className="h-8"
                        src={logo_icon} alt="Logo" />
                </Link>
            </div>

            <div
                className="col-span-4 flex flex-col h-8 relative">
                <div
                    className="flex flex-row w-full">
                    <input value={searchQuery}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setShowSuggestions(false)}
                        onChange={e => {
                            setSearchQuery(e.target.value);
                            handleYoutubeSuggestions(e.target.value);
                        }}
                        className="w-full px-5 py-2 border border-gray-200 rounded-l-full focus:border-blue-400 focus:outline-none"
                        placeholder="Search"
                    />
                    <button
                        className="px-6 py-2 border border-l-0 border-gray-200 rounded-r-full bg-gray-50 hover:bg-gray-100"
                        onClick={() => navigate(`/search?q=${searchQuery.split(" ").join("+")}`)}>
                        <img className="h-5" src={search_icon} alt="search" />
                    </button>
                </div>

                <ul onBlur={() => setShowSuggestions(false)}
                    className="absolute z-50 top-10 w-full max-w-xs bg-white border border-gray-300 rounded-md shadow-md">
                    {showSuggestions && searchQuery &&
                        suggestions.map(suggestion => (
                            <li key={suggestion}
                                className="px-5 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                                onMouseDown={() => {
                                    setSearchQuery(suggestion);
                                    navigate(`/search?q=${suggestion.split(" ").join("+")}`);
                                }}
                            >
                                <span className="text-gray-400">🔍</span>
                                <span>{suggestion}</span>
                            </li>
                        ))}
                </ul>
            </div>



            <div className="flex items-center justify-end col-span-1">
                <img className="h-8 w-8 rounded-full cursor-pointer hover:bg-gray-100 p-1 transition-all"
                    src={user_icon} alt="User" />
            </div>
        </div>
    )
}

export default Head