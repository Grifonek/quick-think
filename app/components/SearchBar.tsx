import { useNavigate } from "@remix-run/react";
import React, { useState, useEffect } from "react";
import { useCloseWithEscape } from "~/hooks/useCloseWithEscape";
import { useDebounce } from "~/hooks/useDebounce";
import { useOutsideClick } from "~/hooks/useOutsideClick";

function SearchBar() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [suggestions, setSuggestions] = useState<{ username: string }[]>([]);

  const debouncedQuery = useDebounce(searchQuery, 300);

  const expandRef = useOutsideClick(() => {
    setSuggestions([]);
  });

  useCloseWithEscape(() => setSuggestions([]));

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSuggestions([]);
      return;
    }

    (async () => {
      try {
        const response = await fetch(
          `/api/suggestions?q=${encodeURIComponent(debouncedQuery)}`
        );

        if (!response.ok) throw new Error("Failed to fetch suggestions!");

        const data = await response.json();
        setSuggestions(data.users);
      } catch {
        setSuggestions([]);
      }
    })();
  }, [debouncedQuery]);

  function navigateToUser(query: string) {
    if (!query.trim()) {
      setError("Please enter a valid username!");
      return;
    }

    setError("");
    navigate(`/user/${query.toLowerCase()}`);
  }

  return (
    <div className="relative w-60">
      <div className="flex">
        <input
          type="text"
          name="user"
          value={searchQuery}
          onChange={(e) => {
            e.preventDefault();
            setSearchQuery(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") navigateToUser(searchQuery);
          }}
          placeholder="Search for a user"
          className="w-1/7 px-2 py-1 border border-gray-300 rounded focus:border-indigo-500 focus:outline-none focus:ring-0"
        />
        <button
          onClick={() => navigateToUser(searchQuery)}
          className="ml-2 px-4 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-600 mt-1">{error}</p>}

      <ul className="absolute z-10 w-full">
        {suggestions.map((user) => (
          <li
            key={user.username}
            ref={expandRef as React.RefObject<HTMLLIElement>}
            className="bg-white border border-gray-100"
          >
            <button
              onClick={() => navigateToUser(user.username)}
              className="w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              {user.username}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
