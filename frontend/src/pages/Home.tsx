import { useCryptoStarterStore } from "../store";

const Home = () => {
  const {campaigns} = useCryptoStarterStore();

  console.log(campaigns);

  return <div>Home</div>;
};

export default Home;
