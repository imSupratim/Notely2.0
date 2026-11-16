import { Dot } from "lucide-react";
import React, { useState } from "react";
import api from "../api/api";
import Loader from "../components/Loading/Loader";
import RoadmapResult from "../components/Roadmap/RoadmapResult";

const Roadmap = () => {
  const [topic, setTopic] = useState("");
  const [days, setDays] = useState("");
  const [hours, setHours] = useState(2);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    setRoadmap(null);
    e.preventDefault();
    try {
      const res = await api.post("/roadmap", {
        topic,
        days: Number(days),
        hours,
      });

      setRoadmap(res.data.roadmap);
      alert(res.data.message);
      console.log(res.data);
    } catch (error) {
      alert("Gemini Model in high demand try again");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    try {
      setSaving(true);
      const saved = await api.post("/roadmap/saveroadmap", roadmap);
      alert("Roadmap saved successfully");
    } catch (error) {
      console.log(error);
      alert("Something went wrong while saving");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    setRoadmap(null);
  };

  return (
    <div className="min-h-screen bg-amber-100">
      <div className="md:p-10 p-3">
        <div className="font-bold text-md md:text-xl p-5 bg-amber-200 rounded-2xl pl-10">
          Crete your own <span className="text-violet-600">Roadmap</span>
        </div>

        <div className="md:p-10 py-10 md:text-lg text-sm">
          <form onSubmit={handleSubmit}>
            <div className="md:flex justify-between md:px-20">
              <div className="flex flex-col gap-2 items-start justify-center">
                <label htmlFor="topic-name" className="font-medium">
                  What you want to learn:
                </label>
                <input
                  id="topic-name"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  type="text"
                  placeholder="e.g. React.js"
                  className="bg-amber-200 border border-amber-500 w-[35vw] p-2 rounded-2xl"
                  required
                />
              </div>

              <div className="flex flex-col items-start gap-2 mt-2 justify-center">
                <label className="font-medium ">Available Days:</label>
                <input
                  min="1"
                  type="number"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  placeholder="e.g. 7"
                  className="bg-amber-200 border border-amber-500 p-2 rounded-2xl w-[35vw]"
                  required
                />
              </div>
            </div>

            <div className="md:px-20">
              <div className="flex flex-col items-start gap-2 mt-2 justify-center">
                <label className="font-medium   ">
                  Hours per Day: {hours} hr
                </label>
                <span className="pt-3 pb-2 px-4 border  border-amber-500 rounded-2xl bg-amber-200">
                  <input
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="accent-blue-600 cursor-pointer border md:w-[76vw] w-[60vw]"
                    required
                  />
                </span>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>1 hour - 12 hours</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:px-20 mt-8 justify-between">
              <div className="bg-amber-200 mt-3 p-4 rounded-lg">
                <p className="text-gray-600">Total available study time</p>
                <p className="text-2xl font-bold text-blue-700">
                  {(Number(days) || 0) * hours} hours
                </p>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white mt-10 font-semibold px-4 py-2 rounded-2xl cursor-pointer"
              >
                {loading ? "Loading..." : "Create Roadmap"}
              </button>
            </div>

            {loading && (
              <>
                <Loader />
              </>
            )}
          </form>
        </div>

        {roadmap && (
          <div className="md:p-10 ">
            <RoadmapResult roadmap={roadmap} />
          </div>
        )}

        {roadmap && (
          <div className="border border-white/20 bg-white/10 shadow-lg backdrop-filter backdrop-blur-md px-5 py-2 flex justify-between md:mx-110 rounded-2xl">
            <button
              onClick={handleSave}
              className="bg-green-500/40 border-green-400 border-2  text-green-800 font-semibold text-xl px-5 py-2 rounded-2xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              Save
            </button>
            {saving && <div className="pulse">Saving...</div>}
            <button
              onClick={handleDelete}
              className="bg-red-500/40 border-red-400 border-2  text-red-800 font-semibold text-xl px-5 py-2 rounded-2xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
