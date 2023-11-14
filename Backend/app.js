const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getUserInput(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, answer => {
      resolve(answer.trim());
    });
  });
}

async function makePostRequest() {
  const apiUrl = 'https://aiclassroombackend.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=AIClassroomHackathon&api-version=2021-10-01&deploymentName=production';
  const subscriptionKey = 'd533713b981c45ef8069f88a2a07483b';
  const question = await getUserInput('Enter the question: ');
  const scoreThreshold = await getUserInput('Enter the confidence score threshold: ');
  const logicalOperation = await getUserInput('Enter the logical operation: ');
  const metadataKey = await getUserInput('Enter the metadata key: ');
  const metadataValue = await getUserInput('Enter the metadata value: ');

  const requestData = {
    top: 3,
    question,
    includeUnstructuredSources: true,
    confidenceScoreThreshold: scoreThreshold,
    answerSpanRequest: {
      enable: true,
      topAnswersWithSpan: 1,
      confidenceScoreThreshold: scoreThreshold
    },
    filters: {
      metadataFilter: {
        logicalOperation,
        metadata: [
          {
            key: metadataKey,
            value: metadataValue
          }
        ]
      }
    }
  };

  try {
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json'
      }
    });

    console.log('POST Response:', response.data);
    return response.data; // Return the response for later use in the GET request
  } catch (error) {
    console.error('POST Error:', error.message);
    return null;
  }
}

async function makeGetRequest(postResponse) {
  if (!postResponse) {
    console.error('Cannot make GET request without POST response.');
    return;
  }

  const apiUrl = 'https://aiclassroombackend.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=AIClassroomHackathon&api-version=2021-10-01&deploymentName=production';

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Ocp-Apim-Subscription-Key': 'd533713b981c45ef8069f88a2a07483b',
        'Content-Type': 'application/json'
      },
      // You can add query parameters for the GET request here
      params: {
        // Add your query parameters here
      }
    });

    console.log('GET Response:', response.data);
  } catch (error) {
    console.error('GET Error:', error.message);
  }
}

async function main() {
  const postResponse = await makePostRequest(); // Make the POST request
  await makeGetRequest(postResponse); // Make the GET request using the POST response

  rl.close();
}

main();
