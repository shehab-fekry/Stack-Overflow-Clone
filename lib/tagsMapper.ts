import { TAGS_MAP } from "@/enums/constants";

export const tagsClassNameMapper = (tagName: string) => {
  const mappedIcon = TAGS_MAP[tagName as keyof typeof TAGS_MAP];

  return mappedIcon ? `${mappedIcon} colored` : "devicon-devicon-plain";
};
