//Actions type
export const SET_MEDIA = 'SET_MEDIA';
export const SEARCH = 'SEARCH';
export const START_LOADING = 'START_LOADING';
export const SET_FILTER_QUERY = 'SET_FILTER_QUERY';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOGIN = 'SET_LOGIN';
export const DELETE_MEDIA = 'DELETE_MEDIA';
export const SET_TOKEN = 'SET_TOKEN';

export const login = (email, password) => {
    return async dispatch => {
        dispatch(setStartLoading);
        const response = await fetch('http://localhost:5000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.status === 200) {
            const responseObj = await response.json();
            localStorage.setItem('token', responseObj.token); //Set token to local storage
            dispatch(setToken(responseObj.token));
            dispatch(setMedia(responseObj.data));
        } else {
            try {
                const data = await response.json();
                dispatch(setError(data.error || 'Some error occurred'));
            } catch {
                dispatch(setError('Some error occurred'));
            }
        }
    }
}

export const getAllMedia = () => {
    return async (dispatch, getState) => {
        dispatch(setStartLoading);

        const response = await fetch('http://localhost:5000/media', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer' + getState().media.token
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            dispatch(setSeachQuery(""))
            dispatch(setMedia(data));
        } else if (response.status === 401) {
            //Not authenticate
            dispatch(setLogin(false));
        } else {
            try {
                const data = await response.json();
                
                //Check if user is disconnected
                if(data.error.toLowerCase().includes('service_forbidden')) {
                    dispatch(setLogin(false));
                }
                else {
                    dispatch(setError('Some error occurred'));
                }
            } catch {
                dispatch(setError('Some error occurred'));
            }
        }
    }
}

export const filter = (q, soryByCreationDate, page) => {
    return async (dispatch, getState) => {
        //Set values from state if not got them in function paramerts
        console.log(getState());
        q = q === undefined ? getState().media.q : q;
        soryByCreationDate = soryByCreationDate === undefined ? getState().media.sortByCreationDate : soryByCreationDate;
        page = page || getState().media.page;
        
        dispatch(setStartLoading);

        const response = await fetch(`http://localhost:5000/media/filter?page=${page}&q=${q}&soryByCreationDate=${soryByCreationDate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + getState().media.token
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            dispatch(setFilterQuery({ q, soryByCreationDate, page}));
            dispatch(setMedia(data));
        } else if (response.status === 401) {
            //Not authenticate
            dispatch(setLogin(false));
        } else {
            try {
                const data = await response.json();
                
                //Check if user is disconnected
                if(data.error.toLowerCase().includes('service_forbidden')) {
                    dispatch(setLogin(false));
                }
                else {
                    dispatch(setError('Some error occurred'));
                }
            } catch {
                dispatch(setError('Some error occurred'));
            }
        }
    }
}

export const deleteMedia = id => {
    return async (dispatch, getState) => {
        const response = await fetch('http://localhost:5000/media', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + getState().media.token
            },
            body: JSON.stringify({ id })
        });

        if (response.status === 200) {
            dispatch(remove(id));
        }  else if (response.status === 401) {
            //Not authenticate
            dispatch(setLogin(false));
        } else {
            try {
                const data = await response.json();
                dispatch(setError(data.error || 'Some error occurred'));
            } catch {
                dispatch(setError('Some error occurred'));
            }
        }
    }
}

const setStartLoading = () => {
    return {
        type: START_LOADING
    }
}

const setToken = token => {
    return {
        type: SET_TOKEN,
        payload: token
    }
}

const setMedia = data => {
    return {
        type: SET_MEDIA,
        payload: {
            data
        }
    }
}

export const setError = error => {
    return {
        type: SET_ERROR,
        payload: {
            error
        }
    }
}

const setSeachQuery = q => {
    return {
        type: SEARCH,
        payload: {
            q
        }
    }
}

const setFilterQuery = query => {
    return {
        type: SET_FILTER_QUERY,
        payload: query
    }
}

const setLogin = status => {
    if(!status) {
        localStorage.removeItem('token');
    }

    return {
        type: SET_LOGIN,
        payload: {
            status
        }
    }
}

const remove = id => {
    return {
        type: DELETE_MEDIA,
        payload: {
            id
        }
    }
}