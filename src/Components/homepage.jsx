// Update the Homepage component in homepage.jsx
import React, { useState } from "react";
import { Segment, Dropdown, Checkbox } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import '../styles/homepage.css';
import { Navigate, useLocation } from "react-router-dom"; // Import useLocation

const sports = [
  { id: 1, title: "Football" },
  { id: 2, title: "Hockey" },
  { id: 3, title: "Bandy" },
  { id: 4, title: "Innebandy" },
  { id: 5, title: "Basketball" },
];

const Homepage = () => {
  const location = useLocation(); // Use useLocation hook to access location state
  const { state } = location;
  const [selection, setSelection] = useState([]);

  if (!state || !state.user) {
    // Redirect or handle the case where state or user is undefined
    return <Navigate to="/" />;
  }

  const { name, permission_list } = state.user;

  const hasPermissionAccess = Object.values(permission_list).some(
    value => value === 1
  );

  const toggleSelection = (e, { label, checked }) => {
    if (checked) {
      setSelection([...selection, label]);
    } else {
      setSelection(selection.filter(el => el !== label));
    }
  };

  return (
    <div>
      <h1>Homepage</h1>
      <p>Name of user: {name}</p>
      <p>Permission list:</p>
      {hasPermissionAccess ? (
        <ul>
          <li>Create: {permission_list.C === 1 ? "Yes" : "No"}</li>
          <li>Read: {permission_list.R === 1 ? "Yes" : "No"}</li>
          <li>Update: {permission_list.U === 1 ? "Yes" : "No"}</li>
          <li>Delete: {permission_list.D === 1 ? "Yes" : "No"}</li>
          <li>Approve: {permission_list.A === 1 ? "Yes" : "No"}</li>
        </ul>
      ) : (
        <p>No permission access</p>
      )}

      <Segment basic>
        <p>
          Selection: {selection.length > 0 ? selection.join(", ") : "empty"}
        </p>

        <Dropdown item simple text="Select sports">
          <Dropdown.Menu>
            {sports.map(({ id, title }) => (
              <Dropdown.Item key={id}>
                <Checkbox label={title} onChange={toggleSelection} />
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Segment>
    </div>
  );
};

export default Homepage;
