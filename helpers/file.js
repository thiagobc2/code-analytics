import loadImage from 'blueimp-load-image';

export function dataURLtoBlob(dataurl) {
	const byteString = atob(dataurl.split(',')[1]);

	const mimeString = dataurl.split(',')[0].split(':')[1].split(';')[0];

	const ab = new ArrayBuffer(byteString.length);
	const ia = new Uint8Array(ab);

	for (let i = 0; i < byteString.length; i + 1) {
		ia[i] = byteString.charCodeAt(i);
	}

	return new Blob([ab], { type: mimeString });
}

export function blobToDataURL(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = e => {
			resolve(e.target.result);
		};

		reader.onerror = reject;

		reader.readAsDataURL(blob);
	});
}

export async function blobUrlToFile(blobUrl) {
	const resp = await fetch(blobUrl);
	const blob = await resp.blob();

	const file = new File([blob], 'namefile', { type: 'image/jpeg' });

	return file;
}

export function parseImage(image) {
	return new Promise(resolve => {
		loadImage(image, canvas => resolve(canvas.toDataURL()), {
			canvas: true,
			cover: true,
			maxWidth: 1200,
			maxHeight: 1200,
			orientation: true
		});
	});
}
