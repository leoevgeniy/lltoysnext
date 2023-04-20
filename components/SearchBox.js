import React, {useEffect, useRef, useState} from "react";
import {Form, FormControl, Toast} from "react-bootstrap";
import {useRouter} from "next/router";
import {useSearchParams} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
    const [showA, setShowA] = useState(false);

    function useComponentVisible(showA) {
        const ref = useRef(null);
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowA(false);
            }
        };

        useEffect(() => {
            document.addEventListener('click', handleClickOutside, true);
            return () => {
                document.removeEventListener('click', handleClickOutside, true);
            };
        }, [])
        return {ref, showA, setShowA};
    }

    function toggleShowA() {
        setShowA(!showA)
    }

    const {ref} = useComponentVisible(true);
    return (
        <div className='ms-auto'>

            {/*<Button onClick={toggleShowA} className="mb-2 text-white" variant="outline-success">*/}
            <Link href='#' onClick={(e) => {
                e.preventDefault();
                toggleShowA()
            }}>
                <FontAwesomeIcon
                    className={showA ? 'text-gray pr-3 pe-auto' : 'text-white pr-3 pe-auto'}
                    style={{'pointerEvent': 'auto'}}
                    icon={faMagnifyingGlass}/>
            </Link>
            {/*</Button>*/}
            <Toast ref={ref} show={showA} onClose={toggleShowA} className='position-absolute ' style={{'zIndex': '1'}}>
                <Toast.Header>
                    {/*<img*/}
                    {/*    src="holder.js/20x20?text=%20"*/}
                    {/*    className="rounded me-2"*/}
                    {/*    alt=""*/}
                    {/*/>*/}
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
                                expanded = false
                            }}
                            // className="mr-sm-2 ml-sm-5"
                        ></FormControl>

                        <span type='submit' className='position-relative'
                              style={{'top': '8px', 'right': '30px', 'fontSize': '13px'}}><FontAwesomeIcon
                            icon={faMagnifyingGlass}/></span>
                    </Form>

                </Toast.Body>
            </Toast>
        </div>
    );
}

export default SearchBox;
