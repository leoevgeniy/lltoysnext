import React, {useState} from "react";
import {Button, Form, FormControl, Toast} from "react-bootstrap";
import {useRouter} from "next/router";
import {useSearchParams} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

// import {useHistory} from "react-router-dom";

function SearchBox(expanded) {
    const [keyword, setKeyword] = useState("");
    let keywordStr = ''
    let filter = ''
    let category = ''
    let filterStr = ''
    let filterStr2 = ''
    let categoryStr = ''
    let categoryStr2 = ''
    let filterQuery = ''
    let keywordQuery = ''
    let history = useRouter();
    const searchParams = useSearchParams();
    category = searchParams.get('category')
    filterQuery = searchParams.get('filter')
    keywordQuery = searchParams.get('keyword')

    const hist = () => {
        keywordStr = '?keyword=' + keyword
        if (filterQuery) {
            filter = filterQuery
        }
        filterStr = '?filter=' + filter
        filterStr2 = '&filter=' + filter
        categoryStr = '?category=' + category
        categoryStr2 = '&category=' + category
    }
    const submitHandler = (e) => {
        e.preventDefault();
        // hist()
        // if (keyword && filter) {
        //     history.push(`/${keywordStr}${filterStr2}`)
        //     setKeyword('')
        // } else if (!keyword && filter) {
        //     history.push(`/${filterStr}`)
        //     setKeyword('')
        // } else if (keyword && category) {
        //     history.push(`/${keywordStr}${categoryStr2}`)
        //     setKeyword('')
        // } else if (!keyword && category) {
        //     history.push(`/${categoryStr}`)
        //     setKeyword('')
        // } else if (keyword && !category) {
        //     history.push(`/${keywordStr}`)
        //     setKeyword('')
        // } else if (keyword && !filter && !category) {
        //     history.push(`/${keywordStr}`)
        //     setKeyword('')
        // }else {
        //     history.push(history.push(history.location.path))
        //     setKeyword('')
        // }
    };
    const [showA, setShowA] = useState(true);
    function toggleShowA() {
        setShowA(!showA)
    }

    return (
        <div className='ms-auto'>

            {/*<Button onClick={toggleShowA} className="mb-2 text-white" variant="outline-success">*/}
                <FontAwesomeIcon onClick={toggleShowA}
                                 className={showA ? 'text-gray pr-3 pe-auto' : 'text-white pr-3 pe-auto'}
                                 style={{'pointer-event': 'auto'}}
                                 icon={faMagnifyingGlass}/>

            {/*</Button>*/}
            <Toast show={showA} onClose={toggleShowA} className='position-absolute ' style={{'zIndex': '1'}}>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Поиск</strong>
                </Toast.Header>
                <Toast.Body>
                    <Form onSubmit={submitHandler} className="d-flex">
                        <FormControl
                            type="text"
                            name="q"
                            value={keyword}
                            onChange={(e) => {
                                setKeyword(e.target.value)
                                expanded=false
                            }}
                            // className="mr-sm-2 ml-sm-5"
                        ></FormControl>

                        <span type='submit' className='position-relative' style={{'top': '8px', 'right': '30px', 'fontSize': '13px'}}><FontAwesomeIcon icon={faMagnifyingGlass}  /></span>
                    </Form>

                </Toast.Body>
            </Toast>
        </div>
    );
}

export default SearchBox;
