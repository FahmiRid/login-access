// Update the Homepage component in homepage.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'; // Import useLocation

const Homepage = () => {
  const location = useLocation(); // Use useLocation hook to access location state
  const { state } = location;

  if (!state || !state.user) {
    // Redirect or handle the case where state or user is undefined
    return <Navigate to="/" />;
  }

  const { name, permission_list } = state.user;

  const hasPermissionAccess = Object.values(permission_list).some((value) => value === 1);

  return (
    <div>
      <h1>Homepage</h1>
      <p>Name of user: {name}</p>
      <p>Permission list:</p>
      {hasPermissionAccess ? (
        <ul>
          <li>Create: {permission_list.C === 1 ? 'Yes' : 'No'}</li>
          <li>Read: {permission_list.R === 1 ? 'Yes' : 'No'}</li>
          <li>Update: {permission_list.U === 1 ? 'Yes' : 'No'}</li>
          <li>Delete: {permission_list.D === 1 ? 'Yes' : 'No'}</li>
          <li>Approve: {permission_list.A === 1 ? 'Yes' : 'No'}</li>
        </ul>
      ) : (
        <p>No permission access</p>
      )}
    </div>
  );
};

export default Homepage;
