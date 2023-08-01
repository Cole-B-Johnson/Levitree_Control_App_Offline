import { useState } from 'react';
import { Container, Card, Row, Col, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import ThreeStateToggle from '../ThreeStateToggle/ThreeStateToggle';
import NavBarComponent from '../NavbarComponent/NavbarComponent';
import './FormComponent.css';
import PulpPage from '../../pages/PulpPage/PulpPage';
import Fracking from '../../pages/Fracking/Fracking';
import ChipInjectionSystem from '../../pages/ChipInjectionSystem/ChipInjectionSystem';
import Peripherals from '../../pages/Peripherals/Peripherals';

let downholePressure = ["1", "2", "3", "4", "5"];

const FormComponent = () => {
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
    const initialFrackingFormData = {
        frackingVFDOnOffToggle: "",
        frackingVFDRange: "25",
        krackingVFDOnOffToggle: "",
        krackingVFDRange: "25",
        waterAdditionPumpOnOffToggle: "",
        waterAdditionPumpRange: "25",
        rateOfMaterialMovement: "",
        frackingDPPump: "",
        krackingDPPump: "",
        downholePressure: "",
        mixTankFillLevel: "",
        ampDrawOnMixTankAgitator: "",
    };

    const initialChipInjectionFormData = {
        truckAugerVFDOnOffToggle: "",
        truckAugerVFDRange: "25",
        VFDderivedVolumetricReading: "",
        availableWater: "",
    };

    const initialPeripheralsFormData = {
        pulperDirection: "",
        storagePulpLevel: "",
        storageWaterLevel: "",
        flowRateOfPulp: "",
    };

    const [pulpFormData, setPulpFormData] = useState(initialPulpFormData);
    const [frackingFormData, setFrackingFormData] = useState(initialFrackingFormData);
    const [chipInjectionFormData, setChipInjectionFormData] = useState(initialChipInjectionFormData);
    const [peripheralsFormData, setPeripheralsFormData] = useState(initialPeripheralsFormData);
    const [rangeValue, setRangeValue] = useState(50); // Initial range value
    const [selectedHoles, setSelectedHoles] = useState(0); // Dynamically add inputs based on number of holes in the form
    console.log(selectedHoles);


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

    const handleFrackingInputChange = (event) => {
        event.preventDefault();
        const { name, value, type, checked } = event.target;
        // Updating the form data based on input type
        const updatedValue = type === "checkbox" ? checked : value;
        setFrackingFormData(prevFormData => ({
            ...prevFormData,
            [name]: updatedValue,
        }));
    };

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



    const handleDropdownChange = (event) => {
        event.preventDefault();
        console.log(event);
    };

    const [input, setInput] = useState([]);

    const renderInputs = (selectedHoles) => {
        const inputs = [];
        console.log(selectedHoles);
        for (let i = 1; i <= selectedHoles; i++) {
            inputs.push(
                <Form.Control key={i} type="text" placeholder={`Input ${i}`} />
            );
        }
        setInput(inputs);
    };


    const {
        pulperDirection,
        storagePulpLevel,
        storageWaterLevel,
        flowRateOfPulp,
    } = peripheralsFormData;

    const {
        truckAugerVFDOnOffToggle,
        truckAugerVFDRange,
        VFDderivedVolumetricReading,
        availableWater,
    } = chipInjectionFormData;

    const {
        frackingVFDOnOffToggle,
        frackingVFDRange,
        krackingVFDOnOffToggle,
        krackingVFDRange,
        waterAdditionPumpOnOffToggle,
        waterAdditionPumpRange,
        rateOfMaterialMovement,
        frackingDPPump,
        krackingDPPump,
        mixTankFillLevel,
        ampDrawOnMixTankAgitator,
    } = frackingFormData;
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
        <>
            <Container className='form_container'>
                <NavBarComponent />
                <Card className="card_container">
                    <PulpPage/>
                    <Fracking/>
                    <ChipInjectionSystem/>
                    <Peripherals/>
                </Card>
            </Container>
        </>
    )
}

export default FormComponent;
