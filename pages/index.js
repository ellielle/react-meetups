import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description"
          content="Browse a huge list of highly active React meetups!" />
      </Head>
      <MeetupList meetups={ props.meetups } />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//
//    return {
//      props: {
//        meetups: DUMMY_MEETUPS
//      }
//    }
// }

export async function getStaticProps() {
  const uri = "mongodb+srv://nlamour:kx8Ow7IYZgD9XspZ@cluster0.61irxnk.mongodb.net/?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri);
  const db = client.db("meetups");
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  await client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1
  };
}

export default HomePage;