import React, { useState, useEffect } from 'react';

const useTitle = () => {
  const [title, setTitle] = useState(null);

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerText = title;
  }, [title]);

  return setTitle;
};

export default useTitle;
