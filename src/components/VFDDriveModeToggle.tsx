import { useState } from "react";

//Mapping taken from server.js
export type VFDDriveModeOptions = string;

type VFDDriveModeToggleProps = {
  value: VFDDriveModeOptions;
  onChange: (value: VFDDriveModeOptions) => void;
};

const VFDDriveModeToggle = (props: VFDDriveModeToggleProps) => {
  const [value, setValue] = useState(props.value);

  const handleChange = (newValue: VFDDriveModeOptions) => {
    if (newValue === value) {
      // Clicking on the same toggle again, nothing happens
      return;
    }

    setValue(newValue);
    props.onChange(newValue);
  };

  return (
    <div className="w-100 inline-flex flex-grow rounded-md" role="group">
      <button
        type="button"
        onClick={() => {
          handleChange("fwd");
        }}
        className={`h-14 flex-grow py-2 text-lg font-light ${value === "fwd"
            ? "bg-blue-600 text-white"
            : "bg-white text-blue-600 hover:bg-gray-100"
          } rounded-s-lg border border-blue-600  focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700`}
      >
        Forward
      </button>
      <button
        type="button"
        onClick={() => {
          handleChange("rev");
        }}
        className={`h-14 flex-grow py-2 text-lg font-light ${value === "rev"
            ? "bg-blue-600 text-white"
            : "bg-white text-blue-600 hover:bg-gray-100"
          } border border-blue-600 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700`}
      >
        Reverse
      </button>
      <button
        type="button"
        onClick={() => {
          handleChange("stop");
        }}
        className={`h-14 flex-grow py-2 text-lg font-light ${value === "stop"
            ? "bg-blue-600 text-white"
            : "bg-white text-blue-600 hover:bg-gray-100"
          } rounded-e-lg border border-blue-600  focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700`}
      >
        Off
      </button>
    </div>
  );
};

export default VFDDriveModeToggle;
