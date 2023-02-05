import React, { ReactNode } from 'react'

export type ResumeCardProps = {
    img: string,
    imgName: string,
    headerName: string
}

export type LoginModalProps = {
    isOpen: boolean,
    onOpen: function,
    onClose: function,
    text: string,
    handleSignIn: function
}

export type User = {
    firstName: string,
    lastName: string,
    website: string,
    phoneNumber: string,
    email: string,
    experiences: [WorkExperience],
    education: [EducationExperience],
    skills: [Skill],
    interests: [Interest]
}

export type EducationExperience = {
    school: string,
    location: string,
    degreeType: string,
    gradDate: string,
    major: string,
    minor: string,
    gpa: string,
    key?: string
}

export type ModalProps = {
    isModalOpen: boolean,
    onModalClose: function,
    user: User | null
}

export type DrawerObject = {
    [skill: string]: JSX.Element;
    interest: JSX.Element;
    education: JSX.Element;
    experience: JSX.Element;
};

export type Skill = {
    skill: string,
    skillType: string,
    key?: string
}

export type Interest = {
    interest: string,
    key?: string
}

export type DrawerProps = {
    formData: useState<WorkExperience | EducationExperience | Skill | Interest>,
    isEdit: boolean,
    isOpen: boolean,
    onClose: function,
    setEdit: function
}

export type ChangingDrawerProps = {
    isOpen: boolean,
    onClose: function,
    drawerType: string,
    educationFormData: any,
    isEdit: boolean
}

export type ExperienceDrawerProps = {
    formData: useState<WorkExperience>,
    isEdit: boolean,
    isOpen: boolean,
    onClose: function,
    setEdit: function
}

export type WorkExperience = {
    experienceType: string,
    organization: string,
    title: string,
    location: string,
    startDate: string,
    endDate: string,
    description: string,
    key?: string
}