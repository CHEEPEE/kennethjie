import { children } from "cheerio/lib/api/traversing"
import { Props } from "html-react-parser/lib/attributes-to-props"
import { FC, ReactNode } from "react"

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
                link: "muse.is"
            },
            {
                title: "Transnote",
                description: `Transnote helps you to tag and store video notes by timestamps, while watching video on the same page. A simple, effortless experience to recall and share video references within a few clicks.`,
                link: "https://www.transnote.co/"
            }
        ]
    ,
}

const Button = ({ children }: { children: string | ReactNode }) => {
    return <button className="px-4 hover:bg-gray-200 py-1 rounded-sm border border-gray-500 text-sm text-gray-600 mb-5 font-bold">{children}</button>
}

type Project = {
    title: string,
    description: string,
    link: string
}
const ProjectItems = ({ project }: { project: Project }) => {
    const { title, description, link } = project
    return (<div className="flex flex-col justify-between w-[320px] gap-7 h-fit md:h-[320px]">
        <div className="flex flex-col gap-3">
            <Title>
                {title}
            </Title>
            <div className="font-nixie-one text-sm text-gray-600">
                {description}
            </div></div>
        <div>
            <Button><a href={link} className="text-gray-600" style={{ letterSpacing: 3 }}>VIEW</a></Button>
        </div>
    </div>)
}


const Title = ({ children }: { children: ReactNode }) => {
    return (
        <div className="text font-medium text-lato text-gray-600" style={{ letterSpacing: 2 }}>
            {children}
        </div>
    )
}

const WorkDescription = ({ children }: { children: string | ReactNode }) => {
    return (
        <div className="flex gap-2 font-nixie-one text-gray-600">
            <div className="text-gray-400 ">▸</div><div className="font-nixie-one">{children}</div>
        </div>
    )
}
const TimeLineItem = ({ isStart, isEnd, work }: { work: any, isEnd: boolean, isStart: boolean }) => {
    const { date, company, location, position, work_description } = work
    return (
        <div className="flex w-full flex-row">
            <div className="w-[25px] pl-2 pr-5 flex-col flex justify-start">
                <div className="w-[10px] h-[10px] my-[8px] rounded-[50%] bg-gray-300" />
                {!isEnd && <div className="h-full ml-[4px] mt-1 w-[1px] bg-gray-300" />}
            </div>
            <div className="">
                <div className="flex pl-[8px] gap-[10px]">
                    <Title>{date}<br /> {company}  {location} <br /> {position}</Title>
                </div>
                <div className="flex gap-[16px] mb-[30px] flex-col px-4 py-3 text-sm">
                    {work_description.map((description: any, index: number) => <WorkDescription >{description}</WorkDescription>)}
                </div>
            </div>
        </div>
    )
}

const WorkExperience = () => {
    return (
        <div className="flex max-w-[640px] flex-col items-start justify-start w-full md:justify-center">
            <div className="text-xs text-gray-600 mb-5 font-medium" style={{ letterSpacing: 3 }}> BRIEF HISTORY IN TIME</div>
            <div className="flex flex-col">
                {resume_data.work_experience.map((work, index) => <TimeLineItem isEnd={index == resume_data.work_experience.length - 1.} isStart={index == 0} work={work} />)}
            </div>
        </div>
    )
}

const PortfolionHome = () => {
    const scrollToWork = () => {
        const workElement = document.getElementById('experience')
        workElement?.scrollIntoView({
            behavior: 'smooth'
        });
    }
    return (
        <div className="fixed bg-[#e9e9e9] w-full h-full overflow-y-scroll">
            <div className="relative md:flex w-full md:gap-[100px] h-full overflow-scroll">
                <div className="flex gap-[20px] flex-col items-center md:items-end justify-center w-full h-[100%]">
                    <div className="flex flex-col gap-3">
                        <div className="text-xl font-lato flex justify-center items-center flex-col md:flex-row gap-[25px]" style={{ letterSpacing: 5, fontSize: 32 }}>
                            <span className="col-12 md:col-6"> K E N N E T H </span> <span className="col-12 md:col-6"> J I E</span>
                        </div>
                        <div className="text-xs justify-center md:justify-start text-gray-600 font-nixie-one flex gap-[15px]" style={{ letterSpacing: 5 }}>
                            <span>Software</span><span>Engineer</span>
                        </div>
                    </div>
                    <div className="max-w-[300px] md:max-w-[360px] mt-5 font-nixie-one font-lato text-sm text-gray-500">
                        👋🏻 Hi I'm Jie, a front-end focused engineer in Philippines 🇵🇭.
                        I'm currently working remotely at <a className="text-gray-700 font-medium" href="muse.is">Muse </a>
                        building a web-based knowledge base for thinking process software.
                    </div>
                    <span onClick={scrollToWork}
                        className="animate-bounce md:hidden text-xs bottom-10 absolute text-gray-400 hover:text-gray-600 cursor-pointer"
                        style={{
                            letterSpacing: 4
                        }}>PROCEED</span>
                </div>
                <div className="md:flex hidden justify-center md:justify-start w-full p-[20px] md:pt-[60px]">
                    <WorkExperience />
                </div>
            </div>
            <div id="experience" className="h-fit md:hidden flex justify-center md:justify-start w-full p-[20px] md:pt-[60px]">
                <WorkExperience />
            </div>
            <div className="flex flex-col w-full justify-center">
                <div id="work" className="h-fit flex justify-center w-full p-[20px] md:pt-[60px]">
                    <div className="flex max-w-[640px] flex-col items-start justify-start w-full md:justify-center">
                        <div className="text-xs text-gray-600 mb-5 font-medium" style={{ letterSpacing: 3 }}> WORKS</div>
                        <div className="flex w-full flex-col md:flex-row gap-10">
                            {resume_data.projects.map(project => <ProjectItems project={project} />)}
                            {/* {resume_data.work_experience.map((work, index) => <TimeLineItem isEnd={index == resume_data.work_experience.length - 1.} isStart={index == 0} work={work} />)} */}
                        </div>
                    </div>
                </div>
                <div id="work" className="h-[300px] w-full flex justify-center w-full p-[20px] md:pt-[60px]">
                    <div className="flex max-w-[640px] flex-col justify-center w-full md:justify-center">
                        <div className="text-xs text-gray-600 mb-10 font-medium" style={{ letterSpacing: 3 }}> NEED A HAND?</div>
                        <div className="flex w-full items-center justify-center">
                            <button
                                onClick={() => { window.open('mailto:kennethjiepadasas@gmail.com'); }}
                                className="px-4 animate-bounce py-1 rounded-sm border border-gray-500 text-md text-gray-600 mb-5 font-bold">EMAIL ME</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="h-screen w-full">
                <div className="flex flex-col items-center justify-start w-full h-full">
                    Portfolio
                </div>
            </div> */}
        </div>
    )
}

export default PortfolionHome