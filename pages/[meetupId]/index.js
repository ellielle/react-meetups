import { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{ props.meetupData.title }</title>
        <meta name="description"
          content={ `${ props.meetupData.description }` }
        />
      </Head>
      <MeetupDetail image={ props.meetupData.image }
        title={ props.meetupData.title }
        address={ props.meetupData.address }
        description={ props.meetupData.description }
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const uri = "mongodb+srv://nlamour:kx8Ow7IYZgD9XspZ@cluster0.61irxnk.mongodb.net/?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri);
  const db = client.db("meetups");
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  await client.close();

  return {
    fallback: "blocking",
    paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } }))
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const uri = "mongodb+srv://nlamour:kx8Ow7IYZgD9XspZ@cluster0.61irxnk.mongodb.net/?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri);
  const db = client.db("meetups");
  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId)
  });

  await client.close();

  // fetch data for a single meetup
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description
      }
    }
  };
}

export default MeetupDetails;