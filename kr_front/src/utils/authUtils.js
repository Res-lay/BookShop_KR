const checkAdminAccess = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return user && user.roles.includes("ROLE_ADMIN");
};

export {checkAdminAccess};