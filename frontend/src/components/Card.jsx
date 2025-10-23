import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, image, children, footer, className = '' }) => {
  return (
    <article className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden ${className}`}>
      {image && <img src={image} alt="" className="w-full h-48 object-cover" />}
      <div className="p-4">
        {title && <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>}
        <div className="text-gray-700 dark:text-gray-300">{children}</div>
      </div>
      {footer && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          {footer}
        </div>
      )}
    </article>
  );
};

Card.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  image: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
};

export default Card;