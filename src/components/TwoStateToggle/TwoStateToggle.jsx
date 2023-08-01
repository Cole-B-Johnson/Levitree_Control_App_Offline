import React from 'react';
import './TwoStateToggle.css';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const TwoStateToggle = ({ name, value, onChange, disabled = false}) => {
    const handleToggleChange = (newValue) => {
        onChange({
            target: {
                name,
                value: newValue
            }
        });
    };
    return (
            <ToggleButtonGroup type="radio" name={name} value={value} size="sm" className='ToggleButtonGroup' disabled={disabled}>
                <ToggleButton
                    id="toggle-on"
                    value="on"
                    variant={value === 'on' ? 'primary' : 'outline-primary'}
                    onClick={() => handleToggleChange('on')}
                    disabled={disabled}
                >
                    Storage
                </ToggleButton>
                <ToggleButton
                    id="toggle-off"
                    value="off"
                    variant={value === 'off' ? 'primary' : 'outline-primary'}
                    onClick={() => handleToggleChange('off')}
                    disabled={disabled}
                >
                  Use
                </ToggleButton>
            </ToggleButtonGroup>
    )
}

export default TwoStateToggle
