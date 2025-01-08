import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export default function MyDatePicker(props) {
  const { width, label, control, name } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ 
                  field: { onChange, value },
                  fieldState:{error},
                  formState,
                   }) => (
          <DatePicker
            label={label}
            sx={{ width: {width} }} // Correctly apply `width`
            value={value} // Prevent uncontrolled to controlled warnings
            onChange={onChange} // Pass the new value to react-hook-form
            slotProps={{
              textField:{
                error: !!error,
                helperText:error?.message,
              }
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
