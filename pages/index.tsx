import { useState } from 'react';
import type { MouseEventHandler } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { random } from 'lodash';
import LazyImage from '../components/LazyImage';

const inter = Inter({ subsets: ['latin'] });
const randomNumber = (): number => random(1, 123);
const generateId = (): string => Math.random().toString(36).substring(2, 9);

const Home: NextPage = () => {
  const [images, setImages] = useState<Array<IImageItem>>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    const newImageItem: IImageItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${randomNumber()}.jpg`,
    };
    setImages([...images, newImageItem]);
  };

  return (
    <>
      <Head>
        <title>Esparev</title>
        <meta name='description' content='Generated by Esparev' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={`${inter.className} flex flex-col items-center gap-y-2 py-10`}>
        <p className='uppercase text-sm font-medium text-purple-600'>
          React with typescript course
        </p>
        <h1 className='text-4xl font-bold'>Component Lazy Image</h1>
        <p className='text-gray-600'>A generic React component to load images with lazy loading.</p>
        <p>✨✨</p>
        <p className='text-gray-600'>The added images won&apos;t be downloaded until they are visible on the screen.</p>
        <p>✨✨</p>
        <button
          className='px-3 py-1 rounded bg-purple-600 text-white outline focus:outline-2 focus:outline-offset-2 focus:outline-purple-600'
          onClick={addNewFox}>
          Add new fox
        </button>
        <div className='gap-3 columns-3 p-4'>
          {images.map((image, index) => (
            <div key={image.id} className='my-3 w-full aspect-video'>
              <LazyImage
                width={320}
                height='auto'
                src={image.url}
                className='rounded bg-gray-400'
                onLazyLoad={(img) => {
                  console.log(`Image #${index + 1} loaded on Node: ${img}`);
                }}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
export default Home;
