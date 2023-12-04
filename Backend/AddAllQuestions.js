import axios from "axios";
import fs from "fs";

const settings = JSON.parse(fs.readFileSync("settings.env", "utf8"));
const subscriptionKey = settings.SubscriptionKey;
const endpointForAdd = settings.Endpoints[0];
const endpointForDeploy = settings.Endpoints[1];
const passageIncremental = settings.PassageIncremental;
const passageStartCount = settings.PassageStartCount;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const addQna = async (qna) => {
  try {
    const response = await axios.patch(endpointForAdd, qna, {
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Content-Type": "application/json",
      },
    });
    console.log(response.headers);
  } catch (error) {
    console.error(error.message);
  }
};

const deploy = async () => {
  await axios
    .put(
      endpointForDeploy,
      {},
      {
        headers: {
          "Ocp-Apim-Subscription-Key": subscriptionKey,
          "Content-Length": "0",
        },
      }
    )
    .then((response) => console.log(response.headers))
    .catch((error) => console.error(error.message));
};

const constructBodyPart = (
  idNum,
  answer,
  question,
  prompt,
  contextonly = true
) => {
  return {
    op: "replace",
    value: {
      id: idNum,
      answer: `${answer}`,
      source: "SRQ1",
      questions: question,
      metadata: { Auto_Add: true },
      dialog: {
        isContextOnly: contextonly,
        prompts: prompt,
      },
    },
  };
};
const constructBody = (
  count,
  explanations,
  correctness,
  answers,
  questions,
  passage,
  starter
) => {
  var body = [];
  var connectionBody = [];
  for (var i = 0; i < explanations.length; i++, count += 6) {
    const explanation = constructBodyPart(
      count + 6,
      explanations[i],
      ["Explanation?"],
      []
    );

    const choiced = constructBodyPart(
      count + 5,
      correctness[i][3],
      [answers[i][3]],
      [
        {
          DisplayOrder: 0,
          QnaId: count + 6,
          DisplayText: "Explanation?",
        },
      ]
    );

    const choicec = constructBodyPart(
      count + 4,
      correctness[i][2],
      [answers[i][2]],
      [
        {
          DisplayOrder: 0,
          QnaId: count + 6,
          DisplayText: "Explanation?",
        },
      ]
    );
    const choiceb = constructBodyPart(
      count + 3,
      correctness[i][1],
      [answers[i][1]],
      [
        {
          DisplayOrder: 0,
          QnaId: count + 6,
          DisplayText: "Explanation?",
        },
      ]
    );
    const choicea = constructBodyPart(
      count + 2,
      correctness[i][0],
      [answers[i][0]],
      [
        {
          DisplayOrder: 0,
          QnaId: count + 6,
          DisplayText: "Explanation?",
        },
      ]
    );
    const question = constructBodyPart(
      count + 1,
      questions[i],
      ["Next Question?"],
      [
        {
          DisplayOrder: 1,
          QnaId: count + 2,
          DisplayText: answers[i][0],
        },
        {
          DisplayOrder: 2,
          QnaId: count + 3,
          DisplayText: answers[i][1],
        },
        {
          DisplayOrder: 3,
          QnaId: count + 4,
          DisplayText: answers[i][2],
        },
        {
          DisplayOrder: 4,
          QnaId: count + 5,
          DisplayText: answers[i][3],
        },
      ]
    );
    body.push(...[explanation, choiced, choicec, choiceb, choicea, question]);
    let prevexplanation;
    if (i !== 0) {
      prevexplanation = constructBodyPart(
        count,
        explanations[i - 1],
        ["Explanation?"],
        [
          {
            DisplayOrder: 0,
            QnaId: count + 1,
            DisplayText: "Next Question?",
          },
        ]
      );
      connectionBody.push(prevexplanation);
    } else {
      prevexplanation = constructBodyPart(
        count,
        passage,
        starter,
        [
          {
            DisplayOrder: 0,
            QnaId: count + 1,
            DisplayText: "First Question?",
          },
        ],
        false
      );
      body.push(prevexplanation);
    }
  }
  return [body, connectionBody];
};

const addAllQuestions = async (
  explanations,
  correctness,
  answers,
  questions,
  passage,
  starter
) => {
  let countCur = passageStartCount;
  let body, connectionBody;
  try {
    [body, connectionBody] = constructBody(
      countCur,
      explanations,
      correctness,
      answers,
      questions,
      passage,
      starter
    );
    await addQna(body);
    await sleep(10000);
    await addQna(connectionBody);
    settings.PassageStartCount += passageIncremental;
    fs.writeFileSync("settings.env", JSON.stringify(settings), "utf8");
    await sleep(10000);
    await deploy();
  } catch (error) {
    console.error(error.message);
  }
};

export { addAllQuestions };
