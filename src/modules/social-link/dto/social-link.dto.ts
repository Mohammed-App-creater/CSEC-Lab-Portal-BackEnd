import { socialLink } from '@prisma/client';

export type SocialLinkDTO = Pick<socialLink, 'id' | 'userId' | 'socialLinkName' | 'socialLinkUrl' | 'updatedAt'>

export type SocialLinkCreateDTO = Omit<SocialLinkDTO, 'createdAt' | 'updateAt'> 

export type SocialLinkUpdateDTO = Partial<Omit<SocialLinkDTO, 'id' | 'userId' | 'createdAt' | 'updateAt'>>

export type SocialLinkDeleteDTO = Pick<SocialLinkDTO, 'id'>

export type SocialLinkGetDTO = Pick<SocialLinkDTO, 'id' | 'userId'>
