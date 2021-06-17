
export const returnErrors = (msg, status, id = null) => {
    return {
        type: 'GET_ERRORS',
        errorData: { msg, status, id }
    }
}

export const clearErrors = () => {
    return {
        type: 'CLEAR_ERRORS'
    }
}