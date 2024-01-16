import { useEffect, useState } from "react";
import OnOffToggle from "./OnOffToggle";
import toast from "react-hot-toast";
import Sensor from "./Sensor";
import Range from "@/components/Range";

const AutopilotController = () => {
    const [wood, setWood] = useState(0);
    const [pulp, setPulp] = useState(0);
    const [toggle, setToggle] = useState("off");
    const [currentLevel, setLevel] = useState(0);
    const [flowRate, setFlowRate] = useState(0);
    const [dischargeRate, setDischargeRate] = useState(0);
    const [waterComp, setWaterComp] = useState(100);

    const toggleChanged = async (event: string) => {
        const newToggleState = event;

        if (newToggleState === toggle) {
            return;
        }

        try {
            const resp = await fetch(
                `http://localhost:3001/default/autopilot_set?state=${newToggleState}`,
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
        try {
            const resp = await fetch(
                `http://localhost:3001/default/autopilot_set?distance=${newDistance}`,
            );
            if (!resp.ok) {
                throw null;
            }
            setLevel(newDistance);
            toast.success(`Autopilot distance changed`);
        } catch {
            toast.error(`Couldn't set autopilot distance!`);
        }
    };

    const updateFlowRate = async (newFlowRate: number) => {
        try {
            const resp = await fetch(
                `http://localhost:3001/default/autopilot_set?flow_rate=${newFlowRate}`,
            );
            if (!resp.ok) {
                throw null;
            }
            setFlowRate(newFlowRate);
            toast.success(`Autopilot flow rate changed`);
        } catch {
            toast.error(`Couldn't set autopilot flow rate!`);
        }
    };

    const updateWood = async (newWood: number) => {
        console.log(newWood);
        try {
            const resp = await fetch(
                `http://localhost:3001/default/autopilot_set?wood_chips=${newWood}`,
            );
            if (!resp.ok) {
                throw null;
            }
            setWood(newWood);
            setWaterComp(100 - newWood - pulp);
            toast.success(`Slurry composition changed`);
        } catch {
            toast.error(`Couldn't change slurry composition!`);
        }
    };

    const updatePulp = async (newPulp: number) => {
        console.log(newPulp);
        try {
            const resp = await fetch(
                `http://localhost:3001/default/autopilot_set?paper_pulp=${newPulp}`,
            );
            if (!resp.ok) {
                throw null;
            }
            setPulp(newPulp);
            setWaterComp(100 - newPulp - wood);
            toast.success(`Slurry composition changed`);
        } catch {
            toast.error(`Couldn't change slurry composition!`);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/default/autopilot_get`,
                );
                const data = await response.json(); // get the response as a string

                let newAPState = "off";
                if (data["current_mode"] == "fwd") {
                    newAPState = "on";
                } else if (data["current_mode"] == "rev") {
                    newAPState = "off";
                }

                if (toggle !== newAPState) {
                    //setToggle(newAPState);
                }

                const newLevel = data["current_level"] ?? 0;
                if (currentLevel !== newLevel) {
                    setLevel(newLevel);
                }

                const newDischargeRate = data["discharge_rate"] ?? 0;
                if (dischargeRate !== newDischargeRate) {
                    setDischargeRate(newDischargeRate);
                }

                const newWoodChips = data["wood_chips"] ?? 0;
                if (wood !== newWoodChips) {
                    setWood(newWoodChips);
                    setWaterComp(100 - pulp - wood);
                }

                const newPaperPulp = data["paper_pulp"] ?? 0;
                if (pulp !== newPaperPulp) {
                    setPulp(newPaperPulp);
                    setWaterComp(100 - pulp - wood);
                }
            } catch (error) {
                toast.error(`Couldn't get autopilot state!`);
                console.error(error);
            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);
        return () => clearInterval(intervalId);
    }, [currentLevel, dischargeRate, pulp, toggle, wood]);

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
                                value={currentLevel}
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
                                value={flowRate}
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
                                value={wood}
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
                                value={pulp}
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
