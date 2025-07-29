import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="flex space-x-4 mb-8">
        <a
          href="https://vite.dev"
          target="_blank"
          className="hover:scale-110 transition-transform"
        >
          <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          className="hover:scale-110 transition-transform"
        >
          <img
            src={reactLogo}
            className="h-24 w-24 animate-spin-slow"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-white mb-8">Vite + React</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors mb-4"
        >
          count is {count}
        </button>
        <p className="text-gray-600">
          Edit{" "}
          <code className="bg-gray-200 px-2 py-1 rounded">src/App.jsx</code> and
          save to test HMR
        </p>
      </div>
      <p className="text-gray-500 mt-8">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
