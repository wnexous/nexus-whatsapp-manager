import { NexusPropsMenuInterface, NexusReturnMenuInterface } from "nexus-wa/global/interfaces/messageController";
import { menuTeste } from "./testes";

export default function handle({ message, hooks, menu }: NexusPropsMenuInterface): NexusReturnMenuInterface {


    console.log(menu);
    // save last message 
    const lastMessage = hooks.dataManager.getData({ token: "lastMessage" }) || { data: "sem mensagens" }
    hooks.dataManager.setData({ token: "lastMessage", data: message.body })


    if (message.body == "teste") {
        hooks.changeMenuByPath({ menuPath: "/testes" })
        return [
            { type: "message", content: "digite *teste* para o menu de testes" },
            { type: "message", content: menuTeste(), messageDelay: 2000 },
        ]

    }

    return [
        { type: "message", content: menuIndex() },
    ]

}


export const menuIndex = () => `

*MENU PRINCIPAL*

para ir ao menu de teste, digite *teste*
`