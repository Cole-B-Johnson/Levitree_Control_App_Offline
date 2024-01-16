type PressureGaugesProps = {
  values: number[];
};

const PressureGauges = (props: PressureGaugesProps) => {
  return (
    <>
      <h1 className="font-sans text-2xl font-light">Pressure Sensors</h1>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
        {props.values.map((value, i) => {
          return (
            <div className="flex w-full justify-center" key={i}>
              <div className="rounded-md bg-gray-300 py-1 flex-grow text-center text-lg font-bold max-w-44">
                {value} psi
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PressureGauges;
