import { BookText } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api.js";

const RoadmapCard = ({ roadmap }) => {
  const navigate = useNavigate();

  const deleteRoadmap = async(id) => {
    if(!confirm("Delete this roadmap?")) return;
    
    try {
      await api.delete(`/roadmap/${id}`)
      navigate("/allroadmaps")
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="bg-amber-200 hover:shadow-2xl hover:scale-102 transition-all px-5 py-3 rounded-2xl w-[88vw] md:w-[24vw] h-[30vh] flex flex-col justify-between border border-amber-400">
      <div className="md:text-xl font-bold text-purple-700">
        {roadmap.title}
      </div>
      <div className="flex items-center mt-3 text-lg font-semibold">
        <BookText /> {roadmap.topic}
      </div>
      <div className="mt-3">{roadmap.createdAt}</div>
      <div className="flex justify-between">
        <div></div>

        <button
          onClick={() => navigate(`/roadmap/${roadmap._id}`)}
          className="border border-green-600 bg-green-600/40 rounded-2xl px-5 py-2 cursor-pointer hover:bg-green-600/80 font-semibold"
        >
          Visit
        </button>

      </div>
    </div>
  );
};

export default RoadmapCard;
