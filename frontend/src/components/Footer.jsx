import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ links = [], copyright, className = '' }) => {
  return (
    <footer className={`bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 ${className}`}>
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {copyright || '© PLP Task Manager. All rights reserved.'}
        </div>
        <div className="mt-3 md:mt-0">
          <ul className="flex space-x-4 text-sm">
            {links.map((l, i) => (
              <li key={i}>
                <a href={l.href || '#'} className="text-gray-600 dark:text-gray-300 hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ),
  copyright: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
};

export default Footer;