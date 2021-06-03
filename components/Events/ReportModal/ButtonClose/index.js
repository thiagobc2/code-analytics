import { useContext } from 'react';
import { FiX } from 'react-icons/fi';
import { Button } from '@material-ui/core';

import styles from './styles';
import ModalReportContext from '../context';

const ButtonClose = () => {
	const { handleReportModal } = useContext(ModalReportContext);
	const classes = styles();

	return (
		<Button size="large" onClick={() => handleReportModal()} className={classes.button}>
			<FiX />
		</Button>
	);
};

export default ButtonClose;
