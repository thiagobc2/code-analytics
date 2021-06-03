import { useContext } from 'react';

import { Button, Grid } from '@material-ui/core';
import CategorySelect from '~/components/CategorySelect';

import ModalEventContext from '../../context';
import styles from './styles';

const ChooseCategory = () => {
	const classes = styles();
	const { showNextStep, eventData, setEventData } = useContext(ModalEventContext);

	return (
		<Grid container spacing={4} className={classes.container}>
			<Grid item xs={12} className={classes.contentCategorySelect}>
				<CategorySelect
					selectedCategories={eventData.categories.length > 0 ? eventData.categories : []}
					onSelectCategories={listCategories =>
						setEventData({
							...eventData,
							categories: listCategories
						})
					}
					buttonsSelect={false}
					validCategories
				/>
			</Grid>
			<Grid item md={3} sm={6} xs={12} className={classes.buttons}>
				<Button
					variant="contained"
					className={classes.button}
					onClick={() => showNextStep()}
					disabled={eventData.categories.length <= 0}
					fullWidth
				>
					Next
				</Button>
			</Grid>
		</Grid>
	);
};

export default ChooseCategory;
