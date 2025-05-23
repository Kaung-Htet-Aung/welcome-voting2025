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
        "6779a6320039942a4d7c",
        "677f96960019591e0088",
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
        "6779a6320039942a4d7c",
        "677f96960019591e0088",
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
              <th>Name</th>
              <th>Title</th>
              <th>Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {votedCandidates.map((candidate) => (
              <tr key={candidate.$id}>
                <td>{candidate.name || "N/A"}</td>
                <td>{candidate.title || "N/A"}</td>
                <td>{candidate.candidateId}</td>
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
