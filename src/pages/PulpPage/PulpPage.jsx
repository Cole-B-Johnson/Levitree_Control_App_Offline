import React from 'react';
import './PulpPage.css';
import { useState } from 'react';
import { Container, Card, Row, Col, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import ThreeStateToggle from '../../components/ThreeStateToggle/ThreeStateToggle';

const PulpPage = () => {
    const initialPulpFormData = {
        pulpVFPOnOffToggle: "",
        pulperVFPRange: "25",
        pulperDilutionOnOffToggle: "",
        pulperDilutionRange: "25",
        pulpDeliveryOnOffToggle: "",
        pulpDeliveryRange: "25",
        pulpQuantity: "",
        pulpConcentration: "",
        pulpAvailableWater: "",
    };

    const [pulpFormData, setPulpFormData] = useState(initialPulpFormData);
    const [rangeValue, setRangeValue] = useState(50); // Initial range value

    const handlePulpInputChange = (event) => {
        event.preventDefault();
        const { name, value, type, checked } = event.target;
        // Updating the form data based on input type
        const updatedValue = type === "checkbox" ? checked : value;
        setPulpFormData(prevFormData => ({
            ...prevFormData,
            [name]: updatedValue,
        }));
    };

    const {
        pulpVFPOnOffToggle,
        pulperVFPRange,
        pulperDilutionOnOffToggle,
        pulperDilutionRange,
        pulpDeliveryOnOffToggle,
        pulpDeliveryRange,
        pulpQuantity,
        pulpConcentration,
        pulpAvailableWater,
    } = pulpFormData;
    return (
        <Form className="elevation" id="pulpSection">
            <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
                <Form.Label column sm="2" style={{fontSize: "24px"}}>Pulper</Form.Label>
                <div className='form_flex_container'>
                    <ThreeStateToggle
                        name="pulpVFPOnOffToggle"
                        onChange={(e) => handlePulpInputChange(e)}
                        value={pulpVFPOnOffToggle}
                    />
                    <div className='form_range_container'>
                        <Form.Range
                            className=''
                            name="pulperVFPRange"
                            value={pulperVFPRange}
                            onChange={(e) => handlePulpInputChange(e)}
                            min={25}
                            max={95}
                        />
                        <span>{pulperVFPRange}Hz</span>
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
            <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
                <Form.Label column sm="2" style={{fontSize: "24px"}}>Pulper Dilution</Form.Label>
                <div className='form_flex_container'>
                    <ThreeStateToggle
                        name="pulperDilutionOnOffToggle"
                        onChange={(e) => handlePulpInputChange(e)}
                        value={pulperDilutionOnOffToggle}
                    />
                    <div className='form_range_container'>
                        <Form.Range
                            className=''
                            value={pulperDilutionRange}
                            name="pulperDilutionRange"
                            onChange={(e) => handlePulpInputChange(e)}
                            min={25}
                            max={95}
                        />
                        <span>{pulperDilutionRange}Hz</span>
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
            <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
                <Form.Label column sm="2" style={{fontSize: "24px"}}>Pulp Delivery</Form.Label>
                <div className='form_flex_container'>
                    <ThreeStateToggle
                        name="pulpDeliveryOnOffToggle"
                        onChange={(e) => handlePulpInputChange(e)}
                        value={pulpDeliveryOnOffToggle}
                    />
                    <div className='form_range_container'>
                        <Form.Range
                            className=''
                            value={pulpDeliveryRange}
                            name="pulpDeliveryRange"
                            onChange={(e) => handlePulpInputChange(e)}
                            min={25}
                            max={95}
                        />
                        <span>{pulpDeliveryRange}Hz</span>
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
                    <Form.Label column sm="2">Pulp Quantity</Form.Label>
                    <div className='output_box_container'>
                            <div>
                                <div className='output_box'>{pulpQuantity}</div>
                            </div>
                        </div>
                </Form.Group>
                <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">Pulp Concentration</Form.Label>
                    <div className='output_box_container'>
                            <div>
                                <div className='output_box'>{pulpConcentration}</div>
                            </div>
                        </div>
                </Form.Group>
                <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">Available Water</Form.Label>
                    <div className='output_box_container'>
                            <div>
                                <div className='output_box'>{pulpAvailableWater}</div>
                            </div>
                        </div>
                </Form.Group>
            </div>
        </Form>
    )
}

export default PulpPage;