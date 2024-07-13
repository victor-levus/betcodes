import React from "react";

const SelectInput = ({ selectOptions = [], defaultValue, register }) => {
  return (
    <select {...register} className="select--input" defaultValue={defaultValue}>
      {selectOptions.map((so) => (
        <option key={so.value} className="option--" value={so.value}>
          {so.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
