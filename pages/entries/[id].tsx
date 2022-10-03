import { useState, ChangeEvent, useMemo, useContext } from 'react';
import { GetServerSideProps } from 'next'

import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Layout } from '../../components/layout/Layout';
import { EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { IEntry } from '../../models/Entry';
import { EntriesContext } from '../../context/entries/EntriesContext';

interface Props extends IEntry {}

const EntryPage = (props: Props) => {
    const statuses: EntryStatus[] = ['pending','in-progress','finished'];

    const [inputValue, setInputValue] = useState(props.description);
    const [status, setStatus] = useState<EntryStatus>(props.status);
    const [touched, setTouched] = useState(false);
    const isNotValid = useMemo(() => !inputValue && touched, [inputValue, touched])
    const { updateEntry } = useContext(EntriesContext);

    const onInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus);
    }

    const onSave = () => {
        updateEntry({
            ...props,
            status,
            description: inputValue,
        },true)
    }

    return (
        <Layout title={`Card: ${props._id}`}>
            <Grid
                container
                justifyContent={'center'}
                sx={{
                    marginTop: 2,
                }}
            >
                <Grid
                    item
                    xs={12} md={4}
                >
                    <Card>
                        <CardHeader 
                            title={`Entry: ${inputValue.substring(0,10) + '...'}`}
                            subheader={`Card created ${props.createdAt} min ago...`}
                        />
                        <CardContent sx={{
                            paddingBottom: '10px',
                        }}>
                            <TextField 
                                label='Add Entry'
                                title='Add Entry'
                                placeholder='Add Entry'
                                value={inputValue}
                                fullWidth
                                multiline
                                autoFocus
                                sx={{
                                    paddingBottom: '20px',
                                    height: '100px',
                                }}
                                helperText={isNotValid && 'Add the a valid input.'}
                                error={isNotValid}
                                onChange={onInputChanged}
                                onBlur={() => setTouched(true)}
                            />
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusChanged}
                                >
                                    {
                                        statuses.map(status => (
                                            <FormControlLabel key={status} value={status} control={<Radio />} label={capitalize(status)} />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions sx={{
                            justifyContent: 'right'
                        }}>
                            <Button
                                endIcon={<SaveOutlinedIcon />}
                                variant={'outlined'}
                                disabled={!inputValue}
                                onClick={onSave}
                            >
                                Add Entry
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton sx={{
                position: 'fixed',
                right: 30,
                bottom: 30,
                backgroundColor: 'error.main',
            }}>
                <DeleteOutlineOutlinedIcon />
            </IconButton>
        </Layout>
    );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    // const { data } = await  // your fetch function here 
    const { id } = params as { id: string; };

    const entry = await dbEntries.getEntryById(id);

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: entry,
    };
}

export default EntryPage;
