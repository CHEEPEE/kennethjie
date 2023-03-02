import clsx from "clsx"
import { useEffect, useState } from "react"
import { api } from "~/utils/api"

const ChatBox = () => {
    const [prompt, setPrompt] = useState()
    const [chat, setChat] = useState("")
    const [prefix, setPrefix] = useState("You: ")
    const jie = api.jie.chat.useMutation()
    const [isChatActive, setIsChatActive] = useState(false)

    const sendChat = async () => {
        if (prompt) {
            const _prompt = prompt
            let inputHTML: HTMLInputElement = document.getElementById('input-prompt') as HTMLInputElement
            inputHTML.value = ""
            const response = await jie.mutateAsync({ content: chat + '\n'+ prefix + _prompt + '\n' })
            console.log(response)
            setChat(response as any)
        }
    }
    const autoScrollTextArea = () => {
        const textarea: any = document.getElementById("chat-response");
        if (textarea) {
            if (textarea.selectionStart == textarea.selectionEnd) {
                textarea.scrollTop = textarea.scrollHeight;
            }
        }
    }

    useEffect(() => {
        // setTimeout(autoScrollTextArea, 0)
    }, [chat])

    return (
        <div className={clsx(isChatActive ? 'transition transform ease-out max-w-[420x]' : 'w-[50px]', 'relative items-end justify-end flex gap-3 flex-col')}>
            <div
                onClick={() => setIsChatActive(false)}
                className={clsx(!isChatActive && 'hidden', "rotate-45 hover:bg-red-500 text-lg transition-all shadow-md ease-in cursor-pointer hover:scale-110 bg-gray-300 border rounded-[50%] flex items-center justify-center text-white w-[35px] h-[35px]")}>
                ＋
            </div>
            <div className={clsx(chat.length != 0 && isChatActive ? 'bg-transparent shadow-none' : isChatActive ? 'bg-[#e9e9e9] shadow-md w-[330px]' : '', ' rounded-[10px]')}>
                {chat.length !== 0 && <textarea
                    id="chat-response"
                    readOnly
                    rows={20}
                    className={clsx(isChatActive ? 'h-[350px] max-w-[420px] p-3' : 'overflow-hidden h-[0px] w-[0px]',
                        `
                        mb-2
                    transition transform
                    duration-150 
                   z-20
                   w-full
                   flex font-nixie-one 
                   text-xs
                   font-lato
                   shadow-md
                   rounded-[10px]
                   focus:outline-gray-200 focus:ring-none`
                    )}
                    value={chat?.substring(2041 + 25)}
                />}
                {
                    chat.length == 0 && isChatActive &&
                    <div className="h-fit text-xs text-gray-600 w-full max-w-[420px] p-3 flex justify-start items-end">
                        <div> Say Hello to Jie.ai and Press Enter 👇🏻</div>
                    </div>
                }
                <input
                    onFocus={() => { setIsChatActive(true) }}
                    id='input-prompt'
                    onKeyUp={(e: any) => {
                        if (e.key == 'Enter') {
                            sendChat()
                        } else {
                            setPrompt(e.target.value)
                        }
                    }}
                    className={clsx(`transition transform shadow-md
                                    duration-150  flex w-full text-sm 
                                    bg-gray-300 
                                    rounded-[10px] font-nixie-one px-3 py-2 
                                    focus:outline-gray-400 focus:ring-none focus:animate-pulse`,
                        isChatActive ? 'w-[330px]' : 'w-[75px] cursor-pointer animate-bounce bg-green-400 placeholder-white',)}
                    placeholder={isChatActive ? 'Chat with Jie.AI' : 'Jie.ai'}
                />
            </div>
        </div>
    )
}

export default ChatBox