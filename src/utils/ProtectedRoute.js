import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Component for protecting routes, scalable, protects all children inside ProtectedRoute component
const ProtectedRoute = ({
    user,
    redirectPath = '/login',
    children,
}) => {
    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;