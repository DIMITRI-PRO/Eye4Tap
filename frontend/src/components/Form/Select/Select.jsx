import React, { useState } from "react";
import { Button } from "../../Buttons/Button";
import { X } from "../../../assets/FeatherIcons";

export const Select = ({
  id,
  name,
  options,
  onChange,
  initialLabel,
  label,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    if (onChange) {
      const selectedOptionObj = (options || []).find(
        (option) => option.key.toString() === selectedValue
      );
      onChange(selectedOptionObj ? selectedOptionObj.value : null);
    }
  };

  const handleResetClick = () => {
    setSelectedOption("");
    onChange?.(null);
  };

  return (
    <div id={id} className="ninja select-input-type1">
      {label && (
        <label
          id={id && `${id}-label`}
          htmlFor={id && `${id}-select`}
          className={`ninja select-label ${
            (selectedOption === "" || selectedOption === initialLabel) &&
            "default"
          }`}
        >
          {label}
        </label>
      )}
      <select
        id={id && `${id}-select`}
        name={name}
        className={`ninja select-input ${
          (selectedOption === "" || selectedOption === initialLabel) &&
          "default"
        }`}
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option className="ninja select-option-empty" hidden value="">
          {initialLabel || "Sélectionnez une option..."}
        </option>
        {(options || []).map((option) => (
          <option
            style={{ padding: "1rem" }}
            className="ninja select-option"
            key={option.key}
            value={option.key}
          >
            {option.label}
          </option>
        ))}
      </select>
      {selectedOption !== "" && selectedOption !== initialLabel && (
        <Button name="select-reset" onClick={handleResetClick} icon={<X />} />
      )}
    </div>
  );
};