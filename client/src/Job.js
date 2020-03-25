import React from 'react';
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core';


const moment = require('moment');

export default function Job({job, onClick}) { 
    
    let publishDate = moment(job.publication_date, 'YYYY-MM-DDThh-mm-ss').fromNow();

    return (
        <Paper onClick={onClick} className={'job'}>
            <div className='job-info'>
                <Typography variant='h5'>{job.occupation.label}</Typography>
                <Typography variant='h6'>{job.employer.name}</Typography>
                <Typography variant='h6' id='region'>{job.workplace_address.municipality}</Typography>
            </div>
            <div>
                <Typography>{publishDate}</Typography>
            </div>
        </Paper>
    )
}