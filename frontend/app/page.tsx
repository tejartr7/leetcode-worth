"use client";
import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [worth, setWorth] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFetching(true);
    setErrorMessage("");

    const username = (e.target as HTMLFormElement)?.querySelector(
      "#username"
    )?.value;

    try {
      let newWorth = 0;

      const response1 = await axios.get(
        `https://leetcode-worth-52co.onrender.com/user/${username}/solved`
      );
      const data1 = response1.data;
      const solved = data1.data.matchedUser.submitStatsGlobal.acSubmissionNum;

      for (let i = 1; i < 4; i++) {
        const curr = solved[i].count;
        if (i === 1) {
          newWorth += Number(curr) * 5;
        } else if (i === 2) {
          newWorth += Number(curr) * 10;
        } else {
          newWorth += Number(curr) * 20;
        }
      }

      const response2 = await axios.get(
        `https://leetcode-worth-52co.onrender.com/user/${username}/badges`
      );
      const data2 = response2.data;
      newWorth += Number(data2.data.matchedUser.badges.length) * 100;

      const response3 = await axios.get(
        `https://leetcode-worth-52co.onrender.com/user/${username}/contests`
      );
      const data3 = response3.data;
      let rating = Number(data3.data.userContestRanking.rating) - 1500;
      if (rating < 0) {
        rating = 0;
      }
      newWorth += Number(rating) * 25;

      setWorth(Number(newWorth.toFixed(2)));
    } catch (error) {
      setIsFetching(false);
      if (error.response && error.response.status === 404) {
        setErrorMessage("Cannot find user.");
      } else {
        setErrorMessage("An error occurred while fetching data.");
      }
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen text-center bg-gradient-to-r from-slate-900 to-slate-700 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-semibold leading-tight md:leading-tight max-w-xs sm:max-w-none md:text-6xl md:max-w-3xl mb-2">
          Find your LeetCode Worth in one click 🚀
        </h1>

        <form className="max-w-md mx-auto m-auto" onSubmit={handleSubmit}>
          <label
            htmlFor="username"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="username"
              className="block font-bold w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              placeholder="Enter your username..."
              required
            />
            <button
              type="submit"
              className="absolute end-2.5 bottom-2.5 bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-white dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              Find worth 💸
            </button>
          </div>
          {isFetching && (
            <div className="text-center flex items-center justify-center my-2">
              <button className="flex items-center">
                <Loader2 className="mr-2 h-10 w-10 animate-spin" />
                Fetching data from LeetCode...
              </button>
            </div>
          )}
          {errorMessage && (
            <div
              className="bg-white text-red-500 font-bold mt-2"
              style={{ padding: "10px", borderRadius: "10px" }}
            >
              {errorMessage}
            </div>
          )}
          { errorMessage.length==0 && !isFetching && worth > 0 && (
            <div
              className="bg-white text-green-500 font-bold mt-2"
              style={{ padding: "10px", borderRadius: "10px" }}
            >
              Your LeetCode worth is: ${worth} 💸🚀
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
