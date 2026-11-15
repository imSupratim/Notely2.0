import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/api.js";
import RoadmapCard from "../components/Roadmap/RoadmapCard.jsx";

const AllRoadmaps = () => {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRoadmaps = async () => {
    try {
      const res = await api.get("/roadmap/getallroadmaps");
      setRoadmaps(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch roadmaps", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-100">
        <div className="min-h-screen flex justify-center items-center animate-spin">
          <div className="size-20 border-b-4 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-100">
      <div className="md:px-40 px-5 py-10">
        {/* Heading */}
        <div className=" flex justify-between items-center px-8 py-3  font-bold bg-amber-200 rounded-2xl">
          <span className="text-sm md:text-3xl">
            All Your Saved <span className="text-purple-700">Roadmaps</span>
          </span>
          <NavLink
            to="/roadmap"
            className="border px-5 py-2 rounded-2xl bg-purple-300 text-purple-800 hover:scale-105 active:scale-95 transition-all text-xs md:text-lg"
          >
            Create New
          </NavLink>
        </div>

        {/* body */}
        {/* <div className="mt-10 flex gap-7 md:pl-5 flex-wrap justify-center md:justify-start">
          {roadmaps.map((roadmap, index) => (
            <div key={roadmap._id}>
              <RoadmapCard roadmap={roadmap}/>
            </div>
          ))}
        </div> */}
        <div className="mt-10">
          {roadmaps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h2 className="text-2xl font-bold text-gray-700">
                No Roadmaps Found!
              </h2>

              <p className="text-gray-500 mt-2">
                You haven't created any roadmaps yet.
              </p>

              <NavLink
                to="/roadmap"
                className="mt-5 px-6 py-3 rounded-xl bg-purple-500 text-white hover:bg-purple-600 transition"
              >
                Create Your First Roadmap
              </NavLink>
            </div>
          ) : (
            <div className="flex gap-7 md:pl-5 flex-wrap justify-center md:justify-start">
              {roadmaps.map((roadmap) => (
                <div key={roadmap._id}>
                  <RoadmapCard roadmap={roadmap} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllRoadmaps;
