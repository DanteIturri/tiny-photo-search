import React, { type FC, type FormEvent } from 'react';

interface FormImgProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: string) => void;
}

// Styles
import './styles/form.css';

export const Form:FC<FormImgProps> = ({ handleSubmit, handleInputChange }) => {
  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <label className="w-100">
        {' '}
        <input
          className=""
          type="text"
          name="inputText"
          placeholder="Search for a photo pressed enter"
          autoComplete="off"
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </label>
    </form>
  );
};
