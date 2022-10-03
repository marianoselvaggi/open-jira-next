import { ChangeEvent, useContext, useState } from 'react';

import { Button, Box, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext } from '../../context/entries/';
import { UIContext } from '../../context/ui/';

export const NewEntry = () => {
//   const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false)

  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;

    addNewEntry(inputValue);
    setInputValue('');
    setIsAddingEntry(false);
    setTouched(false);
  }

  return (
    <Box sx={{marginBottom:2}}>
        {
            isAddingEntry ? (
                <>
                    <TextField 
                        sx={{ paddingTop:2 }}            
                        label='New Entry'
                        placeholder='New Entry'
                        fullWidth
                        multiline
                        helperText={inputValue.length <= 0 && touched && 'Add a new entry'}
                        error={inputValue.length <= 0 && touched}
                        value={inputValue}
                        onChange={onTextFieldChanged}
                        onBlur={() => setTouched(true)}
                    />
                    <Box display={'flex'} justifyContent={'space-between'} paddingBottom={2} paddingTop={1}>
                        <Button
                            variant='text'
                            onClick={() => setIsAddingEntry(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='outlined'
                            color='secondary'
                            endIcon={ <SaveOutlinedIcon />}
                            onClick={onSave}
                        >
                            Save
                        </Button>
                    </Box>
                </>
            ) : (
                <Button
                    fullWidth
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    onClick={() => setIsAddingEntry(true)}
                >
                    Add a new task
                </Button>
            )
        }
    </Box>
  )
}
