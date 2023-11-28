const addAllQuestions = require("./AddAllQuestions.js");

const explanations = [
  "Throughout the passage, the author emphasizes the city's commitment to sustainable living and addresses the challenges of environmental degradation. The passage highlights efforts such as advocating for green spaces, renewable energy initiatives, and the awakening of citizens to ecological responsibility. The overall tone suggests that the city is making strides in finding a harmonious balance between growth and sustainability. Therefore, option C best summarizes the author's perspective.",
  "The passage centers around the theme of sustainable living in the urban environment.",
  "The city's dedication to sustainable living is vividly portrayed as a dynamic entity, fostering a harmonious balance between growth and sustainability.",
  "A pressing concern in the city is identified as environmental degradation, urging the need for immediate attention.",
  "Citizens play a pivotal role by actively contributing to the city's sustainable living efforts, exemplified by their awakening to ecological responsibility.",
  "The diversity of the city's population stands as compelling evidence of its cultural richness.",
  "The city confronts challenges such as environmental degradation and overconsumption, prompting the need for strategic initiatives.",
  "Educational institutions emerge as symbolic beacons of enlightenment, contributing to the city's collective progress.",
  "The city's commitment to education is positively characterized in the passage, emphasizing its role in fostering growth and sustainability.",
  "The passage draws a parallel between the city's commitment to education and its broader commitment to progress, illustrating interconnected efforts.",
];

const questions = [
  "In the passage, the author mentions the pressing concern of environmental degradation and the need for sustainable living in the city. Which of the following choices best summarizes the author's perspective on the city's approach to addressing this concern?",
  "What central theme does the author explore in the passage?",
  "How does the author vividly portray the city's dedication to sustainable living?",
  "According to the passage, what significant issue is a cause for concern in the city?",
  "In what capacity do citizens contribute to the city's approach to sustainable living?",
  "What element is highlighted as evidence of the city's cultural richness?",
  "What challenges does the city confront, as presented by the author?",
  "Which entity is symbolized as a source of enlightenment in the urban environment?",
  "How is the city's commitment to education characterized in the passage?",
  "What parallel does the passage draw between the city's commitment to education and another aspect?",
];

const answers = [
  [
    "A) The city's efforts in promoting sustainable living are ineffective and misguided.",
    "B) Citizens play a negligible role in advocating for green spaces and renewable energy initiatives.",
    "C) The city is successfully balancing growth and sustainability through various strategies.",
    "D) Educational institutions in the city have failed in fostering ecological responsibility.",
  ],
  [
    "A) The author's personal experiences with sustainable living.",
    "B) The challenges of living in a bustling city.",
    "C) The diversity of the city's population.",
    "D) The author's favorite city.",
  ],
  [
    "A) As ineffective and misguided.",
    "B) As a testament to the city's richness.",
    "C) As a challenge to citizens.",
    "D) As a melting pot of negativity.",
  ],
  [
    "A) Overconsumption and environmental degradation.",
    "B) Lack of diversity in the city.",
    "C) The city's commitment to progress.",
    "D) Citizens' disinterest in sustainable living.",
  ],
  [
    "A) Citizens play no role.",
    "B) Citizens are aware but indifferent.",
    "C) Citizens awaken to ecological responsibility.",
    "D) Citizens actively resist sustainable living.",
  ],
  [
    "A) A collection of buildings.",
    "B) A breathing entity fueled by inhabitants' energy.",
    "C) A stagnant, lifeless cityscape.",
    "D) A challenge to the city's residents.",
  ],
  [
    "A) Challenges of overconsumption and environmental degradation.",
    "B) Challenges of economic instability.",
    "C) Challenges of political discord.",
    "D) Challenges of a declining population.",
  ],
  [
    "A) Shopping districts.",
    "B) Corporate offices.",
    "C) Educational institutions.",
    "D) Green spaces.",
  ],
  [
    "A) As ineffective and counterproductive.",
    "B) As a barrier to progress.",
    "C) As a detriment to the city's growth.",
    "D) As a positive aspect of the city.",
  ],
  [
    "A) The city's commitment to sustainability.",
    "B) The city's commitment to progress.",
    "C) The city's commitment to education.",
    "D) The city's commitment to diversity.",
  ],
];

const correctness = [
  ["Incorrect", "Incorrect", "Correct", "Incorrect"],
  ["Incorrect", "Incorrect", "Correct", "Incorrect"],
  ["Incorrect", "Correct", "Incorrect", "Incorrect"],
  ["Correct", "Incorrect", "Incorrect", "Incorrect"],
  ["Incorrect", "Incorrect", "Correct", "Incorrect"],
  ["Incorrect", "Correct", "Incorrect", "Incorrect"],
  ["Correct", "Incorrect", "Incorrect", "Incorrect"],
  ["Incorrect", "Incorrect", "Incorrect", "Correct"],
  ["Incorrect", "Correct", "Incorrect", "Incorrect"],
  ["Incorrect", "Incorrect", "Correct", "Incorrect"],
];

passage =
  "In the heart of the bustling city, where the rhythm of life pulses through crowded streets and towering skyscrapers, one finds a confluence of diversity and ambition. People from all walks of life converge, each with their own dreams and aspirations, weaving a tapestry of stories that define the urban landscape. This metropolis is more than just a collection of buildings; it is a living, breathing entity fueled by the energy of its inhabitants.\nAs the sun sets over the cityscape, a transformation takes place. The neon lights flicker to life, casting a vibrant glow on the sidewalks below. Street vendors peddle their wares, and the aroma of diverse cuisines mingles in the air. This city is a melting pot, a testament to the richness that comes from embracing differences.\nYet, amidst the hustle and bustle, there is a pressing concern that echoes through the alleys and avenues – the need for sustainable living. The city, like many others, grapples with the challenges of environmental degradation and overconsumption. Citizens are awakening to the importance of ecological responsibility, advocating for green spaces and renewable energy initiatives.\nIn the midst of this urban tapestry, educational institutions stand as beacons of enlightenment. Students, eager to shape their destinies, fill classrooms where the exchange of ideas sparks intellectual growth. The city's commitment to education mirrors its commitment to progress, recognizing that knowledge is the cornerstone of societal advancement.\nAs we navigate the complexities of city life, it becomes evident that this urban environment is a canvas upon which individuals paint their futures. The choices made here ripple beyond the skyscrapers, influencing not only the immediate surroundings but also the broader global community. In this urban microcosm, the challenge lies in finding a harmonious balance between growth and sustainability.\nIn an era where cities are the engines of progress, this metropolis stands as a testament to human ingenuity and resilience. It invites contemplation on the delicate interplay between ambition and responsibility, between the individual and the collective. As the city evolves, so too must its citizens, embracing the challenge of forging a future where urban life harmonizes with the natural world.";

starter = [
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

addAllQuestions(
  explanations,
  correctness,
  answers,
  questions,
  passage,
  starter
);
