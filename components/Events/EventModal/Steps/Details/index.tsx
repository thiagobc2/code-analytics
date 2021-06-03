import EventForm from '~/components/Events/EventForm';

const EventDetails = ({ user }): JSX.Element => {
	return <EventForm userLogged={user} />;
};

export default EventDetails;
