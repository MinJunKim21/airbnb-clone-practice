import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import { ExploreData } from '../typings';

interface IExploreData {
  exploreData: ExploreData[];
}

export default function Home({ exploreData }: IExploreData) {
  return (
    <div>
      <Head>
        <title>Airbnb-Practice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16 ">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          {/* 서버에서 데이터 받아와서 작업 */}
          <h2>
            {exploreData.map((item) => (
              <h1>{item.location}</h1>
            ))}
          </h2>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch('https://links.papareact.com/pyp').then(
    (res) => res.json()
  );

  return {
    props: {
      exploreData,
    },
  };
}
