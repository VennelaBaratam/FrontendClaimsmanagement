import { useState } from "react";
import api from "../services/api";

function PolicyForm() {
  const [policy, setPolicy] = useState({ id: "", policyholderId: "", coverageAmount: "" });

  const handleChange = (e) => {
    setPolicy({ ...policy, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/policies", policy);
      alert("Policy added successfully!");
      setPolicy({ id: "", policyholderId: "", coverageAmount: "" });
    } catch (error) {
      console.error("Error adding policy:", error);
      alert("Failed to add policy.");
    }
  };

  return (
    <div>
      <h2>Add Policy</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="Policy ID" value={policy.id} onChange={handleChange} required />
        <input type="text" name="policyholderId" placeholder="Policyholder ID" value={policy.policyholderId} onChange={handleChange} required />
        <input type="number" name="coverageAmount" placeholder="Coverage Amount" value={policy.coverageAmount} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PolicyForm;
