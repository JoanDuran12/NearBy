import { useState, useEffect } from "react";

// Mock API calls (replace with real API calls)
const fetchUserInfo = async () => ({
  name: "Joan Duran",
  email: "joanmanuel808@gmail.com",
  // age: 28,
});
const fetchUserPreferences = async () => ({
  theme: "Dark",
  notifications: true,
});
const deleteAccount = async () => {
  // Call your API to delete the account
  alert("Account deleted!");
};

// Prevent clicks inside the modal from closing it
const handleModalClick = (e) => {
  e.stopPropagation();
};

export default function Settings({ onClose }) {
  const [activeTab, setActiveTab] = useState("Delete");
  const [userInfo, setUserInfo] = useState(null);
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    if (activeTab === "Information") {
      fetchUserInfo().then(setUserInfo);
    } else if (activeTab === "Preferences") {
      fetchUserPreferences().then(setPreferences);
    }
  }, [activeTab]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50 z-50"
      onClick={onClose} // Close when clicking the backdrop
    >
      <div
        className="flex flex-col w-[700px] h-[300px] bg-white rounded-md shadow-lg border border-gray-300"
        onClick={handleModalClick} // Prevent closing when clicking the modal
      >
        {/* Settings Title at the Top */}
        <div className="flex items-center border-b border-gray-200 py-4 px-8">
          <h2 className="text-2xl font-bold">Settings</h2>
        </div>
        {/* Side Nav and Content */}
        <div className="flex flex-1">
          <nav className="w-48 border-r border-gray-200 p-6 flex flex-col gap-4">
            <button
              className={`text-left py-2 px-3 rounded hover:bg-gray-200 ${
                activeTab === "Information" ? "bg-gray-200 font-bold" : ""
              }`}
              onClick={() => setActiveTab("Information")}
            >
              Information
            </button>
            {/* <button
              className={`text-left py-2 px-3 rounded hover:bg-gray-200 ${
                activeTab === "Preferences" ? "bg-gray-200 font-bold" : ""
              }`}
              onClick={() => setActiveTab("Preferences")}
            >
              Preferences
            </button> */}
            <button
              className={`text-left py-2 px-3 rounded text-red-600 hover:bg-gray-200 ${
                activeTab === "Delete" ? "bg-gray-200 font-bold" : ""
              }`}
              onClick={() => setActiveTab("Delete")}
            >
              Delete Account
            </button>
          </nav>
          {/* Content */}
          <div className="flex-1 p-6">
            {activeTab === "Information" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Information</h2>
                {userInfo ? (
                  <ul className="space-y-2">
                    <li>
                      <strong>Name:</strong> {userInfo.name}
                    </li>
                    <li>
                      <strong>Email:</strong> {userInfo.email}
                    </li>
                    {/* <li>
                      <strong>Age:</strong> {userInfo.age}
                    </li> */}
                  </ul>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            )}
            {/* {activeTab === "Preferences" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Preferences</h2>
                {preferences ? (
                  <ul className="space-y-2">
                    <li>
                      <strong>Theme:</strong> {preferences.theme}
                    </li>
                    <li>
                      <strong>Notifications:</strong>{" "}
                      {preferences.notifications ? "On" : "Off"}
                    </li>
                  </ul>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            )} */}
            {activeTab === "Delete" && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-red-600">
                  Delete Account
                </h2>
                <p className="mb-4">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={deleteAccount}
                >
                  Delete Account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
