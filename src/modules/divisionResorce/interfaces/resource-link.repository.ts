import { prisma } from "@/shared/utils/prisma";
import { ResourceLinkCreateDTO, ResourceLinkUpdateDTO  } from "../dto/resource-link.dto";


export const ResourceLinkRepository = {
    async createDivisionResourceLink(resourceLink: ResourceLinkCreateDTO) {
        return await prisma.divisionsResourceLink.create({
            data: resourceLink
        });
    },
    async getDivisionResourceLinks(divisionId: string) {
        return await prisma.divisionsResourceLink.findMany({
            where: { divisionId },
            orderBy: { CreatedAt: 'desc' },
            select: {
                id: true,
                divisionId: true,
                resourceLinkName: true,
                resourceLinkUrl: true,
                CreatedAt: true,
                updatedAt: true,
            }
        });
    },
    async getResourceLinkById(id: string) {
        return await prisma.divisionsResourceLink.findUnique({
            where: { id }
        });
    },
    async getAllResourceLinkByDivisionId(divisionId: string) {
        return await prisma.divisionsResourceLink.findMany({
            where: { divisionId }
        });
    },
    async updateDivisionResourceLink(id: string, resourceLink: ResourceLinkUpdateDTO) {
        return await prisma.divisionsResourceLink.update({
            where: { id },
            data: resourceLink
        });
    },
    async deleteDivisionResourceLink(id: string) {
        return await prisma.divisionsResourceLink.delete({
            where: { id }
        });
    }
};
    