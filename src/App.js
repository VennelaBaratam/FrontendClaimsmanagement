import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import ClaimForm from "./components/ClaimForm";
import ClaimList from "./components/ClaimList";
import ClaimList1 from "./components/ClaimList1";
import PolicyForm from "./components/PolicyForm";
import PolicyList from "./components/PolicyList";
import PolicyList1 from "./components/PolicyList1";
import PolicyholderForm from "./components/PolicyholderForm";
import PolicyholderList from "./components/PolicyholderList";
import PolicyholderList1 from "./components/PolicyholderList1";
import "./App.css"; // Import CSS file

function App() {
  return (
    <Router>
      <div className="container">
        <h1 className="heading">Claims Management</h1>
        <nav className="navbar">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Claims List</NavLink>
          <NavLink to="/add-claim" className={({ isActive }) => (isActive ? "active" : "")}>Add Claim</NavLink>
          <NavLink to="/update-claim" className={({ isActive }) => (isActive ? "active" : "")}>Update Claim</NavLink>
          <NavLink to="/policies" className={({ isActive }) => (isActive ? "active" : "")}>Policies</NavLink>
          <NavLink to="/add-policy" className={({ isActive }) => (isActive ? "active" : "")}>Add Policy</NavLink>
          <NavLink to="/update-policy" className={({ isActive }) => (isActive ? "active" : "")}>Update Policy</NavLink>
          <NavLink to="/policyholders" className={({ isActive }) => (isActive ? "active" : "")}>Policyholders</NavLink>
          <NavLink to="/add-policyholder" className={({ isActive }) => (isActive ? "active" : "")}>Add Policyholder</NavLink>
          <NavLink to="/update-policyholder" className={({ isActive }) => (isActive ? "active" : "")}>Update Policyholder</NavLink>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<ClaimList1 />} />
            <Route path="/add-claim" element={<ClaimForm />} />
            <Route path="/update-claim" element={<ClaimList />} />
            <Route path="/policies" element={<PolicyList1 />} />
            <Route path="/add-policy" element={<PolicyForm />} />
            <Route path="/update-policy" element={<PolicyList />} />
            <Route path="/policyholders" element={<PolicyholderList1 />} />
            <Route path="/add-policyholder" element={<PolicyholderForm />} />
            <Route path="/update-policyholder" element={<PolicyholderList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
