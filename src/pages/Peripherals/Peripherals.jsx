import React from 'react';
import './Peripherals.css';
import { useState } from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import TwoStateToggle from '../../components/TwoStateToggle/TwoStateToggle';



const Peripherals = () => {

    const initialPeripheralsFormData = {
        pulperDirection: "on",
        storagePulpLevel: "",
        storageWaterLevel: "",
        flowRateOfPulp: "",
    };

    const [peripheralsFormData, setPeripheralsFormData] = useState(initialPeripheralsFormData);
    const [rangeValue, setRangeValue] = useState(50); // Initial range value

    const handlePeripheralsInputChange = (event) => {
        event.preventDefault();
        const { name, value, type, checked } = event.target;
        // Updating the form data based on input type
        const updatedValue = type === "checkbox" ? checked : value;
        setPeripheralsFormData(prevFormData => ({
            ...prevFormData,
            [name]: updatedValue,
        }));
    };


    const {
        pulperDirection,
        storagePulpLevel,
        storageWaterLevel,
        flowRateOfPulp,
    } = peripheralsFormData;

    return (
        <Card className="card_container">
            <Form className="elevation" id="peripheralsSection">
                <Row className="mb-3">
                    <Form.Label column sm="2" style={{fontSize: "24px"}}>Sensors</Form.Label>
                    <div className='form_flex_container'>
                    <Form.Group as={Col} sm="3" className="form_group_container" controlId="formPlaintextEmail">
                        <Form.Label>Pulper Direction</Form.Label>
                        <div className='form_flex_container'>
                            <TwoStateToggle
                                name="pulperDirection"
                                onChange={(e) => handlePeripheralsInputChange(e)}
                                disabled={true}
                            />
                        </div>
                    </Form.Group>
                    
                    <Form.Group as={Col} sm="3" className="form_group_container" controlId="formPlaintextEmail">
                        <Form.Label>Storage Pulp Level</Form.Label>
                        <div className='output_box_container'>
                            <div>
                                <div className='output_box'>
                                    {storagePulpLevel}
                                </div>
                            </div>
                        </div>
                    </Form.Group>
                    
                    <Form.Group as={Col} sm="3" className="form_group_container" controlId="formPlaintextEmail">
                        <Form.Label>Storage Water Level</Form.Label>
                        <div className='output_box_container'>
                            <div>
                                <div className='output_box'>
                                    {storageWaterLevel}
                                </div>
                            </div>
                        </div>
                    </Form.Group>

                    <Form.Group as={Col} sm="3" className="form_group_container" controlId="formPlaintextEmail">
                        <Form.Label>Pulp Flow Rate</Form.Label>
                        <div className='output_box_container'>
                            <div>
                                <div className='output_box'>
                                    {flowRateOfPulp}
                                </div>
                            </div>
                        </div>
                    </Form.Group>
                    </div>
                </Row>
            </Form>
        </Card>
    )
}

export default Peripherals