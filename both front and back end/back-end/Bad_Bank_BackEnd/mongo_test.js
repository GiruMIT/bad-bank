const { MongoClient } = require('mongodb');

async function insertAndFetchDocuments() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected successfully to server');

    const database = client.db('myProject');
    const collection = database.collection('users');

    // Insert document
    const name = 'girum';
    const email = name + '@mit.edu';
    const doc = { name, email };
    const insertResult = await collection.insertOne(doc, { w: 1 });
    console.log('Document inserted');

    // Fetch documents
    const docs = await collection.find().toArray();
    console.log('Collection:', docs);
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  } finally {
    client.close();
  }
}

insertAndFetchDocuments();
