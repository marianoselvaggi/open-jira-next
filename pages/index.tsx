import type { NextPage } from 'next'

import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'

import { Layout } from '../components/layout';
import { EntryList } from '../components/ui/';
import { NewEntry } from '../components/ui/';

const HomePage: NextPage = () => {
  return (
    <Layout title='Home page'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{
            height: 'calc(100vh - 100px)'
          }}>
            <CardHeader title='Pending Items' />
            {/* { create a new card } */}
            <NewEntry />
            <EntryList status='pending' />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{
            height: 'calc(100vh - 100px)'
          }}>
            <CardHeader title='In progress Items' />
            <EntryList status='in-progress' />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{
            height: 'calc(100vh - 100px)'
          }}>
            <CardHeader title='Completed Items' />
            <EntryList status='finished' />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage;
