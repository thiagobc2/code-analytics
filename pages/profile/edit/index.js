import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import { useRouter } from 'next/router';

import Loading from '~/components/Loading';
import ProfileForm from '~/components/ProfileForm';
import { user as UserApi } from '~/services/Api';
import User from '~/services/User/';

const EditProfile = () => {
	const [dataUser, setDataUser] = useState();
	const router = useRouter();
	const [sending, setSending] = useState(false);

	const { access_token, user } = useSelector(state => state.auth);

	const fetchData = async () => {
		if (!user || !access_token) return;

		const respData = await UserApi.byID(user.id, access_token);

		respData.data.data.user.categories.forEach(category => {
			if (!category.children) {
				category.children = [];
			}
		});

		setDataUser(respData.data.data.user);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const onSubmitForm = async formData => {
		setSending(true);

		const resp = await User.update(dataUser.id, formData, access_token);

		setSending(false);

		if (resp.status === false) {
			swal('Error', resp.message, 'error');
		} else {
			swal('Ok!', 'Profile updated', 'success').then(() => router.push('/profile'));
		}
	};

	return dataUser ? (
		<ProfileForm dataUser={dataUser} onSubmitForm={onSubmitForm} sending={sending} updating />
	) : (
		<Loading heightLoading={100} />
	);
};

export default EditProfile;
