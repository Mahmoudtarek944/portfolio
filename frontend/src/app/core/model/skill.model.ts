export interface ISkill {
  _id: string;
  category: string;
  skills: { skillName: string; percentage: number }[];
}
