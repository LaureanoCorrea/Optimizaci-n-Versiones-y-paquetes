	import { Schema, model } from 'mongoose';

	const usersCollection = 'users';

	const userSchema = new Schema({
		first_name: String,
		last_name: String,
		email: {
			type: String,
			unique: true,
			required: true,
			index: true,
		},
		date_of_birth: {
			type: Date,
		},
		age: {
			type: Number,
		},	password: {
			type: String,
		},
		role: {
			type: String,
			enum: ['admin', 'user'],
			default: 'user',
		},
		logged_from:{
			type: String,
			enum: ['local','github'],
			default: 'local',
		},
		isActive: {
			type: Boolean,
			default: true,
		},

		cart: {
			type: Schema.Types.ObjectId,
			ref: "carts" 
		}
	});

	userSchema.pre('save', function(next) {
		const currentDate = new Date();
		const birthDate = new Date(this.date_of_birth);
		let age = currentDate.getFullYear() - birthDate.getFullYear();
		const currentMonth = currentDate.getMonth();
		const birthMonth = birthDate.getMonth();
		if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
			age--;
		}

		this.age = age;
		next();
	});

	export default model(usersCollection, userSchema);
