export function imageUrl(imagePath) {
	if (!imagePath) {
		return '';
	}

	if (imagePath.includes('http')) {
		return imagePath;
	}

	return `${process.env.REACT_APP_IMAGES_BASE}${imagePath}`;
}
