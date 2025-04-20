import { PrismaClient } from "@prisma/client"
import { SocialLinkCreateDTO,  SocialLinkUpdateDTO } from "../dto/social-link.dto";

const prisma = new PrismaClient()

export const SocialLinkRepository = {
    async createSocialLink(socialLink: SocialLinkCreateDTO) {
        return await prisma.socialLink.create({
            data: socialLink
        });
    },
    async getSocialLinks(userId: string) {
        return await prisma.socialLink.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                userId: true,
                socialLinkName: true,
                socialLinkUrl: true,
                createdAt: false,
                updatedAt: true,
            }
        });
    },
    async getSocialLinkById(id: string) {
        return await prisma.socialLink.findUnique({
            where: { id }
        });
    },
    async getAllSocialLinkByUserId(userId: string) {
        return await prisma.socialLink.findMany({
            where: { userId }
        });
    },
    async updateSocialLink(id: string, socialLink: SocialLinkUpdateDTO) {
        return await prisma.socialLink.update({
            where: { id },
            data: socialLink
        });
    },
    async deleteSocialLink(id: string) {
        return await prisma.socialLink.delete({
            where: { id }
        });
    }
};
    