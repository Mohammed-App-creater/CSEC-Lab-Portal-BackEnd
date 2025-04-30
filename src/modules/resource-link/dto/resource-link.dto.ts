import { ResourceLink } from '@prisma/client';

export type ResourceLinkDTO = Pick<ResourceLink, 'id' | 'userId' | 'resourceLinkName' | 'resourceLinkUrl' | 'updatedAt'>

export type ResourceLinkCreateDTO = Omit<ResourceLink, 'CreatedAt' | 'updateAt'> 

export type ResourceLinkUpdateDTO = Partial<Omit<ResourceLinkDTO, 'id' | 'userId' | 'CreatedAt' | 'updateAt'>>

export type ResourceLinkDeleteDTO = Pick<ResourceLinkDTO, 'id'>

export type ResourceLinkGetDTO = Pick<ResourceLinkDTO, 'id' | 'userId'>
