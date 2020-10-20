import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { getAllMedia, deleteMedia } from '../actions/MediaActions';
import Header from '../components/header';
import ContentHeader from '../components/contentHeader';
import Table from '../components/table';
import Pagination from '../components/pagination';
import LoginPopup from '../components/loginPopup';
import '../stylesheets/media.css';

const Media = props => {
    const isLogin = useSelector(state => state.media.isLogin);
    const media = useSelector(state => state.media.media);
    const loading = useSelector(state => state.media.loading);
    const tableHeaders = [
        '#',
        'Thumbnail',
        'Name',
        'Entry id',
        'Duration',
        'Actions',
    ];

    useEffect(() => {
        if (isLogin) {
            props.getAllMedia();
        }
    }, [])

    const handleDelete = (id) => {
        if (window.confirm("Are you sure want to delete this file?")) {
            props.deleteMedia(id);
        }
    }

    return (
        <div className="container">
            <Header />
            <div className="content">
                {isLogin === true ?
                    <div>
                        <ContentHeader />
                        <hr className="border-line"></hr>
                        <Table tableHeaders={tableHeaders} tableData={media || []} handleDelete={handleDelete} />
                        <Pagination />
                    </div>
                    : loading === true ?
                        <div className="loading">Loading. . .</div>
                        : <div>Please login</div>
                }
            </div>
            <LoginPopup />
        </div>
    );
}

export default connect(null, { getAllMedia, deleteMedia })(Media);