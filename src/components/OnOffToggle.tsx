export type OnOffToggleOptions = string;

type OnOffToggleProps = {
  value: OnOffToggleOptions;
  onChange: (value: OnOffToggleOptions) => void;
};

const OnOffToggle = (props: OnOffToggleProps) => {
  const handleChange = (newValue: OnOffToggleOptions) => {
    if (newValue === props.value) {
      // Clicking on the same toggle again, nothing happens
      return;
    }

    props.onChange(newValue);
  };

  return (
    <div className="inline-flex rounded-md w-96" role="group">
      <button
        type="button"
        onClick={() => {
          handleChange("on");
        }}
        className={`h-10 flex justify-center items-center flex-grow py-2 text-lg font-light ${props.value === "on"
          ? "bg-blue-600 text-white"
          : "bg-white text-blue-600 hover:bg-gray-100"
          } rounded-s-lg border border-blue-600  focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700`}
      >
        On
      </button>
      <button
        type="button"
        onClick={() => {
          handleChange("off");
        }}
        className={`h-10 flex justify-center items-center flex-grow py-2 text-lg font-light ${props.value === "off"
          ? "bg-blue-600 text-white"
          : "bg-white text-blue-600 hover:bg-gray-100"
          } rounded-e-lg border border-blue-600  focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700`}
      >
        Off
      </button>
    </div>
  );
};

export default OnOffToggle;
