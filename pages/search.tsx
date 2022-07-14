import { format } from 'date-fns';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';
import Mapbox from '../components/Mapbox';
import { ISearchResults } from '../typings';

interface Props {
  searchResults: ISearchResults[];
}

function search({ searchResults }: Props) {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests }: any = router.query;

  const formattedStartDate = format(new Date(startDate), 'dd MMMM');
  const formattedEndDate = format(new Date(endDate), 'dd MMMM');
  const range = `${formattedStartDate} ~ ${formattedEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} -for {noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>

          <div className="flex flex-col">
            {searchResults.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>

        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Mapbox />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default search;

export async function getServerSideProps() {
  const searchResults = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
