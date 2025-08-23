"use client";

import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { deleteWatchedVideo } from "@/features/watched-videos/data";
import { useMutation } from "@tanstack/react-query";

type Props = {
  id: string;
  onSuccess: () => void;
};

export default function ButtonDeleteWatchedVideo({ id, onSuccess }: Props) {
  const { mutate } = useMutation({
    mutationFn: async () => deleteWatchedVideo(id),
    onSuccess,
  });

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => {
        mutate();
      }}
    >
      <Trash2Icon className="size-3" />
      Xóa
    </Button>
  );
}
