import React from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';

import styles from './styles.module.css';
import { FormControl, FormControlLabel, Popover, Radio, RadioGroup } from '@mui/material';

interface Props {
  title: string;
  value: string;
  onChange: (value: string) => void;
  options: {
    label: string;
    value: string;
  }[];
}

const Select: React.FC<Props> = ({ onChange, options, value, title }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleChange = (v: string) => {
    onChange(v);
    handleClose();
  };

  return (
    <>
      <button className={styles.container} onClick={handleClick}>
        <p>
          {title}
          {value ? `: ${value}` : ''}
        </p>
        <KeyboardArrowDown />
      </button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className={styles.optionsContainer}>
          <FormControl>
            <RadioGroup value={value} onChange={(e) => handleChange(e.target.value)}>
              {options.map((op) => (
                <FormControlLabel value={op.value} control={<Radio />} label={op.label} />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      </Popover>
    </>
  );
};

export default Select;
