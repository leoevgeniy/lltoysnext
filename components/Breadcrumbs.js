import React from 'react'
import {useHistory} from "react-router-dom";
import {Link, Typography} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
// import {Link} from "react-router-dom";

function Breadcrumb(step1, step2, step3) {
    const props = [step1, step2, step3]
    return (
        <Breadcrumbs aria-label="breadcrumb" size='lg' className='d-flex align-items-center align-content-center text-center mb-0'>
            {
                props.map((item) => (
                    <Link
                        onClick={(event) => event.preventDefault()}
                        key={item}
                        underline="hover"
                        color="neutral"
                        fontSize="inherit"
                        to={'/'}

                    >
                        {item}
                    </Link>

                ))}
            {/*<Typography fontSize="inherit">{last}</Typography>*/}

            {/*{step3 && <Link color="textPrimary" onClick={handleClickstep3} aria-current={last === step3 ? 'page' : ''}>*/}
            {/*    {step3}*/}
            {/*</Link>}*/}
            {/*{step4 && <Link color="textPrimary" onClick={handleClickstep4} aria-current={last === step4 ? 'page' : ''}>*/}
            {/*    {step4}*/}
            {/*</Link>}*/}
        </Breadcrumbs>
    )
}

export default Breadcrumb