import React from 'react';
import './TwoStateToggle2.css';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const TwoStateToggle2 = ({ name, value, onChange, disabled = false }) => {
    const handleToggleChange2 = (newValue) => {
        onChange({
            target: {
                name,
                value: newValue
            }
        });
        
    };
    return (
        <ToggleButtonGroup type="radio" name={name} value={value} size="sm" className='ToggleButtonGroup2'>
            <ToggleButton
                id="toggle-on"
                value="on"
                variant={value === 'on' ? 'primary' : 'outline-primary'}
                onClick={() => handleToggleChange2('on')}
                disabled={disabled}
            >
               50%
            </ToggleButton>
            <ToggleButton
                id="toggle-off"
                value="off"
                variant={value === 'off' ? 'primary' : 'outline-primary'}
                onClick={() => handleToggleChange2('off')}
                disabled={disabled}
            >
              10%
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default TwoStateToggle2
