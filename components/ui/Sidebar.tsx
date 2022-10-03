import { useContext } from 'react';

import { Drawer, List, Typography, Box, ListItem, ListItemIcon, ListItemText, Divider, Grid, IconButton } from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

import { UIContext } from '../../context/ui/';

const menuItems: string[] = ['Inbox','Starred','Send Email','Drafts'];

export const Sidebar = () => {
  const { sidemenuOpen, closeSidebar } = useContext(UIContext)
  return (
    <Drawer
     anchor="left"
     open={ sidemenuOpen }
     onClose={ closeSidebar }
    >
        <Box sx={{
            width: 250,
        }}>
            <Box>
                <Grid container width={'100%'} flexDirection={'row'}>
                    <Grid item alignContent={'start'} width={'50%'}>
                        <Typography variant="h4">Menu</Typography>
                    </Grid>
                    <Grid item alignItems={'end'} width={'50%'} paddingLeft={'96px'}>
                        <IconButton onClick={closeSidebar}>
                            <ArrowCircleLeftOutlinedIcon /> 
                        </IconButton>                        
                    </Grid>
                </Grid>
            </Box>
 
            <List>
                {
                    menuItems.map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                { index %  2 ? <MarkEmailReadOutlinedIcon /> : <MailOutlinedIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))
                }
            </List>
            <Divider />
        </Box>
    </Drawer>
  )
}
