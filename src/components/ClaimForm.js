import { useState } from "react";
import api from "../services/api";

function ClaimForm() {
  const [claim, setClaim] = useState({ id: "", policyId: "", amount: "", status: "" });

  const handleChange = (e) => {
    setClaim({ ...claim, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/claims", claim);
      alert("Claim added successfully!");
      setClaim({ id: "", policyId: "", amount: "", status: "" }); // Reset form after submission
    } catch (error) {
      console.error("Error adding claim:", error);
      alert("Failed to add claim.");
    }
  };

  return (
    <div>
      <h2>Add Claim</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="Claim ID" value={claim.id} onChange={handleChange} required />
        <input type="text" name="policyId" placeholder="Policy ID" value={claim.policyId} onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount" value={claim.amount} onChange={handleChange} required />
        <select name="status" value={claim.status} onChange={handleChange} required>
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ClaimForm;
