import { prisma } from "@/shared/utils/prisma";
import { ResourceLinkCreateDTO, ResourceLinkUpdateDTO } from "../../group/dto/resource-link.dto";


export const ResourceLinkRepository = {
    async createSocialLink(resourceLink: ResourceLinkCreateDTO) {
        return await prisma.resourceLink.create({
            data: resourceLink
        });
    },
    async getResourceLinks(userId: string) {
        return await prisma.resourceLink.findMany({
            where: { userId },
            orderBy: { CreatedAt: 'desc' },
            select: {
                id: true,
                userId: true,
                resourceLinkName: true,
                resourceLinkUrl: true,
                CreatedAt: true,
                updatedAt: true,
            }
        });
    },
    async getResourceLinkById(id: string) {
        return await prisma.resourceLink.findUnique({
            where: { id }
        });
    },
    async getAllResourceLinkByUserId(userId: string) {
        return await prisma.resourceLink.findMany({
            where: { userId }
        });
    },
    async updateResourceLink(id: string, resourceLink: ResourceLinkUpdateDTO) {
        return await prisma.resourceLink.update({
            where: { id },
            data: resourceLink
        });
    },
    async deleteResourceLink(id: string) {
        return await prisma.resourceLink.delete({
            where: { id }
        });
    }
};
