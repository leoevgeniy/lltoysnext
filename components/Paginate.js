import React from "react";
import {PageItem, Pagination} from "react-bootstrap";
import {useRouter} from "next/router";

function Paginate({pages, page, keyword = "", isAdmin = false, setLoading}) {
    // let filter = ''
    // let keywordQuery = ''
    // let category = ''
    // let filterQuery = ''
    //
    // // let history = useRouter();
    // const query = useSearchParams();
    // if (query.get('category')) {category = query.get('category')}
    // if (query.get('filter')) {filterQuery = query.get('filter')}
    // if (query.get('keyword')) {keywordQuery = query.get('keyword')}
    // if (keyword) {
    //     if (
    //         keywordQuery && !filterQuery && !category
    //     ) {
    //         keyword = "?keyword=" + keywordQuery
    //     } else if (
    //         !keywordQuery && filterQuery
    //     ) {
    //         keyword = ''
    //         filter = '?filter=' + filterQuery
    //     } else if (
    //         keywordQuery && filterQuery
    //     ) {
    //         filter = "&filter="+filterQuery
    //         keyword = "?keyword="+keywordQuery
    //     } else if (keywordQuery && category) {
    //         filter = "&category="+category
    //         keyword = "?keyword="+keywordQuery
    //     } else if (
    //         !keywordQuery && category
    //     ) {
    //         keyword = ''
    //         filter = '?category=' + category
    //     } else if (
    //         keywordQuery && !category
    //     ) {
    //         keyword = "?keyword=" + keywordQuery
    //     }
    //
    // } else {
    //     keyword = '?keyword='
    // }
    let pageStr = '?page'
    if (keyword.includes('?')) {
        pageStr = '&page'
    }
    const history = useRouter()
    return (

        <div style={{display: "flex", justifyContent: "center"}}>
            {pages > 1 && page > 10 && (
                <Pagination>
                    <span
                        key={-1}

                    >
                        <Pagination.First
                            onClick={()=> {
                                history.replace(`${keyword}${pageStr}=${1}`)
                                setLoading(true)
                            }}
                            // href={
                            //     !isAdmin
                            //         ? `${keyword}${pageStr}=${1}`
                            //         : `/admin/productlist/${keyword}}?page=${1}`
                            // }
                        />
                    </span>
                    <span
                        key={page - 10}

                    >
                        <Pagination.Ellipsis
                            onClick={()=> {
                                history.replace(`${keyword}${pageStr}=${page - 10}`)
                                setLoading(true)

                            }}
                            // href={
                            //     !isAdmin
                            //         ? `${keyword}${pageStr}=${page - 10}`
                            //         : `/admin/productlist/${keyword}?page=${
                            //             page - 10
                            //         }`
                            // }
                        />
                    </span>
                    {[...Array(pages).keys()].map(function (x) {
                        if (x + 1 >= page - 2 && x + 1 <= page + 2) {
                            return (
                                <span
                                    key={x + 1}

                                >
                                    <Pagination.Item
                                        onClick={()=> {
                                            history.replace(`${keyword}${pageStr}=${
                                                x + 1
                                            }`)
                                            setLoading(true)

                                        }}
                                        active={x + 1 === page}
                                        // href={
                                        //     !isAdmin
                                        //         ? `${keyword}${pageStr}=${
                                        //             x + 1
                                        //         }`
                                        //         : `/admin/productlist/${keyword}?page=${
                                        //             x + 1
                                        //         }`
                                        // }
                                    >
                                        {x + 1}
                                    </Pagination.Item>
                                </span>
                            );
                        }
                        return null;
                    })}
                    {page + 3 <= pages && (
                        <span
                            key={page + 3}

                        >
                            <Pagination.Ellipsis
                                onClick={()=> {
                                    history.replace(`${keyword}${pageStr}=${page + 3}`)
                                    setLoading(true)

                                }}
                                // href={
                                //     !isAdmin
                                //         ? `${keyword}${pageStr}=${page + 3}`
                                //         : `/admin/productlist/${keyword}?page=${
                                //             page + 3
                                //         }`
                                // }
                            />
                        </span>
                    )}
                    {page + 4 <= pages && (
                        <span
                            key={pages}

                        >
                            <Pagination.Last
                                onClick={()=> {
                                    history.replace(`${keyword}${pageStr}=${pages}`)
                                    setLoading(true)

                                }}
                                // href={
                                //     !isAdmin
                                //         ?
                                //         : `/admin/productlist/${keyword}?page=${pages}`
                                // }
                            />
                        </span>
                    )}


                </Pagination>
            )}
            {pages > 1 && page < 11 && (
                <Pagination>
                    {[...Array(pages).keys()].map((x) => {
                        if (x + 1 <= page + 3) {
                            return (
                                <span
                                    key={x + 1}

                                >

                                    <PageItem
                                        active={x + 1 === page}
                                        onClick={()=> {
                                            history.replace(`${keyword}${pageStr}=${x + 1}`)
                                            setLoading(true)

                                        }}
                                        // href={
                                        //     !isAdmin
                                        //         ? `${keyword}${pageStr}=${
                                        //             x + 1
                                        //         }`
                                        //         : `/admin/productlist/${keyword}?page=${
                                        //             x + 1
                                        //         }`
                                        // }

                                    >
                                        {x + 1}
                                    </PageItem>
                                </span>
                            );
                        }
                        return null;
                    })}
                    {page + 4 <= pages && (
                        <span
                            key={page + 4}
                        >
                                <Pagination.Ellipsis
                                    onClick={()=> {
                                        history.replace(`${keyword}${pageStr}=${page + 4}`)
                                        setLoading(true)

                                    }}
                                    // href={
                                    //     !isAdmin
                                    //         ? `${keyword}${pageStr}=${page + 4}`
                                    //         : `/admin/productlist/${keyword}?page=${
                                    //             page + 6
                                    //         }`
                                    // }
                                />
                        </span>
                    )}
                    {page + 5 <= pages && (
                        <span
                            key={pages}

                        >
                            <Pagination.Last
                                onClick={() => {
                                    history.replace(`${keyword}${pageStr}=${pages}`)
                                    setLoading(true)

                                }}

                                // href={
                                //     !isAdmin
                                //         ? `${keyword}${pageStr}=${pages}`
                                //         : `/admin/productlist/${keyword}?page=${pages}`
                                />
                        </span>
                    )}
                </Pagination>
            )}
        </div>
    );
}

export default Paginate;