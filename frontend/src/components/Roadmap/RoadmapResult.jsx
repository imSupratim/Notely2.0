import React from "react";

const RoadmapResult = (props) => {
  return (
    <div>
      {/* heading */}
      <div className="rounded-2xl px-5 py-2 bg-amber-200 shadow-xl">
        <div>
          <span className="font-bold md:text-lg text-md text-purple-700">Title:</span>{" "}
          <span className="font-semibold md:text-lg text-md">{props.roadmap.title}</span>
        </div>

        <div>
          <span className="font-bold md:text-lg text-md text-purple-700">
            Hours Per Day:{" "}
          </span>
          <span className="font-semibold md:text-lg text-md">
            {props.roadmap.hoursPerDay}
          </span>
        </div>

        <div>
          <span className="font-bold md:text-lg text-md text-purple-700">
            Total Days:{" "}
          </span>
          <span className="font-semibold md:text-lg text-md">
            {props.roadmap.totalDays}
          </span>
        </div>

        <div>
          <span className="font-bold md:text-lg text-md text-purple-700">
            Total Hours:{" "}
          </span>
          <span className="font-semibold md:text-lg text-md">
            {props.roadmap.totalHours}
          </span>
        </div>
      </div>

      {/* body */}
      <div className="mt-8  md:px-5 py-2 rounded-2xl ">
        {props.roadmap.days.map((day, index) => (
          <div
            key={index}
            className="mt-10 border border-amber-600 md:mx-100 px-5 py-2 rounded-2xl"
          >
            <div
              className="font-bold 
             flex flex-wrap  items-center gap-1"
            >
              <div>
                Day <span>{day.day}:-</span>
              </div>
              <div className="text-purple-600">{day.title}</div>
              <span className="text-xs font-semibold text-gray-500">
                Goal: <span>{day.goal}</span>
              </span>
            </div>

            {/* tasks */}
            <div className="mt-10 mb-8">
              {day.tasks.map((task, index) => (
                <div key={index} className=" bg-amber-200 hover:scale-105 transition-all hover:shadow-2xl rounded-2xl mt-5  px-6 py-2">
                  <div className="flex justify-between font-semibold mt-3  text-gray-600 text-sm">
                    <span>Task: {index + 1}</span>
                    <span>Duration: {task.duration * 60} minutes</span>
                  </div>
                  <div className="flex items-center justify-between font-bold text-orange-700 text-lg mt-3">
                    <span>{task.title}</span>
                    <span className="text-sm">Type: {task.type}</span>
                  </div>
                  <div className="mt-3 mb-3">
                    <span className="text-sm text-gray-600 font-semibold">Description: {task.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapResult;
