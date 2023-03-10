import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import RandomFox from '../components/RandomFox';

const inter = Inter({ subsets: ['latin'] });
const random = (): number => Math.floor(Math.random() * 123) + 1;
const generateId = () => Math.random().toString(36).substring(2, 9);

type ImageItem = { id: string; url: string };

const Home: NextPage = () => {
  const [images, setImages] = useState<Array<ImageItem>>([
    { id: generateId(), url: `https://randomfox.ca/images/${random()}.jpg` },
    { id: generateId(), url: `https://randomfox.ca/images/${random()}.jpg` },
    { id: generateId(), url: `https://randomfox.ca/images/${random()}.jpg` },
    { id: generateId(), url: `https://randomfox.ca/images/${random()}.jpg` },
  ]);

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
        {images.map((image) => (
          <div key={image.id} className='p-4'>
            <RandomFox image={image.url} />
          </div>
        ))}
      </main>
    </>
  );
};
export default Home;
