import { useEffect, useState } from "react";

type RiskLevel = "low" | "medium" | "high";

export default function SettingsPanel() {
  const [riskLevel, setRiskLevel] = useState<RiskLevel>("medium");
  const [ambientMode, setAmbientMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("juno-settings");
    if (stored) {
      const parsed = JSON.parse(stored);
      setRiskLevel(parsed.riskLevel || "medium");
      setAmbientMode(parsed.ambientMode || false);
    }
  }, []);

  useEffect(() => {
    const settings = { riskLevel, ambientMode };
    localStorage.setItem("juno-settings", JSON.stringify(settings));
  }, [riskLevel, ambientMode]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-glass backdrop-blur-lg rounded-2xl text-white shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Basecamp Settings</h2>

      {/* Risk Preference */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Alert Sensitivity</label>
        <select
          className="w-full p-2 rounded-xl text-black"
          value={riskLevel}
          onChange={(e) => setRiskLevel(e.target.value as RiskLevel)}
        >
          <option value="low">Low – Only critical risks</option>
          <option value="medium">Medium – Balanced alerts</option>
          <option value="high">High – Show all warnings</option>
        </select>
      </div>

      {/* Ambient Mode Toggle */}
      <div className="flex items-center justify-between">
        <span className="font-medium">Ambient Jungle Effects</span>
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={ambientMode}
            onChange={() => setAmbientMode(!ambientMode)}
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-400"></div>
        </label>
      </div>
    </div>
  );
}
