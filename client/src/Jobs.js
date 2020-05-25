import React, {useState} from 'react';

import Job from './Job';
import JobModal from './JobModal';

import {MobileStepper, Button} from '@material-ui/core';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';


import {Dropdown, DropdownButton, Nav, Navbar} from 'react-bootstrap';



const moment = require('moment');

export default function Jobs({jobs}) {

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
    console.log(jobs);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [region, setRegion] = useState('');
    const [skane, setSkane] = useState(false);
    const [gavleborg, setGavleborg] = useState(false);
    const [ostergotland, setOstergotland] = useState(false);
    const [unspecified, setUnspecified] = useState(false);
    const [varmland, setVarmland] = useState(false);
    const [gotaland, setGotaland] = useState(false);
    const [stockholm, setStockholm] = useState(false);
    const [driverReq, setDriverReq] = useState(false);
    const [driverNReq, setDriverNReq] = useState(false);
    const [fullTime, setFullTime] = useState(false);
    const [partTime, setPartTime] = useState(false);
    const [lastDay, setLastDay] = useState(false);
    const [last3Days, setLast3Days] = useState(false);
    const [lastWeek, setLastWeek] = useState(false);
    const [last2Weeks, setLast2Weeks] = useState(false);
    const [lastMonth, setLastMonth] = useState(false);
    const [publishButton, setPublishButton] = useState('secondary');
    const [regionButton, setRegionButton] = useState('secondary');
    const [driverButton, setDriverButton] = useState('secondary');
    const [jobTypeButton, setjobTypeButton] = useState('secondary');
    const [clearFilterButton, setClearFilterButton] = useState(true);

    function clearFilter() {
        clearRegion();
        clearDriver();
        clearJob();
        clearPublish();
    }

    function clearRegion() {
        setSkane(false);
        setGavleborg(false);
        setOstergotland(false);
        setUnspecified(false);
        setVarmland(false);
        setGotaland(false);
        setStockholm(false);
        setRegion('');
        setRegionButton('secondary');
        setClearFilterButton(true);
    }

    function clearDriver() {
        setDriverReq(false);
        setDriverNReq(false);
        setDriverButton('secondary');
        setClearFilterButton(true);
    }

    function clearPublish() {
        setLastDay(false);
        setLast3Days(false);
        setLastWeek(false);
        setLast2Weeks(false);
        setLastMonth(false);
        setPublishButton('secondary');
        setClearFilterButton(true);
    }

    function clearJob() {
        setFullTime(false);
        setPartTime(false);
        setjobTypeButton('secondary');
        setClearFilterButton(true);
    }

    function changeRegionFilter(reg) {
        clearRegion();
        setRegion(reg);
        setRegionButton('primary');
        setClearFilterButton(false);
    }

    function changeDriverFilter() {
        clearDriver();
        setDriverButton('primary');
        setClearFilterButton(false);
    }

    function changejobTypeFilter() {
        clearJob();
        setjobTypeButton('primary');
        setClearFilterButton(false);
    }

    function changePublishFilter() {
        clearPublish();
        setPublishButton('primary');
        setClearFilterButton(false);
    }
    

    let jobsObj = jobs;

    jobsObj = (region !== '') ? jobsObj.filter(item => item.workplace_address.region === region) : jobsObj;
    jobsObj = (driverReq) ? jobsObj.filter(item => item.driving_license_required === true) : jobsObj;
    jobsObj = (driverNReq) ? jobsObj.filter(item => item.driving_license_required === false) : jobsObj;
    jobsObj = (fullTime) ? jobsObj.filter(item => item.scope_of_work.max === 100) : jobsObj;
    jobsObj = (partTime) ? jobsObj.filter(item => item.scope_of_work.max < 100) : jobsObj;

    jobsObj = (lastDay) ? jobsObj.filter(item => item.publication_date > moment().subtract(1, 'days').format('YYYY-MM-DDThh:mm:ss')) : jobsObj;
    jobsObj = (last3Days) ? jobsObj.filter(item => item.publication_date > moment().subtract(3, 'days').format('YYYY-MM-DDThh:mm:ss')) : jobsObj;
    jobsObj = (lastWeek) ? jobsObj.filter(item => item.publication_date > moment().subtract(1, 'weeks').format('YYYY-MM-DDThh:mm:ss')) : jobsObj;
    jobsObj = (last2Weeks) ? jobsObj.filter(item => item.publication_date > moment().subtract(2, 'weeks').format('YYYY-MM-DDThh:mm:ss')) : jobsObj;
    jobsObj = (lastMonth) ? jobsObj.filter(item => item.publication_date > moment().subtract(1, 'months').format('YYYY-MM-DDThh:mm:ss')) : jobsObj;

    
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
                        <Dropdown.Item as="button" onClick={() => {changeRegionFilter('Gävleborgs län'); setGavleborg(true)}} active={gavleborg}>
                            Gävleborgs län
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => {changeRegionFilter('Östergötlands län'); setOstergotland(true)}} active={ostergotland}>
                            Östergötlands län
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => {changeRegionFilter('Ospecificerad arbetsort'); setUnspecified(true)}} active={unspecified}>
                            Unspecified
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => {changeRegionFilter('Värmlands län'); setVarmland(true)}} active={varmland}>
                            Värmlands län
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => {changeRegionFilter('Västra Götalands län'); setGotaland(true)}} active={gotaland}>
                            Västra Götalands län
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => {changeRegionFilter('Skåne län'); setSkane(true)}} active={skane}>
                            Skåne län
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => {changeRegionFilter('Stockholms län'); setStockholm(true)}} active={stockholm}>
                            Stockholms län
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={() => {clearRegion()}}>
                            Clear Filter
                        </Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton id="dropdown-basic-button" title="Published" variant={publishButton}>
                        <Dropdown.Item as="button" onClick={() => {changePublishFilter(); setLastDay(true)}} active={lastDay}>
                            Last Day
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => {changePublishFilter(); setLast3Days(true)}} active={last3Days}>
                            Last 3 Days
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => {changePublishFilter(); setLastWeek(true)}} active={lastWeek}>
                            Last Week
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => {changePublishFilter(); setLast2Weeks(true)}} active={last2Weeks}>
                            Last 2 Weeks
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => {changePublishFilter(); setLastMonth(true)}} active={lastMonth}>
                            Last Month
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={() => {clearPublish()}}>
                            Clear Filter
                        </Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton id="dropdown-basic-button" title="Drivers Licence" variant={driverButton}>
                        <Dropdown.Item as="button" onClick={() => {changeDriverFilter(); setDriverReq(true)}} active={driverReq}>
                            Drivers Licence Required
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => {changeDriverFilter(); setDriverNReq(true)}} active={driverNReq}>
                            Drivers Licence Not Required
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={() => {clearDriver()}}>
                            Clear Filter
                        </Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton id="dropdown-basic-button" title="Job Type" variant={jobTypeButton}>
                        <Dropdown.Item as="button" onClick={() => {changejobTypeFilter(); setFullTime(true)}} active={fullTime}>
                            Full Time
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => {changejobTypeFilter(); setPartTime(true)}} active={partTime}>
                            Part Time
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={() => {clearJob()}}>
                            Clear Filter
                        </Dropdown.Item>
                    </DropdownButton>
                    
                    <Button 
                        onClick={() => clearFilter()} 
                        style={{marginLeft: '30px'}} 
                        variant="contained" 
                        color="default"
                        disabled={clearFilterButton}
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
                    (job, i) => (
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