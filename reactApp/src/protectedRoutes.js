import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from './contexts/authContext';

const ProtectedRoutes = () => {

    const context = useContext(AuthContext);
    const location = useLocation();

    return context.isAuthenticated === true ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
};

export default ProtectedRoutes;