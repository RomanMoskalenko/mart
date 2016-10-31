'use strict';

app.factory('martCart', ['$cookieStore', '$http', function ($cookieStore, $http) {
	let cart = {
		itemsCookie: '',
		init: function (itemsCookie) {
			this.itemsCookie = itemsCookie;

			if (!($cookieStore.get(this.itemsCookie) instanceof  Array)) {
				$cookieStore.put(this.itemsCookie, []);
			}
		},
		clearCookie: function () {
			$cookieStore.put(this.itemsCookie, []);
		},
		addItem: function (id) {
			let items = $cookieStore.get(this.itemsCookie);

			items.push({
				id: item.id,
				title: item.title,
				author: item.author,
				thumb: item.thumb,
				quantity: quantity,
				price: item.price
			});

			$cookieStore.put(this.itemsCookie, items);
		},
		getItemByIndex: function (index) {
			let items = $cookieStore.get(this.itemsCookie);
			return items(index);
		},
		getAllItems: function () {
			let items = $cookieStore.get(this.itemsCookie);
			return items;
		},
		updateQuantity: function (index, quantity) {
			let items = $cookieStore.get(this.itemsCookie);
			items[index].quantity = quantity;
			$cookieStore.put(this.itemsCookie, items);
		},
		removeItem: function (index) {
			let items = $cookieStore.get(this.itemsCookie);
			items.splice(index, 1);
			$cookieStore.put(this.itemsCookie, items);
		},
		getQuantityByIndex: function (index) {
			let items = $cookieStore.get(this.itemsCookie);
			let item = items[index];
			return item.quantity;
		},
		totalItems: function () {
			let quantity = 0;
			let items = $cookieStore.get(this.itemsCookie);

			for (let i = 0; i < items.length; i++) {
				quantity += items[i].quantity;
			}

			return quantity;
		},
		price: {
			total: function () {
				let total = 0;
				let items = $cookieStore.get(cart.itemsCookie);

				for (let i = 0; i < items.length; i++) {
					total += parseFloat(cart.price.subTotal(i));
				}

				return total.toFixed(2);
			},
			subTotal: function (index) {
				let items = $cookieStore.get(cart.itemsCookie);
				console.log(items[index]);
				return (parseFloat(items[index].price) * parseFloat(items[index].quantity)).toFixed(2);
			}
		},
		createOrder: function (data) {
			return $http.post('backend/newOrder.php', data).then(function (data) {
			}, function (data) {});
		}
	}

	return cart;

}]);