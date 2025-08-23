"use client";

import { parseHtmlString } from "@/lib/utils";
import React, { useEffect, useState } from "react";

type VideoContentProps = { content: string; className?: string };

export default function VideoContent({
  content,
  className,
}: VideoContentProps) {
  const [formattedContent, setFormattedContent] = useState<string>(content);

  useEffect(() => {
    setFormattedContent(parseHtmlString(content));
  }, [content]);

  return <div className={className}>{formattedContent}</div>;
}
