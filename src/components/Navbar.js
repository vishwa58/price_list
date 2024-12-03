import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Home, Timeline } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Bitcoin Price Viewer
        </Typography>
        <Button color="inherit" component={RouterLink} to="/" startIcon={<Home />}>
          Home
        </Button>
        <Button
          color="inherit"
          component={RouterLink}
          to="/historical"
          startIcon={<Timeline />}
        >
          Historical Data
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
