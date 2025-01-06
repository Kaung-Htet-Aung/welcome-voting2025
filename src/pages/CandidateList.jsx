import React, { useEffect, useState} from 'react';
import { Client, Databases ,Query} from 'appwrite';
import { useParams } from 'react-router-dom';
const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('676e59c6000b84885e72');

const database = new Databases(client);
 
const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const { category } = useParams();
  const [refreshState,setRefreshState]=useState(false)
  useEffect(() => {
    const fetchCandidates = async () => {
      const response = await database.listDocuments('676ec63a00199012ab5d', '676ec66000025396fb86', [
        Query.equal('category', category),
      ]);
      setCandidates(response.documents);
    };
    fetchCandidates();
  }, [category,refreshState]);

  const handleVote = async (candidateId,currentVotes) => {
    await database.updateDocument('676ec63a00199012ab5d', '676ec66000025396fb86', candidateId, {
      votes: currentVotes + 1
    });
    setRefreshState(!refreshState)
    alert('Vote recorded!');
  };

  return (
    <div>
      <h1>{category} Candidates</h1>
      <table>
        {candidates.map((candidate) => (
          <tr key={candidate.$id}>
            {candidate.name} - {candidate.votes} votes
            <button onClick={() => handleVote(candidate.$id,candidate.votes)}>Vote</button>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default CandidateList;
