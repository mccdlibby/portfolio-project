import React from 'react';
import ProjectList from './components/ProjectList';
import './index.css'; // Ensure you have Tailwind CSS set up

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-10">My Projects</h1>
      <ProjectList />
    </div>
  );
}

export default App;
