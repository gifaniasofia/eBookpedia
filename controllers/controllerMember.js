const { Member } = require('../models');

class ControllerMember {
    static getList(req, res) {
        let limit = 5;   // number of records per page
        let offset = 0;

        Member.findAndCountAll()
            .then((data) => {
            let page = req.params.page;      // page number
            let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);

        Member.findAll({
                limit: limit,
                offset: offset,
                $sort: { id: 1 },
                order: [['updatedAt', 'desc']]
            })
            .then((members) => {
                res.render('members/list-member.ejs', { dataMembers: members, 'page': page, 'totalPage': pages, 'offset':offset })
                // res.status(200).json({'dataMembers': members, 'count': data.count, 'pages': pages});
            })
            })
            .catch(function (error) {
                res.status(500).send('Internal Server Error');
            });
    }

    static getDelete(req, res) {
        const id = +req.params.id;

        Member.destroy({
                where: { id: id }
            })
            .then(() => res.redirect('/members'))
            .catch((err) => res.send(err.message))
    }

    static getAdd(req, res) {
        const errorValidation = req.query.alert;
        const page = req.params.page; 
        res.render('members/add-member.ejs', { errorValidation, page });
    }

    static postAdd(req, res) {
        const { name, email, address, phone_number, gender } = req.body;
        const newMember = {
            name, email, address, phone_number, gender
        }

        const page = req.params.page; 

        Member.create(newMember)
            .then(() => res.redirect('/members'))
            .catch((err) => {
                const messages = []

                if (err.errors.length > 0) {
                    err.errors.forEach(errorMsg => {
                        messages.push(errorMsg.message)
                    })
                    res.redirect(`/members/${page}/add?alert=${messages}`);
                } else {
                    res.send(err)
                }
            })
    }

    static getEdit(req, res) {
        const id = +req.params.id;
        const errorValidation = req.query.alert;

        Member.findByPk(id)
            .then((foundMember) => {
                res.render('members/edit-member.ejs', { editMember: foundMember, errorValidation })
            })
            .catch(err => res.send(err.message))
    }

    static postEdit(req, res) {
        const id = +req.params.id;
        const { name, email, address, phone_number, gender } = req.body;
        const editedMember = {
            name, email, address, phone_number, gender
        }

        Member.update(editedMember, {
                where: { id: id }
            })
            .then(() => res.redirect('/members'))
            .catch((err) => {
                const messages = []

                if (err.errors.length > 0) {
                    err.errors.forEach(errorMsg => {
                        messages.push(errorMsg.message)
                    })
                    res.redirect(`/members/edit/${id}?alert=${messages}`);
                } else {
                    res.send(err.message)
                }
            })
    }
        
}

module.exports = ControllerMember;