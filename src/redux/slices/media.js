import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

const initialState = {
    isLoading: false,
    error: null,
    videos:[],
    audios:[],
};

const slice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        getVideoSuccessfully(state, action) {
            state.videos = action.payload
        }
    }
})

  // Actions
  export const {
    getVideoSuccessfully,
    hasError
} = slice.actions;

// Reducer
export default slice.reducer;

export function getVideo(type) {
    return async () => {
        try {
            const response = await axios.get('/api/media/getMedia', {
                params: {
                    type: type
                }
            })
            dispatch(slice.actions.getVideoSuccessfully(response.data.media))
        }catch (err) {
            dispatch(slice.actions.hasError(err));
        }
    }
}