import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fab } from '@material-ui/core';
import { NextSeo } from 'next-seo';

import { getUserLocation } from '~/helpers/userLocation';
import Events from '~/services/Events';
import ListView from '~/components/ListView';
import MapView from '~/components/MapView';
import styles from '~/styles/home';

const Home = () => {
	const classes = styles();
	const [showView, setShowView] = useState(true);
	const userCoords = useSelector(state => state.events);
	const dispatch = useDispatch();

	const userLocation = useCallback(async () => {
		if (userCoords.asked === true) {
			return;
		}

		try {
			const geoPosition = await getUserLocation();

			Events.updateCoords(geoPosition.coords.latitude, geoPosition.coords.longitude);
		} catch (e) {}

		dispatch({ type: 'ASKED' });
	}, [dispatch, userCoords.asked]);

	useEffect(() => {
		userLocation();
	}, [userLocation]);

	return (
		<>
			<NextSeo
				title="asembl"
				description="asembl is the home of interactive live performance. Real shows. Online."
				openGraph={{
					title: 'asembl ',
					description: 'asembl is the home of interactive live performance. Real shows. Online.'
				}}
			/>
			<Fab color="primary" aria-label="add" onClick={() => setShowView(!showView)} className={classes.fab}>
				<img src={!showView ? '/assets/images/iconListView.svg' : '/assets/images/iconMarker.png'} alt="" />
				<p>{!showView ? 'LIST' : 'MAP'}</p>
			</Fab>
			{showView ? <ListView /> : <MapView />}
		</>
	);
};

export default Home;
