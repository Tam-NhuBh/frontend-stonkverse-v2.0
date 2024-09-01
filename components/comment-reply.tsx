import { FC } from "react";
import NextImage from "./next-image";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

interface Props {
  avatar: string;
  name: string;
  createdAt: Date;
  content: string;
}

const CommentReply: FC<Props> = ({
  avatar,
  name,
  createdAt,
  content,
}): JSX.Element => {
  return (
    <div className="border-b dark:border-slate-800 py-4">
      <div className="flex items-center gap-3">
        <div className="relative w-9 h-9 overflow-hidden rounded-full">
          <NextImage
            src={avatar || "/assets/images/home-page/default-user.png"}
            alt={name}
          />
        </div>

        <div>
          <span className="font-bold text-sm">{name}</span>
          <p className="flex items-center gap-2">
            <span className="font-bold text-slate-500 text-xs">
              {timeAgo.format(new Date(createdAt))}
            </span>
          </p>
        </div>
      </div>
      <div className="text-sm text-slate-500 dark:text-dark_text mt-4">
        {content}
      </div>
    </div>
  );
};

export default CommentReply;
