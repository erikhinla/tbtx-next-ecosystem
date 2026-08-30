"use client";

import { forwardRef, useState, type VideoHTMLAttributes } from "react";
import { film } from "@/lib/media";

type FilmProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, "src"> & {
  src: string;
};

const Film = forwardRef<HTMLVideoElement, FilmProps>(function Film(
  { src, poster, className, style, onError, children, ...rest },
  ref,
) {
  const [dead, setDead] = useState(false);
  const url = src.startsWith("http") ? src : film(src);

  if (dead && poster) {
    return <img src={poster} alt="" className={className} style={style} aria-hidden="true" />;
  }

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      poster={poster}
      onError={(event) => {
        setDead(true);
        onError?.(event);
      }}
      {...rest}
    >
      <source src={url} type="video/mp4" />
      {children}
    </video>
  );
});

export default Film;
