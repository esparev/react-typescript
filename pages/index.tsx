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
      <main>
        <h1 className='text-3xl font-bold underline'>Hello, World</h1>
        <button onClick={addNewFox}>Add new fox</button>
        {images.map((image, index) => (
          <div key={image.id} className='p-4'>
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
      </main>
    </>
  );
};
export default Home;
