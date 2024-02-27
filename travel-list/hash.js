// Import crypto module
const crypto = require('crypto');

// Function to generate SHA-512 hash
function generateSHA512Hash(data) {
  // Create a hash object
  const hash = crypto.createHash('sha512');

  // Update the hash object with the data to be hashed
  hash.update(data);

  // Generate the hash in hexadecimal format
  const hashedData = hash.digest('hex');

  // Return the hexadecimal representation of the hash
  return hashedData;
}

// Example usage
const seed = "example_seed_to_hash";
const hash = generateSHA512Hash(seed);
console.log("Hash of seed:", hash);
