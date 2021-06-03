import { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import styles from './styles';
import { initGA, logPageView } from '~/helpers/googleAnalytics';

const Layout = (props): JSX.Element => {
	const [gaInitialized, setGaInitialized] = useState(false);
	const isProduction = process.env.REACT_APP_ENV === 'production';
	const classes = styles();
	const { children } = props;
	const router = useRouter();

	useEffect(() => {
		if (!gaInitialized && isProduction) {
			initGA();
			setGaInitialized(true);
		}
		if (isProduction) logPageView();
	}, [gaInitialized, isProduction]);

	return (
		<Grid
			container
			className={
				router.pathname === '/payout' || router.pathname === '/my-orders' || router.pathname === '/my-tickets'
					? classes.bgBlue
					: classes.container
			}
		>
			<DefaultSeo
				title="asembl"
				noindex={isProduction ? false : true}
				nofollow={isProduction ? false : true}
				description="asembl is the home of interactive live performance. Real shows. Online."
				openGraph={{
					type: 'website',
					locale: 'en_US',
					title: 'asembl',
					description: 'asembl is the home of interactive live performance. Real shows. Online.',
					images: [
						{
							url: 'https://asemblco.com/assets/images/party.jpg',
							width: 1200,
							height: 800,
							alt: 'asembl'
						}
					],
					site_name: 'asembl'
				}}
				twitter={{
					handle: '@handle',
					site: '@site',
					cardType: 'summary_large_image'
				}}
			/>
			<Header />
			<Grid item xs={12} className={classes.content}>
				{children}
			</Grid>
			<Grid item xs={12} className={classes.pageFooter}>
				<Footer />
			</Grid>
		</Grid>
	);
};

export default Layout;
