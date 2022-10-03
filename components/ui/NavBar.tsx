import { useContext } from 'react';
import NextLink from 'next/link';

import { AppBar, IconButton, Toolbar, Typography, Link } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import { UIContext } from '../../context/ui/';

export const NavBar = () => {
  const { openSidebar } = useContext(UIContext)

  return (
    <AppBar position={'sticky'}>
        <Toolbar>
            <IconButton
                size='large'
                edge='start'
                onClick={openSidebar}
            >
                <MenuOutlinedIcon />
            </IconButton>
            <NextLink href={'/'}>
              <Link underline='none' color={'white'}>
                <Typography variant='h6'>Open Jira</Typography>
              </Link>
            </NextLink>
        </Toolbar>
    </AppBar>
  )
}
