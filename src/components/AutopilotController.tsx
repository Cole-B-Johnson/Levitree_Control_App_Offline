import { ChangeEvent, useState } from "react";
import OnOffToggle from "./OnOffToggle";
import toast from "react-hot-toast";

const AutopilotController = () => {
    const [distance, setDistance] = useState(0);
    const [toggle, setToggle] = useState("off");
    const [currentLevel] = useState(0);

    const toggleChanged = async (event: string) => {
        const newToggleState = event;

        if (newToggleState === toggle) {
            return;
        }
        try {
            const fakeState = newToggleState ? "fwd" : "rev"
            const resp = await fetch(`http://localhost:3001/default/vfd_input?pump=autopilot&drive_mode=${fakeState}`)
            if (!resp.ok) {
                throw null;
            }
            setToggle(newToggleState);
            toast.success(`Auto Pilot state changed`)
        } catch {
            toast.error(`Couldn't set Auto Pilot state!`)
        }
    };

    const distanceSliderChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const newDistance = parseInt(event.target.value);

        if (newDistance === distance) {
            return;
        }

        setDistance(newDistance);
    };

    const updateDistance = async () => {
        //Attempt to set "pump" state
        try {
            const resp = await fetch(`http://localhost:3001/default/vfd_input?pump=autopilot&speed=${distance}`)
            if (!resp.ok) {
                throw null;
            }
            toast.success(`Auto Pilot level changed`)
        } catch {
            toast.error(`Couldn't set autopilot level!`);
        }
    }

    return (
        <>
            <div className="grid grid-cols-6 gap-2">
                <div className="col-span-6 mt-2 flex flex-col justify-start gap-10 lg:col-span-2">
                    <h1 className="font-sans text-4xl font-light">Auto Pilot</h1>
                    <OnOffToggle value={toggle} onChange={toggleChanged} />
                </div>
                <div className="col-span-6 mr-4 mt-0 flex flex-col gap-2 p-4 pb-0 pt-0 lg:col-span-4">
                    <div className="flex h-min w-full items-center justify-between gap-4 p-4">
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
                        <div className="w-44 text-right text-lg font-bold">
                            {distance}&quot; From Top
                        </div>
                    </div>
                    <div className="flex h-min items-center justify-between gap-4 p-4 pr-0">
                        <div className="flex w-44 flex-col items-center gap-2">
                            <h6 className="w-full text-center font-semibold">
                                Current level
                            </h6>
                            <div className="w-full rounded-md bg-gray-300 py-1 text-center text-lg font-bold">
                                {currentLevel}&quot;
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AutopilotController;
