import OpenAI from "openai";
import fs from "fs";
import {addAllQuestions} from "./AddAllQuestions.js";

const settings = JSON.parse(fs.readFileSync("settings.env", "utf8"));
const openai = new OpenAI({
  apiKey: settings.OpenAIKey,
});
const ids = JSON.parse(fs.readFileSync("id.json", "utf8"));
const threads = ids.threads;
const assistants = ids.assistants;
const starter = [
  "Give me a passage",
  "Give me a question",
  "Offer an inquiry",
  "Extend a prompt",
  "Pose a challenge",
  "Present an interrogative",
  "Share a poser",
  "Throw a puzzler my way",
  "Supply a brainteaser",
  "Hand out a head-scratcher",
  "Serve a cognitive puzzle",
  "Gift me a conundrum",
  "Dish out a brain teaser",
  "Offer a question to wrestle with",
  "Suggest a thought-stirrer",
  "Throw a question into the mix",
  "Supply an inquiry for consideration",
  "Gift me a poser",
  "Propose a challenging query",
  "Hand out an interrogative",
  "Extend a brain teaser",
  "Give me a thought-stirrer",
  "Convey an inquisitive task",
  "Present an inquiry to tackle",
  "Lay down a question for me",
  "Offer up a puzzling challenge",
  "Share an inquisitive query",
  "Throw a question in my direction",
  "Deliver an interrogative challenge",
  "Pose a questioning task",
  "Provide a query to ponder",
  "Hand me a challenging question",
  "Serve a thought-provoker",
  "Suggest a question for contemplation",
  "Lay out a task of inquiry",
  "Offer a probing challenge",
  "Submit a question to wrestle with",
  "Extend an inquisitive inquiry",
  "Propose a challenging task",
  "Give me a question for thought",
  "Provide a poser to consider",
  "Offer a thought-stirring inquiry",
  "Throw an inquisitive challenge",
  "Hand me a question to ponder",
  "Deliver a task of inquiry",
  "Propose a challenging inquiry",
  "Give me an interrogative task",
];

async function createAssitant() {
  const assistant = await openai.beta.assistants.create({
    name: "Math Tutor",
    instructions:
      "You are a personal math tutor. Write and run code to answer math questions.",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-3.5-turbo-1106",
  });
  assistants.push(assistant.id);
  fs.writeFileSync("id.json", JSON.stringify(ids), "utf8");
}
async function createThread() {
  const thread = await openai.beta.threads.create();
  threads.push(thread.id);
  fs.writeFileSync("id.json", JSON.stringify(ids), "utf8");
}
async function deleteThread(thread_id = threads[0]) {
  const response = await openai.beta.threads.del(thread_id);
  console.log(response);
  for (let i = 0; i < threads.length; i++) {
    if (threads[i] === thread_id) threads.splice(i, 1);
  }
  fs.writeFileSync("id.json", JSON.stringify(ids), "utf8");
}
async function deleteThreads(start, end) {
  for (let i = start; i < end; i++) {
    await deleteThread(threads[i]);
  }
}
async function lastMessage(thread_id = threads[0]) {
  const messages = await openai.beta.threads.messages.list(thread_id);

  console.log(messages.data[0].content);
}
async function sendMessage(
  message_text,
  thread_id,
  assistant_id = assistants[0]
) {
  const message = await openai.beta.threads.messages.create(thread_id, {
    role: "user",
    content: message_text,
  });

  const run = await openai.beta.threads.runs.create(thread_id, {
    assistant_id: assistant_id,
  });
  return run.id;
}
async function listRuns(thread_id = threads[0]) {
  const runs = await openai.beta.threads.runs.list(thread_id);
  console.log(runs);
}
async function cancelRun(run_id, thread_id = threads[0]) {
  const run = await openai.beta.threads.runs.cancel(thread_id, run_id);
  console.log(run);
}
async function retreiveRun(run_id, thread_id) {
  return await openai.beta.threads.runs.retrieve(thread_id, run_id);
}
async function sumbitRunOutput(thread_id, run_id) {
  let run = await retreiveRun(run_id, thread_id);
  const tool_call_id_num =
    run.required_action.submit_tool_outputs.tool_calls[0].id;
  const run_final = await openai.beta.threads.runs.submitToolOutputs(
    thread_id,
    run_id,
    {
      tool_outputs: [
        {
          tool_call_id: tool_call_id_num,
          output: "Success",
        },
      ],
    }
  );

  while (run.status !== "completed") {
    run = await retreiveRun(run_id, thread_id);
    if (run.status === "failed") {
      console.log("Something went wrong after submitting function output.");
      break;
    }
  }
  console.log("Data has been succesfully added to the database.");
}
async function pipeLine(passage, thread_id = threads[0]) {
  let failed = false;
  const run_id = await sendMessage(passage, thread_id);
  let run = await retreiveRun(run_id, thread_id);
  while (run.status !== "requires_action") {
    run = await retreiveRun(run_id, thread_id);
    if (run.status === "failed") {
      console.log("Failed");
      failed = true;
      break;
    }
  }
  if (!failed) {
    const tool_call = run.required_action.submit_tool_outputs.tool_calls[0];
    const parameter = JSON.parse(tool_call.function.arguments, "utf8");
    if (typeof parameter.questions !== "object") {
      try {
        parameter.questions = JSON.parse(parameter.questions, "utf8");
        parameter.answers = JSON.parse(parameter.answers + "]", "utf8");
        parameter.correctness = JSON.parse(parameter.correctness + "]", "utf8");
        parameter.explanations = JSON.parse(parameter.explanations, "utf8");
        addAllQuestions(
          parameter.explanations,
          parameter.correctness,
          parameter.answers,
          parameter.questions,
          passage,
          starter
        );
      } catch (error) {
        console.log("Processing Failed");
      }
    }
  }
  await sumbitRunOutput(thread_id, run_id);
}

const passage = "Amidst the rolling hills and meadows, a quaint village nestled in the embrace of nature paints a picturesque scene. Cottage roofs peak through the lush foliage, and cobblestone pathways wind their way through the heart of the community. In the village square, a centuries-old fountain whispers tales of bygone eras. Residents engage in a slow-paced life, tending to flower-filled gardens and exchanging pleasantries over picket fences. The scent of freshly baked bread wafts from the local bakery, and the distant sound of a babbling brook adds to the tranquility. Each season brings its own charm, from the blooming flowers of spring to the cozy warmth of winter hearths. Surrounded by forests, the village is a haven for wildlife. Deer graze on the outskirts, and birdsongs create a melody that harmonizes with the rustling leaves. The night sky, free from urban lights, reveals a celestial tapestry that captivates stargazers. Yet, even in this idyllic setting, challenges arise. Sustainable practices and conservation efforts become integral to preserving the village's timeless beauty, ensuring that future generations can experience the simplicity and charm of rural life.";

pipeLine(passage, threads[0]);
export { pipeLine };
