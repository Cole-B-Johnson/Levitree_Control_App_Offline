import React from 'react';
import '../Peripherals/Peripherals.css';
import './ChipInjectionSystem.css';
import { useState } from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import ThreeStateToggle from '../../components/ThreeStateToggle/ThreeStateToggle';
import TwoStateToggle2 from '../../components/TwoStateToggle2/TwoStateToggle2';

const ChipInjectionSystem = () => {

    const initialChipInjectionFormData = {
        truckAugerVFDOnOffToggle: "",
        truckAugerVFDRange: "25",
        VFDderivedVolumetricReading: "",
        availableWater: "",
        binaryDirection:"on"
    };

    const [chipInjectionFormData, setChipInjectionFormData] = useState(initialChipInjectionFormData);
    const [rangeValue, setRangeValue] = useState(50); // Initial range value
    const [selectedHoles, setSelectedHoles] = useState(0); // Dynamically add inputs based on number of holes in the form

    const handleChipInjectionInputChange = (event) => {
        event.preventDefault();
        const { name, value, type, checked } = event.target;
        // Updating the form data based on input type
        const updatedValue = type === "checkbox" ? checked : value;
        setChipInjectionFormData(prevFormData => ({
            ...prevFormData,
            [name]: updatedValue,
        }));
    };
    const {
        truckAugerVFDOnOffToggle,
        truckAugerVFDRange,
        VFDderivedVolumetricReading,
        availableWater,
        binaryDirection,
    } = chipInjectionFormData;

    return (
        <Card className="card_container">
            <Form className="elevation" id="chipInjectionSystemSection">
                <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
                    <Form.Label column sm="2" style={{fontSize: "24px"}}>Truck Auger</Form.Label>
                    <div className='form_flex_container'>
                        <ThreeStateToggle
                            name="truckAugerVFDOnOffToggle"
                            value={truckAugerVFDOnOffToggle}
                            onChange={(e) => handleChipInjectionInputChange(e)}
                        />
                        <div className='form_range_container'>
                            <Form.Range
                                className=''
                                name="truckAugerVFDRange"
                                value={truckAugerVFDRange}
                                onChange={(e) => handleChipInjectionInputChange(e)}
                                min={25}
                                max={95}
                            />
                            <span>{truckAugerVFDRange}Hz</span>
                            <div className='output_box_container'>
                            <div>
                                <p>Output frequency</p>
                                <div className='output_box'></div>
                            </div>
                            <div>
                                <p>Input power</p>
                                <div className='output_box'></div>
                            </div>
                            <div>
                                <p>Output current</p>
                                <div className='output_box'></div>
                            </div>
                            <div>
                                <p>Output voltage</p>
                                <div className='output_box'></div>
                            </div>
                        </div>
                        </div>
                    </div>
                </Form.Group>
                <Form.Label column sm="2" style={{fontSize: "24px"}}>Sensors</Form.Label>
                <div className='form_flex_container'>
                    <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">Chip Truck Fill</Form.Label>
                        <div className='form_flex_container'>
                        <TwoStateToggle2 
                            name="binaryDirection"
                            onChange={(e) => handleChipInjectionInputChange(e)}
                            disabled={true}
                        />
                    </div>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">Volumetric Flow</Form.Label>
                        <div className='output_box_container'>
                            <div>
                                <div className='output_box'>
                                    {VFDderivedVolumetricReading}
                                </div>
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">Water Flow</Form.Label>
                        <div className='output_box_container'>
                            <div>
                                <div className='output_box'>{availableWater}</div>
                            </div>
                        </div>
                    </Form.Group>
                </div>
            </Form>
        </Card>
    )
}

export default ChipInjectionSystem