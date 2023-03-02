import ChatBox from "~/components/ChatBox"

const AiPage = () => {
    return (<div className="flex flex-col gap-[30px] relative items-center justify-center w-full h-[100vh]">
        <div className="text font-nixie-one text-gray-400">Chat with Jie</div>
        <ChatBox />
    </div>)
}

export default AiPage