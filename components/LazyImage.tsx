import { useRef, useState, useEffect } from 'react';
import type { ImgHTMLAttributes } from 'react';

type LazyImageProps = { src: string; onLazyLoad?: (img: HTMLImageElement) => void };
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImageProps & ImageNative;

const LazyImage = ({ src, onLazyLoad, ...imgProps }: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const [isLazyLoaded, setIsLazyLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');

  useEffect(() => {
    if (isLazyLoaded) {
      return;
    }

    // new observer
    const observer = new IntersectionObserver((entries) => {
      // on intersection
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !node.current) {
          return;
        }

        setCurrentSrc(src);
        observer.disconnect();
        setIsLazyLoaded(true);

        if (typeof onLazyLoad === 'function') {
          onLazyLoad(node.current);
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
  }, [currentSrc, onLazyLoad, isLazyLoaded]);

  return <img ref={node} src={currentSrc} {...imgProps} />;
};

export default LazyImage;
