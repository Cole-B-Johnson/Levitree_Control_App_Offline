import toast from "react-hot-toast";
import VFDDriveModeToggle, { VFDDriveModeOptions } from "./VFDDriveModeToggle";
import { useEffect, useState } from "react";
import Range from "@/components/Range";
import Sensor from "./Sensor";

type VFDControllerProps = {
    name: string;
    pumpID: string;
    extraMeasurementName?: string;
    extraMeasurementValue?: number;
    extraMeasurementUnits?: string;
};

const VFDController = (props: VFDControllerProps) => {
    const [driveMode, setDriveMode] = useState("stop");
    const [currentDriveMode, setCurrentDriveMode] = useState("stop");
    const [currentOutputFrequency, setCurrentOutputFrequency] = useState(0);
    const [currentInputPower, setCurrentInputPower] = useState(0);
    const [currentOutputCurrent, setCurrentOutputCurrent] = useState(0);
    const [currentOutputVoltage, setCurrentOutputVoltage] = useState(0);

    const updateFrequency = async (newFrequency: number) => {
        try {
            const resp = await fetch(
                `http://localhost:3001/default/vfd_input?pump=${props.pumpID}&speed=${newFrequency}`,
            );
            if (!resp.ok) {
                throw null;
            }
            toast.success(`Speed changed for ${props.name}`);
        } catch {
            toast.error(`Couldn't set speed for ${props.name}`);
        }
    };

    const updateDriveMode = async (newDriveMode: VFDDriveModeOptions) => {
        try {
            const fakeState =
                newDriveMode === "fwd" ? "on" : newDriveMode === "rev" ? "off" : "null";
            const resp = await fetch(
                `http://localhost:3001/default/vfd_input?pump=${props.pumpID}&drive_mode=${fakeState}`,
            );
            if (!resp.ok) {
                throw null;
            }
            setDriveMode(newDriveMode);
            toast.success(`Drive mode changed for ${props.name}`);
        } catch {
            toast.error(`Couldn't set drive mode for ${props.name}`);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/default/vfd_output?pump=${props.pumpID}`,
                );
                const data = await response.json(); // get the response as a string

                if (data instanceof Array) {
                    return;
                }

                let newDriveMode = "stop";
                if (
                    data["current_mode"] == 2052 ||
                    data["current_mode"] == 2048 ||
                    data["current_mode"] == 4
                ) {
                    newDriveMode = "stop";
                } else if (data["current_mode"] == 2049 || data["current_mode"] == 1) {
                    newDriveMode = "fwd";
                } else if (data["current_mode"] == 2050 || data["current_mode"] == 2) {
                    newDriveMode = "rev";
                }

                if (currentDriveMode !== newDriveMode) {
                    setCurrentDriveMode(newDriveMode);
                    setDriveMode(newDriveMode);
                }

                console.log(currentDriveMode, driveMode);

                const newInputPower = data["input_power"];
                if (currentInputPower !== newInputPower) {
                    setCurrentInputPower(newInputPower);
                }

                const newOutputFrequency = data["output_frequency"] / 100;
                if (currentOutputFrequency !== newOutputFrequency) {
                    setCurrentOutputFrequency(newOutputFrequency);
                }

                const newOutputCurrent = data["output_current"] / 100;
                if (currentOutputCurrent !== newOutputCurrent) {
                    setCurrentOutputCurrent(newOutputCurrent);
                }

                const newOutputVoltage = data["output_voltage"];
                if (currentOutputVoltage !== newOutputVoltage) {
                    setCurrentOutputVoltage(newOutputVoltage);
                }
            } catch (error) {
                toast.error(`Couldn't get VFD state for ${props.name}!`);
                console.error(error);
            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);
        return () => clearInterval(intervalId);
    }, [
        props.pumpID,
        props.name,
        currentDriveMode,
        driveMode,
        currentInputPower,
        currentOutputFrequency,
        currentOutputCurrent,
        currentOutputVoltage,
    ]);

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
                        <Range
                            value={0}
                            onChange={updateFrequency}
                            min={0}
                            max={90}
                            legend=" Hz"
                        />
                    </div>
                    <div className="flex h-min justify-start items-end gap-4 p-4 pr-0 mt-[-10px]">
                        <Sensor
                            name="Current Mode"
                            value={
                                currentDriveMode === "fwd"
                                    ? "Forward"
                                    : currentDriveMode === "rev"
                                        ? "Reverse"
                                        : "Off"
                            }
                        />
                        <Sensor
                            name="Output freq"
                            value={currentOutputFrequency}
                            units="Hz"
                        />
                        <Sensor name="Input power" value={currentInputPower} units="W" />
                        <Sensor
                            name="Output current"
                            value={currentOutputCurrent}
                            units="A"
                        />
                        <Sensor
                            name="Output voltage"
                            value={currentOutputVoltage}
                            units="V"
                        />
                        {props.extraMeasurementName !== undefined &&
                            props.extraMeasurementValue !== undefined ? (
                            <>
                                <div className="flex-grow"></div>
                                <Sensor
                                    name={props.extraMeasurementName}
                                    value={props.extraMeasurementValue}
                                    units={props.extraMeasurementUnits}
                                />
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default VFDController;
