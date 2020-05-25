import React from 'react';

import Card from 'react-bootstrap/Card';
import { Tag } from "@blueprintjs/core";

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

const moment = require('moment');

export default function Job({job, onClick}) { 
    
    let publishDate = moment(job.publication_date, 'YYYY-MM-DDThh-mm-ss').fromNow();

    let mustHaveSwe = '';
    let mustHaveEng = '';

    for (let i = 0; i < job.must_have.languages.length; i++) {
        let lang = job.must_have.languages[i].label.toLowerCase();
        if (lang === 'svenska' || lang === 'swedish') {
            mustHaveSwe = 'Swedish';
        } else if (lang === 'engelska' || lang === 'english') {
            mustHaveEng = 'English';
        }
    }

    return (        
            <Card onClick={onClick} text={'dark'} bg={'light'} id='jobCard'
            style=
                {{width: '400px', 
                height: '200px', 
                marginBottom: '20px', 
                display: 'flex', 
                float: 'left', 
                marginLeft: '40px',
                marginRight: '20px',
                border: '1px #73008a solid'
                }}>
                  
                <Card.Body>
                    <Card.Title style={{maxHeight: '30px'}}>{job.occupation.label}</Card.Title>
                    <Card.Text style={{fontStyle: 'italic', height: '40px', alignContent: 'center', marginTop: '20px'}}>
                        <img src={job.logo_url} style={{maxHeight: '40px', maxWidth: '100px'}} />
                        {(job.logo_url === null) ? job.employer.name : ''}
                    </Card.Text>
                    <Card.Text style={{marginTop: '10px'}}>
                        <Tag style={{marginRight: '10px'}}>
                            {job.workplace_address.municipality == null ? 'Unspecified' : job.workplace_address.municipality}
                        </Tag>
                        <Tag style={{marginRight: '10px'}}>{job.scope_of_work.max === 100 ? 'Full Time' : 'Part Time'}</Tag>
                        {mustHaveSwe === '' ? '' : <Tag style={{marginRight: '10px'}}>{mustHaveSwe}</Tag>}
                        {mustHaveEng === '' ? '' : <Tag style={{marginRight: '10px'}}>{mustHaveEng}</Tag>}
                    </Card.Text>
                </Card.Body>
                <Card.Footer style={{backgroundColor: '#73008a'}}>
                    <small style={{color: '#ffffff'}}>{publishDate}</small>
                </Card.Footer>
            </Card>
    )
}


