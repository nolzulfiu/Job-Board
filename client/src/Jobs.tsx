import React, {useState} from 'react';

import Job from './Job';
import JobModal from './JobModal';

import {MobileStepper, Button} from '@material-ui/core';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';


import {Dropdown, DropdownButton, Nav, Navbar} from 'react-bootstrap';


const moment = require('moment');

export default function Jobs({jobs} : any) {

    //modal
    const [open, setOpen] = useState(false);
    const [selectedJob, selectJob] = useState({
        occupation: {
            label: ''
        },
        employer: {
            name: '',
            url: ''
        },
        application_details: {
            url: '',
            email: ''
        },
        description: {
            text_formatted: '',
            conditions: ''
        },
        workplace_address: {
            municipality: ''
        },
        driving_license_required: {},
        salary_description: {},
        scope_of_work: {
            min: '',
            max: ''
        },
        duration: {
            label: ''
        },
        must_have: {
            lanuages: [{
                label: ''
            }],
            skills: [{
                label: ''
            }]
        },
        nice_to_have: {
            lanuages: [{
                label: ''
            }],
            skills: [{
                label: ''
            }]
        }
    });
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [region, setRegion] = useState('');
    const [driver, setDriver] = useState('');
    const [publish, setPublish] = useState('');
    const [jobScope, setJobScope] = useState('');
    const [publishButton, setPublishButton] = useState('secondary');
    const [regionButton, setRegionButton] = useState('secondary');
    const [driverButton, setDriverButton] = useState('secondary');
    const [jobTypeButton, setjobTypeButton] = useState('secondary');

    function clearFilter() {
        clearRegion();
        clearDriver();
        clearJob();
        clearPublish();
    }

    function clearRegion() {
        setRegion('');
        setRegionButton('secondary');
    }

    function clearDriver() {
        setDriver('');
        setDriverButton('secondary');
    }

    function clearPublish() {
        setPublish('');
        setPublishButton('secondary');
    }

    function clearJob() {
        setJobScope('');
        setjobTypeButton('secondary');
    }

    function changeRegionFilter(e : any) {
        setRegion(e.target.value);
        setRegionButton('primary');
    }

    function changeDriverFilter(e : any) {
        setDriver(e.target.value);
        setDriverButton('primary');
    }

    function changejobTypeFilter(e : any) {
        setJobScope(e.target.value);
        setjobTypeButton('primary');
    }

    function changePublishFilter(e : any) {
        setPublish(e.target.value);
        setPublishButton('primary');
    }

    let jobsObj = jobs;
    
    jobsObj = (region !== '') ? jobsObj.filter((item:any) => item.workplace_address.region === region) : jobsObj;
    jobsObj = (driver === 'req') ? jobsObj.filter((item:any) => item.driving_license_required === true) : jobsObj;
    jobsObj = (driver === 'not') ? jobsObj.filter((item:any) => item.driving_license_required === false) : jobsObj;
    jobsObj = (jobScope === 'full') ? jobsObj.filter((item:any) => item.scope_of_work.max === 100) : jobsObj;
    jobsObj = (jobScope === 'part') ? jobsObj.filter((item:any) => item.scope_of_work.max < 100) : jobsObj;

    jobsObj = (publish === 'last') ? jobsObj.filter((item:any) => item.publication_date > moment().subtract(1, 'days').format('YYYY-MM-DDThh:mm:ss')) : jobsObj;
    jobsObj = (publish === '3') ? jobsObj.filter((item:any) => item.publication_date > moment().subtract(3, 'days').format('YYYY-MM-DDThh:mm:ss')) : jobsObj;
    jobsObj = (publish === 'week') ? jobsObj.filter((item:any) => item.publication_date > moment().subtract(1, 'weeks').format('YYYY-MM-DDThh:mm:ss')) : jobsObj;
    jobsObj = (publish === '2week') ? jobsObj.filter((item:any) => item.publication_date > moment().subtract(2, 'weeks').format('YYYY-MM-DDThh:mm:ss')) : jobsObj;
    jobsObj = (publish === 'month') ? jobsObj.filter((item:any) => item.publication_date > moment().subtract(1, 'months').format('YYYY-MM-DDThh:mm:ss')) : jobsObj;

    
    //Pagination
    const numPages = Math.ceil(jobsObj.length / 30);
    const [activeStep, setActiveStep] = React.useState(0);
    const jobsOnPage = jobsObj.slice(activeStep * 30, (activeStep * 30) + 30);
    
    // step == 0, show 0-49
    // step == 1, show 50-99

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        window.scrollTo(0, 0); 
    };
    
    const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    window.scrollTo(0, 0); 
    };

    return (
        <div className="jobs">
            
            <Navbar bg="dark" variant="dark" expand="xl" sticky="top">
                <Navbar.Brand href="/">DevJobs</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                    <DropdownButton id="dropdown-basic-button" title="Region" variant={regionButton} style={{marginLeft: '200px'}}>
    
                        <Dropdown.Item as="button" value='Gävleborgs län' onClick={e => changeRegionFilter(e)} active={region === 'Gävleborgs län'}>
                            Gävleborgs län
                        </Dropdown.Item>
                        <Dropdown.Item as="button" value='Östergötlands län' onClick={e => changeRegionFilter(e)} active={region === 'Östergötlands län'}>
                            Östergötlands län
                        </Dropdown.Item>
                        <Dropdown.Item as="button" value='Ospecificerad arbetsort' onClick={e => changeRegionFilter(e)} active={region === 'Ospecificerad arbetsort'}>
                            Unspecified
                        </Dropdown.Item>
                        <Dropdown.Item as="button" value='Värmlands län' onClick={e => changeRegionFilter(e)} active={region === 'Värmlands län'}>
                            Värmlands län
                        </Dropdown.Item>
                        <Dropdown.Item as="button" value='Västra Götalands län' onClick={e => changeRegionFilter(e)} active={region === 'Västra Götalands län'}>
                            Västra Götalands län
                        </Dropdown.Item>
                        <Dropdown.Item as="button" value='Skåne län' onClick={e => changeRegionFilter(e)} active={region === 'Skåne län'}>
                            Skåne län
                        </Dropdown.Item>
                        <Dropdown.Item as="button" value='Stockholms län' onClick={e => changeRegionFilter(e)} active={region === 'Stockholms län'}>
                            Stockholms län
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={() => clearRegion()}>
                            Clear Filter
                        </Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton id="dropdown-basic-button" title="Published" variant={publishButton}>
                        <Dropdown.Item as="button" value='last' onClick={e => changePublishFilter(e)} active={publish === 'last'}>
                            Last Day
                        </Dropdown.Item>
                        <Dropdown.Item as="button" value='3' onClick={e => changePublishFilter(e)} active={publish === '3'}>
                            Last 3 Days
                        </Dropdown.Item>
                        <Dropdown.Item as="button" value='week' onClick={e => changePublishFilter(e)} active={publish === 'week'}>
                            Last Week
                        </Dropdown.Item>
                        <Dropdown.Item as="button" value='2week' onClick={e => changePublishFilter(e)} active={publish === '2week'}>
                            Last 2 Weeks
                        </Dropdown.Item>
                        <Dropdown.Item as="button" value='month' onClick={e => changePublishFilter(e)} active={publish === 'month'}>
                            Last Month
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={() => clearPublish()}>
                            Clear Filter
                        </Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton id="dropdown-basic-button" title="Drivers Licence" variant={driverButton}>
                        <Dropdown.Item as="button" value='req' onClick={e => changeDriverFilter(e)} active={driver === 'req'}>
                            Drivers Licence Required
                        </Dropdown.Item>
                        <Dropdown.Item as="button" value='not' onClick={e => changeDriverFilter(e)} active={driver === 'not'}>
                            Drivers Licence Not Required
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={() => clearDriver()}>
                            Clear Filter
                        </Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton id="dropdown-basic-button" title="Job Type" variant={jobTypeButton}>
                        <Dropdown.Item as="button" value='full' onClick={e => changejobTypeFilter(e)} active={jobScope === 'full'}>
                            Full Time
                        </Dropdown.Item>
                        <Dropdown.Item as="button" value='part' onClick={e => changejobTypeFilter(e)} active={jobScope === 'part'}>
                            Part Time
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={() => clearJob()}>
                            Clear Filter
                        </Dropdown.Item>
                    </DropdownButton>
                    
                    <Button 
                        onClick={() => clearFilter()} 
                        style={{marginLeft: '30px'}} 
                        variant="contained" 
                        color="default"
                        disabled={(region !== '' || driver !== '' || publish !== '' || jobScope !== '') ? false : true}
                        >
                        Clear Filters
                    </Button>

                    <Navbar.Text style={{marginLeft: '300px'}}>{jobsObj.length} Jobs</Navbar.Text>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div style={{marginBottom: '40px'}}></div>

            <JobModal open={open} job={selectedJob} handleClose={handleClose} />
            
            <div style={{margin: '20px 40px'}}>
            {
                jobsOnPage.map(
                    (job:any, i:number) => (
                        <Job key={i} job={job} onClick={() => {
                        handleClickOpen();
                        selectJob(job);
                        }}
                        />
                    )
                )
            }

            </div>

            <div className='clearfix'></div>
            <div style={{marginTop: '30px', marginBottom: '10px'}}>
                Page {activeStep + 1} of {numPages === 0 ? 1 : numPages}
            </div>

            <MobileStepper
                variant="progress"
                steps={numPages}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === numPages - 1}>
                    Next
                    {<KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {<KeyboardArrowLeft />}
                    Back
                    </Button>
                }
            />
        </div>
    )
}