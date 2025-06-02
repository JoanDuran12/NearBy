"use client";
import React, { useState } from "react";
import ProtectedRoute from "./auth/ProtectedRoute";
import {
  IconMapPin,
  IconFileDescription,
  IconUserCheck,
  IconUserUp,
  IconInnerShadowTop,
  IconInnerShadowBottom,
} from "@tabler/icons-react";

export default function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requiredApproval, setRequiredApproval] = useState(false);
  const [capacity, setCapacity] = useState("");

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleRequiredApprovalChange = () => {
    setRequiredApproval((prev) => !prev);
  };

  const handleCapacityChange = (e) => {
    setCapacity(e.target.value);
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center w-screen py-10 font-semibold text-base">
        <div className="flex flex-col item-center justify-center gap-5 md:w-1/2 lg:w-1/3 ">
          <div>
            <img
              className="rounded-xl w-full h-auto max-h-[300px]"
              src="https://placehold.co/600x300"
              alt="Placeholder"
            />
          </div>
          <div className="flex flex-col bg-white rounded-lg">
            <textarea
              placeholder="Event Name"
              value={eventName}
              onChange={handleEventNameChange}
              className="font-semibold text-4xl mb-4 outline-0 my-2 px-4 py-2 "
              required
            />
            <div className="flex justify-between px-6 py-2 mb-8 shadow-lg rounded-xl">
              <div className="flex flex-col mr-4 mb-2">
                <div className="flex gap-2 mb-2">
                  <IconInnerShadowBottom stroke={2} />
                  <span className="">Start</span>
                </div>
                <div className="flex gap-2">
                  <IconInnerShadowTop stroke={2} />
                  <span>End</span>
                </div>
              </div>
              <div className="flex flex-col">
                <input
                  className="mb-2"
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
              <div className="flex flex-col">
                <input
                  className="mb-2"
                  type="time"
                  value={startTime}
                  onChange={handleStartTimeChange}
                />
                <input
                  type="time"
                  value={endTime}
                  onChange={handleEndTimeChange}
                />
              </div>
            </div>
            <div className="flex px-6 py-4 mb-8 shadow-lg rounded-xl gap-2">
              <IconMapPin stroke={2} />
              <input
                type="text"
                placeholder="Set an event location"
                className="w-full outline-0"
                value={location}
                onChange={handleLocation}
              />
            </div>
            <div className="flex px-6 py-4 mb-8 shadow-lg rounded-xl w-full gap-2 ">
              <IconFileDescription stroke={2} />
              <textarea
                type="text"
                placeholder="Place a description"
                className="w-full outline-0"
                value={description}
                onChange={handleDescription}
              />
            </div>
            <h2 className="mb-2">Event Options</h2>
            <div className="px-6 py-4 mb-4 shadow-lg rounded-xl w-full ">
              <div className="flex justify-between w-full mb-2 pb-2 ">
                <div className="flex gap-2">
                  <IconUserCheck stroke={2} />
                  <span>Required Approval</span>
                </div>
                <input
                  type="checkbox"
                  className=" outline-0 mr-4"
                  checked={requiredApproval}
                  onChange={handleRequiredApprovalChange}
                />
              </div>
              <div className="flex justify-between w-full">
                <div className="flex gap-2">
                  <IconUserUp stroke={2} />
                  <span>Capacity</span>
                </div>
                <input
                  type="number"
                  className=" outline-0 w-1/2 text-right"
                  placeholder="Enter Capacity"
                  value={capacity}
                  onChange={handleCapacityChange}
                  min={1}
                  max={50}
                />
              </div>
            </div>
          </div>
          <button className="border shadow-xl py-2 rounded-md hover:bg-gray-100">
            Create Event
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
