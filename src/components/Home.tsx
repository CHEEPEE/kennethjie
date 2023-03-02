import { children } from "cheerio/lib/api/traversing"
import { Props } from "html-react-parser/lib/attributes-to-props"
import { FC, ReactNode } from "react"
import ChatBox from "./ChatBox"
import { resume_data } from "~/utils/resumedata"


const Button = ({ children }: { children: string | ReactNode }) => {
    return <button className="px-4 hover:bg-gray-200 py-1 rounded-sm border border-gray-500 text-xs text-gray-600 mb-5 font-bold">{children}</button>
}

type Project = {
    title: string,
    description: string,
    link: string
}
const ProjectItems = ({ project }: { project: Project }) => {
    const { title, description, link } = project
    return (

        <a href={link}><div className="flex hover:scale-[101%] cursor-pointer transition ease-in  flex-col justify-between w-[320px] gap-7 h-fit md:h-[150px]">
            <div className="flex flex-col gap-3">
                <Title>
                    {title}
                </Title>
                <div className="font-nixie-one text-xs text-gray-600">
                    {description}
                </div></div>
            <div>
                {/* <Button><a href={link}>VIEW</a></Button> */}
            </div>
        </div></a>)
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
        <div className="flex w-full flex-row hover:animate-pulse">
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
                        <div className="text-xs text-gray-600 mb-5 font-medium" style={{ letterSpacing: 3 }}> SOME THINGS I'VE BUILT</div>
                        <div className="flex w-full flex-col md:flex-row gap-10">
                            {resume_data.projects.map(project => <ProjectItems project={project} />)}
                            {/* {resume_data.work_experience.map((work, index) => <TimeLineItem isEnd={index == resume_data.work_experience.length - 1.} isStart={index == 0} work={work} />)} */}
                        </div>
                    </div>
                </div>

                <div id="work" className="h-[300px] w-full flex justify-center w-full p-[20px] md:pt-[60px]">
                    <div className="flex max-w-[640px] flex-col justify-center w-full items-center md:justify-center">
                        <div className="text-xs text-gray-600 mb-10 font-medium" style={{ letterSpacing: 3 }}> Get In Touch</div>
                        <div className="flex w-full flex-col gap-10 items-center justify-center">
                            <div className="w-[320px] text-xs font-nixie-one text-gray-600">
                                Although I’m not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!
                            </div>
                            <button
                                onClick={() => { window.open('mailto:kennethjiepadasas@gmail.com'); }}
                                className="px-4 animate-bounce rounded-[5px] border border-gray-500 text-sm text-gray-600 mb-5 py-[2px] hover:bg-gray-600 ease-in-out duration-500 hover:text-white" style={{ letterSpacing: 2 }}>Say Hello!</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed w-max-[420px] right-[20px] bottom-[20px] flex justify-center">
                <ChatBox />
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