import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";

type DialogImageProps = {
  children: React.ReactNode;
  image: TCastImage;
}

export default function DialogImage({ children, image }: DialogImageProps) {
  if (!image.file_path) return children
  return (
    <Dialog >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent showCloseButton={false} className="border-0 bg-transparent shadow-none">
        <DialogHeader className="sr-only">
          <DialogTitle className="">zoom ảnh</DialogTitle>
          <DialogDescription>bấm zo hình thì zoom to ra

          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-auto md:w-auto md:h-screen relative" style={{ aspectRatio: image.aspect_ratio }}>
          <Image
            src={`${process.env.DOMAIN_TMDB_IMAGE}${image.file_path}`}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}