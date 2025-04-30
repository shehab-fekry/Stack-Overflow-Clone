import { ROUTES } from "@/enums/routes";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { tagsClassNameMapper } from "@/lib/tagsMapper";
import Image from "next/image";

interface ITagCardProps {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean; // embedded with navigation
  isButton?: boolean;
  remove?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  isButton = false,
  remove,
  handleRemove,
}: ITagCardProps) => {
  const iconClass = tagsClassNameMapper(name);

  const content = (
    <>
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase gap-2">
        <div className="flex-center space-x-2">
          {/* Icon */}
          <i className={`${iconClass} text-sm`}></i>
          {/* Label */}
          <span>{name}</span>
        </div>
        {/* Close */}
        {remove && (
          <Image 
          className="cursor-pointer object-contain invert-0 dark:invert"
          src="/icons/close.svg" 
          alt="Close" 
          width={12} 
          height={12} 
          onClick={handleRemove} 
          />
        )}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">+{questions}</p>
      )}
    </>
  )
  
  
  return isButton ? (
    <button type="button">{content}</button>
  ) : (
    <Link
      className="flex justify-between gap-2"
      href={ROUTES.PROFILE("tags", _id)}
    >
      {content}
    </Link>
  )
};

export default TagCard;
