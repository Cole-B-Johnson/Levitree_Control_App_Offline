import React, { useState, useEffect } from 'react';
import '../Peripherals/Peripherals.css';
import './ChipInjectionSystem.css';
import { Card, Col, Row, Form } from 'react-bootstrap';
import TwoStateToggle from '../../components/TwoStateToggle/TwoStateToggle';

const ChipInjectionSystem = () => {
    const initialChipInjectionFormData = {
        autopilotOnOffToggle: "",
        autopilotFillRange: "0",
        mixTankFillLevel: "0",
        outletRate: "0",
        ratioOne: "0",
        ratioTwo: "0",
    };

    const [chipInjectionFormData, setChipInjectionFormData] = useState(initialChipInjectionFormData);

    const handleGeneralInputChange = (event) => {
        const { name, value } = event.target;
        setChipInjectionFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSliderChange = (event) => {
        // Implement slider change logic here
    };

    // Add data fetching logic similar to the Fracking component
    // For example, fetching mixTankFillLevel

    useEffect(() => {
        // Data fetching logic here
    }, []);

    const {
        autopilotOnOffToggle,
        autopilotFillRange,
        mixTankFillLevel,
        outletRate,
        ratioOne,
        ratioTwo,
    } = chipInjectionFormData;

    return (
        <Card className="card_container">
            <Form className="elevation" id="chipInjectionSystemSection">
                {/* On/Off Toggle Button */}
                <div className="toggle_container">
                    <TwoStateToggle
                        name="autopilotOnOffToggle"
                        value={autopilotOnOffToggle}
                        onChange={handleGeneralInputChange}
                    />
                </div>

                <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
                    <Form.Label column sm="2" style={{fontSize: "24px"}}>Controls</Form.Label>
                    <div className='form_flex_container slurry_composition_container'>

                        <div className='form_range_container'>
                            <div className="slider-container">
                                <Form.Range
                                    name="autopilotFillRange"
                                    value={autopilotFillRange}
                                    onChange={handleSliderChange}
                                    min={0}
                                    max={60}
                                />
                                <span> {autopilotFillRange}" Distance From Top of Tank</span>
                            </div>
                        </div>

                        <div className='form_range_container'>
                            <div className="slider-container">
                                <Form.Range
                                    name="autopilotFillRange"
                                    value={autopilotFillRange}
                                    onChange={handleSliderChange}
                                    min={0}
                                    max={60}
                                />
                                <span> {outletRate} m^3/hr Flow Rate</span>
                            </div>
                        </div>
                    </div>

                    <div className='output_box_container'>
                        <div>
                            <p>Distance From Top</p>
                            <div className='output_box'>{mixTankFillLevel}"</div>
                        </div>
                        <div>
                            <p>Discharge Rate</p>
                            <div className='output_box'>{outletRate} m^3/hr</div>
                        </div>
                    </div>
                </Form.Group>

                {/* Composition Modification */}
                <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
                    <Form.Label column sm="2" style={{fontSize: "24px"}}>Slurry Composition</Form.Label>
                    <div className='form_flex_container slurry_composition_container'>
                        <div className='form_range_container'>
                            <p>Wood Chips</p>
                            <div className="slider-container">
                                <Form.Range
                                    name="ratioOne"
                                    value={ratioOne}
                                    onChange={handleSliderChange}
                                    min={0}
                                    max={100}
                                />
                                <span>{ratioOne}% by Volume</span>
                            </div>
                        </div>
                        <div className='form_range_container'>
                            <p>Paper Pulp</p>
                            <div className="slider-container">
                                <Form.Range
                                    name="ratioTwo"
                                    value={ratioTwo}
                                    onChange={handleSliderChange}
                                    min={0}
                                    max={100}
                                />
                                <span>{ratioTwo}% by Volume</span>
                            </div>
                        </div>
                    </div>
                    <div className='output_box_container'>
                        <div>
                            <p>Wood Chips</p>
                            <div className='output_box'>{mixTankFillLevel}%</div>
                        </div>
                        <div>
                            <p>Paper Pulp</p>
                            <div className='output_box'>{mixTankFillLevel}%</div>
                        </div>
                        <div>
                            <p>Water</p>
                            <div className='output_box'>{mixTankFillLevel}%</div>
                        </div>
                    </div>
                </Form.Group>
            </Form>
        </Card>
    );
};

export default ChipInjectionSystem;
