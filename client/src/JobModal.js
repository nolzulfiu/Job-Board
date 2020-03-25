import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  export default function JobModal({job, open, handleClose}) {  
    
    if (!job.occupation.label) {
        return <div />
    }

    let apply = (job.application_details.url == null) ? ('mailto:' + job.application_details.email) : job.application_details.url;
    
    return (
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <strong>{job.occupation.label}</strong><br />
            {job.employer.name}
            <img className={'detail-logo'} src={job.logo_url} />
            <br />
            {job.workplace_address.municipality}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description"
            dangerouslySetInnerHTML={{__html: job.description.text_formatted}} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <a href={apply} target="_blank" id='apply'>
                <Button color="primary">
                    Apply
                </Button>
            </a>
          </DialogActions>
        </Dialog>
      </div>
    );
  }