import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import DatabaseApi from "nexus-wa/adapter/DatabaseAdapter";
import WhatsappAdapter from "nexus-wa/adapter/WhatsappAdapter";
import MenuController from "../MenuController";

export interface userManagerContructorInterface {
    menuController: MenuController
    whatsappAdapter: WhatsappAdapter,
    databaseAdapter: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
}