'use client'
import { useState,useEffect } from "react";
import axios from "axios";
export default function Home() {
  
  useEffect(() => {
    console.log("Hello world");
    const fetchData = async () => {
      const response1 = await axios.get("https://leetcode-worth-52co.onrender.com/user/tejartr445/solved");
      const response2 = await axios.get("https://leetcode-worth-52co.onrender.com/user/tejartr445/badges");
      const response3 = await axios.get("https://leetcode-worth-52co.onrender.com/user/tejartr445/contests");
      const data1 = await response1.data;
      console.log(data1.data.matchedUser.submitStatsGlobal.
        acSubmissionNum);
      const data2 = await response2.data;
      console.log(data2.data.matchedUser.badges.length);
      const data3 = await response3.data;
      console.log(data3.data.userContestRanking.rating);
    };
    fetchData();
  }, []);
  return (
    <div>
      <div>Hello world</div>
    </div>
  );
}
