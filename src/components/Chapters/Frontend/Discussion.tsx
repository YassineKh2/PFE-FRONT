import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Textarea } from "@heroui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";

import { Comment as CommentType } from "@/types/Courses";
import { GetComments, PostComment } from "@/services/Comment";
import { formatDate } from "@/Helpers/Utils";

function Comment({
  id,
  name,
  time,
  text,
  image,
  isAuthor,
  children,
  reply,
}: {
  id: string;
  name: string;
  time: string;
  text: string;
  image: string;
  isAuthor?: boolean;
  children?: React.ReactNode;
  reply: Function;
}) {
  return (
    <div className="flex gap-4 items-start">
      <Avatar as="button" className="transition-transform" src={image} />
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 items-center">
            <p className="text-sm font-semibold">{name}</p>
            {isAuthor && (
              <Chip className="h-4" size="sm">
                Instructor
              </Chip>
            )}
            <p className="text-xs text-gray-500">{formatDate(time)}</p>
          </div>
          <p className="text-sm text-gray-700">{text}</p>
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 items-end justify-start">
              <Icon
                height="16"
                icon="iconamoon:like"
                style={{ color: "#6b7280" }}
                width="16"
              />
              <button className="text-xs text-gray-500">Like</button>
            </div>
            <div className="flex gap-1 items-end justify-start">
              <Icon
                height="14"
                icon="bx:comment"
                style={{ color: "#6b7280" }}
                width="14"
              />
              <button
                className="text-xs text-gray-500"
                onClick={() => reply(id)}
              >
                Reply
              </button>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function Discussion({
  CourseId,
  currentUser,
}: {
  CourseId: string;
  currentUser: {
    email: string;
    uid: string;
    role: string;
    photoUrl: string;
    displayName: string;
  };
}) {
  const [Comments, setComments] = useState<CommentType[]>([] as CommentType[]);
  const [comment, setComment] = useState<string>();
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>("");

  useEffect(() => {
    GetComments(CourseId).then((response) => {
      setComments(response[0].data);
    });
  }, []);

  // Helper to get the top-level comment id for any comment/reply
  const getRootCommentId = (id: string): string => {
    const comment = Comments.find((c) => c.id === id);

    if (comment?.replyingTo) {
      return getRootCommentId(comment.replyingTo);
    }

    return id;
  };

  const Post = (isReply = false) => {
    if (isReply) {
      if (!replyText || !replyTo) return;
      const newReply: CommentType = {
        content: replyText,
        courseId: CourseId,
        createdAt: new Date().toISOString(),
        userId: currentUser.uid,
        userName: currentUser.displayName,
        replyingTo: replyTo, // always the original comment id
      };

      PostComment(newReply).then(() => {
        setComments([...Comments, newReply]);
        setReplyTo(null);
        setReplyText("");
      });
    } else {
      if (!comment) return;
      const newComment: CommentType = {
        content: comment,
        courseId: CourseId,
        createdAt: new Date().toISOString(),
        userId: currentUser.uid,
        userName: currentUser.displayName,
      };

      PostComment(newComment).then(() => {
        setComments([...Comments, newComment]);
        setComment("");
      });
    }
  };

  // When replying, always set replyTo to the original comment id
  const reply = (id: string) => {
    setReplyTo(getRootCommentId(id));
    setReplyText("");
  };

  if (!Comments) return <p>Loading...</p>;

  // Sort comments and replies by createdAt date ascending
  const sortedComments = [...Comments]
    .filter((comment) => !comment.replyingTo)
    .sort(
      (a, b) =>
        new Date(a.createdAt as string).getTime() -
        new Date(b.createdAt as string).getTime(),
    );

  const getSortedReplies = (parentId: string) =>
    [...Comments]
      .filter((reply) => reply.replyingTo === parentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt as string).getTime() -
          new Date(b.createdAt as string).getTime(),
      );

  return (
    <>
      <div className="flex flex-col gap-8">
        <p className="font-semibold">Discussions</p>
        <div className="flex gap-4 items-start">
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={currentUser.photoUrl}
          />
          <div className="flex flex-col gap-2 w-full">
            <Textarea
              placeholder="Ask a question or share your thoughts..."
              value={comment}
              variant="bordered"
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              className="self-end"
              variant="flat"
              onPress={() => Post(false)}
            >
              Post Comment
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-8 w-full">
          {sortedComments.map((comment) => (
            <div key={comment.id}>
              <Comment
                id={comment.id || ""}
                image={"https://i.pravatar.cc/150?u=a042581f4e29026704d"}
                name={comment.userName}
                reply={reply}
                text={comment.content}
                time={comment.createdAt || ""}
              >
                {getSortedReplies(comment.id || "").map((replyComment) => (
                  <React.Fragment key={replyComment.id}>
                    <Comment
                      isAuthor
                      id={replyComment.id || ""}
                      image={"https://i.pravatar.cc/150?u=a042581f4e29026704d"}
                      name={replyComment.userName}
                      reply={reply}
                      text={replyComment.content}
                      time={replyComment.createdAt || ""}
                    />
                    {replyTo === replyComment.id && (
                      <div className="ml-8 mt-2 flex flex-col gap-2">
                        <Textarea
                          minRows={2}
                          placeholder="Write a reply..."
                          value={replyText}
                          variant="bordered"
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="flat"
                            onPress={() => Post(true)}
                          >
                            Post Reply
                          </Button>
                          <Button
                            size="sm"
                            variant="light"
                            onPress={() => setReplyTo(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
                {replyTo === comment.id &&
                  !Comments.some(
                    (replyC) =>
                      replyC.replyingTo === comment.id && replyTo === replyC.id,
                  ) && (
                    <div className="ml-8 mt-2 flex flex-col gap-2">
                      <Textarea
                        minRows={2}
                        placeholder="Write a reply..."
                        value={replyText}
                        variant="bordered"
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="flat"
                          onPress={() => Post(true)}
                        >
                          Post Reply
                        </Button>
                        <Button
                          size="sm"
                          variant="light"
                          onPress={() => setReplyTo(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
              </Comment>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Discussion;
