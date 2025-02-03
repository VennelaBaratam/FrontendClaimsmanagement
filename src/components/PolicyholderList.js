import { useState, useEffect } from "react";
import api from "../services/api";

function PolicyholderList() {
  const [policyholders, setPolicyholders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPolicyholder, setSelectedPolicyholder] = useState(null);

  useEffect(() => {
    api.get("/policyholders")
      .then(response => {
        setPolicyholders(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to fetch policyholders.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    api.delete(`/policyholders/${id}`)
      .then(() => {
        setPolicyholders(policyholders.filter(policyholder => policyholder.id !== id));
      })
      .catch(error => console.error("Error deleting policyholder:", error));
  };

  const handleUpdate = (id) => {
    const updatedAddress = prompt("Enter new address:");
    if (updatedAddress) {
      api.put(`/policyholders/${id}`, { address: updatedAddress })
        .then(response => {
          setPolicyholders(policyholders.map(policyholder => policyholder.id === id ? response.data : policyholder));
        })
        .catch(error => console.error("Error updating policyholder:", error));
    }
  };

  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Policyholders List</h2>
      <ul>
        {policyholders.map(policyholder => (
          <li key={policyholder.id}>
            Name: {policyholder.name}, Address: {policyholder.address}
            <button onClick={() => handleUpdate(policyholder.id)}>Update</button>
            <button onClick={() => handleDelete(policyholder.id)}>Delete</button>
            
          </li>
        ))}
      </ul>
      {selectedPolicyholder && (
        <div>
          <h3>Policyholder Details</h3>
          <p>ID: {selectedPolicyholder.id}</p>
          <p>Name: {selectedPolicyholder.name}</p>
          <p>Address: {selectedPolicyholder.address}</p>
        </div>
      )}
    </div>
  );
}

export default PolicyholderList;
