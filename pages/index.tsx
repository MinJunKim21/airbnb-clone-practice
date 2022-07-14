import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import { title } from 'process';
import { useRef, useState } from 'react';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LargeCard from '../components/LargeCard';
import MediumCard from '../components/MediumCard';
import SmallCard from '../components/SmallCard';
import { CardsData, ExploreData } from '../typings';

interface Props {
  exploreData: ExploreData[];
  cardsData: CardsData[];
}

export default function Home({ exploreData, cardsData }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Head>
        <title>Airbnb-Practice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header placeholder="Start your search" />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16 ">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          {/* 서버에서 데이터 받아와서 작업 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
            {exploreData?.map(({ img, distance, location }) => (
              <SmallCard
                key={img}
                img={img}
                distance={distance}
                location={location}
              />
            ))}
          </div>
        </section>
        {/* 시작 */}
        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="group relative ">
            <ChevronLeftIcon
              className={`absolute top-0 bottom-8 left-0 z-40 m-auto h-16 w-16 cursor-pointer opacity-30 transition hover:scale-125 group-hover:opacity-80 ${
                !isMoved && 'hidden'
              }`}
              onClick={() => handleClick('left')}
            />
            <div
              ref={rowRef}
              className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3"
            >
              {cardsData?.map(({ img, title }) => (
                <MediumCard key={img} img={img} title={title} />
              ))}
            </div>
            <ChevronRightIcon
              className="absolute top-0 bottom-8 right-0 z-40 m-auto h-16 w-16 cursor-pointer opacity-30 transition hover:scale-125 group-hover:opacity-80"
              onClick={() => handleClick('right')}
            />
          </div>
        </section>

        <LargeCard
          img="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb."
          buttonText="Get Inspired"
        />
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch('https://links.papareact.com/pyp').then(
    (res) => res.json()
  );

  const cardsData = await fetch('https://links.papareact.com/zp1').then((res) =>
    res.json()
  );

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
