// Update the Homepage component in homepage.jsx
import React, { useState, useEffect } from "react";
import { Segment, Dropdown, Checkbox } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios"; // Import axios for HTTP requests
import '../styles/homepage.css';

const Homepage = () => {
  const location = useLocation();
  const { state } = location;
  const [selection, setSelection] = useState([]);
  const [sports, setSports] = useState([]); // State to store sports data

  useEffect(() => {
    // Fetch sports data from the API
    const fetchSports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sports");
        setSports(response.data);
      } catch (error) {
        console.error("Error fetching sports data:", error);
      }
    };

    fetchSports();
  }, []); // Empty dependency array to run the effect only once

  if (!state || !state.user) {
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
      {/* ... (your existing code) */}

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
