import React from 'react';
import { useSelector } from 'react-redux';
import './table.css';

const Table = props => {
    const activePage = useSelector(state => state.media.page);
    const itemsInPage = props.itemsInPage || 10;
    let firstItemNumber = ((activePage - 1) * itemsInPage) + 1;

    //Convert secound to time in format hh:mm:ss
    const convertSecToTime = sec => {
        const secondsNumber = parseInt(sec, 10);
        const hours = (Math.floor(secondsNumber / 3600)).toString().padStart(2, "0");
        const minutes = (Math.floor((secondsNumber - (hours * 3600)) / 60)).toString().padStart(2, "0");
        const seconds = (secondsNumber - (hours * 3600) - (minutes * 60)).toString().padStart(2, "0");
        const time = parseInt(hours) > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;

        return time;
    }

    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {
                            props.tableHeaders.map((val) => <th>{val}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    props.tableData && props.tableData.map((media) => {
                        return (
                        <tr>
                            <td>{firstItemNumber++}</td>
                            <td>
                                <img alt={media.name} className="thumbnail" src={media.thumbnailUrl} />
                            </td>
                            <td>{media.name}</td>
                            <td>{media.id}</td>
                            <td>{convertSecToTime(media.duration)}</td>
                            <td>
                                <input id="delete" className="delete-btn" type="button" value="Delete" onClick={() => props.handleDelete(media.id)} />
                            </td>
                        </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default Table;