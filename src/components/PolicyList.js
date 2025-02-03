import { useState, useEffect } from "react";
import api from "../services/api";

function PolicyList() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  useEffect(() => {
    api.get("/policies")
      .then(response => {
        setPolicies(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to fetch policies.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    api.delete(`/policies/${id}`)
      .then(() => {
        setPolicies(policies.filter(policy => policy.id !== id));
      })
      .catch(error => console.error("Error deleting policy:", error));
  };

  const handleUpdate = (id) => {
    const updatedCoverageAmount = prompt("Enter new coverage amount:");
    if (updatedCoverageAmount) {
      api.put(`/policies/${id}`, { coverageAmount: Number(updatedCoverageAmount) })
        .then(response => {
          setPolicies(policies.map(policy => policy.id === id ? response.data : policy));
        })
        .catch(error => console.error("Error updating policy:", error));
    }
  };

  const handleGetDetails = (id) => {
    api.get(`/policies/${id}`)
      .then(response => {
        setSelectedPolicy(response.data);
      })
      .catch(error => console.error("Error fetching policy details:", error));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Policies List</h2>
      <ul>
        {policies.map(policy => (
          <li key={policy.id}>
            Policyholder ID: {policy.policyholderId}, Coverage Amount: {policy.coverageAmount}
            <button onClick={() => handleUpdate(policy.id)}>Update</button>
            <button onClick={() => handleDelete(policy.id)}>Delete</button>
            <button onClick={() => handleGetDetails(policy.id)}>Get Details</button>
          </li>
        ))}
      </ul>
      {selectedPolicy && (
        <div>
          <h3>Policy Details</h3>
          <p>ID: {selectedPolicy.id}</p>
          <p>Policyholder ID: {selectedPolicy.policyholderId}</p>
          <p>Coverage Amount: {selectedPolicy.coverageAmount}</p>
        </div>
      )}
    </div>
  );
}

export default PolicyList;
