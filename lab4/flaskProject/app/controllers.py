from flask import jsonify, abort, request
from .models import Book
from . import db

from flask import current_app as app


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
