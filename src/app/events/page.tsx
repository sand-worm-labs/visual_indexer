"use client";

import { useState } from "react";

export default function EvmEventsPage() {
  const [contractAddress, setContractAddress] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAbiAndEvents = async () => {
    setEvents([]);
    setError(null);

    try {
      const res = await fetch(
        `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=YourEtherscanAPIKey`
      );
      const json = await res.json();
      const abi = JSON.parse(json.result);

      const eventDefs = abi.filter((item: any) => item.type === "event");
      setEvents(eventDefs);
    } catch (err: any) {
      console.error(err);
      setError("Could not fetch ABI or events. Is the contract verified?");
    }
  };

  return (
    <main className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">🔎 EVM Contract Events</h1>

      <input
        type="text"
        className="w-full border rounded p-2"
        placeholder="Enter EVM contract address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />

      <button
        onClick={fetchAbiAndEvents}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Fetch Events
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {events.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Events Found: {events.length}</h2>
          {events.map((evt, idx) => (
            <div key={idx} className="p-4 border rounded bg-gray-50">
              <p className="font-bold">{evt.name}</p>
              <ul className="text-sm text-gray-700">
                {evt.inputs.map((input: any, i: number) => (
                  <li key={i}>
                    - {input.name || `[unnamed]`} : {input.type} {input.indexed ? "(indexed)" : ""}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
