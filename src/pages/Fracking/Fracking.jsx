import React from 'react';
import './Fracking.css';
import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import ThreeStateToggle from '../../components/ThreeStateToggle/ThreeStateToggle';
import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';


const fs = require('fs');
const path = require('path');

// Ensure directory exists
function ensureDirSync(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}
// get_pump_pressure
function GetPumpPressure() {
    const [data, setData] = useState(null);
    const directoryPath = 'Live-Data-Pathways/Pump_Pressure/';
    ensureDirSync(directoryPath);

    useEffect(() => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.log(err);
                setData(0.0);
            } else {
                if (!files.length) {
                    setData(0.0);
                } else {
                    const latestFile = files.reduce((a, b) => {
                        return a > b ? a : b;
                    });

                    fs.readFile(path.join(directoryPath, latestFile), 'utf8', (err, data) => {
                        if (err) {
                            console.log(err);
                            setData(0.0);
                        } else {
                            setData(parseFloat(data).toFixed(1));
                        }
                    });
                }
            }
        });
    }, []);

    return (
        <div>
            {data}
        </div>
    );
}

// get_mix_tank_distance
function GetMixTankDistance() {
    const [data, setData] = useState(null);
    const directoryPath = 'Live-Data-Pathways/Depth_Sensor/';
    ensureDirSync(directoryPath);

    useEffect(() => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.log(err);
                setData(0.0);
            } else {
                if (!files.length) {
                    setData(0.0);
                } else {
                    const latestFile = files.reduce((a, b) => {
                        return a > b ? a : b;
                    });

                    fs.readFile(path.join(directoryPath, latestFile), 'utf8', (err, data) => {
                        if (err) {
                            console.log(err);
                            setData(0.0);
                        } else {
                            setData(parseFloat(data).toFixed(1));
                        }
                    });
                }
            }
        });
    }, []);

    return (
        <div>
            {data}
        </div>
    );
}

// get_pressure_data
function GetPressureData() {
    const [data, setData] = useState([]);
    const base_path = 'Live-Data-Pathways/Pipe_Pressure_Sensors/CubeCell';
    ensureDirSync(directoryPath);

    useEffect(() => {
        for (let sensor_number = 1; sensor_number <= 6; sensor_number++) {
            const directoryPath = path.join(base_path, sensor_number.toString());
            
            fs.readdir(directoryPath, (err, files) => {
                if (err) {
                    console.log(err);
                    setData(oldData => [...oldData, 0.0]);
                } else {
                    if (!files.length) {
                        setData(oldData => [...oldData, 0.0]);
                    } else {
                        const latestFile = files.reduce((a, b) => {
                            return a > b ? a : b;
                        });

                        fs.readFile(path.join(directoryPath, latestFile), 'utf8', (err, data) => {
                            if (err) {
                                console.log(err);
                                setData(oldData => [...oldData, 0.0]);
                            } else {
                                setData(oldData => [...oldData, parseFloat(data).toFixed(1)]);
                            }
                        });
                    }
                }
            });
        }
    }, []);

    return (
        <div>
            {data.join(', ')}
        </div>
    );
}

// vfd_output
function VfdOutput({ pump }) {
    const [data, setData] = useState([]);
    const directoryPath = `Live-Data-Pathways/${pump}/From_VFD`;
    ensureDirSync(directoryPath);

    useEffect(() => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.log(err);
                setData([]);
            } else {
                if (!files.length) {
                    setData([]);
                } else {
                    const latestFile = files.reduce((a, b) => {
                        return a > b ? a : b;
                    });

                    fs.readFile(path.join(directoryPath, latestFile), 'utf8', (err, data) => {
                        if (err) {
                            console.log(err);
                            setData([]);
                        } else {
                            setData(Object.values(JSON.parse(data)));
                        }
                    });
                }
            }
        });
    }, [pump]);

    return (
        <div>
            {data.join(', ')}
        </div>
    );
}

// vfd_input
function VfdInput({ pump, speed, drive_mode }) {
    const drive_mode_mapping = { "on": "fwd", "off": "rev", "null": "stop" };
    const directoryPath = `Live-Data-Pathways/${pump}/To_VFD`;
    ensureDirSync(directoryPath);
    const filename = `command_${Date.now()}.json`;
    const filePath = path.join(directoryPath, filename);

    useEffect(() => {
        let file_contents = {};

        if (speed !== undefined) {
            file_contents['speed'] = speed;
        } else if (drive_mode !== undefined) {
            if (!(drive_mode in drive_mode_mapping)) {
                console.log(`Invalid drive_mode value: ${drive_mode}`);
                return;
            }
            file_contents['drive_mode'] = drive_mode_mapping[drive_mode];
        } else {
            console.log('improper key (not speed or drive_mode)');
            return;
        }

        fs.writeFile(filePath, JSON.stringify(file_contents), err => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Successfully wrote data to ${filePath}`);
            }
        });
    }, [pump, speed, drive_mode]);

    // This function doesn't need to render anything
    return null;
}

const Fracking = () => {
    const initialFrackingFormData = {
        frackingVFDOnOffToggle: "",
        frackingVFDRange: "0",
        krackingVFDOnOffToggle: "",
        krackingVFDRange: "0",
        rateOfMaterialMovement: "",
        frackingDPPump: "",
        krackingDPPump: "",
        downholePressure: "",
        mixTankFillLevel: "",
        ampDrawOnMixTankAgitator: "",
    };
    const [pressureData, setPressureData] = useState(Array(6).fill('')); // Initially fill with 6 empty strings
    const [outputPressureData, setOutputPressureData] = useState('');
    const [mixTankFillData, setMixTankFillData] = useState('');

    const fetchOutputPressureData = () => {
        try {
            const data = GetPumpPressure();
            setOutputPressureData(data);
        } catch (error) {
            console.error('Failed to fetch output pressure data:', error);
        }
    };
    
    useEffect(() => {
        fetchOutputPressureData(); // Initial fetch
        const intervalId = setInterval(fetchOutputPressureData, 3000); // Fetch data every 3 seconds
        return () => clearInterval(intervalId); // Clean up on unmount
    }, []);

    const fetchMixTankFillData = () => {
        try {
            const data = GetMixTankDistance();
            setMixTankFillData(data);
        } catch (error) {
            console.error('Failed to fetch mix tank fill data:', error);
        }
    };

    useEffect(() => {
        fetchMixTankFillData(); // Initial fetch
        const intervalId = setInterval(fetchMixTankFillData, 3000); // Fetch data every 3 seconds
        return () => clearInterval(intervalId); // Clean up on unmount
    }, []);    

    const fetchPressureData = () => {
        try {
            const data = GetPressureData();
            setPressureData(data);
        } catch (error) {
            console.error('Failed to fetch pressure data:', error);
        }
    };

    useEffect(() => {
        fetchPressureData(); // Initial fetch
        const intervalId = setInterval(fetchPressureData, 3000); // Fetch data every 3 seconds
        return () => clearInterval(intervalId); // Clean up on unmount
    }, []);

    const [frackingData, setFrackingData] = useState(Array(4).fill('')); 
    const [krackingData, setKrackingData] = useState(Array(4).fill('')); 

    const fetchData = (pumpName, setData) => {
        try {
            const data = VfdOutput();
            setData(data);
        } catch (error) {
            console.error(`Failed to fetch data for ${pumpName}:`, error);
        }
    };

    useEffect(() => {
        fetchData('3_Progressive_Cavity_Pump', setFrackingData); 
        fetchData('4_Progressive_Cavity_Pump', setKrackingData); 

        const intervalId = setInterval(() => {
            fetchData('3_Progressive_Cavity_Pump', setFrackingData);
            fetchData('4_Progressive_Cavity_Pump', setKrackingData); 
        }, 3000); 
        return () => clearInterval(intervalId); 
    }, []);

    const [frackingFormData, setFrackingFormData] = useState(initialFrackingFormData);

    const [isSliderChanging, setIsSliderChanging] = useState(false);

    const handleSliderChangeStart = (event) => {
        setIsSliderChanging(true);
    };

    const handleSliderChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;

        setFrackingFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSliderChangeEnd = (event, pumpName) => {
        setIsSliderChanging(false);

        try {
            const data = getVfdInput();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleFrackingInputChange = (event, pumpName) => {
        let value;
        // Check if event.preventDefault exists
        if (event.preventDefault) {
            event.preventDefault();
            value = event.target.value;
        } else {
            // If event.preventDefault does not exist, use event as the new value
            value = event;
        }
    
        setFrackingFormData(prevFormData => ({
            ...prevFormData,
            [pumpName]: value,
        }));
        
        try {
            const data = VfdInput();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    
    const {
        frackingVFDOnOffToggle,
        frackingVFDRange,
        krackingVFDOnOffToggle,
        krackingVFDRange,
        rateOfMaterialMovement,
        mixTankFillLevel,
        ampDrawOnMixTankAgitator,
    } = frackingFormData;
    return (
        <Card className="card_container">
            <Form className="elevation" id="frackingSection">
                <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
                    <Form.Label column sm="2" style={{fontSize: "24px"}}>Frackéin</Form.Label>
                    <div className='form_flex_container'>
                        <ThreeStateToggle
                            name="frackingVFDOnOffToggle"
                            pumpName='3_Progressive_Cavity_Pump'
                            value={frackingVFDOnOffToggle}
                            onChange={handleFrackingInputChange}
                        />
                        <div className='form_range_container'>
                            <Form.Range
                                className=''
                                name="frackingVFDRange"
                                value={frackingVFDRange}
                                onChange={handleSliderChange}
                                onMouseDown={handleSliderChangeStart}
                                onMouseUp={(e) => handleSliderChangeEnd(e, '3_Progressive_Cavity_Pump')}
                                onTouchStart={handleSliderChangeStart}
                                onTouchEnd={(e) => handleSliderChangeEnd(e, '3_Progressive_Cavity_Pump')}
                                min={0}
                                max={90}
                            />
                            <span>{frackingVFDRange}Hz</span>
                            <div className='output_box_container'>
                                <div>
                                    <p>Current Mode</p>
                                    <div className='output_box'>{frackingData[4]}</div>
                                </div>
                                <div>
                                    <p>Output frequency</p>
                                    <div className='output_box'>{frackingData[0]}</div>
                                </div>
                                <div>
                                    <p>Input power</p>
                                    <div className='output_box'>{frackingData[1]}</div>
                                </div>
                                <div>
                                    <p>Output current</p>
                                    <div className='output_box'>{frackingData[2]}</div>
                                </div>
                                <div>
                                    <p>Output voltage</p>
                                    <div className='output_box'>{frackingData[3]}</div>
                                </div>
                                {/* <div>
                                    <p>Differential pressure</p>
                                    <div className='output_box'></div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </Form.Group>
                <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
                    <Form.Label column sm="2" style={{fontSize: "24px"}}>Krackéin</Form.Label>
                    <div className='form_flex_container'>
                        <ThreeStateToggle
                            name="krackingVFDOnOffToggle"
                            pumpName='4_Progressive_Cavity_Pump'
                            value={krackingVFDOnOffToggle}
                            onChange={handleFrackingInputChange}
                        />
                        <div className='form_range_container'>
                            <Form.Range
                                className=''
                                name="krackingVFDRange"
                                value={krackingVFDRange}
                                onChange={handleSliderChange}
                                onMouseDown={handleSliderChangeStart}
                                onMouseUp={(e) => handleSliderChangeEnd(e, '4_Progressive_Cavity_Pump')}
                                onTouchStart={handleSliderChangeStart}
                                onTouchEnd={(e) => handleSliderChangeEnd(e, '4_Progressive_Cavity_Pump')}
                                min={0}
                                max={90}
                            />
                            <span>{krackingVFDRange}Hz</span>
                            <div className='output_box_container'>
                                <div>
                                    <p>Current Mode</p>
                                    <div className='output_box'>{frackingData[4]}</div>
                                </div>
                                <div>
                                    <p>Output frequency</p>
                                    <div className='output_box'>{krackingData[0]}</div>
                                </div>
                                <div>
                                    <p>Input power</p>
                                    <div className='output_box'>{krackingData[1]}</div>
                                </div>
                                <div>
                                    <p>Output current</p>
                                    <div className='output_box'>{krackingData[2]}</div>
                                </div>
                                <div>
                                    <p>Output voltage</p>
                                    <div className='output_box'>{krackingData[3]}</div>
                                </div>
                                <div>
                                    <p>Pressure</p>
                                    <div className='output_box'>{outputPressureData}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form.Group>
                <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
                <Form.Label column sm="2" style={{fontSize: "24px"}}>Pressure Sensors</Form.Label>
                <div className='output_box_container'>
                    {pressureData.map((pressure, index) => (
                        <div key={index}>
                            <div className='output_box'>{pressure}</div>
                        </div>
                    ))}
                </div>
            </Form.Group>
            </Form>
        </Card>
    )
}

export default Fracking