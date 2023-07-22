const normalizeSrc = (src: string) => src[0] === '/' ? src.slice(1) : src
export const cloudinaryImageLoader = ({ src }: { src: string }) => {
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""}/image/upload/f_auto/${normalizeSrc(src)}`;
}