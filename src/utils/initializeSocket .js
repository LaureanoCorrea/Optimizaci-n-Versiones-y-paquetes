import { Server } from 'socket.io';
import productsModel from '../dao/models/products.model.js';
import messagesModel from '../dao/models/messages.model.js';

export function initializeSocket(httpServer) {
	const io = new Server(httpServer);

	let mensajes = [];

	io.on('connection', (socket) => {
		console.log('Cliente conectado');

		socket.on('addProduct', async (productData) => {
			const newProduct = await productsModel.create(productData);
			const productList = await productsModel.find();
			io.emit('productsList', productList);
		});

		socket.on('deleteProduct', async (productId) => {
			const productDeleted = await productsModel.findOneAndDelete(productId);
			const productList = await productsModel.find();
			io.emit('productsList', productList);
		});

		socket.on('message1', (data) => {
			console.log(data);
		});

		socket.on('message', async (data) => {
			mensajes.push(data);
			io.emit('messageLogs', mensajes);
			const { email, message } = await data;
			const updatedMessages = await messagesModel.findOne({ user: email });
			if (!updatedMessages) {
				const newUserMessages = await messagesModel.create({
					user: email,
					message,
				});
				console.log('Nuevo usuario creado:', newUserMessages.user);
				return;
			}
			let newMessage;
			try {
				newMessage = JSON.parse(updatedMessages.message);
			} catch (error) {
				newMessage = updatedMessages.message;
			}

			updatedMessages.message = message + '\n' + newMessage;
			console.log('Mensaje Nuevo: ', updatedMessages);

			const result = await updatedMessages.save();
		});
	});
}
