import WordNet from "node-wordnet";

const wordnet = new WordNet();

function lookupWord(word) {
  return new Promise((resolve, reject) => {
    wordnet.lookup(word, (err, definitions) => {
      console.log(word) 
      if (err) reject(err);
      else resolve(definitions);
    });
  });
}

export default async (req, res) => {
  const word = req.query.word;

  if (!word) {
    return res.status(400).json({ error: "Word parameter is required" });
  }

  try {
    const results = await lookupWord(word);

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while looking up the word" });
  }
};