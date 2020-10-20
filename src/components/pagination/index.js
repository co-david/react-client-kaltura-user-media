import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { filter } from '../../actions/MediaActions';
import './pagination.css';

const Pagination = props => {
    const totalItems = useSelector(state => state.media.totalCount);
    const activePage = useSelector(state => state.media.page);
    const [pages, setPages] = useState([]);
    const itemsInPage = props.itemsInPage || 10;
    const endPage = Math.ceil(totalItems / itemsInPage);

    useEffect(() => {
        buildPages();
    }, [activePage, endPage])

    //Build list of pages number
    const buildPages = () => {
        //Build array in with page numbers and over it
        const li = Array.from(Array(endPage).keys()).map(num => {
            num++;
            return <li><a href="#" className={num === activePage ? "active" : ""} onClick={() => handlePageNumberClick(num)}>{num}</a></li>
        });
        setPages(li);
    }

    const handlePageNumberClick = (pageNumber) => {
        //Check if page number is in valid range
        if(pageNumber < 1 || pageNumber > endPage) {
            return;
        }

        props.filter(undefined, undefined, pageNumber);
    }

    const handleNextClick = (event) => {
        event.preventDefault();
        
        //Check if is the last page
        if (activePage === endPage) {
            return;
        }

        const nextPage = activePage + 1; 
        props.filter(undefined, undefined, nextPage);
    }

    const handlePrevClick = (event) => {
        event.preventDefault();

        //Check if is the first page
        if (activePage === 1) {
            return;
        }

        const prevPage = activePage - 1; 
        props.filter(undefined, undefined, prevPage);
    }

    return (
        <div>
            <nav>
                <ul className="pagination">
                    <li>
                        <a href="#" aria-label="Previous" onClick={(event) => handlePrevClick(event)}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {pages}
                    <li>
                        <a href="#" aria-label="Next"  onClick={(event) => handleNextClick(event)}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default connect(null, { filter })(Pagination);