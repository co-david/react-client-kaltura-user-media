import React from 'react';
import { connect } from 'react-redux';
import { filter } from '../../actions/MediaActions';
import './contentHeader.css';

const ContentHeader = props => {
    const sort = event => {
        props.filter(undefined, event.target.checked);
    }

    return (
        <div className="content-header">
            <h2>Content</h2>
            <div className="sort">
                <input type="checkbox" id="sortByDate" name="sortByDate" value={false} onChange={(event) => sort(event)} />
                <label>Sort by creation date</label>
            </div>
        </div>
    );
}

export default connect(null, { filter })(ContentHeader);