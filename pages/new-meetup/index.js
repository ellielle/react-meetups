import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetup() {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    const request = await fetch("/api/new-meetup",
      {
        method: "POST",
        body: JSON.stringify(enteredMeetupData),
        headers: { "Content-Type": "application/json" }
      });
    const data = await request.json();
    console.log(data);
    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Add a new Meetup</title>
        <meta name="description"
          content="Add your own meetups and create amazing networking opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={ addMeetupHandler } />
    </Fragment>

  );
}

export default NewMeetup;