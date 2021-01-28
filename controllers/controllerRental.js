const { Book, Member, Rental, RentalDetail, User } = require('../models');
const generateCodeBook = require('../helpers/generateCodeBook.js');
const convertDate = require('../helpers/convertDate.js');
const generateRentalCode = require('../helpers/generateRentalCode.js');
const formatRupiah = require('../helpers/formatRupiah.js');

class ControllerRental {
    static getList(req, res) {
        const is_login = req.session.user_id;
        let limit = (req.query.limit) ? +req.query.limit : 5;
        let offset = 0;

        Rental.findAndCountAll()
            .then((data) => {
            let page = req.params.page;
            let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);

        Rental.findAll({
                limit: limit,
                offset: offset,
                $sort: { id: 1 },
                include: [User, Member]
            })
            .then((dataRentals) => {
                res.render('rentals/list-rental.ejs', { 'dataRentals': dataRentals, 'page': page, 'totalPage': pages, 'offset':offset, convertDate, is_login, limit })
            })
            })
            .catch(function (error) {
                res.status(500).send('Internal Server Error');
            });
    }

    static postList(req, res) {
        const limit = +req.body.limit;
        const page = req.params.page;
        res.redirect(`/books/${page}?limit=${limit}`)
    }

    static getAdd(req, res) {
        const errorValidation = req.query.alert;
        const page = req.params.page;
        const is_login = req.session.user_id;
        Book.findAll()
            .then((dataBooks) => {
                res.render('rentals/add-rental.ejs', { dataBooks, errorValidation, page, generateCodeBook, is_login })
            })
            .catch((err) => res.send(err))
    }

    static postAdd(req, res) {
        const { name, bookId, start_date } = req.body;
        const randomCode = generateRentalCode();
        Member.findOne({
                    where: { name: name }
                })
                .then(member => {
                    return Rental.create({
                        rental_code: randomCode,
                        memberId: member.id,
                        start_date,
                        returned_date: null,
                        is_returned: false,
                        userId: req.session.user_id
                    })
                })
                .then(() => {
                    return Rental.findOne({
                        where: { rental_code: randomCode }
                    })
                })
                .then(foundRental => {
                    bookId.forEach(el => {
                        return RentalDetail.create({
                            rentalId: foundRental.id,
                            bookId: +el
                        })
                    })
                })
                .then(() => res.redirect(`/rentals`))
                .catch(err => res.send(err))
    }

    static getReturned(req, res) {
        const id = +req.params.rental_id;

        Rental.update({
                is_returned: true,
                returned_date: new Date(),
                userId: req.session.user_id
            }, {
                where: {id: id}
            })
            .then(() => res.redirect('/rentals'))
            .catch(err => res.send(err))
    }

    static getViewRentalDetails(req, res) {
        const is_login = req.session.user_id;
        const id = +req.params.rental_id;
        
        Rental.findOne({
                where: { id: id },
                include: [Book, Member]
            })
            .then((data) => {
                res.render('rentals/detailList-rental.ejs', { data, generateCodeBook, is_login, formatRupiah })
            })
            .catch(err => res.send(err))
    }
}

module.exports = ControllerRental;