export type SkillPlain = {
    _id: string;
    user: string;
    abbreviation: string;
    careerCategory: string;
    language?: string[];
    framework?: string[];
    cloudDB?: string[];
    tool?: string[];
    other?: string[];
    note?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
};