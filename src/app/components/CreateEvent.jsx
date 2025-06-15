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
  IconCategory,
} from "@tabler/icons-react";
import { useAuth } from "@/app/contexts/AuthContext";

export default function CreateEvent() {
  const { currentUser } = useAuth();
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requiredApproval, setRequiredApproval] = useState(false);
  const [capacity, setCapacity] = useState("");
  const [category, setCategory] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

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

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventPic: previewImage,
          eventName: eventName,
          startDate: startDate,
          endDate: endDate,
          startTime: startTime,
          endtime: endTime,
          location: location,
          description: description,
          category: category,
          approval: requiredApproval,
          capacity: capacity,
          firebaseUid: currentUser.uid,
        }),
      }.
    console.log(response.body));

      if (!response.ok) {
        console.log(response)
        throw new Error("Something went wrong");
      }
      router.push("/home");
    } catch (error) {
     console.log(error.message);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center w-screen py-10 font-semibold text-base">
        <div className="flex flex-col item-center justify-center gap-5 md:w-1/2 lg:w-1/3 ">
          <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 relative">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Event Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400">Upload Event Image</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
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
            <div className="flex px-6 py-4 mb-8 shadow-lg rounded-xl w-full gap-2">
              <IconFileDescription stroke={2} />
              <textarea
                placeholder="Place a description"
                className="w-full outline-0"
                value={description}
                onChange={handleDescription}
              />
            </div>
            <div className="flex items-center gap-4 px-6 py-4 mb-8 shadow-lg rounded-xl w-full bg-white">
              <div className="text-gray-600">
                <IconCategory stroke={2} size={24} />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500 mb-1 font-medium">
                  Category
                </label>
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                >
                  <option value="">Select a Category</option>
                  <option value="Music">Music</option>
                  <option value="Technology">Tech</option>
                  <option value="Sports">Sports</option>
                  <option value="Education">Education</option>
                  <option value="Networking">Networking</option>
                  <option value="Art">Bussiness</option>
                  <option value="Bussiness">Art</option>
                  <option value="Other">Other</option>
                </select>
              </div>
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
          <button
            onClick={handleSubmit}
            className="border shadow-xl py-2 rounded-md hover:bg-gray-100"
          >
            Create Event
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
