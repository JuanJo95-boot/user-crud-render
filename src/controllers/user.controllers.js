const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const result = await User.findAll()
    return res.json(result)
});

const create= catchError(async(req, res) => {
    
    const result = await User.create(req.body)// -> select * from cars; 
    return res.sendStatus(201).json(result)
});

const getOne = catchError(async(req, res) => {
    const { id }=req.params
    const result = await User.findByPk(id)
    if(!result) return res.status(404).json(
         {
            message:` user ${id} not found`
    } 
)
    return res.json(result)
});

const destroy = catchError(async(req, res) => {
    const { id }=req.params
    const result = await User.destroy({
        where: { id }
    })
    if(!result) return res.status(404).json( ` user ${id} not found` )
    return res.sendStatus(204).json(`${id} was removed successfully`)
});

const update = catchError(async (req, res) => {
    const { id } = req.params
    const user = await User.update(
        req.body, 
        { where: { id }, returning: true } 
    )

    if (user[0] === 0) return res.sendStatus(404)

    return res.status(200).json(user[1][0])
})

module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update
}