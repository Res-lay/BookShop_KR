export const setAuthenticationStatus = (isAuthenticated) => ({
    type: 'SET_AUTHENTICATION_STATUS',
    payload: isAuthenticated,
});