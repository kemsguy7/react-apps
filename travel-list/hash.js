




// // Import crypto module
// const crypto = require('crypto');

// // Function to generate SHA-512 hash
// function generateSHA512Hash(data) {
//   // Create a hash object
//   const hash = crypto.createHash('sha512');

//   // Update the hash object with the data to be hashed
//   hash.update(data);

//   // Generate the hash in hexadecimal format
//   const hashedData = hash.digest('hex');

//   // Return the hexadecimal representation of the hash
//   return hashedData;
// }


// const seed = "dde3f69ff0cbdfa4a6b31cc0c5125a9920f724246a0b57aa81e78e46a1cb168d";
// const hash = generateSHA512Hash(seed);
// console.log("Hash of seed:", hash);



// const crypto = require('crypto');

// function generateHashFromUUID(uuid) {
//     // Create a SHA-256 hash of the UUID
//     const hash = crypto.createHash('sha256');
//     hash.update(uuid);
//     return hash.digest('hex');
// }

// function findMatchingUUID(uuidList, targetHash) {
//     for (const uuid of uuidList) {
//         const hash = generateHashFromUUID();
//         if (hash === targetHash) {
//             return uuid;
//         }
//     }
//     return null; // Return null if no match is found
// }

// // Example usage
// const uuids = ["eb2668e6-dfbe-4822-84c3-5de6205614f8", "d34f8579-5b0b-48f6-a945-b6b66f7bc0c4", "366d032b0ca17b7bb96bea45a7815355fe9c3ba5872b58a909454cb41fc5bbaa", 
// "dde3f69ff0cbdfa4a6b31cc0c5125a9920f724246a0b57aa81e78e46a1cb168d",
// "d34f8579-5b0b-48f6-a945-b6b66f7bc0c4", "eb2668e6-dfbe-4822-84c3-5de6205614f8"];
// const targetHash = "5fe3d477d946ff840aeaafc750a314b61e95e44359964468d2d80f09a240016ec8ad7d71831d0708a4cb15732ba67e07d89e5174198021e8160b0853f51daa0e";

// const matchingUUID = findMatchingUUID(uuids, targetHash);
// if (matchingUUID) {
//     console.log(`The UUID that matches the hash is: ${matchingUUID}`);
// } else {
//     console.log("No matching UUID found.");
// }







// const crypto = require('crypto');

// function generateHash(algorithm, input) {
//     // Create a hash using the specified algorithm
//     const hash = crypto.createHash(algorithm);
//     hash.update(input);
//     return hash.digest('hex');
// }

// function findMatchingAlgorithmAndInput(val, targetHas) {
//     const algorithms = ['md5', 'sha1', 'sha256', 'sha512', 'sha3-256', 'sha3-512', 'blake2s', 'blake2b', 'whirlpool'];
//     for (const input of val) {
//         for (const algorithm of algorithms) {
//             const hash = generateHash(algorithm, input);
//             if (hash === targetHas) {
//                 return { algorithm, input };
//             }
//         }
//     }
//     return null; // Return null if no match is found


// // Example usage
// const inputs = ["eb2668e6-dfbe-4822-84c3-5de6205614f8", "d34f8579-5b0b-48f6-a945-b6b66f7bc0c4", "366d032b0ca17b7bb96bea45a7815355fe9c3ba5872b58a909454cb41fc5bbaa", 
// "dde3f69ff0cbdfa4a6b31cc0c5125a9920f724246a0b57aa81e78e46a1cb168d","d34f8579-5b0b-48f6-a945-b6b66f7bc0c4", "eb2668e6-dfbe-4822-84c3-5de6205614f8"];
// const targetHash = "5fe3d477d946ff840aeaafc750a314b61e95e44359964468d2d80f09a240016ec8ad7d71831d0708a4cb15732ba67e07d89e5174198021e8160b0853f51daa0e";

// const result = findMatchingAlgorithmAndInput(inputs, targetHash);
// if (result) {
//     console.log(`The matching algorithm is: ${result.algorithm}`);
//     console.log(`The matching input is: ${result.input}`);
// } else {
//     console.log("No matching algorithm or input found.");
// }
// }








// Import crypto module
const crypto = require('crypto');

// Function to generate SHA-256 hash
function generateSHA256Hash(data) {
  // Create a hash object
  const hash = crypto.createHash('sha256');

  // Update the hash object with the data to be hashed
  hash.update(data);

  // Generate the hash in hexadecimal format
  const hashedData = hash.digest('hex');

  // Return the hexadecimal representation of the hash
  return hashedData;
}

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

// All seed phrases
const seedPhrases = [
  "eb2668e6-dfbe-4822-84c3-5de6205614f8",
  "d34f8579-5b0b-48f6-a945-b6b66f7bc0c4",
  "dde3f69ff0cbdfa4a6b31cc0c5125a9920f724246a0b57aa81e78e46a1cb168d",
  "366d032b0ca17b7bb96bea45a7815355fe9c3ba5872b58a909454cb41fc5bbaa"
];

// Generate combinations of seed phrases
const seedCombinations = [];
for (let i = 0; i < seedPhrases.length; i++) {
  for (let j = i + 1; j < seedPhrases.length; j++) {
    const combinedSeed = seedPhrases[i] + seedPhrases[j]; // Combine seed phrases
    seedCombinations.push(combinedSeed);
  }
}

// Generate hashes for each seed combination using both SHA-256 and SHA-512
seedCombinations.forEach(seed => {
  const hash256 = generateSHA256Hash(seed);
  const hash512 = generateSHA512Hash(seed);
  console.log(`Seed combination: ${seed}`);
  console.log(`SHA-256 Hash: ${hash256}`);
  console.log(`SHA-512 Hash: ${hash512}`);
  console.log("-----------------------------------------------------");
});
