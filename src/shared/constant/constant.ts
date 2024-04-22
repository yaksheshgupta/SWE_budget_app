// import friendImageOne from 'assets/image/friend-image-one.png';
import friendImageTwo from 'assets/image/friend-image-two.png';
import friendImageThree from 'assets/image/friend-image-three.png';
// import friendImageFour from 'assets/image/friend-image-four.png';
import friendImageFive from 'assets/image/friend-image-five.png';
// import friendImageSix from 'assets/image/friend-image-six.png';
import { IMember } from 'shared/interface/state';
import moment from 'moment';

export const userData = {
	image: 'friendImageOne',
	userName: 'Anabarsi',
	mobileNo: '1234567890',
	friend: [
		{
			image: 'friendImageFour',
			name: 'Devanshu Gupta',
			value: 'DevanshuGupta',
			mobileNo: '9876543210'
		},
		{
			image: 'friendImageThree',
			name: 'Yakshesh Gupta',
			value: 'YaksheshGupta',
			mobileNo: '9876543210'
		},
		{
			image: 'friendImageTwo',
			name: 'Manavi Dubey',
			value: 'ManaviDubey',
			mobileNo: '9876543210'
		},
		{
			image: 'friendImageFive',
			name: 'Anbarasi M.',
			value: 'AnbarasiM',
			mobileNo: '9876543210'
		}
	]
};

export const memberMapper: { [key: string]: IMember } = {
	DevanshuGupta: {
		name: 'Devanshu Gupta',
		image: friendImageFive
	},
	YaksheshGupta: {
		name: 'Yakshesh Gupta',
		image: friendImageThree
	},
	ManaviDubey: {
		name: 'Manavi Dubey',
		image: friendImageTwo
	},
	AnbarasiM: {
		name: 'Anbarasi M.',
		image: friendImageTwo
	}
};

export const getRandomColor = () => {
	const x = Math.floor(Math.random() * 256);
	const y = Math.floor(Math.random() * 256);
	const z = Math.floor(Math.random() * 256);
	const RGBColor = 'rgba(' + x + ',' + y + ',' + z + ',0.5' + ')';
	return RGBColor;
};

export const currentDate = moment().format('DD MMMM, YYYY');
