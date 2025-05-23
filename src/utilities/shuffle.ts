export type cardType = {
  id: number;
  matched: boolean;
  image: string;
};

const shuffle = (): cardType[] => {
  const assets = [
    { image: "/assets/css.png" },
    { image: "/assets/html5.png" },
    { image: "/assets/jquery.png" },
    { image: "/assets/js.png" },
    { image: "/assets/next.png" },
    { image: "/assets/node.png" },
    { image: "/assets/react.png" },
    { image: "/assets/ts.png" },
  ];
  return [...assets, ...assets]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random(), matched: false }));
};

export default shuffle;
