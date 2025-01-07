import React, { useState, useEffect } from "react";
import Query, { database } from "../appwrite";
import "../vote.css"; // Create a CSS file and paste the styles here
import { Navbar } from "../components/Navbar";
const Votes = () => {
  const [votedCandidates, setVotedCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("session");

  const fetchVotedCandidates = async () => {
    setLoading(true);
    try {
      const response = await database.listDocuments(
        "676ec63a00199012ab5d",
        "677b41bb003b1ea20928",
        [Query.equal("userId", userId)]
      );
      setVotedCandidates(response.documents);
    } catch (err) {
      console.error("Failed to fetch votes:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCandidate = async (candidateId) => {
     const isConfirmed = window.confirm(
    "Are you sure you want to cancel this vote?"
  );
  if (!isConfirmed) {
    return; // Exit if the user cancels the action
  }
    try {

      await database.deleteDocument(
        "676ec63a00199012ab5d",
        "677b41bb003b1ea20928",
        candidateId
      );
      setVotedCandidates((prevCandidates) =>
        prevCandidates.filter((candidate) => candidate.$id !== candidateId)
      );
     
    } catch (err) {
      console.error("Failed to delete candidate:", err);
      alert("Failed to delete candidate. Please try again.");
    }
  };

  useEffect(() => {
    fetchVotedCandidates();
  }, [userId]);

  return (
    <div>
     <Navbar/>
      {loading ? (
        <p style={{textAlign:'center',color:'white'}}>Loading...</p>
      ) : votedCandidates.length > 0 ? (
        <table id="customers">
          <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Category</th>
              <th>Date Voted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {votedCandidates.map((candidate) => (
              <tr key={candidate.$id}>
                <td>{candidate.name || "N/A"}</td>
                <td>{candidate.category || "N/A"}</td>
                <td>{new Date(candidate.$createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    style={{
                      backgroundColor: "#ff4d4d",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteCandidate(candidate.$id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{textAlign:'center',marginTop:'50px',color:'white'}}>You haven't voted yet!</p>
      )}
    </div>
  );
};

export default Votes;
