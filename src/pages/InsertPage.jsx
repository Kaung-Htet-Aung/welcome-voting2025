import React, { useState } from "react";
import { Client, Databases } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67792f2600013311bcc9");

const database = new Databases(client);

const InsertBatchPage = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBatchInsert = async () => {
    setLoading(true);
    setError("");
    setProgress(0);

    const batchSize = 50; // Insert in batches to avoid API rate limits
    const totalDocuments = 1000; // Total number of documents to insert
    const staticData = Array.from({ length: totalDocuments }, (_, index) => ({
      name: `Candidate ${index + 1}`,
      votes: 0,
      category: "general", // Adjust category as needed
    }));

    try {
      for (let i = 0; i < staticData.length; i += batchSize) {
        const batch = staticData.slice(i, i + batchSize);

        await Promise.all(
          batch.map((doc) =>
            database.createDocument(
              "6779a6320039942a4d7c", // Replace with your database ID
              "6779a641002a70e512d6", // Replace with your collection ID
              "unique()",
              doc
            )
          )
        );

        setProgress(((i + batch.length) / totalDocuments) * 100);
      }

      alert("1,000 documents inserted successfully!");
    } catch (err) {
      console.error("Error inserting batch:", err);
      setError("Failed to insert all documents. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Insert 1,000 Documents</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Inserting... {Math.round(progress)}% completed</p>
      ) : (
        <button onClick={handleBatchInsert}>Insert 1,000 Documents</button>
      )}
    </div>
  );
};

export default InsertBatchPage;
