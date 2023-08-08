import WhatsappAdapter from "src/adapter/WhatsappAdapter";
import { builtMenuInterface } from "../MenuController/interface";
import UserController from "../UserManager";

export interface messageManagerContructorInterface {
    whatsappAdapter: WhatsappAdapter,
    menuController: builtMenuInterface[],
    userController: UserController
}