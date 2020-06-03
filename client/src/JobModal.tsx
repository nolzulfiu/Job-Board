import React from 'react';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import { Icon } from "@blueprintjs/core";

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from '@material-ui/core';


  export default function JobModal({job, open, handleClose} : any) {  
    
    if (!job.occupation.label) {
        return <div />
    }

    let apply = (job.application_details.url == null) ? ('mailto:' + job.application_details.email) : job.application_details.url;

    let minMax = '';

    if (job.scope_of_work.min === 100 && job.scope_of_work.max === 100) {
      minMax = 'Full Time';
    } else if (job.scope_of_work.min < 100 && job.scope_of_work.max === 100) {
      minMax = 'Minimum ' + job.scope_of_work.min + '%';
    } else if (job.scope_of_work.max < 100) {
      minMax = 'Part Time ' + job.scope_of_work.min + '% - ' + job.scope_of_work.max + '%';
    } 

    let mustHaveLang = (job.must_have.languages.length === 0) ? '' : job.must_have.languages[0].label;
    let mustHaveSkill = (job.must_have.skills.length === 0) ? '' : job.must_have.skills[0].label;
    let niceToHaveLang = (job.nice_to_have.languages.length === 0) ? '' : job.nice_to_have.languages[0].label;
    let niceToHaveSkill = (job.nice_to_have.skills.length === 0) ? '' : job.nice_to_have.skills[0].label;

    for (let i = 1; i < job.must_have.languages.length - 1; i++) {
      mustHaveLang += ', ' + job.must_have.languages[i].label;
    }

    for (let i = 1; i < job.must_have.skills.length - 1; i++) {
      mustHaveSkill += ', ' + job.must_have.skills[i].label;
    }
    
    for (let i = 1; i < job.nice_to_have.languages.length - 1; i++) {
      niceToHaveLang += ', ' + job.nice_to_have.languages[i].label;
    }

    for (let i = 1; i < job.nice_to_have.skills.length - 1; i++) {
      niceToHaveSkill += ', ' + job.nice_to_have.skills[i].label;
    }
    
    return (
      <div>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          maxWidth= 'sm'
        >

          <DialogTitle id="alert-dialog-slide-title">
            <strong>{job.occupation.label}</strong>
              <br />
                <a href={job.employer.url} target="_blank" rel="noopener noreferrer">{job.employer.name}</a>
                <img className={'detail-logo'} src={job.logo_url} />
              <br />
              {job.workplace_address.municipality}
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description" style={{color: '#5c5c5c'}}
            dangerouslySetInnerHTML={{__html: job.description.text_formatted}} />

            <div style={{marginBottom: '20px'}}></div>

            {job.description.conditions === null ? '' : 
            <p><Icon icon='briefcase' style={{marginRight: '5px'}} /><strong>{job.description.conditions}</strong></p>}

            {job.driving_license_required === false ? '' : 
            <p><Icon icon='drive-time' style={{marginRight: '5px'}} /> <strong>Required</strong></p>}

            {job.duration.label === null ? '' : 
            <p><Icon icon='calendar' style={{marginRight: '5px'}} /><strong>{job.duration.label}</strong></p>}
            
            {<p><Icon icon='euro' style={{marginRight: '5px'}}/><strong>
              {job.salary_description === null ? 'Not Specified' : job.salary_description}
            </strong></p>}

            {minMax === '' ? '' : <p><Icon icon='ring' style={{marginRight: '5px'}}/><strong>{minMax}</strong></p>}
            
            {mustHaveLang === '' ? '' : 
            <p><Icon icon='translate' style={{marginRight: '5px'}}/><strong>Required: {mustHaveLang}</strong></p>}

            {mustHaveSkill === '' ? '' : 
            <p><Icon icon='code' style={{marginRight: '5px'}}/><strong>Required: {mustHaveSkill}</strong></p>}

            {niceToHaveLang === '' ? '' : 
            <p><Icon icon='translate' style={{marginRight: '5px'}}/><strong>Merit: {niceToHaveLang}</strong></p>}

            {niceToHaveSkill === '' ? '' : 
            <p><Icon icon='code' style={{marginRight: '5px'}}/><strong>Merit: {niceToHaveSkill}</strong></p>}
          </DialogContent>


          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <a href={apply} target="_blank" id='apply' rel="noopener noreferrer">
                <Button color="primary">
                    Apply
                </Button>
            </a>
          </DialogActions>
        </Dialog>
      </div>
    );
  }