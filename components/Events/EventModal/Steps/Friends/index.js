import { useCallback, useEffect, useContext, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import Loading from '~/components/Loading';
import { throttle } from 'throttle-debounce';
import { Button, Typography, Grid } from '@material-ui/core';

import User from '~/services/User';
import ModalEventContext from '../../context';
import List from './List';
import styles from './styles';

const InviteFriends = () => {
	const { setState, state, eventData, CreateEvent, showPrevStep } = useContext(ModalEventContext);
	const [listFriends, setListFriends] = useState({
		data: null,
		pageCount: null
	});

	const classes = styles();

	const [listGroups, setListGroups] = useState({ data: null, pageCount: null });

	const [filterFriends, setFilterFriends] = useState(null);
	const [filterGroups, setFilterGroups] = useState(null);

	const fetchFriends = useCallback(
		async (page = 1) => {
			setState({ loading: true });

			const respFriends = await User.allFriends(page);

			if (respFriends.status !== false) {
				setListFriends({
					data: respFriends.data.data.friend_list,
					pageCount: Math.ceil(respFriends.data.data.total_records / respFriends.data.data.record_per_page)
				});
			}

			setState({ loading: false });
		},
		[setListFriends, setState]
	);

	const fetchGroups = useCallback(
		async (page = 1) => {
			const respGroups = await User.allGroupFriends(page);

			if (respGroups.status !== false) {
				setListGroups({
					data: respGroups.data.data.group_list,
					pageCount: Math.ceil(respGroups.data.data.total_records / respGroups.data.data.record_per_page)
				});
			}
		},
		[setListGroups, setState]
	);

	useEffect(() => {
		fetchFriends();
		fetchGroups();
	}, [fetchFriends, fetchGroups]);

	useEffect(() => {
		const labels = document.querySelectorAll('.accordion-item');
		const tabs = document.querySelectorAll('.accordion-tab');

		const toggleShow = () => {
			const target = this;
			const item = target.classList.contains('accordion-tab') ? target : target.parentElement;
			const group = item.dataset.actabGroup;
			const id = item.dataset.actabId;

			tabs.forEach(tab => {
				if (tab.dataset.actabGroup === group) {
					if (tab.dataset.actabId === id) {
						tab.classList.add('accordion-active');
					} else {
						tab.classList.remove('accordion-active');
					}
				}
			});

			labels.forEach(label => {
				if (label.dataset.actabGroup === group) {
					if (label.dataset.actabId === id) {
						label.classList.add('accordion-active');
					} else {
						label.classList.remove('accordion-active');
					}
				}
			});
		};

		labels.forEach(label => {
			label.addEventListener('click', toggleShow);
		});

		tabs.forEach(tab => {
			tab.addEventListener('click', toggleShow);
		});
	}, [listFriends, listGroups]);

	if (!state.loading && listFriends.data != null && listGroups.data != null) {
		if (listFriends.data.length === 0 && listGroups.data.length === 0) {
			return (
				<Grid container spacing={4} className={classes.container}>
					<Grid item xs={12}>
						<Typography variant="body1">You have no friends yet</Typography>
					</Grid>
					<Grid item md={3} sm={6} xs={12}>
						<Button color="primary" variant="contained" fullWidth onClick={() => showPrevStep()}>
							Prev
						</Button>
					</Grid>
					<Grid item md={3} sm={6} xs={12}>
						<Button color="primary" variant="contained" fullWidth onClick={() => CreateEvent()}>
							Create Event
						</Button>
					</Grid>
				</Grid>
			);
		}
	}

	const searchData = keyword => {
		const label = document.querySelectorAll('.accordion-item.accordion-active');
		const list = [];

		if (keyword.length > 3) {
			if (label[0].dataset.actabId == 0) {
				listFriends.data.filter(data => {
					if (data.name.toLowerCase().includes(keyword.toLowerCase())) {
						list.push(data);
					}
				});

				setFilterFriends(list);
			} else {
				listGroups.data.filter(data => {
					if (data.group_title.toLowerCase().includes(keyword.toLowerCase())) {
						list.push(data);
					}
				});

				setFilterGroups(list);
			}
		} else {
			setFilterFriends(null);
			setFilterGroups(null);
		}
	};

	const changeQuery = event => {
		throttle(500, searchData(event.target.value));
	};

	const handlePageClick = data => {
		setFilterFriends(null);
		const page = data.selected + 1;

		fetchFriends(page);
	};

	const handlePageClickGroups = data => {
		setFilterGroups(null);
		const page = data.selected + 1;

		fetchGroups(page);
	};

	return (
		<>
			{state.loading && <Loading heightLoading={100} />}

			{listFriends.data != null && listGroups.data != null && (
				<div>
					<input
						type="search"
						placeholder="Search by name"
						className="searchName"
						onChange={e => changeQuery(e)}
					/>

					<div className="accordion">
						<section className="tabs">
							<ul className="accordion-tabs">
								<li className="accordion-tab accordion-active" data-actab-group="0" data-actab-id="0">
									<span>
										Friends <span className="total">({listFriends.data.length})</span>
									</span>
								</li>
								{listGroups.data.length > 0 && (
									<li className="accordion-tab" data-actab-group="0" data-actab-id="1">
										<span>
											Groups <span className="total">({listGroups.data.length})</span>
										</span>
									</li>
								)}
							</ul>
						</section>

						<section className="accordion-content">
							<article className="accordion-item accordion-active" data-actab-group="0" data-actab-id="0">
								<List type="users" data={filterFriends != null ? filterFriends : listFriends.data} />

								<ReactPaginate
									previousLabel={<FaAngleLeft />}
									nextLabel={<FaAngleRight />}
									breakLabel="..."
									breakClassName="break-me"
									pageCount={listFriends.pageCount}
									marginPagesDisplayed={1}
									pageRangeDisplayed={5}
									onPageChange={handlePageClick}
									containerClassName="pagination"
									subContainerClassName="pages pagination"
									activeClassName="active"
									initialPage={0}
								/>
							</article>
							{listGroups.data.length > 0 && (
								<article className="accordion-item" data-actab-group="0" data-actab-id="1">
									<List type="groups" data={filterGroups != null ? filterGroups : listGroups.data} />

									<ReactPaginate
										previousLabel={<FaAngleLeft />}
										nextLabel={<FaAngleRight />}
										breakLabel="..."
										breakClassName="break-me"
										pageCount={listGroups.pageCount}
										marginPagesDisplayed={1}
										pageRangeDisplayed={5}
										onPageChange={handlePageClickGroups}
										containerClassName="pagination"
										subContainerClassName="pages pagination"
										activeClassName="active"
										initialPage={0}
									/>
								</article>
							)}
						</section>
					</div>

					<Grid container spacing={4} className={classes.container}>
						<Grid item xs={12}>
							<Typography variant="body1">You have no friends yet</Typography>
						</Grid>
						<Grid item md={3} sm={6} xs={12}>
							<Button color="primary" variant="contained" fullWidth onClick={() => showPrevStep()}>
								Prev
							</Button>
						</Grid>
						<Grid item md={3} sm={6} xs={12}>
							<Button
								color="primary"
								variant="contained"
								fullWidth
								onClick={() => CreateEvent()}
								disabled={eventData.contacts.length === 0 && eventData.invited_groups.length === 0}
							>
								Create Event
							</Button>
						</Grid>
					</Grid>
				</div>
			)}
		</>
	);
};

export default InviteFriends;
