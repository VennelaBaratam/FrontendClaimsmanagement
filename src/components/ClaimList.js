import { useState, useEffect } from "react";
import api from "../services/api";

function ClaimList() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    api.get("/claims")
      .then(response => {
        setClaims(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to fetch claims.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    api.delete(`/claims/${id}`)
      .then(() => {
        setClaims(claims.filter(claim => claim.id !== id));
      })
      .catch(error => console.error("Error deleting claim:", error));
  };

  const handleUpdate = (id) => {
    const updatedStatus = prompt("Enter new status:");
    if (updatedStatus) {
      api.put(`/claims/${id}`, { status: updatedStatus })
        .then(response => {
          setClaims(claims.map(claim => claim.id === id ? response.data : claim));
        })
        .catch(error => console.error("Error updating claim:", error));
    }
  };

  const handleGetDetails = (id) => {
    api.get(`/claims/${id}`)
      .then(response => {
        setSelectedClaim(response.data);
      })
      .catch(error => console.error("Error fetching claim details:", error));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Claims List</h2>
      <ul>
        {claims.map(claim => (
          <li key={claim.id}>
            Policy ID: {claim.policyId}, Amount: {claim.amount}, Status: {claim.status}
            <button onClick={() => handleUpdate(claim.id)}>Update</button>
            <button onClick={() => handleDelete(claim.id)}>Delete</button>
            <button onClick={() => handleGetDetails(claim.id)}>Get Details</button>
          </li>
        ))}
      </ul>
      {selectedClaim && (
        <div>
          <h3>Claim Details</h3>
          <p>ID: {selectedClaim.id}</p>
          <p>Policy ID: {selectedClaim.policyId}</p>
          <p>Amount: {selectedClaim.amount}</p>
          <p>Status: {selectedClaim.status}</p>
        </div>
      )}
    </div>
  );
}

export default ClaimList;
