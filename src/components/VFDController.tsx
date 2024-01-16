import toast from "react-hot-toast";
import VFDDriveModeToggle, { VFDDriveModeOptions } from "./VFDDriveModeToggle";
import { ChangeEvent, useEffect, useState } from "react";

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
    const [currentDriveMode, setCurrentDriveMode] = useState("stop");
    const [currentOutputFrequency, setCurrentOutputFrequency] = useState(0);
    const [currentInputPower, setCurrentInputPower] = useState(0);
    const [currentOutputCurrent, setCurrentOutputCurrent] = useState(0);
    const [currentOutputVoltage, setCurrentOutputVoltage] = useState(0);

    const frequencySliderChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const newFreq = parseInt(event.target.value);

        if (newFreq === outputFreq) {
            return;
        }

        setOutputFreq(newFreq);
    };

    const updateFrequency = async () => {
        try {
            const resp = await fetch(`http://localhost:3001/default/vfd_input?pump=${props.pumpID}&speed=${outputFreq}`)
            if (!resp.ok) {
                throw null;
            }
            toast.success(`Speed changed for ${props.name}`)
        } catch {
            toast.error(`Couldn't set speed for ${props.name}`)
        }
    };

    const updateDriveMode = async (newDriveMode: VFDDriveModeOptions) => {
        try {
            const fakeState = (newDriveMode === "fwd") ? "on" : (newDriveMode === "rev") ? "off" : "null"
            const resp = await fetch(`http://localhost:3001/default/vfd_input?pump=${props.pumpID}&drive_mode=${fakeState}`)
            if (!resp.ok) {
                throw null;
            }
            setDriveMode(newDriveMode);
            toast.success(`Drive mode changed for ${props.name}`)
        } catch {
            toast.error(`Couldn't set drive mode for ${props.name}`)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/default/vfd_output?pump=${props.pumpID}`);
                const data = await response.json();  // get the response as a string

                if (data instanceof Array) {
                    return;
                }

                let newDriveMode = "";
                if (data['current_mode'] == 2052 || data['current_mode'] == 2048 || data['current_mode'] == 4) {
                    newDriveMode = 'stop';
                }
                else if (data['current_mode'] == 2049 || data['current_mode'] == 1) {
                    newDriveMode = 'fwd';
                }
                else if (data['current_mode'] == 2050 || data['current_mode'] == 2) {
                    newDriveMode = 'rev';
                }

                if (currentDriveMode !== newDriveMode) {
                    setCurrentDriveMode(newDriveMode);
                    setDriveMode(newDriveMode);
                }

                const newInputPower = data['input_power'];
                if (currentInputPower !== newInputPower) {
                    setCurrentInputPower(newInputPower);
                }

                const newOutputFrequency = data['output_frequency'] / 100;
                if (currentOutputFrequency !== newOutputFrequency) {
                    setCurrentOutputFrequency(newOutputFrequency);
                }

                const newOutputCurrent = data['output_current'] / 100;
                if (currentOutputCurrent !== newOutputCurrent) {
                    setCurrentOutputCurrent(newOutputCurrent);
                }

                const newOutputVoltage = data['output_voltage'];
                if (currentOutputVoltage !== newOutputVoltage) {
                    setCurrentOutputVoltage(newOutputVoltage);
                }
            } catch (error) {
                toast.error(`Couldn't get VFD state for ${props.name}!`)
                console.error(error)
            }
        };

        fetchData();
        setDriveMode("rev");

        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);
        return () => clearInterval(intervalId);
    }, [props.pumpID, props.name, currentDriveMode, currentInputPower, currentOutputFrequency, currentOutputCurrent, currentOutputVoltage]);

    return (
        <>
            <div className="grid grid-cols-6 gap-2">
                <div className="col-span-6 mt-2 flex flex-col justify-start gap-5 lg:col-span-2">
                    <h1 className="font-sans text-2xl font-light">{props.name}</h1>
                    <VFDDriveModeToggle
                        value={driveMode}
                        onChange={updateDriveMode}
                    ></VFDDriveModeToggle>
                </div>
                <div className="col-span-6 mr-4 mt-0 flex flex-col gap-0 p-4 pb-0 pt-0 lg:col-span-4">
                    <div className="flex h-min items-center justify-start gap-4 p-4 pb-0">
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
                    <div className="flex h-min justify-start items-end gap-4 p-4 pr-0 mt-[-10px]">
                        <div className="flex w-44 flex-col items-center gap-2">
                            <h6 className="w-full text-center font-semibold">Current Mode</h6>
                            <div className="w-full rounded-md bg-gray-300 py-1 text-center text-lg font-bold">
                                {currentDriveMode === "fwd"
                                    ? "Forward"
                                    : currentDriveMode === "rev"
                                        ? "Reverse"
                                        : "Off"}
                            </div>
                        </div>
                        <div className="flex w-44 flex-col items-center gap-2">
                            <h6 className="w-full text-center font-semibold">
                                Output freq
                            </h6>
                            <div className="w-full rounded-md bg-gray-300 py-1 text-center text-lg font-bold">
                                {currentOutputFrequency}Hz
                            </div>
                        </div>
                        <div className="flex w-44 flex-col items-center gap-2">
                            <h6 className="w-full text-center font-semibold">Input power</h6>
                            <div className="w-full rounded-md bg-gray-300 py-1 text-center text-lg font-bold">
                                {currentInputPower} W
                            </div>
                        </div>
                        <div className="flex w-44 flex-col items-center gap-2">
                            <h6 className="w-full text-center font-semibold">
                                Output current
                            </h6>
                            <div className="w-full rounded-md bg-gray-300 py-1 text-center text-lg font-bold">
                                {currentOutputCurrent} A
                            </div>
                        </div>
                        <div className="flex w-44 flex-col items-center gap-2">
                            <h6 className="w-full text-center font-semibold">
                                Output voltage
                            </h6>
                            <div className="w-full rounded-md bg-gray-300 py-1 text-center text-lg font-bold">
                                {currentOutputVoltage} V
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
