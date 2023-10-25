import React from 'react';
import './Fracking.css';
import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import ThreeStateToggle from '../../components/ThreeStateToggle/ThreeStateToggle';


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
        const intervalId = setInterval(fetchOutputPressureData, 3001); // Fetch data every 3 seconds
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
        const intervalId = setInterval(fetchMixTankFillData, 3001); // Fetch data every 3 seconds
        return () => clearInterval(intervalId); // Clean up on unmount
    }, []);    

    const fetchPressureData = async () => {
        try {
            const response = await fetch('https://ht3vwz2ms9.execute-api.us-west-2.amazonaws.com/default/get_pressure_data');
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            setPressureData(data);
        } catch (error) {
            console.error('Failed to fetch pressure data:', error);
        }
    };

    useEffect(() => {
        fetchPressureData(); // Initial fetch
        const intervalId = setInterval(fetchPressureData, 3001); // Fetch data every 3 seconds
        return () => clearInterval(intervalId); // Clean up on unmount
    }, []);

    const [frackingData, setFrackingData] = useState(Array(4).fill('')); 
    const [krackingData, setKrackingData] = useState(Array(4).fill('')); 

    const fetchData = async (pumpName, setData) => {
        try {
            const response = await fetch(`http://localhost:3001/default/vfd_output?pump=${pumpName}`);
            if (!response.ok) throw new Error(response.statusText);
            const dataString = await response.text();  // get the response as a string
            const data = JSON.parse(JSON.parse(dataString));  // parse the string into a JSON object
            console.log(data)
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
        }, 3001); 
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
                    <Form.Label column sm="2" style={{fontSize: "24px"}}>Additive 1</Form.Label>
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
                    <Form.Label column sm="2" style={{fontSize: "24px"}}>Additive 2</Form.Label>
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