import { useContext, useEffect, useCallback } from 'react';

import Loading from '~/components/Loading';
import { events } from '~/services/Api';

import ModalEventContext from '../../context';
import { Title, Image, Name, Box, CategoriesList } from './styles';

export default function ChooseType() {
	const { showNextStep, setCategories, categories, setState, state } = useContext(ModalEventContext);

	const fetchCategories = useCallback(async () => {
		const resp = await events.allCategories();

		if (resp.status !== false) {
			setCategories(resp.categroy_details);
			setState({ loading: false });
		}
	}, [setCategories, setState]);

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	const nextCategories = id => {
		setState({ typeSelected: id });
		showNextStep();
	};

	return state.loading ? (
		<Loading heightLoading="60" />
	) : (
		<>
			<Title>Choose an event type</Title>
			<CategoriesList>
				{categories.map((category, index) => (
					<Box
						key={category.id}
						className="column"
						role="button"
						onClick={() => nextCategories(category.id)}
						onKeyPress={() => nextCategories(category.id)}
						tabIndex={index}
					>
						<Image>
							<img
								src={process.env.REACT_APP_IMAGES_BASE + category.main_image_path}
								alt={category.name}
							/>
						</Image>
						<Name>{category.name}</Name>
					</Box>
				))}
			</CategoriesList>
		</>
	);
}
