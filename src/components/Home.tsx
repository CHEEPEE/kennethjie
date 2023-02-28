import { Props } from "html-react-parser/lib/attributes-to-props"
import { FC, ReactNode } from "react"

const resume_data = {
    work_experience: [
        {
            date: "🗓️ June 2019 - Present",
            company: "💼 Muse",
            location: "📍 Hong Kong Remote",
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
    ]
}

const TimeLineComapnyName = ({ children }: { children: ReactNode }) => {
    return (
        <div className="font-nixie-one text-md text-gray-600">
            {children}
        </div>
    )
}

const WorkDescription = ({ children }: { children: string | ReactNode }) => {
    return (
        <div className="flex gap-2 font-nixie-one text-gray-600">
            <div className="text-gray-400">▸</div><div>{children}</div>
        </div>
    )
}
const TimeLineItem = ({ work }: any) => {
    const { date, company, location, position, work_description } = work
    return (
        <div className="flex w-full flex-row">
            <div className="w-[25px] pl-2 pr-5 flex-col flex justify-start">
                <div className="w-[10px] h-[10px] mt-[4px] rounded-[50%] bg-gray-300" />
                <div className="h-full ml-[4px] mt-1 w-[1px] bg-gray-300" />
            </div>
            <div className="">
                <div className="flex pl-[8px] gap-[10px]">
                    <TimeLineComapnyName>{date}<br /> {company}  {location} <br /> {position}</TimeLineComapnyName>
                </div>
                <div className="flex gap-[16px] mb-[30px] flex-col px-4 py-3 text-sm">
                    {work_description.map((description: any) => <WorkDescription>{description}</WorkDescription>)}
                </div>
            </div>
        </div>
    )
}

const PortfolionHome = () => {
    const scrollToWork = () => {
        const workElement = document.getElementById('work')
        workElement?.scrollIntoView({
            behavior: 'smooth'
        });
    }
    return (
        <div className="fixed bg-[#e9e9e9] w-full h-full overflow-y-scroll">
            <div className="flex gap-[20px] flex-col items-center justify-center w-full h-full">
                <div className="text-xl font-lato flex justify-center items-center flex-col md:flex-row gap-[25px]" style={{ letterSpacing: 5, fontSize: 32 }}>
                    <span className="col-12 md:col-6"> K E N N E T H </span> <span className="col-12 md:col-6"> J I E</span>
                </div>
                <div className="text-xs font-nixie-one flex gap-[15px]" style={{ letterSpacing: 7 }}>
                    <span>software</span><span>engineer</span>
                </div>
                <span onClick={scrollToWork} className="text-xs bottom-10 absolute text-gray-400 hover:text-gray-600 cursor-pointer">Proceed</span>
            </div>
            <div id="work" className="h-screen flex justify-center w-full p-[20px]">
                <div className="flex max-w-[640px] flex-col items-start justify-start w-full h-full">
                    <div className="text-xl text-gray-600 mb-2 font-medium" style={{ letterSpacing: 5 }}> Work Experience</div>
                    <div className="flex flex-col">
                        {resume_data.work_experience.map(work => <TimeLineItem work={work} />)}
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