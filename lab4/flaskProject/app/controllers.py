from flask import jsonify, abort, request

from .models import Book, Order, User
from . import db

from flask import current_app as app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


@app.route('/api/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([book.to_dict() for book in books]), 200


@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = Book.query.get(book_id)
    if not book:
        abort(404, description="Book not found")
    return jsonify(book.to_dict()), 200


@app.route('/api/books', methods=['POST'])
def add_book():
    if not request.json or not all(k in request.json for k in ('name', 'author', 'year')):
        abort(400, description="Invalid data")

    book = Book(
        name=request.json['name'],
        author=request.json['author'],
        year=request.json['year']
    )
    db.session.add(book)
    db.session.commit()
    return jsonify({"id": book.id}), 201


@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get(book_id)
    if not book:
        abort(404, description="Book not found")
    db.session.delete(book)
    db.session.commit()
    return jsonify({"message": "Book deleted"}), 200


@app.route('/api/orders/<int:user_id>', methods=['GET'])
def get_orders(user_id):
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([order.to_dict() for order in orders]), 200



@app.route('/api/orders', methods=['POST'])
@jwt_required()
def add_order():
    if not request.json or not all(k in request.json for k in ('book_id', 'quantity')):
        abort(400, description="Invalid data")

    user_id = get_jwt_identity()
    book_id = request.json['book_id']
    quantity = request.json['quantity']

    book = Book.query.get(book_id)
    if not book:
        abort(404, description="Book not found")

    order = Order(
        user_id=user_id,
        book_id=book_id,
        quantity=quantity
    )
    db.session.add(order)
    db.session.commit()
    return jsonify({"id": order.id}), 201

@app.route('/api/orders/<int:order_id>', methods=['DELETE'])
@jwt_required()
def delete_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        abort(404, description="Order not found")

    user_id = get_jwt_identity()
    if order.user_id != int(user_id):
        abort(403, description="You are not authorized to perform this action")

    db.session.delete(order)
    db.session.commit()
    return jsonify({"message": "Order deleted"}), 200


@app.route('/api/orders/<int:order_id>', methods=['PATCH'])
@jwt_required()
def update_order(order_id):
    order = Order.query.get(order_id)

    if not order:
        abort(404, description="Order not found")

    user_id = get_jwt_identity()
    if order.user_id != int(user_id):
        abort(403, description="You are not authorized to perform this action")

    if not request.json:
        abort(400, description="Invalid data")

    if 'quantity' in request.json:
        order.quantity = request.json['quantity']
    if 'book_id' in request.json:
        book_id = request.json['book_id']
        book = Book.query.get(book_id)
        if not book:
            abort(404, description="Book not found")
        order.book_id = book_id

    db.session.commit()
    return jsonify(order.to_dict()), 200


@app.route('/api/register', methods=['POST'])
def register():
    if not request.json or not all(k in request.json for k in ('email', 'password', 'name')):
        abort(400, description="Invalid data")

    email = request.json['email']
    password = request.json['password']
    name = request.json['name']

    if User.query.filter_by(email=email).first():
        abort(400, description="User with this email already exists")

    user = User(name=name, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"id": user.id}), 201

@app.route('/api/login', methods=['POST'])
def login():
    if not request.json or not all(k in request.json for k in ('email', 'password')):
        abort(400, description="Invalid data")

    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        abort(401, description="Invalid email or password")

    # access_token = create_access_token(identity={"id": user.id, "email": user.email})
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"access_token": access_token}), 200


@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200
