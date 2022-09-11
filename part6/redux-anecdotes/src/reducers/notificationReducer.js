import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = []

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        create(state, action) {
            const content = action.payload
            state.push({
                content,
                id: getId()
            })
        },
        deleteNotification(state, action) {
            state.shift()
        }
    },
})

export const createNotification = (content, delay) => {
    return async dispatch => {
        dispatch(create(`new anecdote '${content}'`))
        setTimeout(() => {
            dispatch(deleteNotification())
        }, delay*1000)
    }
}

export const { create, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer
