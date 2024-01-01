import React from 'react';
import './Fracking.css';
import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import ThreeStateToggle from '../../components/ThreeStateToggle/ThreeStateToggle';
import TwoStateToggle from '../../components/TwoStateToggle/TwoStateToggle';


const Fracking = () => {
    const initialFrackingFormData = {
        frackingVFDOnOffToggle: "",
        frackingVFDRange: "0",
        krackingVFDOnOffToggle: "",
        krackingVFDRange: "0",
        pulperVFDOnOffToggle: "",   // Add this line
        pulperVFDRange: "0",        // Add this line
        augerVFDOnOffToggle: "",    // Add this line
        augerVFDRange: "0",         // Add this line
        autopilotOnOffToggle: "",
        autopilotFillRange: "0",
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

    const fetchOutputPressureData = async () => {
        try {
            const response = await fetch('http://localhost:3001/default/get_pump_pressure');
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            setOutputPressureData(data);
        } catch (error) {
            console.error('Failed to fetch output pressure data:', error);
        }
    };
    
    useEffect(() => {
        fetchOutputPressureData(); // Initial fetch
        const intervalId = setInterval(fetchOutputPressureData, 250); // Fetch data every 3 seconds
        return () => clearInterval(intervalId); // Clean up on unmount
    }, []);

    const fetchMixTankFillData = async () => {
        try {
            const response = await fetch('http://localhost:3001/default/get_mix_tank_distance');
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            setMixTankFillData(data);
        } catch (error) {
            console.error('Failed to fetch mix tank fill data:', error);
        }
    };

    useEffect(() => {
        fetchMixTankFillData(); // Initial fetch
        const intervalId = setInterval(fetchMixTankFillData, 250); // Fetch data every 3 seconds
        return () => clearInterval(intervalId); // Clean up on unmount
    }, []);    

    // const fetchPressureData = async () => {
    //     try {
    //         const response = await fetch('https://ht3vwz2ms9.execute-api.us-west-2.amazonaws.com/default/get_pressure_data');
    //         if (!response.ok) throw new Error(response.statusText);
    //         const data = await response.json();
    //         setPressureData(data);
    //     } catch (error) {
    //         console.error('Failed to fetch pressure data:', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchPressureData(); // Initial fetch
    //     const intervalId = setInterval(fetchPressureData, 250); // Fetch data every 3 seconds
    //     return () => clearInterval(intervalId); // Clean up on unmount
    // }, []);

    const [frackingData, setFrackingData] = useState(Array(4).fill('')); 
    const [krackingData, setKrackingData] = useState(Array(4).fill('')); 
    const [pulperData, setPulperData] = useState(Array(5).fill(''));
    const [augerData, setAugerData] = useState(Array(5).fill(''));

    const fetchData = async (pumpName, setData) => {
        try {
            const response = await fetch(`http://localhost:3001/default/vfd_output?pump=${pumpName}`);
            if (!response.ok) throw new Error(response.statusText);
            const dataString = await response.text();  // get the response as a string
            const data = JSON.parse(JSON.parse(dataString));  // parse the string into a JSON object
            console.log(data)

            if (data['current_mode'] == 2052) {
                data['current_mode'] = 'Off';
            }
            if (data['current_mode'] == 2048) {
                data['current_mode'] = 'Off';
            }
            if (data['current_mode'] == 2049) {
                data['current_mode'] = 'Forward';
            }
            if (data['current_mode'] == 2050) {
                data['current_mode'] = 'Reverse';
            }

            data['output_frequency'] = `${data['output_frequency'] / 100}Hz`;

            data['input_power'] = `${data['input_power']}W`;

            data['output_current'] = `${data['output_current'] / 100}A`;

            data['output_voltage'] = `${data['output_voltage']}V`;

            setData(data);
        } catch (error) {
            //console.error(`Failed to fetch data for ${pumpName}:`, error);
        }
    };

    useEffect(() => {
        fetchData('3_Progressive_Cavity_Pump', setFrackingData); 
        fetchData('4_Progressive_Cavity_Pump', setKrackingData); 
        fetchData('Hydrapulper', setPulperData); 
        fetchData('Auger_Truck', setAugerData);

        const intervalId = setInterval(() => {
            fetchData('3_Progressive_Cavity_Pump', setFrackingData);
            fetchData('4_Progressive_Cavity_Pump', setKrackingData);
            fetchData('Hydrapulper', setPulperData);
            fetchData('Auger_Truck', setAugerData);
        }, 250); 
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

        console.log('slider')

        fetch(`http://localhost:3001/default/vfd_input?pump=${pumpName}&speed=${event.target.value}`)
            .then(response => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
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
        
        fetch(`http://localhost:3001/default/vfd_input?pump=${pumpName}&drive_mode=${value}`)
            .then(response => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleGeneralInputChange = (event) => {
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
            value, // Using value directly as we don't have pumpName
        }));
        
        // Updated endpoint and query parameter
        fetch(`http://localhost:3001/default/vfd_input?pump=${'autopilot'}&drive_mode=${value}`) // im lazy so the on: fwd and off: rev bc im reusing another api funtion
            .then(response => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    };
    
    const {
        frackingVFDOnOffToggle,
        frackingVFDRange,
        krackingVFDOnOffToggle,
        pulperVFDOnOffToggle,
        augerVFDOnOffToggle,
        autopilotOnOffToggle,
        autopilotFillRange,
        krackingVFDRange,
        pulperVFDRange,
        augerVFDRange,
        rateOfMaterialMovement,
        mixTankFillLevel,
        ampDrawOnMixTankAgitator,
    } = frackingFormData;
    return (
        <Card className="card_container">
            <Form className="elevation" id="frackingSection">
            <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
                    <Form.Label column sm="2" style={{fontSize: "24px"}}>Auto Pilot</Form.Label>
                    <div className='form_flex_container'>
                        <TwoStateToggle
                            name="autopilotOnOffToggle"
                            value={autopilotOnOffToggle}
                            onChange={handleGeneralInputChange}
                        />
                        <div className='form_range_container'>
                            <Form.Range
                                className=''
                                name="autopilotFillRange"
                                value={autopilotFillRange}
                                onChange={handleSliderChange}
                                onMouseDown={handleSliderChangeStart}
                                onMouseUp={(e) => handleSliderChangeEnd(e, 'autopilot')}
                                onTouchStart={handleSliderChangeStart}
                                onTouchEnd={(e) => handleSliderChangeEnd(e, 'autopilot')}
                                min={0}
                                max={60}
                            />
                            <span>{autopilotFillRange}" From Top</span>
                            <div className='output_box_container'>
                                <div>
                                    <p>Current Level</p>
                                    <div className='output_box'>{mixTankFillLevel * Math.sin(45 * Math.PI / 180) * .0394}</div>
                                </div> {/* equation for d * sin(theta), where d is ultrasonic sensor distance and theta is distance from horizontal*/}
                            </div>
                        </div>
                    </div>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
                    <Form.Label column sm="2" style={{fontSize: "24px"}}>8" Pump</Form.Label>
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
                                    <div className='output_box'>{frackingData['current_mode']}</div>
                                </div>
                                <div>
                                    <p>Output frequency</p>
                                    <div className='output_box'>{frackingData['output_frequency']}</div>
                                </div>
                                <div>
                                    <p>Input power</p>
                                    <div className='output_box'>{frackingData['input_power']}</div>
                                </div>
                                <div>
                                    <p>Output current</p>
                                    <div className='output_box'>{frackingData['output_current']}</div>
                                </div>
                                <div>
                                    <p>Output voltage</p>
                                    <div className='output_box'>{frackingData['output_voltage']}</div>
                                </div>
                                <div>
                                    <p>Pressure</p>
                                    <div className='output_box'>{outputPressureData}</div>
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
                    <Form.Label column sm="2" style={{fontSize: "24px"}}>Water Pump</Form.Label>
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
                                    <div className='output_box'>{krackingData['current_mode']}</div>
                                </div>
                                <div>
                                    <p>Output frequency</p>
                                    <div className='output_box'>{krackingData['output_frequency']}</div>
                                </div>
                                <div>
                                    <p>Input power</p>
                                    <div className='output_box'>{krackingData['input_power']}</div>
                                </div>
                                <div>
                                    <p>Output current</p>
                                    <div className='output_box'>{krackingData['output_current']}</div>
                                </div>
                                <div>
                                    <p>Output voltage</p>
                                    <div className='output_box'>{krackingData['output_voltage']}</div>
                                </div>
                                <div>
                                    <p>Mix Tank Fill Level</p>
                                    <div className='output_box'>{mixTankFillData}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form.Group>
                <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
                    <Form.Label column sm="2" style={{fontSize: "24px"}}>Pulp Pump</Form.Label>
                    <div className='form_flex_container'>
                        <ThreeStateToggle
                            name="pulperVFDOnOffToggle"
                            pumpName='Hydrapulper'
                            value={pulperVFDOnOffToggle}
                            onChange={handleFrackingInputChange}
                        />
                        <div className='form_range_container'>
                            <Form.Range
                                className=''
                                name="pulperVFDRange"
                                value={pulperVFDRange}
                                onChange={handleSliderChange}
                                onMouseDown={handleSliderChangeStart}
                                onMouseUp={(e) => handleSliderChangeEnd(e, 'Hydrapulper')}
                                onTouchStart={handleSliderChangeStart}
                                onTouchEnd={(e) => handleSliderChangeEnd(e, 'Hydrapulper')}
                                min={0}
                                max={90}
                            />
                            <span>{pulperVFDRange}Hz</span>
                            <div className='output_box_container'>
                                <div>
                                    <p>Current Mode</p>
                                    <div className='output_box'>{pulperData['current_mode']}</div>
                                </div>
                                <div>
                                    <p>Output frequency</p>
                                    <div className='output_box'>{pulperData['output_frequency']}</div>
                                </div>
                                <div>
                                    <p>Input power</p>
                                    <div className='output_box'>{pulperData['input_power']}</div>
                                </div>
                                <div>
                                    <p>Output current</p>
                                    <div className='output_box'>{pulperData['output_current']}</div>
                                </div>
                                <div>
                                    <p>Output voltage</p>
                                    <div className='output_box'>{pulperData['output_voltage']}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
                    <Form.Label column sm="2" style={{fontSize: "24px"}}>Auger Truck</Form.Label>
                    <div className='form_flex_container'>
                        <ThreeStateToggle
                            name="augerVFDOnOffToggle"
                            pumpName='Auger_Truck'
                            value={augerVFDOnOffToggle}
                            onChange={handleFrackingInputChange}
                        />
                        <div className='form_range_container'>
                            <Form.Range
                                className=''
                                name="augerVFDRange"
                                value={augerVFDRange}
                                onChange={handleSliderChange}
                                onMouseDown={handleSliderChangeStart}
                                onMouseUp={(e) => handleSliderChangeEnd(e, 'Auger_Truck')}
                                onTouchStart={handleSliderChangeStart}
                                onTouchEnd={(e) => handleSliderChangeEnd(e, 'Auger_Truck')}
                                min={0}
                                max={90}
                            />
                            <span>{augerVFDRange}Hz</span>
                            <div className='output_box_container'>
                                <div>
                                    <p>Current Mode</p>
                                    <div className='output_box'>{augerData['current_mode']}</div>
                                </div>
                                <div>
                                    <p>Output frequency</p>
                                    <div className='output_box'>{augerData['output_frequency']}</div>
                                </div>
                                <div>
                                    <p>Input power</p>
                                    <div className='output_box'>{augerData['input_power']}</div>
                                </div>
                                <div>
                                    <p>Output current</p>
                                    <div className='output_box'>{augerData['output_current']}</div>
                                </div>
                                <div>
                                    <p>Output voltage</p>
                                    <div className='output_box'>{augerData['output_voltage']}</div>
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
