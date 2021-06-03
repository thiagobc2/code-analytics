import { useContext } from 'react';
import { FiX } from 'react-icons/fi';

import ModalEventContext from '../context';
import { Container, BtnClose } from './styles';

export default function Close() {
	const { CloseModal } = useContext(ModalEventContext);

	return (
		<Container>
			<BtnClose onClick={CloseModal}>
				<FiX />
			</BtnClose>
		</Container>
	);
}
