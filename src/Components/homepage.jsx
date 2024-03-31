/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
// Update the Homepage component in homepage.jsx
import React, { useState, useEffect } from "react";
import { Segment, Dropdown, Checkbox } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import axios for HTTP requests
import '../styles/homepage.css';
import Dots from './images/dots.svg';
import Arrow from './images/arrow_up.svg';
import { Tags } from "./tags.tsx";

const Homepage = () => {
  const location = useLocation();
  const { state } = location;
  const [selection, setSelection] = useState([]);
  const [sports, setSports] = useState([]); // State to store sports data
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    asb: false,
    mortgage: false,
    digitalWealth: false,
  });
  const [roleList, setRoleList] = useState([]);
  const [originalRoleList, setOriginalRoleList] = useState([]);
  const [productLines, setProductLines] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


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

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchRoleList(1);
    // Fetch product lines from the API
    fetchProductLines();
  }, []);
  
  
  const fetchRoleList = async (page) => {
    try {
      const response = await axios.post("http://localhost:5000/api/rolelist", {
        page,
        sortField,
        sortOrder,
      });
      setRoleList(response.data.data);
      setOriginalRoleList(response.data.data);
  
      // Update totalPages based on the total number of records and page size
      const pageSize = response.data.page_size;
      const totalRecords = response.data.total_records;
      const totalPages = Math.ceil(totalRecords / pageSize);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching roleList:', error);
    }
  };

  const fetchProductLines = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/productline");
      const initialSelectedOptions = {};
      response.data[0].forEach(line => {
        initialSelectedOptions[line.name.toLowerCase()] = false;
      });
      setProductLines(response.data[0]);
      setSelectedOptions(initialSelectedOptions);
    } catch (error) {
      console.error('Error fetching productLines:', error);
    }
  };


  const toggleSelection = (e, { label, checked }) => {
    if (checked) {
      setSelection([...selection, label]);
    } else {
      setSelection(selection.filter(el => el !== label));
    }
  };

  const handleIconClick = () => {
    setModalVisible(true);
  };

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  const handleClear = () => {
    // Reset filters and show original roleList
    setSelectedOptions({
      asb: false,
      mortgage: false,
      digitalWealth: false,
    });
    setRoleList(originalRoleList);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };


  const handleApply = () => {
    // Filter roleList based on selected options
    const filteredRoles = originalRoleList.filter(role => {
      const productLineName = role.product_line.toLowerCase();
      return selectedOptions[productLineName];
    });

    setRoleList(filteredRoles);
    setModalVisible(false);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle sort order if already sorting by this field
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set sort field and default to ascending order
      setSortField(field);
      setSortOrder("asc");
    }
  
    // Sort the roleList based on the selected field and order
    const sortedRoles = [...roleList].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[field].localeCompare(b[field]);
      } else {
        return b[field].localeCompare(a[field]);
      }
    });
  
    // Update roleList with the sorted data
    setRoleList(sortedRoles);
  };
  

  const handlePageChange = (page) => {
    console.log("Changing page to:", page);
    if (page >= 1 && page <= totalPages) {
      fetchRoleList(page);
      setCurrentPage(page);
    }
  };




  return (
    <div>
      <div className="homepage-container">
        <h1>Homepage</h1>
      </div>

      <div className="selection-drop">
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
      <div className="searchbox">
        <div className="group">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
          <input
            placeholder="Search"
            type="search"
            className="input"
          />
        </div>
        <div>
          <a onClick={handleIconClick} className="filter-icon">

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9995 3C16.5518 3 16.9995 3.44772 16.9995 4V5H20.9995C21.5518 5 21.9995 5.44772 21.9995 6C21.9995 6.55228 21.5518 7 20.9995 7H16.9995V8C16.9995 8.55228 16.5518 9 15.9995 9C15.4472 9 14.9995 8.55228 14.9995 8V4C14.9995 3.44772 15.4472 3 15.9995 3ZM2.00098 6C2.00098 5.44772 2.44869 5 3.00098 5H12.001C12.5533 5 13.001 5.44772 13.001 6C13.001 6.55228 12.5533 7 12.001 7H3.00098C2.44869 7 2.00098 6.55228 2.00098 6ZM8.00098 9C8.55326 9 9.00098 9.44772 9.00098 10V14C9.00098 14.5523 8.55326 15 8.00098 15C7.44869 15 7.00098 14.5523 7.00098 14V13H3.00098C2.44869 13 2.00098 12.5523 2.00098 12C2.00098 11.4477 2.44869 11 3.00098 11H7.00098V10C7.00098 9.44772 7.44869 9 8.00098 9ZM10.9995 12C10.9995 11.4477 11.4472 11 11.9995 11H20.9995C21.5518 11 21.9995 11.4477 21.9995 12C21.9995 12.5523 21.5518 13 20.9995 13H11.9995C11.4472 13 10.9995 12.5523 10.9995 12ZM15.9995 15C16.5518 15 16.9995 15.4477 16.9995 16L16.9995 17H20.9995C21.5518 17 21.9995 17.4477 21.9995 18C21.9995 18.5523 21.5518 19 20.9995 19H16.9995V20C16.9995 20.5523 16.5518 21 15.9995 21C15.4472 21 14.9995 20.5523 14.9995 20L14.9995 16C14.9995 15.4477 15.4472 15 15.9995 15ZM2.00098 18C2.00098 17.4477 2.44869 17 3.00098 17H12.001C12.5533 17 13.001 17.4477 13.001 18C13.001 18.5523 12.5533 19 12.001 19H3.00098C2.44869 19 2.00098 18.5523 2.00098 18Z" fill="#121F26" />
            </svg>
          </a>
          {isModalVisible && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleModalClose}>
                  &times;
                </span>
                {productLines.map((line, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      checked={selectedOptions[line.name.toLowerCase()]}
                      onChange={() => handleCheckboxChange(line.name.toLowerCase())}
                    />
                    {line.name}
                  </label>
                ))}
                <div className="button-container">
                  <button onClick={handleClear}>Clear</button>
                  <button onClick={handleModalClose}>Cancel</button>
                  <button onClick={handleApply}>Apply</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="table-rolelist">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("role_name")}>
                Role Name <img src={Arrow} className="arrow-up" />
              </th>
              <th onClick={() => handleSort("product_line")}>
                Product Line <img src={Arrow} className="arrow-up" />
              </th>
              <th onClick={() => handleSort("status")}>
                Status <img src={Arrow} className="arrow-up" />
              </th>
              <th>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {roleList.map((role, index) => (
              <tr key={index}>
                <td>{role.role_name}</td>
                <td>{role.product_line}</td>
                <td><Tags state={role.status === "1" ? "green" : "red"} textGreen="Active" textRed="Inactive" /></td>
                <td style={{ cursor: "pointer" }}><img src={Dots} alt="SVG Image" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        <span>{currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Homepage;
