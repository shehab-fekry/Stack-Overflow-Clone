import { ROUTES } from "@/enums/routes";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { tagsClassNameMapper } from "@/lib/tagsMapper";

interface ITagCardProps {
  _id: string;
  name: string;
  questions: number;
  showCount?: boolean;
  compact?: boolean;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
}: ITagCardProps) => {
  const iconClass = tagsClassNameMapper(name);

  return (
    <Link
      className="flex justify-between gap-2"
      href={ROUTES.PROFILE("tags", _id)}
    >
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          {/* Icon */}
          <i className={`${iconClass} text-sm`}></i>
          {/* Label */}
          <span>{name}</span>
        </div>
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">+{questions}</p>
      )}
    </Link>
  );
};

export default TagCard;
