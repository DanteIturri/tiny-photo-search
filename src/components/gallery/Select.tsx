import React, { useEffect, useRef, useState, type FC } from 'react';
import './styles/select.css';

type selectProps = {
  handleOrientationChange: (string: 'landscape' | 'portrait' | 'square' | '') => void,
  options: string[];

};

export const Select: FC<selectProps> = ({ handleOrientationChange, options }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setIsActive(false); 
    const ORIENTACION_OPTIONS: { [key: string]: 'landscape' | 'portrait' | '' } = {
      HORIZONTAL: 'landscape',
      VERTICAL: 'portrait',
      TODAS: '',
    };
    handleOrientationChange(ORIENTACION_OPTIONS[option]);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (optionsRef.current instanceof HTMLElement && !optionsRef.current.contains(event.target as Node)) {
        setIsActive(false); 
    }
};

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="select-box" ref={optionsRef}>
      <div className="select" id="select" onClick={toggleDropdown}>
        <span>{selectedOption === '' ? 'TODAS' : selectedOption}</span>
        <svg
          id="arrow"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
        >
          <path
            d="M4.29289 5.29289L0.707107 1.70711C0.0771422 1.07714 0.52331 2.66344e-07 1.41421 4.22115e-07L8.58579 1.67603e-06C9.47669 1.8318e-06 9.92286 1.07715 9.29289 1.70711L5.70711 5.29289C5.31658 5.68342 4.68342 5.68342 4.29289 5.29289Z"
            fill="#A1A3AF"
          />
        </svg>
      </div>
      <div className={`select-options ${isActive ? '' : 'hide'}`} id="options">
        {['TODAS',...options].map(
          (option, index) => (
            <div
              key={index}
              className="option"
              onClick={() => handleOptionClick(option)}
              data-value={option}
            >
              <span>{option}</span>
            </div>
          )
        )}
      </div>
      <input type="hidden" value={selectedOption} />
    </div>
  );
};
