import { useState, useContext } from 'react';
import Crop from 'react-easy-crop';
import { Card, Modal, CardContent, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import getCroppedImage from '~/helpers/cropImage';

import CreateModalEventContext from '~/components/Events/EventModal/context';
import EditModalEventContext from '~/components/Events/EventFormEdit/context';

import styles from './styles';

const Cropper = ({ image, aspect, cropState, edit }) => {
	const classes = styles();
	const { setEventData, eventData } = useContext(edit ? EditModalEventContext : CreateModalEventContext);

	const [config, setConfig] = useState({
		image,
		aspect: aspect || 1,
		zoom: 1,
		crop: { x: 0, y: 0 },
		croppedArea: null
	});

	const [cropping, setCropping] = useState(false);

	const onCropComplete = (croppedAreaCanvas, croppedAreaPixels) => {
		setConfig({ ...config, croppedArea: croppedAreaPixels });
	};

	const closeCrop = () => {
		cropState.setCrop({ cropping: false, toCrop: null });
	};

	const createCroppedImage = async () => {
		setCropping(true);
		const croppedImageFull = await getCroppedImage(image, config.croppedArea);

		cropState.setCrop({
			cropping: false,
			croppedImage: croppedImageFull
		});

		setEventData({ ...eventData, image: croppedImageFull });
	};

	return (
		<>
			<Modal open={cropState.crop} onClose={closeCrop}>
				<Card className={classes.modalCard}>
					<CardContent className={classes.modalHeader}>
						<Typography variant="h4">Crop Image</Typography>
					</CardContent>
					<CardContent className={classes.modalBody}>
						<Crop
							crop={config.crop}
							image={config.image}
							zoom={config.zoom}
							aspect={config.aspect}
							onCropComplete={onCropComplete}
							onCropChange={cropInfo => setConfig({ ...config, crop: cropInfo })}
							onZoomChange={zoom => setConfig({ ...config, zoom })}
							showGrid={false}
							zoomSpeed={2}
						/>
					</CardContent>
					<CardContent className={classes.modalFooter}>
						<Button
							variant="contained"
							color="primary"
							onClick={() => createCroppedImage()}
							disabled={cropping}
						>
							{cropping ? 'Cropping image...' : 'Crop'}
						</Button>
						<Button variant="contained" onClick={() => closeCrop()} disabled={cropping}>
							Cancel
						</Button>
					</CardContent>
				</Card>
			</Modal>
		</>
	);
};

Cropper.propTypes = {
	image: PropTypes.string.isRequired,
	aspect: PropTypes.number,
	cropState: PropTypes.shape({
		crop: PropTypes.string,
		setCrop: PropTypes.func
	}).isRequired,
	edit: PropTypes.bool
};

Cropper.defaultProps = {
	aspect: 1,
	edit: false
};

export default Cropper;
