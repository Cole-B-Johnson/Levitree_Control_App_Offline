import { useState } from "react";
import OnOffToggle from "./OnOffToggle";
import toast from "react-hot-toast";
import Sensor from "./Sensor";
import Range from "@/components/Range";

const AutopilotController = () => {
  const [wood, setWood] = useState(0);
  const [pulp, setPulp] = useState(0);
  const [toggle, setToggle] = useState("off");
  const [currentLevel] = useState(0);
  const [dischargeRate] = useState(0);
  const [waterComp, setWaterComp] = useState(100);

  const toggleChanged = async (event: string) => {
    const newToggleState = event;

    if (newToggleState === toggle) {
      return;
    }
    try {
      const fakeState = newToggleState ? "on" : "off";
      const resp = await fetch(
        `http://localhost:3001/default/vfd_input?pump=autopilot&drive_mode=${fakeState}`,
      );
      if (!resp.ok) {
        throw null;
      }
      setToggle(newToggleState);
      toast.success(`Autopilot state changed`);
    } catch {
      toast.error(`Couldn't set Autopilot state!`);
    }
  };

  const updateDistance = async (newDistance: number) => {
    //Attempt to set "pump" state
    try {
      const resp = await fetch(
        `http://localhost:3001/default/vfd_input?pump=autopilot&speed=${newDistance}`,
      );
      if (!resp.ok) {
        throw null;
      }
      toast.success(`Autopilot level changed`);
    } catch {
      toast.error(`Couldn't set autopilot level!`);
    }
  };

  const updateFlowRate = async (newFlowRate: number) => {
    console.log(newFlowRate);
  };

  const updateWood = async (newWood: number) => {
    console.log(newWood);
    setWood(newWood);
    setWaterComp(100 - newWood - pulp);
  };

  const updatePulp = async (newPulp: number) => {
    console.log(newPulp);
    setPulp(newPulp);
    setWaterComp(100 - newPulp - wood);
  };

  return (
    <>
      <div className="flex flex-col pt-2 gap-5">
        <div className="flex w-full justify-center items-center">
          <OnOffToggle value={toggle} onChange={toggleChanged} />
        </div>
        <h1 className="font-sans text-2xl font-light w-full">Controls</h1>
        <div className="grid w-full grid-cols-2 lg:px-4 gap-10">
          <div className="col-span-2 lg:col-span-1 flex flex-col items-center">
            <div className="text-xl font-light">Distance From Top of Tank</div>
            <div className="w-full flex items-center">
              <Range
                min={0}
                max={60}
                value={0}
                onChange={updateDistance}
                legend={`"`}
              />
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1 flex flex-col items-center">
            <div className="text-xl font-light">Flow Rate</div>
            <div className="w-full flex items-center">
              <Range
                min={0}
                max={60}
                value={0}
                onChange={updateFlowRate}
                legend="m³/hr"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full gap-10">
          <Sensor name="Distance from Top" value={currentLevel} units={`in`} />
          <Sensor name="Discharge Rate" value={dischargeRate} units={`m³/hr`} />
        </div>
        <h1 className="font-sans text-2xl font-light w-full mt-4">
          Slurry Composition
        </h1>
        <div className="grid w-full grid-cols-2 lg:px-4 gap-10">
          <div className="col-span-2 lg:col-span-1 flex flex-col items-center">
            <div className="text-xl font-light">Wood Chips</div>
            <div className="w-full flex items-center">
              <Range
                min={0}
                max={50}
                value={0}
                onChange={updateWood}
                legend="%"
              />
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1 flex flex-col items-center">
            <div className="text-xl font-light">Paper Pulp</div>
            <div className="w-full flex items-center">
              <Range
                min={0}
                max={50}
                value={0}
                onChange={updatePulp}
                legend="%"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full gap-10">
          <Sensor name="Wood Chips" value={wood} units="%" />
          <Sensor name="Paper Pulp" value={pulp} units="%" />
          <Sensor name="Water" value={waterComp} units="%" />
        </div>
      </div>
    </>
  );
};

export default AutopilotController;
