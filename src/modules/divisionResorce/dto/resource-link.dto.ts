import { R } from '@faker-js/faker/dist/airline-BUL6NtOJ';
import {   DivisionsResourceLink } from '@prisma/client';

export type ResourceLinkDTO = Pick<DivisionsResourceLink, 'id' | 'divisionId' | 'resourceLinkName' | 'resourceLinkUrl' | 'updatedAt'>

export type AllDivisionResourceDto = {name: string, id: string, resourceLink: ResourceLinkDTO[]}

export type ResourceLinkCreateDTO = Omit<DivisionsResourceLink, 'createdAt' | 'updateAt'> 

export type ResourceLinkUpdateDTO = Partial<Omit<ResourceLinkDTO, 'id' | 'divisionId' | 'createdAt' | 'updatedAt'>>

export type ResourceLinkDeleteDTO = Pick<ResourceLinkDTO, 'id'>

export type ResourceLinkGetDTO = Pick<ResourceLinkDTO, 'id' | 'divisionId'>
