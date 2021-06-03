import { useRef, useState, useContext, useEffect, useCallback } from 'react';

import LoadImage from 'blueimp-load-image';
import PropTypes from 'prop-types';

import Cropper from './Cropper';
import { Container, InputFile, Icon, LabelInput, Inside } from './styles';
import CreateModalEventContext from '~/components/Events/EventModal/context';
import EditModalEventContext from '~/components/Events/EventFormEdit/context';

import events from '~/services/Api/events';

const ImageUploader = ({ edit }) => {
	const inputRef = useRef(null);
	const { eventData } = useContext(edit ? EditModalEventContext : CreateModalEventContext);
	const [UploaderIcon, setUploaderIcon] = useState();

	const fetchCategoryIcon = useCallback(async () => {
		const resp = await events.getCategory(eventData.categories[0].id);
		if (resp.status) {
			setUploaderIcon(process.env.REACT_APP_IMAGES_BASE + resp.data[0].images[0].map_icon);
		}
	}, [eventData.categories]);

	const [crop, setCrop] = useState({
		cropping: false,
		toCrop: null,
		croppedImage: eventData.image ? eventData.image : null
	});

	const onChangeUploader = ({ target }) => {
		const uploadedImage = target.files[0];

		LoadImage(
			uploadedImage,
			canvas => {
				const dataUrl = canvas.toDataURL();
				setCrop({ cropping: true, toCrop: dataUrl, croppedImage: null });
			},
			{
				canvas: true,
				cover: true,
				orientation: true,
				maxWidth: 800,
				maxHeight: 800
			}
		);
	};

	useEffect(() => {
		fetchCategoryIcon();
	}, [fetchCategoryIcon]);

	return (
		<>
			{crop.cropping && (
				<Cropper image={crop.toCrop} aspect={93 / 38} cropState={{ crop, setCrop }} edit={edit} />
			)}

			<Container onClick={() => inputRef.current.click()}>
				<Inside>
					{crop.croppedImage ? (
						<picture>
							<img src={crop.croppedImage} alt="Uploaded" />
						</picture>
					) : (
						UploaderIcon && <Icon src={UploaderIcon} alt="Upload" />
					)}
					<InputFile
						type="file"
						accept=".jpg, jpeg, .png"
						ref={inputRef}
						onChange={event => onChangeUploader(event)}
					/>
					<LabelInput>{!crop.croppedImage && 'Add Photo'}</LabelInput>
				</Inside>
			</Container>
		</>
	);
};

ImageUploader.propTypes = {
	edit: PropTypes.bool
};

ImageUploader.defaultProps = {
	edit: false
};

export default ImageUploader;
