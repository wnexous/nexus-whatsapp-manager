import { builtMenuInterface } from "nexus-wa/controllers/MenuController/interface"
import DeployAdapter from "../adapter"
import DeployController from "../controllers"
import { PrismaClient } from "@prisma/client"

export const DeployInstances = async () => {
    const { WhatsappAdapter, WebApi } = DeployAdapter
    const { MessageManager, UserManager, MenuController, DataController } = DeployController

    console.log("Starting deploy instances");
    // ADAPTERD
    const whatsappAdapter = new WhatsappAdapter()
    const databaseAdapter = new PrismaClient();
    // const webApi = new WebApi()

    // CONTROLLER
    const menuController = new MenuController()
    const dataController = new DataController()
    const userController = new UserManager({
        databaseAdapter,
        whatsappAdapter,
        menuController
    })

    // wait menus is mappeds to skip - when menu is mapped, the promisse is resolved by callback
    const menuMapInstance = await new Promise<builtMenuInterface[]>(resolve => menuController.setup(resolve))
    // wait whatsapp starts to init messageManager
    await new Promise(resolve => whatsappAdapter.setup(() => resolve(0)))

    // also controllers need inject other controllers or adapters inside constructor
    new MessageManager({
        userController,
        whatsappAdapter,
        menuController: menuMapInstance,
        dataController
    })

}
