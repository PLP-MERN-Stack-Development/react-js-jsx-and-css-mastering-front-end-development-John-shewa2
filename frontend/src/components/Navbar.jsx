import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = ({ brand = 'My App', links = [], className = '' }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 ${className}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-gray-900 dark:text-white">{brand}</div>

        <div className="flex items-center space-x-4">
          <nav>
            <ul className="flex space-x-4">
              {links.map((l, i) => (
                <li key={i}>
                  <a
                    href={l.href || '#'}
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Theme toggle button - ensure type="button" so it doesn't submit forms */}
          <button
            type="button"
            onClick={() => {
              // debug log and call toggle
              // eslint-disable-next-line no-console
              console.log('[Navbar] toggle button clicked, theme:', theme);
              toggleTheme();
            }}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border hover:opacity-90"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  brand: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

export default Navbar;