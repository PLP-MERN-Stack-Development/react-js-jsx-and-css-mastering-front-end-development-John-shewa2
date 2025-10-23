import { useState } from 'react';
import './index.css';

// Import your components here
// Import Button from './components/Button.jsx';
import Button from './components/Button';
// import Navbar from './components/Navbar';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import Footer from './components/Footer';
// import TaskManager from './components/TaskManager';
import TaskManager from './components/Taskmanager';
// import public API from './pages/post.jsx';
import Posts from './pages/Posts.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar brand="PLP React App" links={[{ label: 'Home', href: '/' }, { label: 'Tasks', href: '/tasks' }, { label: 'About', href: '/about' }]} />
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">PLP Task Manager</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg mb-4">
              Edit <code className="font-mono bg-gray-200 dark:bg-gray-700 p-1 rounded">src/App.jsx</code> and save to test HMR
            </p>
            
            <div className="flex items-center gap-4 my-4">
              <button
                onClick={() => setCount((count) => count - 1)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                -
              </button>
              <span className="text-xl font-bold">{count}</span>
              <button
                onClick={() => setCount((count) => count + 1)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                +
              </button>
            </div>

            <TaskManager />
            
            <div className="flex gap-4 mt-4">
              <Button variant="primary" onClick={() => console.log('Primary clicked')}>Primary</Button>
              <Button variant="secondary" onClick={() => console.log('Secondary clicked')}>Secondary</Button>
              <Button variant="danger" onClick={() => console.log('Danger clicked')}>Danger</Button>
          </div>
          </div>
        </div>
        
        {/* API data display will go here */}
        <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">API Data</h2>
          <Posts />
        </div>
      </main>
      
      <Footer links={[{ label: 'Privacy', href: '/privacy' }, { label: 'Terms', href: '/terms' }]} />
    </div>
  );
}

export default App; 