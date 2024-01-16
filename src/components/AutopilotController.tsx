import { ChangeEvent, useState } from "react";
import OnOffToggle from "./OnOffToggle";
import toast from "react-hot-toast";
import Sensor from "./Sensor";

const AutopilotController = () => {
    const [distance, setDistance] = useState(0);
    const [flowRate, setFlowRate] = useState(0);
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
            const fakeState = newToggleState ? "on" : "off"
            const resp = await fetch(`http://localhost:3001/default/vfd_input?pump=autopilot&drive_mode=${fakeState}`)
            if (!resp.ok) {
                throw null;
            }
            setToggle(newToggleState);
            toast.success(`Autopilot state changed`)
        } catch {
            toast.error(`Couldn't set Autopilot state!`)
        }
    };

    const distanceSliderChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const newDistance = parseInt(event.target.value);

        if (newDistance === distance) {
            return;
        }

        setDistance(newDistance);
    };

    const flowRateSliderChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const newFlowRate = parseInt(event.target.value);

        if (newFlowRate === flowRate) {
            return;
        }

        setFlowRate(newFlowRate);
    };

    const woodSliderChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const newWood = parseInt(event.target.value);

        if (newWood === wood) {
            return;
        }

        setWood(newWood);
        setWaterComp(100 - newWood - pulp);
    };

    const pulpSliderChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const newPulp = parseInt(event.target.value);

        if (newPulp === pulp) {
            return;
        }

        setPulp(newPulp);
        setWaterComp(100 - wood - newPulp);
    };

    const updateDistance = async () => {
        //Attempt to set "pump" state
        try {
            const resp = await fetch(`http://localhost:3001/default/vfd_input?pump=autopilot&speed=${distance}`)
            if (!resp.ok) {
                throw null;
            }
            toast.success(`Autopilot level changed`)
        } catch {
            toast.error(`Couldn't set autopilot level!`);
        }
    }

    const updateFlowRate = async () => {
        //Attempt to set "pump" state
        /*
        try {
            const resp = await fetch(`http://localhost:3001/default/vfd_input?pump=autopilot&speed=${distance}`)
            if (!resp.ok) {
                throw null;
            }
            toast.success(`Autopilot level changed`)
        } catch {
            toast.error(`Couldn't set autopilot level!`);
        }
        */
    }

    const updateWood = async () => {
        //Attempt to set "pump" state
        /*
        try {
            const resp = await fetch(`http://localhost:3001/default/vfd_input?pump=autopilot&speed=${distance}`)
            if (!resp.ok) {
                throw null;
            }
            toast.success(`Autopilot level changed`)
        } catch {
            toast.error(`Couldn't set autopilot level!`);
        }
        */
    }

    const updatePulp = async () => {
        //Attempt to set "pump" state
        /*
        try {
            const resp = await fetch(`http://localhost:3001/default/vfd_input?pump=autopilot&speed=${distance}`)
            if (!resp.ok) {
                throw null;
            }
            toast.success(`Autopilot level changed`)
        } catch {
            toast.error(`Couldn't set autopilot level!`);
        }
        */
    }

    return (
        <>
            <div className="flex flex-col pt-2 gap-5">
                <div className="flex justify-between items-center">
                    <h1 className="font-sans text-3xl font-light">Autopilot</h1>
                    <OnOffToggle value={toggle} onChange={toggleChanged} />
                </div>
                <h1 className="font-sans text-2xl font-light w-full">Controls</h1>
                <div className="grid w-full grid-cols-6 lg:px-4">
                    <div className="col-span-6 lg:col-span-4 flex items-center">
                        <input
                            type="range"
                            value={distance}
                            onChange={distanceSliderChanged}
                            onTouchEnd={updateDistance}
                            onMouseUp={updateDistance}
                            max={60}
                            min={0}
                            className="h-4 w-full cursor-pointer appearance-none rounded-lg bg-gray-300 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                        />
                    </div>
                    <div className="lg:text-right text-center text-lg font-bold whitespace-nowrap col-span-6 lg:col-span-2">
                        {distance}&quot; Distance From Top of Tank
                    </div>
                </div>
                <div className="grid w-full grid-cols-6 lg:px-4 lg:mt-5">
                    <div className="col-span-6 lg:col-span-4 flex items-center">
                        <input
                            type="range"
                            value={flowRate}
                            onChange={flowRateSliderChanged}
                            onTouchEnd={updateFlowRate}
                            onMouseUp={updateFlowRate}
                            max={60}
                            min={0}
                            className="h-4 w-full cursor-pointer appearance-none rounded-lg bg-gray-300 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                        />
                    </div>
                    <div className="lg:text-right text-center text-lg font-bold whitespace-nowrap col-span-6 lg:col-span-2">
                        {flowRate} m³/hr Flow Rate
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full gap-10">
                <Sensor name="Distance from Top" value={currentLevel} units={`in`} />
                <Sensor name="Discharge Rate" value={dischargeRate} units={`m³/hr`} />
            </div>

            <div className="grid grid-cols-6 gap-2">
                <div className="col-span-6 mt-2 flex flex-col justify-start gap-10 lg:col-span-2">
                    <h1 className="font-sans text-2xl font-light">Slurry Composition</h1>
                    <div className="flex h-min items-center justify-start gap-4 p-4 pr-0">
                        <Sensor name="Water composition" value={waterComp} units={`%`} />
                    </div>
                </div>
                <div className="col-span-6 mr-4 mt-0 flex flex-col gap-2 p-4 pb-0 pt-0 lg:col-span-4">
                    <div className="flex h-min w-full items-center justify-between gap-4 p-4">
                        <h1 className="font-sans text-2xl font-light whitespace-nowrap w-32">Wood Chips</h1>
                        <input
                            type="range"
                            value={wood}
                            onChange={woodSliderChanged}
                            onTouchEnd={updateWood}
                            onMouseUp={updateWood}
                            max={50}
                            min={0}
                            className="h-4 w-full cursor-pointer appearance-none rounded-lg bg-gray-300 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                        />
                        <div className="w-44 text-right text-lg font-bold">
                            {wood} %
                        </div>
                    </div>
                    <div className="flex h-min w-full items-center justify-between gap-4 p-4">
                        <h1 className="font-sans text-2xl font-light whitespace-nowrap w-32">Paper Pulp</h1>
                        <input
                            type="range"
                            value={pulp}
                            onChange={pulpSliderChanged}
                            onTouchEnd={updatePulp}
                            onMouseUp={updatePulp}
                            max={50}
                            min={0}
                            className="h-4 w-full cursor-pointer appearance-none rounded-lg bg-gray-300 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                        />
                        <div className="w-44 text-right text-lg font-bold">
                            {pulp} %
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AutopilotController;
