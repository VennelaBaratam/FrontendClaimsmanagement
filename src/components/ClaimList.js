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
      console.log('Updating claim with ID:', id); // Log the claim ID
      api.put(`/api/claims/${id}`, { status: updatedStatus }) // Adjust the base path as needed
        .then(response => {
          console.log("Response:", response); // Log the response
          setClaims(claims.map(claim => 
            claim.id === id ? response.data : claim
          ));
          alert("Claim updated successfully");
        })
        .catch(error => {
          console.error("Error updating claim:", error);
          alert("There was an error updating the claim. Please check the console for more details.");
        });
    } else {
      console.log("No status entered");
    }
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
