module.exports.search = (req, res) => {
    const food = {
        name: req.body.name
    }

    Foods.findOne({where: {name: food.name}})
        .then(food =>{
            if(!food) return;
            res.status(200).json(food)
        }).catch(err=>console.log(err));
}