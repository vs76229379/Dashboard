import React from "react";
import { Grid, Paper } from "@mui/material";
import Geography from "scenes/geography";
import Pest from "scenes/pest";
import Pestle from "scenes/pestle";
import Region from "scenes/region";
import Sector from "scenes/sector";
import Source from "scenes/source";
import Swot from "scenes/swot";
import Topic from "scenes/topic";
import Year from "scenes/year";
import Footer from 'components/Footer';


const Dashboard = () => {
  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Paper style={{ 
          height: '300px', 
          overflowY: 'auto', 
          scrollbarColor: 'transparent transparent',
          scrollbarWidth: 'thin'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.scrollbarColor = 'darkblue auto';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.scrollbarColor = 'transparent transparent';
        }}>
          <Geography />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper style={{ height: '300px' }}><Pest /></Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper style={{ height: '300px' }}><Pestle /></Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper style={{ height: '300px' }}><Region /></Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper style={{ height: '300px' }}><Sector /></Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper style={{ height: '300px' }}><Source /></Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper style={{ height: '300px' }}><Swot /></Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper style={{ height: '300px' }}><Topic /></Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper style={{ height: '300px' }}><Year/></Paper>
      </Grid>
    </Grid>
    <Footer />
    </>
  );
};

export default Dashboard;
