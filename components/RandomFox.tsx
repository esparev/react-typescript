type Props = { image: string };

const RandomFox = ({ image }: Props): JSX.Element => {
  return <img width={320} height='auto' src={image} className='rounded' />;
};

export default RandomFox;
