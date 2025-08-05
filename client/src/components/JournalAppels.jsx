import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography,
    Divider,
    Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import './JournalAppels.css'


const JournalAppels = () => {
    const [appels, setAppels] = useState([
        { id: 1, nom: 'John Doe', photo: 'john.jpg', type: 'entrant', heure: '10:30', duree: '5min', date: '2023-01-15' },
        { id: 2, nom: 'Jane Doe', photo: 'jane.jpg', type: 'sortant', heure: '11:30', duree: '5min', date: '2023-01-16' },
        { id: 3, nom: 'Alice', photo: 'alice.jpg', type: 'manquant', heure: '12:30', duree: '0min', date: '2023-01-17' },
        { id: 4, nom: 'Bob', photo: 'bob.jpg', type: 'entrant', heure: '00:30', duree: '5min', date: '2023-01-18' },
        { id: 5, nom: 'Charlie', photo: 'charlie.jpg', type: 'entrant', heure: '23:30', duree: '5min', date: '2023-01-19' },
    ]);

    return (
        <div className='Journal'>
            <div className='JournalPere'>
                <h2>Journal d'appels</h2>
                <Link to='/'><Button>Retour au chat</Button></Link>
                <Divider />
                <List>
                    {appels.map((appel) => (
                        <div key={appel.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={appel.nom} src={appel.photo} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <span style={{ color: appel.type === 'entrant' ? 'red' : 'black' }}>
                                            {`${appel.nom} (${appel.type === 'entrant' ? 'Entrant' : appel.type === 'sortant' ? 'Sortant' : 'Manquant'})`}
                                        </span>
                                    }
                                    secondary={
                                        <Typography
                                            sx={{ display: 'flex', alignItems: 'center' }}
                                            component="div"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            <span style={{ marginLeft: 'auto', marginRight: '8px' }}>
                                                {`${appel.date} | ${appel.heure} | ${appel.duree}`}
                                            </span>
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default JournalAppels;