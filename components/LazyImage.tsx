import { useRef, useState, useEffect } from 'react';
import type { ImgHTMLAttributes } from 'react';

type LazyImageProps = { src: string };
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImageProps & ImageNative;

const LazyImage = ({ src, ...imgProps }: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState(
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4='
  );

  useEffect(() => {
    // new observer
    const observer = new IntersectionObserver((entries) => {
      // on intersection
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSrc(src);
        }
      });
    });

    // observe node
    if (node.current) {
      observer.observe(node.current);
    }

    // disconnect
    return () => {
      observer.disconnect();
    };
  }, [currentSrc]);

  return <img ref={node} src={currentSrc} {...imgProps} />;
};

export default LazyImage;
