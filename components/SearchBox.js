import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import React, {useState} from "react";
import {Button, Form, FormControl} from "react-bootstrap";
import {useRouter} from "next/router";
import {useSearchParams} from "next/navigation";
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
        hist()
        if (keyword && filter) {
            history.push(`/${keywordStr}${filterStr2}`)
            setKeyword('')
        } else if (!keyword && filter) {
            history.push(`/${filterStr}`)
            setKeyword('')
        } else if (keyword && category) {
            history.push(`/${keywordStr}${categoryStr2}`)
            setKeyword('')
        } else if (!keyword && category) {
            history.push(`/${categoryStr}`)
            setKeyword('')
        } else if (keyword && !category) {
            history.push(`/${keywordStr}`)
            setKeyword('')
        } else if (keyword && !filter && !category) {
            history.push(`/${keywordStr}`)
            setKeyword('')
        }else {
            history.push(history.push(history.location.path))
            setKeyword('')
        }
    };

    return (
        <Form onSubmit={submitHandler} className="d-flex mx-auto">
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

            <Button type="submit" variant="outline-success" className='lupa'>
                <FontAwesomeIcon icon={solid("magnifying-glass")} />
                {/*<span className='ml-4'> Найти</span>*/}
            </Button>
        </Form>
    );
}

export default SearchBox;
