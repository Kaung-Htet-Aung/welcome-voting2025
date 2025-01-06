import React, { useEffect, useState } from 'react';
import { Client, Databases } from 'appwrite';
import { motion, AnimatePresence } from 'framer-motion';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('676e59c6000b84885e72');

const database = new Databases(client);

const ResultsPage = () => {
  const [candidates, setCandidates] = useState([]);

  const fetchResults = async () => {
    const response = await database.listDocuments('676ec63a00199012ab5d', '676ec66000025396fb86');
    setCandidates(response.documents.sort((a, b) => b.votes - a.votes));
  };

  useEffect(() => {
    fetchResults();

    const unsubscribe = client.subscribe(
      [`databases.676ec63a00199012ab5d.collections.676ec66000025396fb86.documents`],
      (response) => {
        if (response.events.some((event) => event.includes('update'))) {
          fetchResults(); // Refetch data when an update event is received
        }
      }
    );

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <div>
      <h1>Live Results</h1>
      <ul>
        <AnimatePresence>
          {candidates.map((candidate) => (
            <motion.li
              key={candidate.$id}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              style={{
                margin: '10px 0',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
            >
              {candidate.name}: {candidate.votes} votes
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default ResultsPage;
