import React from "react";
import {NavLink, PageItem, Pagination} from "react-bootstrap";
// import {LinkContainer} from "react-router-bootstrap";
import {useRouter} from "next/router";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

function Paginate({pages, page, keyword = "", isAdmin = false}) {
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
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            {pages > 1 && page > 10 && (
                <Pagination>
                    <span
                        key={-1}

                    >
                        <Pagination.First
                            href={
                                !isAdmin
                                    ? `${keyword}?page=${1}`
                                    : `/admin/productlist/${keyword}}?page=${1}`
                            }/>
                    </span>
                    <span
                        key={page - 10}

                    >
                        <Pagination.Ellipsis
                            href={
                                !isAdmin
                                    ? `${keyword}?page=${page - 10}`
                                    : `/admin/productlist/${keyword}?page=${
                                        page - 10
                                    }`
                            }/>
                    </span>
                    {[...Array(pages).keys()].map(function (x) {
                        if (x + 1 >= page - 5 && x + 1 <= page + 5) {
                            return (
                                <span
                                    key={x + 1}

                                >
                                    <Pagination.Item
                                        active={x + 1 === page}
                                        href={
                                            !isAdmin
                                                ? `${keyword}?page=${
                                                    x + 1
                                                }`
                                                : `/admin/productlist/${keyword}?page=${
                                                    x + 1
                                                }`
                                        }
                                    >
                                        {x + 1}
                                    </Pagination.Item>
                                </span>
                            );
                        }
                        return null;
                    })}
                    {page + 6 <= pages && (
                        <span
                            key={page + 6}

                        >
                            <Pagination.Ellipsis
                                href={
                                    !isAdmin
                                        ? `${keyword}?page=${page + 6}`
                                        : `/admin/productlist/${keyword}?page=${
                                            page + 6
                                        }`
                                }/>
                        </span>
                    )}
                    {page + 7 <= pages && (
                        <span
                            key={pages}

                        >
                            <Pagination.Last
                                href={
                                    !isAdmin
                                        ? `${keyword}?page=${pages}`
                                        : `/admin/productlist/${keyword}?page=${pages}`
                                }/>
                        </span>
                    )}


                </Pagination>
            )}
            {pages > 1 && page < 11 && (
                <Pagination>
                    {[...Array(pages).keys()].map((x) => {
                        if (x + 1 <= page + 5) {
                            return (
                                <span
                                    key={x + 1}

                                >
                                    <PageItem
                                        active={x + 1 === page}
                                        href={
                                            !isAdmin
                                                ? `${keyword}?page=${
                                                    x + 1
                                                }`
                                                : `/admin/productlist/${keyword}?page=${
                                                    x + 1
                                                }`
                                        }

                                    >
                                        {x + 1}
                                    </PageItem>
                                </span>
                            );
                        }
                        return null;
                    })}
                    {page + 6 <= pages && (
                        <span
                            key={page + 10}
                        >
                                <Pagination.Ellipsis
                                    href={
                                        !isAdmin
                                            ? `${keyword}?page=${page + 10}`
                                            : `/admin/productlist/${keyword}?page=${
                                                page + 6
                                            }`
                                    }
                                />
                        </span>
                    )}
                    {page + 7 <= pages && (
                        <span
                            key={pages}

                        >
                            <Pagination.Last
                                href={
                                    !isAdmin
                                        ? `${keyword}?page=${pages}`
                                        : `/admin/productlist/${keyword}?page=${pages}`
                                }/>
                        </span>
                    )}
                </Pagination>
            )}
        </div>
    );
}

export default Paginate;
