

// Define the prompt and parameters for the fine-tuning
const resume_data = {
    work_experience: [
        {
            date: "🗓️ June 2019 - Present",
            company: "💼 Muse",
            location: "📍 Hong Kong (Remotely)",
            position: "🧑🏻‍💻 Software Engineer",
            work_description: [
                "Designed and developed a SaaS web application using React with Next.js and Node.js as backend, creating modular, secure, and well-tested code.",
                "Stay up-to-date on new development and platforms to make technology recommendations and set up the right tools for the job.",
                "Work in an agile software development team to complete tasks through sprints, collaborating with other developers, engineers, and designers within the company.",
                "Implemented a process for the team to address bugs within the SLA and minimize bug backlog.",
                "Developed an iOS and Android application using React Native and Firebase."
            ]
        },
        {
            date: "🗓️ October 2018 - June 2019",
            company: "💼 Stacktrek",
            location: "📍 Iloilo, Philippines",
            position: "🧑🏻‍💻 Software Engineer",
            work_description: [
                "Built software in React and Node.js using test-driven development.",
                "Developed an iOS and Android application using React Native and Firebase.",
                "Modified and maintained a WordPress website."
            ]
        },
        {
            date: "🗓️ April 2017 - June 2017",
            company: "💼 Project Assistant",
            location: "📍 Iloilo, Philippines",
            position: "🧑🏻‍💻 Android Developer Intern",
            work_description: [
                "Gathered and documented client requirements for product development, enhancement, and implementation."
            ]
        }
    ],
    projects:
        [
            {
                title: "Muse",
                description: `Muse is a knowledge base for thinking process.We timestamp your reading/ writing process and make it shareable to others.`,
                link: "https://app.muse.is"
            },
            {
                title: "Transnote",
                description: `Transnote helps you to tag and store video notes by timestamps, while watching video on the same page. A simple, effortless experience to recall and share video references within a few clicks.`,
                link: "https://www.transnote.co/"
            }
        ]
    ,
}

function cleanText(text) {
    // Remove emojis and special characters
    const cleanedText = text.replace(/[^\w\s]/gi, '');
    // Replace newlines with spaces
    return cleanedText.replace(/[\r\n]/g, ' ');
}

// Define function to generate prompt and completion pairs
async function generatePairs() {
    const pairs = [];

    // Generate pairs from work experience
    for (const job of resume_data.work_experience) {
        // Clean job description
        const jobDescription = job.work_description.join(' ');
        const cleanedDescription = cleanText(jobDescription);
        // Generate prompt and completion pair
        const prompt = `Describe your experience working as a ${job.position} at ${job.company}.`;
        const completion = cleanedDescription;
        pairs.push({ prompt, completion });
    }

    // Generate pairs from projects
    for (const project of resume_data.projects) {
        // Clean project description
        const cleanedDescription = cleanText(project.description);
        // Generate prompt and completion pair
        const prompt = `Describe your experience working on ${project.title}.`;
        const completion = cleanedDescription;
        pairs.push({ prompt, completion });
    }

    return pairs;
}

const fs = require('fs');

// ...

// Call function to generate pairs
generatePairs()
    .then((pairs) => {
        // Save pairs to file
        fs.writeFile('pairs.json', JSON.stringify(pairs, null, 2), (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Pairs saved to file.');
            }
        });
    })
    .catch((error) => {
        console.error(error);
    });