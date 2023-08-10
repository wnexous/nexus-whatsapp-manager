import { Prisma, PrismaClient } from "@prisma/client";
import { userManagerContructorInterface } from "./interface";
import { DefaultArgs } from "@prisma/client/runtime/library";
import WhatsappAdapter from "nexus-wa/adapter/WhatsappAdapter";
import { CONFIG_MENU_MAPPING } from "../MenuController/config";
import MenuController from "../MenuController";

export default class UserController {
    protected databaseAdapter: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
    protected whatsappAdapter: WhatsappAdapter
    protected menuController: MenuController
    constructor({ databaseAdapter, whatsappAdapter, menuController }: userManagerContructorInterface) {

        console.log("[controller] starting UserController");

        this.databaseAdapter = databaseAdapter
        this.whatsappAdapter = whatsappAdapter
        this.menuController = menuController


    }

    async fetchUserProfile(props: { phoneId: string }) {
        return await this.databaseAdapter.user
            .findFirst({
                where: { phoneId: props.phoneId }
            })
            || await this.createUserByPhoneId({ phoneId: props.phoneId })
    }

    async createUserByPhoneId(props: { phoneId: string }) {
        const fetchDefaultMenu = this.menuController.menuList.find(menu => menu.name == CONFIG_MENU_MAPPING.mainMenuName)
        return await this.databaseAdapter.user
            .create({
                data: {
                    phoneId: props.phoneId,
                    currentMenu: fetchDefaultMenu.id
                }
            })
    }

    async changeUserMenu(props: { phoneId: string, menuId: string }) {
        return await this.databaseAdapter.user
            .update({
                where: { phoneId: props.phoneId },
                data: { currentMenu: props.menuId }
            })
    }
}