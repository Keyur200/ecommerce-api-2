const slugify = require("slugify");
const CategoryModel = require("../Model/CategoryModel.js");

export const createcate = async(req,res) => {
    try {
        const {name} = req.body;
        const checkCate = await CategoryModel.findOne({name})
        if(checkCate){
            res.json({error : "Category already exists."})
        }
        const category =  await new CategoryModel({name,slug:slugify(name), createdBy: req.user}).save()
            res.json({
                messege: "Category created.",
                category
            })
       
    } catch (error) {
        console.log(error)
    }
}

export const findall  =  async(req,res) => {
    try {
        const all = await CategoryModel.find({}).populate('createdBy').sort({createdAt : -1})
        res.json(all)
    } catch (error) {
        console.log(error)
    }
}

export const deletecate = async(req,res) => {
    try {
        const {id} = req.params;
        await CategoryModel.findByIdAndDelete(id)
        res.json({messege: "Category deleted."})
    } catch (error) {
        console.log(error)
    }
}

export const updatecate = async (req,res) => {
    const {newname} = req.body;
    const {id} = req.params;
    const updatecate = await CategoryModel.findByIdAndUpdate(id, {name:newname, slug:slugify(newname),createdBy: req.user},{new:true})
    res.json({
        messege: "Updated successfully",
        updatecate
    })
}