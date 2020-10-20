import React from 'react';
import { connect, useSelector } from 'react-redux';
import { filter } from '../../actions/MediaActions';
import './header.css';

const Header = props => {
    const lastQuery = useSelector(state => state.media.q);
    const isLogin = useSelector(state => state.media.isLogin);
    const classes = "header" + (isLogin ? " login" : "");
    
    const openLogin = () => {
        document.querySelector('#loginModal').style.display = 'block';
    }

    const search = () => {
        if (isLogin) {
            const q = document.querySelector('#searchInput').value;

            //Check if not same as last queary search
            if (q !== lastQuery) {
                props.filter(q, undefined, 1);
            }
        }
    }

    return (
        <div className={classes}>
            <div className="top">
                <div className="title-wrapper">
                    <h1 className="title">Kaltura Media</h1>
                </div>
                <div className="search-wrapper">
                    <input id="searchInput" type="text" className="search-input" name="search" placeholder="search..." size="70" />
                    <input type="button" value="Go!" onClick={search} />
                </div>
                {!isLogin &&
                    <div>
                        <button onClick={openLogin}>login</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default connect(null, { filter })(Header);