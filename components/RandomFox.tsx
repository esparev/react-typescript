const random = (): number => Math.floor(Math.random() * 123) + 1;

const RandomFox = (): JSX.Element => {
  const image = `https://randomfox.ca/images/${random()}.jpg`;

  return <img width={320} height='auto' src={image} className='rounded' />;
};

export default RandomFox;
