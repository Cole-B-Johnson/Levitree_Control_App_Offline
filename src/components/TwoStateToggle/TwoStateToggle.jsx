import React, { useState } from 'react';
import './TwoStateToggle.css';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const TwoStateToggle = ({ name, initialValue, onChange, disabled = false, pumpName = null }) => {
    const [value, setValue] = useState(initialValue);

    const handleToggleChange = (newValue) => {
        if (newValue === value) {
            // Clicking on the same toggle again, nothing happens
            return;
        }
  
        setValue(newValue);
  
        // Call the onChange prop with the new value and optional pumpName
        onChange(newValue, pumpName);
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
                On
            </ToggleButton>
            <ToggleButton
                id="toggle-off"
                value="off"
                variant={value === 'off' ? 'primary' : 'outline-primary'}
                onClick={() => handleToggleChange('off')}
                disabled={disabled}
            >
              Off
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

export default TwoStateToggle;
