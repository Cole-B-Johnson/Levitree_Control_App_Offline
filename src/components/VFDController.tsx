import toast from "react-hot-toast";
import VFDDriveModeToggle, { VFDDriveModeOptions } from "./VFDDriveModeToggle";
import { ChangeEvent, useState } from "react";

type VFDControllerProps = {
    name: string;
    pumpID: string;
    extraMeasurementName?: string;
    extraMeasurementValue?: number;
    extraMeasurementUnits?: string;
};

const VFDController = (props: VFDControllerProps) => {
    const [outputFreq, setOutputFreq] = useState(0);
    const [driveMode, setDriveMode] = useState("stop");
    const frequencySliderChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const newFreq = parseInt(event.target.value);

        if (newFreq === outputFreq) {
            return;
        }

        setOutputFreq(newFreq);
    };

    const updateFrequency = () => {
        return;
    };

    const updateDriveMode = (newDriveMode: VFDDriveModeOptions) => {
        fetch(`http://localhost:3001/default/vfd_input?pump=${props.pumpID}&drive_mode=${newDriveMode}`)
            .then(() => {
                setDriveMode(newDriveMode);
            })
            .catch(() => {
                toast.error(`Couldn't set drive mode for ${props.name}`)
            });
    }

    return (
        <>
            <div className="grid grid-cols-6 gap-2">
                <div className="col-span-6 mt-2 flex flex-col justify-start gap-10 lg:col-span-2">
                    <h1 className="font-sans text-4xl font-light">{props.name}</h1>
                    <VFDDriveModeToggle
                        value={driveMode}
                        onChange={updateDriveMode}
                    ></VFDDriveModeToggle>
                </div>
                <div className="col-span-6 mr-4 mt-0 flex flex-col gap-1 p-4 pb-0 pt-0 lg:col-span-4">
                    <div className="flex h-min items-center justify-start gap-4 p-4">
                        <input
                            type="range"
                            value={outputFreq}
                            onChange={frequencySliderChanged}
                            onMouseUp={updateFrequency}
                            onTouchEnd={updateFrequency}
                            max={90}
                            min={0}
                            className="h-4 w-full cursor-pointer appearance-none rounded-lg bg-gray-300 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                        />
                        <div className="w-6 text-lg font-bold">{outputFreq}Hz</div>
                    </div>
                    <div className="flex h-min justify-start items-end gap-4 p-4 pr-0">
                        <div className="flex w-44 flex-col items-center gap-2">
                            <h6 className="w-full text-center font-semibold">Current Mode</h6>
                            <div className="w-full rounded-md bg-gray-300 py-1 text-center text-lg font-bold">
                                {driveMode === "fwd"
                                    ? "Forward"
                                    : driveMode === "rev"
                                        ? "Reverse"
                                        : "Off"}
                            </div>
                        </div>
                        <div className="flex w-44 flex-col items-center gap-2">
                            <h6 className="w-full text-center font-semibold">
                                Output freq
                            </h6>
                            <div className="w-full rounded-md bg-gray-300 py-1 text-center text-lg font-bold">
                                {0}Hz
                            </div>
                        </div>
                        <div className="flex w-44 flex-col items-center gap-2">
                            <h6 className="w-full text-center font-semibold">Input power</h6>
                            <div className="w-full rounded-md bg-gray-300 py-1 text-center text-lg font-bold">
                                {0} W
                            </div>
                        </div>
                        <div className="flex w-44 flex-col items-center gap-2">
                            <h6 className="w-full text-center font-semibold">
                                Output current
                            </h6>
                            <div className="w-full rounded-md bg-gray-300 py-1 text-center text-lg font-bold">
                                {0} A
                            </div>
                        </div>
                        <div className="flex w-44 flex-col items-center gap-2">
                            <h6 className="w-full text-center font-semibold">
                                Output voltage
                            </h6>
                            <div className="w-full rounded-md bg-gray-300 py-1 text-center text-lg font-bold">
                                {0} V
                            </div>
                        </div>
                        {props.extraMeasurementName !== undefined &&
                            props.extraMeasurementValue !== undefined ? (
                            <>
                                <div className="flex-grow"></div>
                                <div className="flex w-44 flex-col items-center gap-2">
                                    <h6 className="w-full text-center font-semibold">
                                        {props.extraMeasurementName}
                                    </h6>
                                    <div className="w-full rounded-md bg-gray-300 py-1 text-center text-lg font-bold">
                                        {props.extraMeasurementValue} {props.extraMeasurementUnits}
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default VFDController;
