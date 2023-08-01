import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const ThreeStateToggle = (props) => {
  const [value, setValue] = useState(props.value);

  const handleToggleChange = (newValue, pumpName) => {
    if (newValue === value) {
      // Clicking on the same toggle again, nothing happens
      return;
    }
  
    setValue(newValue);
  
    if (newValue === null) {
      props.onChange && props.onChange("off", pumpName);
    } else {
      props.onChange && props.onChange(newValue, pumpName);
    }
  };
  
  return (
    <ToggleButtonGroup type="radio" name="toggle" value={value} size="sm" className="ToggleButtonGroup">
      <ToggleButton
        id="toggle-on"
        value="on"
        name={props.name}
        variant={value === 'on' ? 'primary' : 'outline-primary'}
        onClick={() => handleToggleChange('on', props.pumpName)} // Pass pumpName here
      >
        Forward
      </ToggleButton>
      <ToggleButton
        id="toggle-off"
        value="off"
        name={props.name}
        variant={value === 'off' ? 'primary' : 'outline-primary'}
        onClick={() => handleToggleChange('off', props.pumpName)} // Pass pumpName here
      >
        Reverse
      </ToggleButton>
      <ToggleButton
        id="toggle-null"
        value="null"
        name={props.name}
        variant={value === 'null' ? 'primary' : 'outline-primary'}
        onClick={() => handleToggleChange('null', props.pumpName)} // Pass pumpName here
      >
        Off
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ThreeStateToggle;
