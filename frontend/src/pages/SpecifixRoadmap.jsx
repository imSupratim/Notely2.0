import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api.js";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../components/Loading/Loader.jsx";
import RoadmapResult from "../components/Roadmap/RoadmapResult.jsx";

const SpecifixRoadmap = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await api.get(`/roadmap/${id}`);
        setRoadmap(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [id]);


  const deleteRoadmap = async (id) => {
    if (!confirm("Delete this roadmap?")) return;

    try {
      await api.delete(`/roadmap/${id}`);
      window.alert("Roadmap deleted.");
      navigate('/allroadmaps');
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-100">
        <Loader />
      </div>
    );
  }

  return (
    <div className="py-5 px-5 flex flex-col gap-5 bg-amber-100">
      <RoadmapResult roadmap={roadmap} />

      <div className="flex justify-center">
        <button onClick={ ()=> deleteRoadmap(roadmap._id)} className="bg-red-500/40 px-5 py-3 rounded-2xl cursor-pointer border border-red-500 hover:bg-red-500/80 md:w-[15vw] w-[45vw]">
        Delete
      </button>
      </div>
    </div>
  );
};

export default SpecifixRoadmap;
